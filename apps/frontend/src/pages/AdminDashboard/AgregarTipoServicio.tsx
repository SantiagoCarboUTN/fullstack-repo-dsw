import { SubmitButton } from "../../components/ui/SubmitButton.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";
import { useCreateTipoServicio } from "../../hooks/TipoServicio/useCreateTipoServicio.tsx";

export const AltaTipoServicio = ()=>{

  const { handleSubmit,handleNombreChange,handleCantCuotasChange,handlePrecioCuotaChange, 
    loading: loadingCreate, 
    error: errorCreate,
    successMessage,
    nombre,
    cantCuotas,
    precioCuota
    
  } = useCreateTipoServicio();


  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gray-100   ">
    <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-3xl h-auto">
      <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">  
        Ingresar Cochera </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>

        <div>
          
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Ej:Mensual, Trimestral, etc"
              required
              value={nombre}
              onChange={handleNombreChange}
              className="border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
         
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Cantidad de pagos mensuales
            </label>
            <input
              type="number"
              placeholder=""
              required
              min={1}
              max={12}
              className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              value={cantCuotas}
              onChange={handleCantCuotasChange}
              onWheel={(e) => e.currentTarget.blur()} 
              onKeyDown={(e) => {
                if (["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
              }}
            />
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Precio del pago mensual
            </label>
            <input
              type="number"
              placeholder=""
              required
              min={1}
              max={999999}
              className="no-spinner border border-gray-300 p-4 rounded w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-700"
              value={precioCuota}
              onChange={handlePrecioCuotaChange}
              onWheel={(e) => e.currentTarget.blur()} 
              onKeyDown={(e) => {
                if (["e", "E", "+", "-","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
              }}
            />
        
        </div>
        {/* Boton de creación */}
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