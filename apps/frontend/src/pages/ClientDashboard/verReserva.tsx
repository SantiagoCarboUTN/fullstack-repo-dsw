
import { useParams } from "react-router-dom";
import { ReservaInfoCard } from "../../components/ui/ClientDashboardUi/ReservaInfoCard.tsx"
import { Default_Link } from "../../components/ui/default_link.tsx";
import { useReserva } from "../../hooks/Reserva/useReserva.tsx";

export const VerReserva = ()=>{
  const {number,admin,vehiculo,fechaInicio} = useParams<{number?:string,admin?:string,vehiculo?:string,fechaInicio?:string}>() 
  const { reserva, loading, error ,cuotas} = useReserva(admin,number,vehiculo,fechaInicio);
  
  return (
    <>
    <div className = 'h-screen p-4 flex flex-col md:flex-row gap-4'>
        <div className="flex-1 flex justify-center">
          <ReservaInfoCard
            label="Reserva"
            sucursal={reserva?.cochera?.sucursal?.razonSocial || ""}
            vehiculo={reserva?.vehiculo?.patente || ""}
            imgSucursal={reserva?.cochera?.sucursal?.imageUrl || ""}
            fechaIni={new Date(reserva?.fechaInicio || "").toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
            fechaFin={new Date(reserva?.fechaFin || "").toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
            ubicacion={reserva?.cochera?.sucursal?.direction || ""}
          />    
        </div>
          {loading ? (
            <p className="p-4">Cargando reservas...</p>
          ) : error ? (
            <p className="p-4 text-red-500">Error: {error}</p>
          ) : (
            <div className="grid-container w-full rounded-3xl h-screen shadow-md bg-white border border-gray-300 sm:gap-4">
              {/* Columnas solo para md */}
              <h2 className="text-2xl font-bold text-blue-700 mb-4 px-4 pt-4 text-center">
                Lista de cuotas
              </h2>

              <div className="hidden md:grid grid-cols-4 bg-blue-700 text-white font-bold">
                <div className="py-3 px-4">Estado</div>
                <div className="py-3 px-4">Fecha vencimiento</div>
                <div className="py-3 px-4">Monto</div>
                <div className="py-3 px-4">Acciones</div>
          
              </div>

              {/* Filas */}
              {cuotas.map((cuota, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 border-t border-gray-200 text-gray-800"
                >
                  <div className="py-3 px-4">
                    <span className="font-semibold md:hidden">Estado: </span>
                    {cuota.state}
                  </div>

                  <div className="py-3 px-4">
                    <span className="font-semibold md:hidden">Fecha vencimiento: </span>
                    {new Date(cuota.fechaPago).toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    })}
                  </div>

                  <div className="py-3 px-4">
                    <span className="font-semibold md:hidden">Monto: </span>
                    {cuota.monto}
                  </div>

                  <span className="text-green-700 font-medium cursor-pointer hover:underline py-3 px-4">
                    <Default_Link  route= {""} 
                        text="Pagar">
                    </Default_Link>
                  </span>
                </div>
              ))}
            </div>
          )}
    </div>
    </>
  )
}