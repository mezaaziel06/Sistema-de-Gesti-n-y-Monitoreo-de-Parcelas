export default function LiveSensorPanel() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold text-green-700 mb-2">Sensores en tiempo real</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SensorCard label="Temperatura" value="28°C" />
        <SensorCard label="Humedad" value="65%" />
        <SensorCard label="Lluvia" value="0.2 mm" />
        <SensorCard label="Radiación solar" value="450 W/m²" />
      </div>
    </div>
  )
}

function SensorCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-green-100 p-4 rounded text-center">
      <p className="text-sm text-green-700">{label}</p>
      <p className="text-xl font-bold text-green-900">{value}</p>
    </div>
  )
}
