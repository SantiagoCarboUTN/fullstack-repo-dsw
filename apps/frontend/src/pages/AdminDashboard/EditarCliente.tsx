import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdateClient } from "../../hooks/Client/useUpdateClient.tsx";
import { useClient } from "../../hooks/Client/useClient.tsx";
import { SubmitButton } from "../../components/ui/SubmitButton.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";


export const EditClient = () => {
  const { id } = useParams();
  const { handleChange, handleSubmit, error, saving, form, setForm, successMessage } = useUpdateClient(id);
  const { loading, error: errorLoading, client } = useClient(id || "0");

  // Inicializamos el form con los dtos del cliente que traemos con el hook useClient
  useEffect(() => {
    if (client) {
      setForm({
        complete_name: client.complete_name,
        mail: client.mail,
        dni: client.dni,
        phone: client.phone
      });
    }
  }, [client, setForm]);

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 overflow-x-hidden">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-4 sm:p-6">
        <h1 className="text-3xl text-blue-700 font-semibold mb-6 text-center sm:text-4x1">
          Editar Cliente
        </h1>

        {loading ? (
          <p className="p-4 text-center">Cargando cliente...</p>
        ) : errorLoading ? (
          <p className="p-4 text-red-500 text-center">Error: {error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
    
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-blue-700 text-sm sm:text-lg ">
                Nombre Completo
              </label>
              <input
                name="complete_name"
                value={form.complete_name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-blue-700 text-sm sm:text-lg ">Email</label>
              <input
                name="mail"
                value={form.mail}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

      
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-blue-700 text-sm sm:text-lg ">DNI</label>
              <input
                name="dni"
                value={form.dni}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-blue-700 text-sm sm:text-lg ">Teléfono</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* boton de envio*/}
            <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 mt-4">
              <SubmitButton
                text="Actualizar cliente"
                loadingText="Guardando..."
                loading={saving}
                className="w-full sm:w-auto"
              />
            </div>

         
            {error && <MessageBox message={error} type="error" />}
            {successMessage && <MessageBox message={successMessage} type="success" />}
          </form>
        )}
      </div>
    </div>
  );
};