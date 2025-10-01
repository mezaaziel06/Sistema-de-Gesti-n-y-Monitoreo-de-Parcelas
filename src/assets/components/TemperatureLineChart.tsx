import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { hora: "06:00", temperatura: 18 },
  { hora: "09:00", temperatura: 22 },
  { hora: "12:00", temperatura: 28 },
  { hora: "15:00", temperatura: 30 },
  { hora: "18:00", temperatura: 26 },
  { hora: "21:00", temperatura: 22 },
]

export default function TemperatureLineChart() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-green-700 mb-2">Temperatura (°C)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hora" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="temperatura" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
