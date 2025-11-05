import { useNavigate } from "react-router-dom";
import { DeleteModal } from "../../components/modals/DeleteModal.tsx";
import { Default_Link } from "../../components/ui/default_link.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";
import { useDeleteTipoServicio } from "../../hooks/TipoServicio/useDeleteTipoServicio.tsx";
import { useAllTiposServicio} from "../../hooks/TipoServicio/useTiposServicio.tsx";


export const MisServicios= ()=>{
  const {tipos,loading,error}= useAllTiposServicio()
  const navigate =useNavigate()
  const {isDeleteModalOpen,setDeleteModalOpen,handleConfirmDelete,
      handleDeleteClick,successMessage,error:errorDelete} = useDeleteTipoServicio()
  return (
    <div className="min-h-screen grid grid-cols-1 items-center justify-center bg-gray-100 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold">Servicios</h2>
            <p className="text-gray-500 text-sm">
              Planes de reserva disponibles para los clientes
            </p>
          </div>

          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition w-full lg:w-auto text-center"
          onClick={() => navigate("/admin/alta-servicio")}>
            +Agregar Servicio
          </button>
        </div>
       {loading ? (
          <p className="p-4 text-center">Cargando servicios...</p>
        ) : error ? (
          <p className="p-4 text-red-500 text-center">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-2 mx-auto lg:grid-cols-3 gap-4 w-full max-w-5xl">
            {tipos.map((tipo) => (
              <div key={tipo.id} className="rounded-xl p-6 pb-10 bg-white">
                <div className="bg-white rounded-lg p-4 text-center font-semibold mb-4">
                  <h2 className="text-2xl font-bold mb-2">{tipo.nombre}</h2>
                  <p className="text-3xl font-bold mt-2 text-blue-900">${tipo.precioCuota * tipo.cantCuotas}</p>
                  <p className="text-xs font-bold mt-2 text-blue-900">Precio Plan</p>
                </div>

                <ul className="space-y-2 text-sm mb-6 text-center">
                <li>Cantidad de pagos mensuales: {tipo.cantCuotas}</li>
                <li>Precio del pago mensual: {tipo.precioCuota}</li>
                </ul>

                <button className="bg-white text-gray-900 w-full py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                  <Default_Link text="Editar" route={`../editar-servicio/${tipo.id}` }/>
                </button>
                <button className="bg-white text-red-900 w-full py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
                onClick={()=>handleDeleteClick(tipo.id)}>
                  Eliminar
                </button>
                {isDeleteModalOpen && (
                    <DeleteModal handleConfirmDelete={handleConfirmDelete} setDeleteModalOpen={setDeleteModalOpen}
                    confirmationText={`¿Estas seguro de que deseas eliminar al servicio ${tipo.nombre}?`}
                    />
                )}
              </div>
            ))}
          </div>
      
      )}
      {errorDelete &&  <MessageBox message={errorDelete} type="error" />}
      {successMessage && <MessageBox message={successMessage} type="success" />}
    </div>
  );
}