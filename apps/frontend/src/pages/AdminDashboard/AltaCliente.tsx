
export const AltaCliente = () => (
  <div className="flex justify-center items-center h-screen bg-gray-100   ">
    <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl h-auto">
      <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">  
        Ingresar Cliente </h2>

      <form className="space-y-6">
        {/* Nombre completo*/}
        <div> 
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Nombre Completo
          </label>
          <input
            type="text"
            placeholder="Ej: Juan Pérez"
            required
            className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Email
          </label>
          <input
            type="text"
            placeholder="Ej:jperez@example.com"
            required
            className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
        {/* Teléfono */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Teléfono
          </label>
          <input 
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
            placeholder="Ej: +54 9 11 1234-5678"
            required
            className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
        {/* DNI */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            DNI
          </label>
          <input
            type="number"
            onWheel={(e) => e.currentTarget.blur()} 
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
            placeholder="Ej: 12345678"
            required
            className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>
        {/* Contraseña */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Ingrese una contraseña..."
            required
            className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
          />
        </div>

         {/* Botón */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-700 text-white px-8 py-3 rounded-md text-lg hover:bg-green-800 transition-colors"
          >
            Rgistrar cliente
          </button>
        </div>
      </form>
    </div>
  </div>
)