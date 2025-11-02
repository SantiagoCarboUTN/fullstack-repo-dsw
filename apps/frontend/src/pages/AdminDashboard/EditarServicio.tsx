import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SubmitButton } from "../../components/ui/SubmitButton.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";

import { useUpdateTipoServicio } from "../../hooks/TipoServicio/useUpdateTipoServicio.tsx";
import { useTipoServicio } from "../../hooks/TipoServicio/useTipoServicio.tsx";

export const EditService = () => {
  const { id } = useParams();
  const { handleChange, handleSubmit, error, saving, form, setForm, successMessage } = useUpdateTipoServicio(id);
  const { loading, error: errorLoading, tipo } = useTipoServicio(id || "0");
/* Inicializamos el form con los dtos del servicio que traemos con el hook useTipo */
  useEffect(() => {
    if (tipo) {
      setForm({
       cantCuotas:tipo.cantCuotas,
       precioCuota:tipo.precioCuota,
       nombre:tipo.nombre
      });
    }
  }, [tipo, setForm]);

  return (
    <div className="min-h-screen flex items-center justify-center px-2 sm:px-4 overflow-x-hidden">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-4 sm:p-6">
        <h1 className="text-3xl text-blue-700 font-semibold mb-6 text-center sm:text-4x1">
          Editar Servicio
        </h1>

        {loading ? (
          <p className="p-4 text-center">Cargando Servicio...</p>
        ) : errorLoading ? (
          <p className="p-4 text-red-500 text-center">Error: {error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid gap-4">
    
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-blue-700 text-sm sm:text-lg ">
                Nombre del servicio
              </label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-blue-700 text-sm sm:text-lg ">
                Cantidad de pagos mensuales
              </label>
              <input
                name="cantCuotas"
                type="number"
                value={form.cantCuotas}
                min={1}
                max={12}
                onWheel={(e) => e.currentTarget.blur()} 
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
                }}
                onChange={handleChange}
                className="no-spinner w-full border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

      

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-blue-700 text-sm sm:text-lg ">
                Precio pago mensual
              </label>
              <input
                name="precioCuota"
                value={form.precioCuota}
                type="number"
                min={1}
                max={999999}
                onWheel={(e) => e.currentTarget.blur()} 
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
                }}
                onChange={handleChange}
                className="no-spinner w-full border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* boton de envio*/}
            <div className="flex flex-col sm:flex-row sm:justify-center sm:gap-4 mt-4">
              <SubmitButton
                text="Actualizar servicio"
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