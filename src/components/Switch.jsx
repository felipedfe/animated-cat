import { motion } from 'framer-motion'

function Switch({ isOn, onToggle, disabled }) {
  return (
    <motion.div
      className="switch"
      onClick={disabled ? undefined : onToggle}
      animate={{ backgroundColor: isOn ? '#22c55e' : '#9ca3af' }}
      transition={{ duration: 0.2 }}
      style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <motion.div
        className="switch__knob"
        animate={{ x: isOn ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </motion.div>
  )
}

export default Switch
