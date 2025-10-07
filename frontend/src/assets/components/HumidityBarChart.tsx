import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { día: "Lunes", humedad: 60 },
  { día: "Martes", humedad: 65 },
  { día: "Miércoles", humedad: 70 },
  { día: "Jueves", humedad: 55 },
  { día: "Viernes", humedad: 62 },
]

export default function HumidityBarChart() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-green-700 mb-2">Humedad (%)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="día" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="humedad" fill="#34d399" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
