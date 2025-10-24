import { CocheraRows } from "../../components/ui/AdminDashboardUi/CocheraRow.tsx";
import { InfoCard } from "../../components/ui/AdminDashboardUi/InfoCard"
import { Default_Link } from "../../components/ui/default_link.tsx";
import { useCocheras } from "../../hooks/Cochera/UseCocheras.tsx";


export const CocherasList = () => {
 
  const {cocheras, loading, error,cantDesocupadas,cantOcupadas} = useCocheras()
  return (
    <>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-0 place-items-center">
        <InfoCard label="Cocheras Ocupadas:" value={cantOcupadas} />
        <InfoCard label="Cocheras Disponibles:" value={cantDesocupadas} />
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
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="py-3 px-4">Número</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Tipo de Vehículo</th>
                  <th className="py-3 px-4">Ubicación</th>
                  <th className="py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cocheras.map((cochera,index) => (
                  <CocheraRows
                    key={index}
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