import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Switch from './components/Switch'
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
  const [isAnimating, setIsAnimating] = useState(false)
  const [tongueOut, setTongueOut] = useState(false)
  const [lightOn, setLightOn] = useState(false)
  const [isMovingPupils, setIsMovingPupils] = useState(false)

  const pupilX = useMotionValue(0)
  const pupilY = useMotionValue(0)
  const leftPupilX = useTransform(pupilX, v => `calc(50% + ${v}px)`)
  const rightPupilX = useTransform(pupilX, v => `calc(-50% + ${v}px)`)
  const pupilStyleY = useTransform(pupilY, v => `calc(-50% + ${v}px)`)

  const sleep = ms => new Promise(r => setTimeout(r, ms))

  async function movePupils() {
    setIsMovingPupils(true)

    // Move para a esquerda e levemente para cima
    await Promise.all([
      animate(pupilX, -12, { duration: 0.6, ease: 'easeInOut' }),
      animate(pupilY, -5, { duration: 0.6, ease: 'easeInOut' }),
    ])
    await sleep(1000)

    // Varre para a direita (passa pelo centro)
    await Promise.all([
      animate(pupilX, 12, { duration: 0.9, ease: 'easeInOut' }),
      animate(pupilY, -5, { duration: 0.9, ease: 'easeInOut' }),
    ])
    await sleep(1000)

    // Volta ao centro
    await Promise.all([
      animate(pupilX, 0, { duration: 0.4, ease: 'easeOut' }),
      animate(pupilY, 0, { duration: 0.4, ease: 'easeOut' }),
    ])

    setIsMovingPupils(false)
  }

  useEffect(() => {
    if (isAnimating) {
      controlsRef.current = animate(headY, [0, -20, 0], {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      })
    } else {
      controlsRef.current?.stop()
      animate(headY, 0, { type: "spring", stiffness: 120, damping: 20 })
    }
  }, [isAnimating, headY])

  // Quando a cabeça sobe (y = -20), a orelha tende para 10°
  const earRotateTarget = useTransform(headY, [0, -20], [0, 10])
  const earRotate = useSpring(earRotateTarget, { stiffness: 15, damping: 8 })

  // Bigodes: mais leves, respondem mais rápido que as orelhas
  const whiskerRotateTarget = useTransform(headY, [0, -20], [0, 6])
  const whiskerRotateRight = useSpring(whiskerRotateTarget, { stiffness: 30, damping: 8 })
  // Bigode esquerdo gira no sentido oposto
  const whiskerRotateLeft = useTransform(whiskerRotateRight, v => -v)

  return (
    <main>
      {/* Animar: y (flutuar), rotate (inclinar cabeça) */}
      <motion.div style={{ y: headY }} className="cat">
        <img src={cabeca} alt="gato" className="cat__head" />

        {/* scaleX: -1 espelha; rotate derivado do y da cabeça via spring */}
        <motion.div
          className="cat__ear cat__ear--left"
          aria-hidden
          style={{ scaleX: -1, rotate: earRotate }}
        >
          <img src={orelha} alt="" />
        </motion.div>

        {/* rotate derivado do y da cabeça via spring */}
        <motion.div
          className="cat__ear cat__ear--right"
          aria-hidden
          style={{ rotate: earRotate }}
        >
          <img src={orelha} alt="" />
        </motion.div>

        {/* Animar: rotate (girar), scale (pulsar) — x: "-50%" mantém a centralização */}
        <motion.div
          className="cat__forehead"
          aria-hidden
          initial={{ x: '-50%' }}
          animate={{ x: '-50%' }}
        >
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

        {/* Animar: rotate (mover bigode) */}
        <motion.div
          className="cat__whiskers cat__whiskers--left"
          aria-hidden
          style={{ rotate: whiskerRotateLeft, originX: 1, originY: 0.5 }}
        >
          <img src={bigode} alt="" />
        </motion.div>

        {/* Animar: rotate (mover bigode) */}
        <motion.div
          className="cat__whiskers cat__whiskers--right"
          aria-hidden
          style={{ rotate: whiskerRotateRight, originX: 0, originY: 0.5 }}
        >
          <img src={bigode} alt="" />
        </motion.div>

        {/* Animar: scaleY (piscar olho) */}
        <motion.div
          className="cat__eye cat__eye--left"
          aria-hidden
        >
          {/* scaleX: -1 mantém o espelhamento do contorno */}
          <motion.img
            src={olhoContorno}
            alt=""
            className="cat__eye-outline"
            initial={{ scaleX: -1 }}
            animate={{ scaleX: -1 }}
          />
          {/* Animar: x, y (mover pupila) — x/y mantêm o posicionamento original */}
          <motion.img
            src={olhoPupila}
            alt=""
            className="cat__pupil cat__pupil--left"
            style={{ x: leftPupilX, y: pupilStyleY }}
          />
        </motion.div>

        {/* Animar: scaleY (piscar olho) */}
        <motion.div
          className="cat__eye cat__eye--right"
          aria-hidden
        >
          <motion.img
            src={olhoContorno}
            alt=""
            className="cat__eye-outline"
          />
          {/* Animar: x, y (mover pupila) — x/y mantêm o posicionamento original */}
          <motion.img
            src={olhoPupila}
            alt=""
            className="cat__pupil cat__pupil--right"
            style={{ x: rightPupilX, y: pupilStyleY }}
          />
        </motion.div>

        {/* Animar: scale (pulsar nariz) — x/y: "-50%" mantêm a centralização */}
        <motion.div
          className="cat__nose"
          aria-hidden
          initial={{ x: '-50%', y: '-50%' }}
          animate={{ x: '-50%', y: '-50%' }}
        >
          <img src={nariz} alt="" />
        </motion.div>

        {/* y: 0 = escondida, y: [valor > 0] = aparecendo */}
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

      <section className="controller">
        <div className="controller__item">
          <span>head</span>
          <Switch isOn={isAnimating} onToggle={() => setIsAnimating(prev => !prev)} />
        </div>
        <div className="controller__item">
          <span>light</span>
          <Switch isOn={lightOn} onToggle={() => setLightOn(prev => !prev)} />
        </div>
        <div className="controller__item">
          <span>eyes</span>
          <Switch isOn={isMovingPupils} onToggle={movePupils} disabled={isMovingPupils} />
        </div>
        <div className="controller__item">
          <span>tongue</span>
          <Switch isOn={tongueOut} onToggle={() => setTongueOut(prev => !prev)} />
        </div>
      </section>
    </main>

  )
}

export default App
