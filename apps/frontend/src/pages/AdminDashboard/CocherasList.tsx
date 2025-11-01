import { useState } from "react";
import { InfoCard } from "../../components/ui/AdminDashboardUi/InfoCard";
import { Default_Link } from "../../components/ui/default_link.tsx";
import { useCocheras } from "../../hooks/Cochera/UseCocheras.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";
import { SubmitButton } from "../../components/ui/SubmitButton";

import type { TipoVehiculo } from "../../types/TipoVehiculoType.tsx";
import { UseTipoVehiculos } from "../../hooks/TipoVehiculo/UseTipoVehiculos.tsx";
import { useDeleteCochera } from "../../hooks/Cochera/UseEliminateCochera.tsx";
import { useUpdateCochera } from "../../hooks/Cochera/UseModifyCochera.tsx";



export const CocherasList = () => {
  const { isDeleteModalOpen,handleConfirmDelete,handleDeleteClick,setDeleteModalOpen} = useDeleteCochera();
  const [filtroEstado, setFiltroEstado] = useState<"disponible" | "ocupada">("disponible");
  const { cocheras, loading, error, cantDesocupadas, cantOcupadas } = useCocheras();
  const cocherasFiltradas = cocheras.filter((cochera) => cochera.state === filtroEstado);
  const { tipos, loading: loadingTipos, error: errorTipos } = UseTipoVehiculos();
  
  const {loading: loadingEdit, 
    error: errorEdit, 
    success: successEdit,
    handleSubmitEdit,
    handleTipoVehiculoChange,
    setEditNumber,editNumber,
    setModalOpen,isModalOpen,
    setSelectedNumber,
    setTipoVehiculoId,tipoVehiculoId
} = useUpdateCochera();

  const handleEdit = (number: number) => {
    const cochera = cocheras.find((c) => c.number === number);
    if (!cochera) return;

    setSelectedNumber(number.toString());
    setEditNumber(String(cochera.number));
    setTipoVehiculoId(cochera.tipoVehiculo?.id || "");
    setModalOpen(true);
  };

  return (
    <>
      <div className="p-8 grid grid-cols-1 gap-1 place-items-center sm:grid-cols-2 ">
        <button onClick={() => setFiltroEstado("ocupada")}>
          <InfoCard label="Cocheras Ocupadas" value={cantOcupadas} />
        </button>
        <button onClick={() => setFiltroEstado("disponible")}>
          <InfoCard label="Cocheras Disponibles" value={cantDesocupadas} />
        </button>
      </div>

      <div className="p-2 bg-gray-100 min-h-screen sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Cocheras</h1>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition">
            <Default_Link route="/admin/alta-cochera" text="Crear Cochera" />
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <p className="p-4">Cargando cocheras...</p>
          ) : error ? (
            <p className="p-4 text-red-500">Error: {error}</p>
          ) : (
          <div className="grid-container w-full border border-gray-300 sm:gap-4 text-sm">
                        {/* Columnas solo para md */}
                  <div className="hidden md:grid grid-cols-7 bg-gray-800 text-white font-bold">
                    <div className="px-4 py-2 text-left">Número</div>
                    <div className="px-4 py-2 text-left">Estado</div>
                    <div className="px-4 py-2 text-left">Tipo de vehiculo</div>
                    <div className="px-4 py-2 text-left">Ubicación</div>
                    <div className="px-4 py-2 text-center col-span-2">Acciones</div>

                  </div>
                     <div className="grid grid-cols-4 bg-gray-800 text-white text-xs font-bold sm:hidden">
                    <div className="px-4 py-2 text-left">Numero</div>
                    <div className="px-4 py-2 text-center col-span-2">Datos</div>
                    <div className="px-4 py-2 text-center">Acciones</div>
                    
                  </div>
                   {cocherasFiltradas.map((cochera) => (
                 <div key={cochera.number} className="grid grid-cols-4 sm:grid-cols-7 border-t border-gray-200 text-gray-800">
                    <div className=" px-4 py-3">
                      <p className="">{cochera.number}</p>
                    </div>

                    <div className="hidden sm:block px-4 py-3 ">
                      <p className="font-medium text-xs sm:text-gray-600">{cochera.state}</p>
                    </div>
                    <div className="px-4 py-3 col-span-2 leading-none sm:hidden ">
                      <span className="font-semibold text-xs">Tipo </span>
                      <p className="text-gray-600 text-xs cursor-pointer">{cochera.tipoVehiculo.description}</p>
                      <span className="font-semibold text-xs">Estado </span>
                      <p className="font-medium text-xs sm:text-gray-600">{cochera.state}</p>

                    </div>
                    <div className="hidden sm:block px-4 py-3 ">
                      <p className="text-gray-600 text-xs cursor-pointer">{cochera.tipoVehiculo.description}</p>
                    </div>
                    <div className="hidden sm:block px-4 py-3 ">
                      <p className="text-gray-600 text-xs cursor-pointer">{cochera.sucursal.direction}</p>
                    </div>

                    
                    <div className="py-3 px-4 grid grid-cols-1 gap-2 justify-center leading-none sm:grid-cols-3 sm:col-span-2">
                    
                    
                      {filtroEstado === "disponible" ?(
                        <div className="grid grid-cols-1 sm:grid-cols-3 sm:col-span-3">
                          <button
                            className="text-blue-700 font-medium hover:underline"
                            onClick={() => handleEdit(cochera.number)}
                          >
                          Editar
                          </button>
                          <button
                          className="text-blue-700 font-medium hover:underline"
                          >
                          <Default_Link route={`/admin/realizar-reserva/${cochera.number}`} text="Reservar" />
                          </button>
                            <button
                            className="text-red-600 font-medium hover:underline"
                            onClick={() => handleDeleteClick(cochera.number)}
                          >
                            Eliminar
                          </button>
                        </div>
                      ): (
                        <div className="grid grid-cols-1 sm:grid-cols-3 sm:col-span-3">
                          <button
                            className="text-blue-700 font-medium hover:underline"
                            onClick={() => handleEdit(cochera.number)}
                          >
                            Editar
                          </button>
                        <button
                          disabled
                          className="hidden sm:block text-gray-600 font-medium "
                        >
                          Reservada
                        </button>
                         <button
                          disabled
                          className="hidden sm:block text-gray-600 font-medium "
                        >
                          Eliminar
                        </button>
                          </div>
                      
                      )}
                    </div>
                    </div>
                ))}
          </div>
            
          )}
        </div>
      </div>

      {/* --- MODAL ELIMINAR --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
            onClick={() => setDeleteModalOpen(false)}
          ></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">Confirmar Eliminación</h3>
            <p className="mb-4 text-center text-gray-700">
              ¿Estás seguro de que deseas eliminar esta cochera?
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL EDITAR --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-white/30 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-700 text-center">Editar Cochera</h3>
            <form onSubmit={handleSubmitEdit} className="flex flex-col gap-3">
              {/* Número */}
              <input
                type="number"
                className="border border-gray-300 p-3 rounded w-full"
                value={editNumber}
                onChange={(e) => setEditNumber(e.target.value)}
                required
              />

              {/* Tipo de vehículo */}
              <label className="block text-gray-700 font-semibold mb-2 text-lg">
                Tipo de Vehículo
              </label>

              {loadingTipos ? (
                <p className="p-4">Cargando tipos de vehículo...</p>
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

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <SubmitButton text="Guardar Cambios" loadingText="Guardando..." loading={loadingEdit} />
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
    </>
  );
};

