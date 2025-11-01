import { UseTipoVehiculos } from "../../hooks/TipoVehiculo/UseTipoVehiculos.tsx";
import { useCreateVehiculo } from "../../hooks/Vehiculo/useCreateVehicol.tsx";
import type { TipoVehiculo } from "../../types/TipoVehiculoType.tsx";

export const Altavehiculo = () => {

  const { tipos, loading:loadingTipos, error:errorTipos } = UseTipoVehiculos();
  const { handleSubmit,
    handleClientChange, clientId,
    handleModeloChange, modelo,
    handlePatenteChange, patente,
    handleTipoVehiculoChange,tipoVehiculoId
  , loading, error, vehiculo } = useCreateVehiculo();


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl h-auto">
        <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">
          Ingresar Vehículo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patente */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Patente
            </label>
            <input
              type="text"
              placeholder="Ej: ABC123"
              required
              value={patente}
              onChange={handlePatenteChange}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          {/* Modelo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">  
              Modelo
            </label>
            <input
              type="text"
              placeholder="Ej: Toyota Corolla"
              required  
              value={modelo}
              onChange={handleModeloChange}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          {/* Client ID */} 
          <div>
            <label className=" block text-gray-700 font-semibold mb-2 text-lg">
              ID del Cliente
            </label>
            <input
              type="number" 
              placeholder="Ingrese su ID"
              required
              onWheel={(e) => e.currentTarget.blur()} 
              onKeyDown={(e) => {
              if (["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
            }}
              value={clientId}
              onChange={handleClientChange}
              className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
          {/* Tipo Vehículo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Tipo de Vehículo
            </label>
            {loadingTipos ? (
              <p className="p-4">Cargando tipos de vehículos...</p>
            ) : errorTipos ? (
              <p className="p-4 text-red-500">Error: {errorTipos}</p>
            ) : (
              <select 
                className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
                required
                value={tipoVehiculoId}
                onChange={handleTipoVehiculoChange}
              >
                <option value="">Seleccione un tipo</option>
                {tipos.map((t:TipoVehiculo) => (
                  <option key={t.id} value={t.id}>
                    {t.description}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-700 text-white font-semibold py-4 px-8 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700"
              disabled={loading}  
            >
              {loading ? "Guardando..." : "Guardar vehículo"}
            </button>
          </div>
          {error && <p className="text-red-600 text-center">{error}</p>}
          {vehiculo && (
            <p className="text-green-600 text-center">
              Vehículo creado con éxito: {vehiculo.patente} - {vehiculo.modelo}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}