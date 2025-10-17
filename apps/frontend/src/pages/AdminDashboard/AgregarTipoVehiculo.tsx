import { useTipoVehiculo } from "../../hooks/TipoVehiculo/UseTipoVehiculo";

export const AgregarTipoVehiculo = () => {
  const { description, loading, error, handleChange, handleSubmit } = useTipoVehiculo();

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2 text-lg">
          Descripción
        </label>
        <input
          type="text"
          placeholder="Ej: Auto, Moto, SUV..."
          required
          className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-800 transition-colors w-full sm:w-auto"
        >
          {loading ? "Guardando..." : "Guardar Tipo de Vehículo"}
        </button>
      </div>

      {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
    </form>
  );
};