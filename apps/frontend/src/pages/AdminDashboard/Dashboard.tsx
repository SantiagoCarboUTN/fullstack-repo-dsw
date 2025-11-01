import { InfoCard } from "../../components/ui/AdminDashboardUi/InfoCard"
import { ListReservaRow } from "../../components/ui/AdminDashboardUi/ListReservaRow"
import { Default_Link } from "../../components/ui/default_link.tsx";
import { useCocheras } from "../../hooks/Cochera/UseCocheras.tsx";
import { useReservas } from "../../hooks/Reserva/UseReservas";

export const Dashboard = () => {
  const { reservas, loading, error } = useReservas();
  const {cantDesocupadas,cantOcupadas} = useCocheras()
  return (
    <>
    <div className = 'h-screen'>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-0 place-items-center">
        <InfoCard label="Reservas Activas" value={cantOcupadas} />
        <InfoCard label="Cocheras Disponibles" value={cantDesocupadas} />
      </div>

      <div className="p-8 bg-gray-100 ">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Lista de Reservas</h1>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition">
            <Default_Link route="../realizar-reserva" text="+ Realizar Reserva"></Default_Link>
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
                  <th className="py-3 px-4">Cliente</th>
                  <th className="py-3 px-4">Fecha inicio</th>
                  <th className="py-3 px-4">N° Cochera</th>
                  <th className="py-3 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva, index) => (
                  <ListReservaRow
                    key={index}
                    patente={reserva.vehiculo.patente}
                    cliente={reserva.vehiculo.client.complete_name}
                    hora={ new Date(reserva.fechaInicio).toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    })} // o formateada con toLocaleTimeString()
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