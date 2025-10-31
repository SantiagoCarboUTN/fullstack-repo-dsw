import { useState } from "react";
import { CocheraRows } from "../../components/ui/AdminDashboardUi/CocheraRow.tsx";
import { InfoCard } from "../../components/ui/AdminDashboardUi/InfoCard"
import { Default_Link } from "../../components/ui/default_link.tsx";
import { useCocheras } from "../../hooks/Cochera/UseCocheras.tsx";


export const CocherasList = () => {
  const [filtroEstado, setFiltroEstado] = useState<"disponible" | "ocupada" >("disponible");
  const {cocheras, loading, error,cantDesocupadas,cantOcupadas} = useCocheras()
  const cocherasFiltradas = cocheras.filter((cochera) =>{
      return (cochera.state === filtroEstado)
    })
  return (
    <>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-0 place-items-center">
        <button onClick={()=>setFiltroEstado("ocupada")}><InfoCard label="Cocheras Ocupadas" value={cantOcupadas} /></button>
        <button onClick={()=>setFiltroEstado("disponible")}><InfoCard label="Cocheras Disponibles" value={cantDesocupadas} /></button>
      </div>

      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Cocheras</h1>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition">
            <Default_Link route="/admin/alta-cochera" text="Crear Cochera" />
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <p className="p-4">Cargando cocheras...</p>
          ) : error ? (
            <p className="p-4 text-red-500">Error: {error}</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4">Número</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Tipo de Vehículo</th>
                  <th className="py-3 px-4">Ubicación</th>
                  <th className="py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cocherasFiltradas.map((cochera,index) => (
                  <CocheraRows
                    key={index}
                    listState= {filtroEstado}
                    number={cochera.number}
                    state={cochera.state} 
                    tipoVehiculo={cochera.tipoVehiculo.description}
                    ubicacion={cochera.sucursal.direction}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};