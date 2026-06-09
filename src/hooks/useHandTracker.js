import { useEffect, useRef, useState } from 'react'
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision'

const DEBOUNCE_MS = 300

// Índices dos landmarks de ponta e articulação média de cada dedo
const FINGER_TIPS = [8, 12, 16, 20]   // indicador, médio, anelar, mínimo
const FINGER_PIPS = [6, 10, 14, 18]

function countRaisedFingers(landmarks) {
  let count = 0
  for (let i = 0; i < FINGER_TIPS.length; i++) {
    if (landmarks[FINGER_TIPS[i]].y < landmarks[FINGER_PIPS[i]].y) count++
  }
  return count
}

export function useHandTracker(videoRef) {
  const [fingerCount, setFingerCount] = useState(0)
  const landmarkerRef = useRef(null)
  const rafRef = useRef(null)
  const debounceRef = useRef(null)
  const pendingRef = useRef(0)

  useEffect(() => {
    async function init() {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
      )
      landmarkerRef.current = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU',
        },
        runningMode: 'VIDEO',
        numHands: 1,
      })
      startLoop()
    }

    function startLoop() {
      function detect() {
        const video = videoRef.current
        if (video && video.readyState >= 2 && landmarkerRef.current) {
          const result = landmarkerRef.current.detectForVideo(video, performance.now())
          const landmarks = result.landmarks[0]

          const count = landmarks ? countRaisedFingers(landmarks) : 0

          if (count !== pendingRef.current) {
            pendingRef.current = count
            clearTimeout(debounceRef.current)
            debounceRef.current = setTimeout(() => {
              setFingerCount(count)
            }, DEBOUNCE_MS)
          }
        }
        rafRef.current = requestAnimationFrame(detect)
      }
      rafRef.current = requestAnimationFrame(detect)
    }

    init()

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(debounceRef.current)
      landmarkerRef.current?.close()
    }
  }, [videoRef])

  return fingerCount
}
