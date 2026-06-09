import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useWebcam } from './hooks/useWebcam'
import { useHandTracker } from './hooks/useHandTracker'
import bigode from './assets/bigode.png'
import botao from './assets/botao.png'
import cabeca from './assets/cabeca.png'
import lingua from './assets/lingua.png'
import nariz from './assets/nariz.png'
import olhoContorno from './assets/olho-contorno.png'
import olhoPupila from './assets/olho-pupila.png'
import orelha from './assets/orelha.png'

function App() {
  const headY = useMotionValue(0)
  const controlsRef = useRef(null)
  const [isMovingPupils, setIsMovingPupils] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const debugCanvasRef = useRef(null)

  const { videoRef, status } = useWebcam()
  const fingerCount = useHandTracker(videoRef, showDebug ? debugCanvasRef : null)

  const isAnimating = fingerCount === 1 || fingerCount === 4
  const lightOn = fingerCount === 2 || fingerCount === 4
  const tongueOut = fingerCount === 2 || fingerCount === 4

  const pupilX = useMotionValue(0)
  const pupilY = useMotionValue(0)
  const leftPupilX = useTransform(pupilX, v => `calc(50% + ${v}px)`)
  const rightPupilX = useTransform(pupilX, v => `calc(-50% + ${v}px)`)
  const pupilStyleY = useTransform(pupilY, v => `calc(-50% + ${v}px)`)

  const sleep = ms => new Promise(r => setTimeout(r, ms))

  async function movePupils() {
    setIsMovingPupils(true)
    await Promise.all([
      animate(pupilX, -12, { duration: 0.4, ease: 'easeInOut' }),
      animate(pupilY, -5, { duration: 0.4, ease: 'easeInOut' }),
    ])
    await sleep(500)
    await Promise.all([
      animate(pupilX, 12, { duration: 0.6, ease: 'easeInOut' }),
      animate(pupilY, -5, { duration: 0.6, ease: 'easeInOut' }),
    ])
    await sleep(500)
    await Promise.all([
      animate(pupilX, 0, { duration: 0.4, ease: 'easeOut' }),
      animate(pupilY, 0, { duration: 0.4, ease: 'easeOut' }),
    ])
    setIsMovingPupils(false)
  }

  // Dispara a animação dos olhos quando o gesto for 3 ou 4 dedos
  useEffect(() => {
    if ((fingerCount === 3 || fingerCount === 4) && !isMovingPupils) {
      movePupils()
    }
  }, [fingerCount])

  useEffect(() => {
    if (isAnimating) {
      controlsRef.current = animate(headY, [0, -20, 0], {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      })
    } else {
      controlsRef.current?.stop()
      animate(headY, 0, { type: 'spring', stiffness: 120, damping: 20 })
    }
  }, [isAnimating, headY])

  const earRotateTarget = useTransform(headY, [0, -20], [0, 10])
  const earRotate = useSpring(earRotateTarget, { stiffness: 15, damping: 8 })

  const whiskerRotateTarget = useTransform(headY, [0, -20], [0, 6])
  const whiskerRotateRight = useSpring(whiskerRotateTarget, { stiffness: 30, damping: 8 })
  const whiskerRotateLeft = useTransform(whiskerRotateRight, v => -v)

  const gestureLabel = [
    'Nenhum gesto',
    'Cabeça animando',
    'Luz acesa',
    'Olhos se movendo',
    'Tudo!',
  ][fingerCount] ?? 'Nenhum gesto'

  return (
    <main>
      <motion.div style={{ y: headY }} className="cat">
        <img src={cabeca} alt="gato" className="cat__head" />

        <motion.div className="cat__ear cat__ear--left" aria-hidden style={{ scaleX: -1, rotate: earRotate }}>
          <img src={orelha} alt="" />
        </motion.div>

        <motion.div className="cat__ear cat__ear--right" aria-hidden style={{ rotate: earRotate }}>
          <img src={orelha} alt="" />
        </motion.div>

        <motion.div className="cat__forehead" aria-hidden initial={{ x: '-50%' }} animate={{ x: '-50%' }}>
          <img src={botao} alt="" />
          <motion.div
            className="cat__forehead-light"
            animate={{
              opacity: lightOn ? 0.65 : 0,
              boxShadow: lightOn ? '0 0 8px 15px rgba(40, 255, 97, 0.45)' : 'none',
            }}
            transition={{ duration: 0.25 }}
          />
        </motion.div>

        <motion.div className="cat__whiskers cat__whiskers--left" aria-hidden style={{ rotate: whiskerRotateLeft, originX: 1, originY: 0.5 }}>
          <img src={bigode} alt="" />
        </motion.div>

        <motion.div className="cat__whiskers cat__whiskers--right" aria-hidden style={{ rotate: whiskerRotateRight, originX: 0, originY: 0.5 }}>
          <img src={bigode} alt="" />
        </motion.div>

        <motion.div className="cat__eye cat__eye--left" aria-hidden>
          <motion.img src={olhoContorno} alt="" className="cat__eye-outline" initial={{ scaleX: -1 }} animate={{ scaleX: -1 }} />
          <motion.img src={olhoPupila} alt="" className="cat__pupil cat__pupil--left" style={{ x: leftPupilX, y: pupilStyleY }} />
        </motion.div>

        <motion.div className="cat__eye cat__eye--right" aria-hidden>
          <motion.img src={olhoContorno} alt="" className="cat__eye-outline" />
          <motion.img src={olhoPupila} alt="" className="cat__pupil cat__pupil--right" style={{ x: rightPupilX, y: pupilStyleY }} />
        </motion.div>

        <motion.div className="cat__nose" aria-hidden initial={{ x: '-50%', y: '-50%' }} animate={{ x: '-50%', y: '-50%' }}>
          <img src={nariz} alt="" />
        </motion.div>

        <motion.div
          className="cat__tongue"
          aria-hidden
          initial={{ x: '-50%', y: 0 }}
          animate={{ x: '-50%', y: tongueOut ? 30 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <img src={lingua} alt="" />
        </motion.div>
      </motion.div>

      <section className="webcam-section">
        <div className="webcam-wrapper">
          <video ref={videoRef} className="webcam" autoPlay playsInline muted />
          {showDebug && <canvas ref={debugCanvasRef} className="webcam-debug" />}
        </div>
        <button className="webcam-debug-toggle" onClick={() => setShowDebug(p => !p)}>
          {showDebug ? 'debug on' : 'debug off'}
        </button>
        {status === 'denied' && (
          <p className="webcam-error">Permissão da câmera negada. Libere o acesso nas configurações do navegador.</p>
        )}
        {status === 'error' && (
          <p className="webcam-error">Não foi possível acessar a câmera.</p>
        )}
      </section>

      <div className="gesture-indicator">
        <span className="gesture-indicator__count">{fingerCount}</span>
        {/* <span className="gesture-indicator__label">{gestureLabel}</span> */}
      </div>
    </main>
  )
}

export default App
