
import { useState } from "react";
import { Default_Link } from "../../components/ui/default_link.tsx";
import { useClients } from "../../hooks/Client/useAllClients.tsx";
import { useDeleteCliente } from "../../hooks/Client/useDeleteClient.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";
import { DeleteModal } from "../../components/modals/DeleteModal.tsx";

export const ClientList = ()=>{
  const {clientes, error , loading} = useClients()
  const {isDeleteModalOpen,setDeleteModalOpen,handleConfirmDelete,
    handleDeleteClick,successMessage,error:errorDelete} = useDeleteCliente()
  const [search, setSearch] = useState("")
  
  /* Filtro para el buscador */
  const filteredClients = clientes.filter(c => {
    const term = search.toLowerCase()
    return (
      c.complete_name.toLowerCase().includes(term)
    )
  })

  return (
    <div className="p-6 grid grid-cols-1 gap-4 w-full">
      <h1 className="text-2xl font-semibold">Clientes</h1>

      <div className="flex gap-4 border-b pb-2">
        <button className="text-blue-600 font-medium">MIS CLIENTES</button> {/* todavia no tiene funcionalidad, hay que cambiar primero la entidad cliente */}
        <button className="text-gray-500 hover:text-blue-600">TODOS</button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar clientes"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded-lg p-2 w-full max-w-sm focus:outline-blue-500"
        />
        <button className="hidden sm:block bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition">
            <Default_Link route="/admin/alta-cliente" text="Agregar Cliente" />
        </button>

      </div>
      {loading ? (
            <p className="p-4">Cargando clientes...</p>
          ) : error ? (
            <p className="p-4 text-red-500">Error: {error}</p>
          ) : (
              <div className="grid-container w-full border border-gray-300 sm:gap-4 text-sm">
                        {/* Columnas solo para sm y mayores */}
                  <div className="hidden lg:grid grid-cols-6 bg-gray-800 text-white font-bold">
                    <div className="px-4 py-2 text-left">Id</div>
                    <div className="px-4 py-2 text-left">Nombre & Email</div>
                    <div className="px-4 py-2 text-left">DNI</div>
                    <div className="px-4 py-2 text-left">Telefono</div>
                    <div className="px-4 py-2 text-center lg:col-span-2 ">Acciones</div>

                  </div>

                  <div className="grid grid-cols-4 bg-gray-800 text-white text-xs font-bold lg:hidden">
                    <div className="px-4 py-2 text-left">Nombre</div>
                    <div className="px-4 py-2 text-center col-span-2">Datos</div>
                    <div className="px-4 py-2 text-left">Acciones</div>
                    
                  </div>
        
                <div className="bg-white shadow-md overflow-hidden">
                  {filteredClients.map(c => (
                  <div key={c.id} className="grid grid-cols-4 lg:grid-cols-6 border-t border-gray-200 text-gray-800">
                    <div className="hidden lg:block px-4 py-3">
                      <p className="">{c.id}</p>
                    </div>

                    <div className="px-4 py-3 ">
                      <p className="font-medium text-xs lg:text-gray-600 lg:text-sm">{c.complete_name}</p>
                      <p className="hidden lg:block text-gray-600 text-xs text-sm">{c.mail}</p>
                    </div>
                    {/* Filas para < sm */}
                    <div className="px-4 py-3 col-span-2 leading-none lg:hidden ">
                      <span className="font-semibold text-xs">Mail </span>
                      <p className="text-gray-600 text-xs">{c.mail}</p>
                      <span className="font-semibold text-xs">Telefono</span>
                      <p className="text-gray-600 text-xs cursor-pointer">{c.phone}</p>
                    </div>

                    {/* Filas para >= sm */}
                    <div className="hidden lg:block px-4 py-3 ">
                      <p className="text-gray-600 cursor-pointer">{c.dni}</p>
                    </div>

                    <div className="hidden lg:block px-4 py-3 font-medium ">
                      <p className="text-gray-600 cursor-pointer">{c.phone}</p>
                    </div>
                    {/* Acciones(eliminar/editar) */}
                    <div className="py-3 px-4 grid grid-cols-1 justify-center leading-none lg:grid-cols-2 lg:col-span-2">
                      <span className="text-blue-700 text-left lg:text-center text-xs font-medium cursor-pointer hover:underline lg:text-sm leading-loose">
                        <Default_Link text="Editar" route={`../editar-cliente/${c.id}` }/>
                      </span>
              
                      <span className="text-red-700 text-left lg:text-center text-xs font-medium cursor-pointer hover:underline lg:text-sm leading-loose"
                        onClick={()=>handleDeleteClick(c.id)}>
                        Eliminar
                      </span>
                    </div>

                    {/* Uso el modal de eliminacion: */}
                    {isDeleteModalOpen && (
                      <DeleteModal handleConfirmDelete={handleConfirmDelete} setDeleteModalOpen={setDeleteModalOpen}
                      confirmationText="¿Estas seguro de que deseas eliminar al cliente?"
                      />
                  )}
                   
                </div>
              ))}
                </div>
                
            </div>
          )}
      {errorDelete &&  <MessageBox message={errorDelete} type="error" />}
      {successMessage && <MessageBox message={successMessage} type="success" />}
    </div>
)

}

