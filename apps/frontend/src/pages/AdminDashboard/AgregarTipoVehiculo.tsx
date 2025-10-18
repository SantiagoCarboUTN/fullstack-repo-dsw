import { UseCreateTipoVehiculo } from "../../hooks/TipoVehiculo/UseCreateTipoVehiculo";
import { MessageBox } from "../../components/ui/MessageBox";
import { SubmitButton } from "../../components/ui/SubmitButton";

export const AgregarTipoVehiculo = () => {
  const {
    description,
    loading,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  } = UseCreateTipoVehiculo();

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-700 text-center">
          Registrar Tipo de Vehículo
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Descripción */}
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

          {/* Botón */}
          <div className="text-center">
            <SubmitButton
              text="Guardar Tipo de Vehículo"
              loadingText="Guardando..."
              loading={loading}
            />
          </div>

          {/* Mensajes */}
          <div className="text-center">
            <MessageBox message={error} type="error" />
            <MessageBox message={successMessage} type="success" />
          </div>
        </form>
      </div>
    </div>
  );
};
