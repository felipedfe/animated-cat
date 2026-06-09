import { useEffect, useRef, useState } from 'react'

export function useWebcam() {
  const videoRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | loading | active | denied | error

  useEffect(() => {
    let stream = null

    async function startCamera() {
      setStatus('loading')
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setStatus('active')
        }
      } catch (err) {
        setStatus(err.name === 'NotAllowedError' ? 'denied' : 'error')
      }
    }

    startCamera()

    return () => {
      stream?.getTracks().forEach(t => t.stop())
    }
  }, [])

  return { videoRef, status }
}
