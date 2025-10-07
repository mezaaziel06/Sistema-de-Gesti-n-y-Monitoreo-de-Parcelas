import LiveSensorPanel from "../components/LiveSensorPanel"
import TemperatureLineChart from "../components/TemperatureLineChart"
import HumidityBarChart from "../components/HumidityBarChart"
import CropPieChart from "../components/CropPieChart"
import ParcelMap from "../components/ParcelMap"
import ParcelList from "../components/ParcelList"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800">Panel de monitoreo agrícola</h1>

      <LiveSensorPanel />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <TemperatureLineChart />
        <HumidityBarChart />
        <CropPieChart />
      </div>

      <ParcelMap />

      <ParcelList />
    </div>
  )
}
