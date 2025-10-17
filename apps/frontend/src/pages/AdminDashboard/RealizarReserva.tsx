export const RealizarReserva = () => {
  const hoy = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-700 text-center">
          Ingresar Vehículo
        </h2>

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
            <select
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
              <option value="suv">SUV</option>
              <option value="camioneta">Camioneta</option>
            </select>

            <p className="mt-2 text-blue-700 hover:underline cursor-pointer text-base">
              Registrar nuevo tipo de vehículo
            </p>
          </div>

          {/* Número de cochera */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Número de Cochera
            </label>
            <select
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            >
              <option value="">Seleccione una cochera</option>
              <option value="1">Cochera 1</option>
              <option value="2">Cochera 2</option>
              <option value="3">Cochera 3</option>
              <option value="4">Cochera 4</option>
            </select>
          </div>

          {/* Cliente */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Cliente
            </label>
            <select
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            >
              <option value="">Seleccione un cliente</option>
              <option value="1">Juan Pérez</option>
              <option value="2">María López</option>
              <option value="3">Carlos Gómez</option>
            </select>

            <p className="mt-2 text-blue-700 hover:underline cursor-pointer text-base">
              Registrar nuevo cliente
            </p>
          </div>

          {/* Tipo de servicio */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Tipo de Servicio
            </label>
            <select
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
            >
              <option value="">Seleccione un servicio</option>
              <option value="lavado">Lavado</option>
              <option value="pulido">Pulido</option>
              <option value="encerado">Encerado</option>
              <option value="estacionamiento">Estacionamiento</option>
            </select>

          </div>

          {/* Fecha de inicio */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Fecha de Inicio
            </label>
            <input
              type="date"
              defaultValue={hoy}
              required
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* Botón */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-700 text-white px-8 py-3 rounded-md text-lg hover:bg-blue-800 transition-colors w-full sm:w-auto"
            >
              Guardar Vehículo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
