import { InfoCard } from "../../components/ui/AdminDashboardUi/InfoCard.tsx"
import { Default_Link } from "../../components/ui/default_link.tsx";
import { useCocheras } from "../../hooks/Cochera/UseCocheras.tsx";
import { useReservas } from "../../hooks/Reserva/UseReservas.tsx";

export const ReservasAdminList = () => {
  const { reservas, loading, error } = useReservas();
  const {cantDesocupadas,cantOcupadas} = useCocheras()
  return (
    <>
    <div className = 'h-screen'>
      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-4 place-items-center">
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
        <div className="grid-container w-full border border-gray-300 lg:gap-4 text-sm">
                        {/* Columnas solo para lg */}
                  <div className="hidden lg:grid bg-gray-800 text-white font-bold lg:grid-cols-8">
                    <div className="px-4 py-2 text-left">Patente</div>
                    <div className="px-4 py-2 text-left">Cliente</div>
                    <div className="px-4 py-2 text-left col-span-2">Fecha Inicio</div>
                    <div className="px-4 py-2 text-left">N° Cochera</div>
                    <div className="px-4 py-2 text-center col-span-2">Acciones</div>
                  </div>
                    {/* Columnas para sm, md y lg */}
                  <div className="grid grid-cols-3 bg-gray-800 text-white text-xs font-bold lg:hidden">
                    <div className="px-4 py-2 text-left">Vehiculo</div>
                    <div className="px-4 py-2 text-left">Datos</div>
                    <div className="px-4 py-2 text-left">Acciones</div>
                  </div>
          
                {reservas.map((reserva,index) => (
                  <div key={index} className="grid grid-cols-3 gap-0 border-t border-gray-200 text-gray-800 lg:grid-cols-8">

                    <div className="hidden px-4 py-3 lg:block">
                      <p className="text-gray-600 cursor-pointer">{reserva.vehiculo.patente}</p>
                    </div>
                    {/* Filas para sm y md */}
                    <div className="px-4 py-3 lg:hidden">

                      <span className="font-semibold text-xs"> Patente:</span>
                      <p className="font-medium text-xs text-gray-600">{reserva.vehiculo.patente}</p>

                      <span className="font-semibold text-xs"> Cliente:</span>
                      <p className="font-medium text-xs text-gray-600">{reserva.vehiculo.client.complete_name}</p>

                    </div>

                    <div className="px-4 py-3 lg:hidden">

                      <span className="font-semibold text-xs"> Cochera:</span>
                      <p className="font-medium text-xs text-gray-600">{reserva.cochera.number}</p>

                      <span className="font-semibold text-xs"> Inicio:</span>
                      <p className="font-medium text-xs text-gray-600">{new Date(reserva.fechaInicio).toLocaleString("es-AR", {
                          day: "2-digit",
                          month: "short",
                          year: "2-digit",
                        })}</p>

                    </div>
                    
                    {/* Filas para lg */}
                    <div className="hidden px-4 py-3 lg:block">
                      <p className="text-gray-600 cursor-pointer">{reserva.vehiculo.client.complete_name}</p>
                    </div>
                    <div className="hidden px-4 py-3 lg:block col-span-2">
                      <p className="text-gray-600 cursor-pointer">{new Date(reserva.fechaFin).toLocaleString("es-AR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric"
                        })}</p>
                    </div>
                    <div className="hidden px-4 py-3 lg:block">
                      <p className="text-gray-600 cursor-pointer">{reserva.cochera.number}</p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 lg:col-span-2">
                      <span className="px-4 py-3 text-blue-700 font-medium cursor-pointer hover:underline">
                        Editar
                      </span>
                      <span className="px-4 py-3 text-red-700 font-medium cursor-pointer hover:underline">
                        Cancelar
                      </span>
                  
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
};