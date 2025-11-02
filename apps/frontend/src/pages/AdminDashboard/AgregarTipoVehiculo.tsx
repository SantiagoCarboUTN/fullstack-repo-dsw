import { useCreateTipoVehiculo } from "../../hooks/TipoVehiculo/UseCreateTipoVehiculo";
import { useTipoVehiculos } from "../../hooks/TipoVehiculo/UseTipoVehiculos";
import { useUpdateTipoVehiculo } from "../../hooks/TipoVehiculo/UseUpdateTipoVehiculo.tsx";
import { DeleteModal } from "../../components/modals/DeleteModal.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";
import { SubmitButton } from "../../components/ui/SubmitButton";
import { useDeleteTipoVehiculo } from "../../hooks/TipoVehiculo/UseDeleteTipoVehiculo.tsx";

export const AgregarTipoVehiculo = () => {
  /* Hook create */
  const {
    description,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
  } = useCreateTipoVehiculo();
  /* Hook tipos */
  const { tipos, loading: loadingTipos, error: errorTipos } = useTipoVehiculos();
  /* Hook delete */
  const { handleConfirmDelete,handleDeleteClick,isDeleteModalOpen,setDeleteModalOpen} = useDeleteTipoVehiculo()
    /* Hook update */
  const { handleEdit,handleSubmitEdit,isModalOpen,setModalOpen, loading: loadingEdit, error: 
    errorEdit, success: successEdit,setEditDescription,editDescription
   } =useUpdateTipoVehiculo();


  return (
    <div className="flex flex-col items-center w-full px-4 py-10">
      {/* Formulario de cracion */}
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-md w-full max-w-3xl mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-700 text-center">
          Registrar Tipo de Vehículo
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
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

          <div className="text-center">
            <SubmitButton text="Guardar Tipo de Vehículo" loadingText="Guardando..." loading={loading} />
          </div>

          <MessageBox
            message={error || (success ? "Tipo vehículo creado con éxito " : "")}
            type={error ? "error" : "success"}
          />
        </form>
      </div>

      {/* Listado */}
      <div className="grid-container w-full border border-gray-300 sm:gap-4 text-sm max-w-4xl">
        {/* Cabecera para mayor a sm */}
        <div className="hidden sm:grid grid-cols-4 bg-gray-800 text-white font-bold">
          <div className="px-4 py-2 text-left">ID</div>
          <div className="px-4 py-2 text-left">Descripción</div>
          <div className="px-4 py-2 text-center">Acciones</div>
        </div>

        {/* Cabecera para pantalla menor a sm */}
        <div className="grid grid-cols-2 bg-gray-800 text-white font-bold sm:hidden">
          <div className="px-4 py-2 text-left">Descripción</div>
          <div className="px-4 py-2 text-left">Acciones</div>
        </div>
        
        <div className="bg-white shadow-md overflow-hidden">
            {loadingTipos ? (
              <p className="p-4">Cargando tipos...</p>
            ) : errorTipos ? (
              <p className="p-4 text-red-500">Error: {errorTipos}</p>
            ) : (
              tipos.map((t) => (
                <div key={t.id} className="grid grid-cols-2 sm:grid-cols-4 border-t border-gray-200 text-gray-800">
                  <div className="hidden sm:block px-4 py-3">{t.id}</div>
                  <div className="px-4 py-3 font-medium">{t.description}</div>

                  {/* Editar */}
                  <div className="py-3 px-4 grid grid-cols-1 gap-2 justify-center leading-none sm:grid-cols-2">
                     <span
                    className="px-4 py-3 text-blue-700 font-medium cursor-pointer hover:underline"
                    onClick={() => handleEdit(t.id, t.description)}
                    >
                      Editar
                    </span>
                         {/* Eliminar */}
                    <span
                    className="px-4 py-3 text-red-600 font-medium cursor-pointer hover:underline"
                    onClick={() => handleDeleteClick(t.id)}
                  >
                    Eliminar
                  </span>
                  </div>
                 

           
                </div>
              ))
            )}
          </div>
      </div>

      {/* modal de eliminar */}
      {isDeleteModalOpen && (
        <DeleteModal handleConfirmDelete={handleConfirmDelete} setDeleteModalOpen={setDeleteModalOpen}
        confirmationText="¿Estas seguro de que deseas eliminar el tipo?"/>
      )}


      {/* Modal de edición */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Fondo blureado */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>

          {/* Contenido del modal */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-700 text-center">Editar Tipo</h3>

            <form onSubmit={handleSubmitEdit} className="flex flex-col gap-3">
              <input
                type="text"
                className="border border-gray-300 p-3 rounded w-full"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                required
              />

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-600"
                >
                  Cancelar
                </button>

                <SubmitButton
                  text="Guardar Cambios"
                  loadingText="Guardando..."
                  loading={loadingEdit}
                />
              </div>

              <div className="mt-2">
                <MessageBox
                  message={errorEdit || (successEdit ? "Modificado" : "")}
                  type={errorEdit ? "error" : "success"}
                />
              </div>
            </form>
          </div>
        </div>
      )}  
    </div>
  );
}