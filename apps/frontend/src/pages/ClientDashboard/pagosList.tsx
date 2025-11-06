import { useCuotas } from "../../hooks/Cuotas/useCuotas.tsx";


export const PagosList = ()=>{
    
    const { cuotas, loading, error } = useCuotas();

    return (
      <>
      <div className = 'h-screen'> 
        <div className="p-4 lg:p-8 bg-gray-100 ">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Mis pagos pendientes</h1>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {loading ? (
                <p className="p-4">Cargando pagos...</p>
              ) : error ? (
                <p className="p-4 text-red-500">Error: {error}</p>
              ) : ( 
                <div className="grid-container w-full border border-gray-300 lg:gap-4">
                  {/* Columnas solo para sm */}
                  <div className="hidden lg:grid grid-cols-3 bg-blue-700 text-white font-bold">
                    <div className="py-3 px-4">Monto</div>
                    <div className="py-3 px-4">Fecha Pago</div>
                    
                    <div className="py-3 px-4">Acciones</div>
                  </div>

                  {/* Filas */} 
                  {cuotas.map((cuota, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 lg:grid-cols-3 border-t border-gray-200 text-gray-800"
                      >
                      <div className="py-3 px-4">
                        <span className="font-semibold lg:hidden">Monto: </span>
                        ${cuota.monto.toFixed(2)}
                      </div>
                      <div className="py-3 px-4">
                        <span className="font-semibold lg:hidden">Fecha Pago: </span>
                        {new Date(cuota.fechaPago).toLocaleDateString("es-AR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    <div className="py-3 px-4 flex items-center">

                      <button
                          onClick={async () => {
                            try {
                              const res = await fetch(
                                `${import.meta.env.VITE_URL_TEST}/api/pagos/${cuota.id}`,
                                { method: "POST" }
                              );
                              const data: { init_point: string } = await res.json();
                              window.location.href = data.init_point; // Redirige al checkout Pro
                            } catch (err) {
                              console.error("Error iniciando pago", err);
                            }
                          }}
                          className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Pagar
                        </button>
                      </div>
                      </div>
                  ))}
                </div>
              )}  
            </div>
        </div>
      </div>
      </>
    )
}