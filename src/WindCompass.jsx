export default function WindCompass({ direction }) {
  const compassMap = {
    N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
    E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
    S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
    W: 270, WNW: 292.5, NW: 315, NNW: 337.5,
  };

  const rotation = compassMap[direction] ?? 0;

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <div className="relative w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
        <div
          className="absolute w-1 h-6 bg-red-500 origin-bottom"
          style={{ transform: `rotate(${rotation}deg)` }}
        />
        <span className="absolute bottom-0 text-xs">S</span>
        <span className="absolute top-0 text-xs">N</span>
        <span className="absolute left-0 text-xs">W</span>
        <span className="absolute right-0 text-xs">E</span>
      </div>
      <p className="text-sm text-gray-300">Direction: {direction || 'N/A'}</p>
    </div>
  );
}
