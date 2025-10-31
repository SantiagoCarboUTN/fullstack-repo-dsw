import type { TipoVehiculo } from "../../types/TipoVehiculoType.tsx";
import { useTipoVehiculo } from "../../hooks/TipoVehiculo/UseTipoVehiculos.tsx";
import { useCreateCochera } from "../../hooks/Cochera/UseCreateCochera.tsx";
import { SubmitButton } from "../../components/ui/SubmitButton.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";

export const AltaCochera = ()=>{
  const { tipos, loading:loadingTipos, error:errorTipos } = useTipoVehiculo();
  const { handleSubmit,handleNumberChange,handleTipoVehiculoChange, 
    loading: loadingCreate, 
    error: errorCreate,
    numero,
    tipoVehiculoId,
    successMessage
    
  } = useCreateCochera();


  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100   ">
    <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl h-auto">
      <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">  
        Ingresar Cochera </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Tipo de Vehículo
          </label>

          {loadingTipos ? (
            <p className="p-4">Cargando cocheras...</p>
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
            {tipos.map((t: TipoVehiculo) => (
                  <option key={t.id} value={t.id}>
                    {t.description}
                  </option>
                ))}
          </select>
        )}

        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            Número
          </label>
          <input
            type="number"
            placeholder=""
            required
            className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            value={numero}
            onChange={handleNumberChange}
            onWheel={(e) => e.currentTarget.blur()} 
            onKeyDown={(e) => {
              if (["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
            }}
          />
        </div>
        <div className="text-center">
            <SubmitButton
               text="Crear cochera"
               loadingText="Guardando..."
                loading={loadingCreate}
                      />
        </div>
         {errorCreate && (
            <MessageBox message={errorCreate} type="error" />
          )}
         <div className="text-center">
            <MessageBox message={successMessage} type="success" />
         </div>
      </form>
    </div>
  </div>
  </>
  )
}