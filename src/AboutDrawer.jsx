import { motion } from 'framer-motion';

export default function AboutDrawer({ isOpen, onClose }) {
  return (
    <motion.div
      className="fixed top-0 right-0 h-full w-80 bg-black/90 text-white shadow-xl z-50 p-6 overflow-y-auto backdrop-blur-lg"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "tween", duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">About Mars</h2>
        <button onClick={onClose} className="text-gray-300 hover:text-white text-lg">✕</button>
      </div>
      <div className="space-y-4 text-sm text-gray-300">
        <p>🔴 Mars is the 4th planet from the Sun and is known as the Red Planet due to its reddish appearance.</p>
        <p>🛰️ The InSight lander monitors seismic and weather activity at Elysium Planitia.</p>
        <p>🌡️ Temperatures can drop below -100°C at night and rarely go above freezing.</p>
        <p>💨 Dust storms and strong winds are common across its surface.</p>
        <p>🧭 A Martian day (Sol) is about 24 hours and 39 minutes long.</p>
        <p>🪐 Gravity on Mars is 0.38× that of Earth — you’d weigh a third less!</p>
      </div>
    </motion.div>
  );
}
