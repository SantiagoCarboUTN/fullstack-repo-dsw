import { InfoCard } from "../../components/ui/AdminDashboardUi/InfoCard"
import { ListReservaRow } from "../../components/ui/AdminDashboardUi/ListReservaRow"
import { UseReservas } from "../../hooks/Reserva/UseReservas";

export const Dashboard = () => {
  // Llamada al hook dentro del componente
  const { reservas, loading, error } = UseReservas();

  return (
    <>
    <div className = 'h-screen'>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-0 place-items-center">
        <InfoCard label="Cocheras Ocupadas:" value={34} />
        <InfoCard label="Cocheras Disponibles:" value={16} />
      </div>

      <div className="p-8 bg-gray-100 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Lista de Reservas</h1>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition">
            + Agregar Reserva
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <p className="p-4">Cargando reservas...</p>
          ) : error ? (
            <p className="p-4 text-red-500">Error: {error}</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="py-3 px-4">Patente</th>
                  <th className="py-3 px-4">Hora</th>
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">N° Cochera</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva, index) => (
                  <ListReservaRow
                    key={index}
                    patente={reserva.vehiculo.patente}
                    hora={reserva.fechaInicio} // o formateada con toLocaleTimeString()
                    cliente={reserva.vehiculo.client.complete_name}
                    cochera={reserva.cochera.number.toString()}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </>
  );
};