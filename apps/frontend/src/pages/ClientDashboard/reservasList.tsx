
import { useState } from "react";
import { useReservas } from "../../hooks/Reserva/UseReservas.tsx";
import { Default_Link } from "../../components/ui/default_link.tsx";

export const ReservasList = ()=>{
    const clientId = 1 //para desarrollo
    const [filtroEstado, setFiltroEstado] = useState<"activa" | "finalizada" >("activa");
    const { reservas, loading, error } = useReservas(clientId);
    const reservasFiltradas = reservas.filter((reserva) =>{
      return (reserva.state === filtroEstado.toUpperCase())
    }
    )
    return (
      <>
      <div className = 'h-screen'>
      <div className="p-8 bg-gray-100 ">
          <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value as "activa" | "finalizada" )}
              className="mb-4 p-2 border rounded"
            >
              <option value="activa">Activas</option>
              <option value="finalizada">Finalizadas</option>
              
            </select>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Mis reservas</h1>
          </div>
  
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {loading ? (
              <p className="p-4">Cargando reservas...</p>
            ) : error ? (
              <p className="p-4 text-red-500">Error: {error}</p>
            ) : (
              <div className="grid-container w-full border border-gray-300">
        
                <div className="grid grid-cols-5 bg-blue-700 text-white font-bold">
                  <div className="py-3 px-4">Vehiculo</div>
                  <div className="py-3 px-4">Fecha Fin</div>
                  <div className="py-3 px-4">Sucursal</div>
                  <div className="py-3 px-4">N° Cochera</div>
                  <div className="py-3 px-4">Acciones</div>
            
                </div>

                {/* Filas */}
                {reservasFiltradas.map((reserva, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 border-t border-gray-200 text-gray-800"
                  >
                    <div className="py-3 px-4">{reserva.vehiculo.patente}</div>
                    <div className="py-3 px-4">{new Date(reserva.fechaFin).toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</div>
                    <div className="py-3 px-4">{reserva.cochera.sucursal.razonSocial}</div>
                    <div className="py-3 px-4">{reserva.cochera.number}</div>
                    <span className="text-blue-700 font-medium cursor-pointer hover:underline py-3 px-4">
                      <Default_Link route= "ver-reserva" text="Ver Reserva"></Default_Link>
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </>
    );
}