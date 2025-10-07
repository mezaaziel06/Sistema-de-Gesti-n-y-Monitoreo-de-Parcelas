import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { cultivo: "Maíz", porcentaje: 40 },
  { cultivo: "Tomate", porcentaje: 25 },
  { cultivo: "Papa", porcentaje: 20 },
  { cultivo: "Zanahoria", porcentaje: 15 },
]

const COLORS = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"]

export default function CropPieChart() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-green-700 mb-2">Distribución de cultivos</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="porcentaje"
            nameKey="cultivo"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
