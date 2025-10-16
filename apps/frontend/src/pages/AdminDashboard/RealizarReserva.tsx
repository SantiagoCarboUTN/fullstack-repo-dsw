export const RealizarReserva = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100   ">
    <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl h-auto">
      <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">  
        Ingresar Vehículo </h2>
      

      <form className="space-y-6">
        {/* Patente */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Patente
          </label>
          <input
            type="text"
            placeholder="Ej: ABC123"
            required
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
            placeholder="Ej: Corolla"
            required
            className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        {/* Tipo de vehículo */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Tipo de Vehículo
          </label>
          <select className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700" required>
            <option value="">Seleccione un tipo</option>
            <option value="auto">Auto</option>
            <option value="moto">Moto</option>
            <option value="camion">SUV</option>
          </select>
        </div>

        {/* Nombre del cliente */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Nombre del Cliente
          </label>
          <input
            type="text"
            placeholder="Ej: Juan Pérez"
            required
            className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

        {/* Botón */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-700 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-800 transition-colors"
          >
            Guardar Vehículo
          </button>
        </div>
      </form>
    </div>
  </div>
)
