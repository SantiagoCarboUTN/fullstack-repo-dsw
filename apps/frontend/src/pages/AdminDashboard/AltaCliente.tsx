
import { SubmitButton } from "../../components/ui/SubmitButton.tsx";
import { useCreateCliente } from "../../hooks/Client/UseCreateCliente.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";
export const AltaCliente = () => {


  const { loading, error, successMessage, handleSubmit,
    handleDniChange,dni,
    handleMailChange,mail,
    handleNameChange,complete_name,
    handlePasswordChange,password,
    handlePhoneChange,phone,
  } = useCreateCliente();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100   ">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl h-auto">
        <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">  
          Ingresar Cliente </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre completo*/}
          <div> 
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Nombre Completo
            </label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              required
              value={complete_name}
              onChange={handleNameChange}
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
              value={mail}
              onChange={handleMailChange}
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
                if (["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
              }}
              placeholder="Ej: +54 9 11 1234-5678"
              required
              value={phone}
              onChange={handlePhoneChange}
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
              if (["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
               }}
              placeholder="Ej: 12345678"
              required
              value={dni}
              onChange={handleDniChange}
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
              value={password}
              onChange={handlePasswordChange}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          {/* Botón */}
          <div className="text-center">
            <SubmitButton
                text="Guardar cliente"
                loadingText="Guardando..."
                loading={loading}
                  />
          </div>
          {error &&  <MessageBox message={error} type="error" />}
          {successMessage && <MessageBox message={successMessage} type="success" />}
        </form>
      </div>
    </div>
  );
};