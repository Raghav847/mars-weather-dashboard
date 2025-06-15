export default function Footer({ lastSol }) {
  return (
    <footer className="mt-10 p-6 text-center text-sm text-gray-400 border-t border-gray-700">
      <p className="mb-1">
        Powered by <a href="https://mars.nasa.gov/insight/weather/" target="_blank" rel="noreferrer" className="underline hover:text-white">NASA InSight Weather API</a>
      </p>
      <p className="mb-1">Last updated: Sol <span className="text-white font-medium">{lastSol}</span></p>
      <p>
        Built by <span className="text-white font-medium">Raghav Khandelwal</span> • 
        <a href="https://github.com/your-username/mars-weather-dashboard" target="_blank" rel="noreferrer" className="ml-1 underline hover:text-white">View on GitHub</a>
      </p>
    </footer>
  );
}
