import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useState } from 'react';

export default function WeatherChart({ data }) {
  const [view, setView] = useState("temperature");

  const formattedData = data.sol_keys.map(sol => ({
    sol,
    temperature: data[sol].AT?.av ?? null,
    pressure: data[sol].PRE?.av ?? null,
    wind: data[sol].HWS?.av ?? null,
  })).filter(entry => entry[view] !== null);

  const colors = {
    temperature: "#f87171", // red
    pressure: "#60a5fa",    // blue
    wind: "#34d399"         // green
  };

  const yAxisLabels = {
    temperature: "Temperature (°C)",
    pressure: "Pressure (Pa)",
    wind: "Wind Speed (m/s)"
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-700 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">📊 Mars Weather Trends</h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["temperature", "pressure", "wind"].map(type => (
          <button
            key={type}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              view === type
                ? "bg-white text-black"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setView(type)}
          >
            {yAxisLabels[type]}
          </button>
        ))}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="sol" stroke="#fff" />
          <YAxis stroke={colors[view]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={view}
            name={yAxisLabels[view]}
            stroke={colors[view]}
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
