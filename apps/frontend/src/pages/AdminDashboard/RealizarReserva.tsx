import { Default_Link } from "../../components/ui/default_link.tsx";
import { useCreateReserva } from "../../hooks/Reserva/useCreateReserva.tsx";
import { SubmitButton } from "../../components/ui/SubmitButton.tsx";
import { useParams } from "react-router-dom";
import { useTipoServicio } from "../../hooks/TipoServicio/useTipoServicio.tsx";
import type { TipoServicio } from "../../types/TipoServicioType.tsx";

export const RealizarReserva = () => {
  const {number} = useParams<{number?:string}>()
  const hoy = new Date().toISOString().split("T")[0];
  const { handleSubmit,
    handleCocheraChange, cocheraId,
    handleDniChange, clienteDni,
    handleFechaChange, fechaInicio,
    handleTipoServicioChange, tipoServicio,
    handleVehiculoChange, vehiculo,
    loading, error, reserva } = useCreateReserva(number);
  
  const { tipos, loading: loadingTipos, error: errorTipos } = useTipoServicio();
  




  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-700 text-center">
          Realizar Reserva  
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* vehiculo */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Vehículo
            </label>
            <input
              type="text"
              name="patente"
              placeholder="Ej: ABC123"
              required
              value={vehiculo}
              onChange={handleVehiculoChange}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* Número de cochera */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Número de Cochera
            </label>
            <input
              className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
              type="number"
              onWheel={(e) => e.currentTarget.blur()} 
              onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
            }}
              value={cocheraId}
              onChange={handleCocheraChange}
            ></input>
            
          </div>

          {/* Cliente dni */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              DNI del cliente
            </label>
            <input 
            type="number"
            onWheel={(e) => e.currentTarget.blur()} 
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
            }}
              placeholder="Ej: 12345678"
              required
              value={clienteDni}
              onChange={handleDniChange}
            className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />

            <p className="mt-2 text-blue-700 hover:underline cursor-pointer text-base">
              <Default_Link route="/admin/alta-cliente" text="Registrar nuevo cliente" />
            </p>
          </div>

          {/* Tipo de servicio */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Tipo de Servicio
            </label>
            {loadingTipos ? (
              <p className="p-4">Cargando tipos de servicio...</p>
            ) : errorTipos ? (
              <p className="p-4 text-red-500">Error: {errorTipos}</p>
            ) : (
            <select
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              required
              value={tipoServicio}
              onChange={handleTipoServicioChange}
            >
              <option value="">Seleccione un tipo de servicio</option>
              {tipos.map((t: TipoServicio) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
            )}
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
              value={fechaInicio}
              onChange={handleFechaChange}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* Botón */}
          <div className="text-center">
            <SubmitButton
              text="Crear Reserva"
              loadingText="Guardando..."
              loading={loading}
                        />
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {reserva && <p className="text-green-500 text-center mt-4">Reserva creada con éxito</p>}
        </form>
      </div> 
    </div>
  );
};
