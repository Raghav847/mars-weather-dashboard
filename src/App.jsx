import { useEffect, useRef, useState } from 'react';
import { fetchMarsWeather } from './api';
import WeatherChart from './WeatherChart';
import WindCompass from './WindCompass';
import Hero from './Hero';
import ScrollFadeIn from './ScrollFadeIn';
import AboutDrawer from './AboutDrawer';
import Footer from './Footer';
import ScrollToTopButton from './ScrollToTopButton';
import { motion } from 'framer-motion';

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [entered, setEntered] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const dashboardRef = useRef(null);

  const handleEnter = () => {
    setEntered(true);
    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  useEffect(() => {
    async function loadData() {
      const data = await fetchMarsWeather();
      setWeatherData(data);
    }
    loadData();
  }, []);

  return (
    <div
      className="min-h-screen text-white bg-black bg-cover bg-fixed bg-center"
      style={{ backgroundImage: "url('/mars2.jpg')" }}
    >
      {!entered && <Hero onEnter={handleEnter} />}

      {entered && weatherData && (
        <div
          ref={dashboardRef}
          className="p-6 max-w-7xl mx-auto backdrop-blur-md bg-black/60 rounded-xl mt-10 shadow-2xl"
        >
          <motion.h1
            className="text-5xl font-bold text-center mb-2 tracking-wide"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            🪐 Mars Weather Dashboard
          </motion.h1>

          <motion.p
            className="text-center text-gray-400 mb-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Live data from NASA’s InSight lander at <span className="text-white font-medium">Elysium Planitia</span>
          </motion.p>

          {/* Side-by-side layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Sol Cards */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              {weatherData.sol_keys.map((sol, index) => {
                const solData = weatherData[sol];
                return (
                  <ScrollFadeIn delay={index * 0.1} key={sol}>
                    <div className="bg-gray-900 rounded-xl p-5 shadow-md border border-gray-700">
                      <h2 className="text-2xl font-semibold mb-3">Sol {sol}</h2>
                      <p>🗓️ Season: {solData.Season}</p>
                      <p>🌡️ Temp (°C): {solData.AT?.av ?? 'N/A'}</p>
                      <p>💨 Wind Speed (m/s): {solData.HWS?.av ?? 'N/A'}</p>
                      <p>📈 Pressure (Pa): {solData.PRE?.av ?? 'N/A'}</p>
                      <WindCompass direction={solData.WD?.most_common?.compass_point} />
                    </div>
                  </ScrollFadeIn>
                );
              })}
            </div>

            {/* Right: Chart with animation */}
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <WeatherChart data={weatherData} />
            </motion.div>
          </div>

          {/* JSON Download Button with animation */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <button
              onClick={() => {
                const dataStr =
                  "data:text/json;charset=utf-8," +
                  encodeURIComponent(JSON.stringify(weatherData, null, 2));
                const link = document.createElement('a');
                link.href = dataStr;
                link.download = `mars-weather-sol-${weatherData.sol_keys[0]}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-gray-800 hover:bg-gray-700 text-white px-5 py-2 rounded-full transition text-sm shadow-md"
            >
              🧾 Download Weather Data (JSON)
            </button>
          </motion.div>

          {/* Footer */}
          <Footer lastSol={weatherData.sol_keys[0]} />
        </div>
      )}

      {!weatherData && entered && (
        <div className="text-white text-center mt-10">Loading Mars weather data...</div>
      )}

      {/* About Drawer */}
      <AboutDrawer isOpen={showAbout} onClose={() => setShowAbout(false)} />

      {/* Floating About Button */}
      <button
        onClick={() => setShowAbout(true)}
        className="fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        ℹ️ About Mars
      </button>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}
