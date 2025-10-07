export default function ParcelList() {
  const eliminadas = [
    { id: 1, cultivo: "Papa", responsable: "Juan", fecha: "2025-09-01" },
    { id: 2, cultivo: "Zanahoria", responsable: "Ana", fecha: "2025-08-15" },
  ]

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold text-red-700 mb-2">Parcelas eliminadas</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th>ID</th>
            <th>Cultivo</th>
            <th>Responsable</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {eliminadas.map((p) => (
            <tr key={p.id} className="border-b">
              <td>{p.id}</td>
              <td>{p.cultivo}</td>
              <td>{p.responsable}</td>
              <td>{p.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
