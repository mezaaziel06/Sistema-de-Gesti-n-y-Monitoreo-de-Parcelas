import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function ParcelMap() {
  const parcelas = [
    { id: 1, lat: 21.1619, lng: -86.8515, cultivo: "Maíz" },
    { id: 2, lat: 21.1625, lng: -86.8500, cultivo: "Tomate" },
  ]

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold text-green-700 mb-2">Mapa de parcelas vigentes</h2>
      <MapContainer center={[21.1619, -86.8515]} zoom={13} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {parcelas.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]}>
            <Popup>{p.cultivo}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
