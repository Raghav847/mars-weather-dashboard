import { motion } from 'framer-motion';

export default function Hero({ onEnter }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white text-center px-4">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <motion.h1
          className="text-6xl font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🌌 Welcome to Mars
        </motion.h1>

        <motion.p
          className="text-xl mb-2 text-gray-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Explore real-time Martian weather data collected by NASA's InSight lander.
        </motion.p>

        {/* NEW: Elysium Planitia mention */}
        <motion.p
          className="text-md text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Monitoring weather at <span className="text-white font-medium">Elysium Planitia</span>, Mars.
        </motion.p>

        <motion.button
          className="bg-red-600 hover:bg-red-700 transition px-6 py-3 text-lg rounded-full shadow-lg"
          onClick={onEnter}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Dashboard 🚀
        </motion.button>
      </div>
    </div>
  );
}
