import { useState } from "react";
import { CocheraRows } from "../../components/ui/AdminDashboardUi/CocheraRow.tsx";
import { InfoCard } from "../../components/ui/AdminDashboardUi/InfoCard";
import { Default_Link } from "../../components/ui/default_link.tsx";
import { useCocheras } from "../../hooks/Cochera/UseCocheras.tsx";
import { MessageBox } from "../../components/ui/messageBox.tsx";
import { SubmitButton } from "../../components/ui/SubmitButton";
import { useModifyCochera } from "../../hooks/Cochera/UseModifyCochera";
import { useEliminateCochera } from "../../hooks/Cochera/UseEliminateCochera";
import type { TipoVehiculo } from "../../types/TipoVehiculoType.tsx";
import { UseTipoVehiculos } from "../../hooks/TipoVehiculo/UseTipoVehiculos.tsx";

export const CocherasList = () => {
  const [filtroEstado, setFiltroEstado] = useState<"disponible" | "ocupada">("disponible");
  const { cocheras, loading, error, cantDesocupadas, cantOcupadas } = useCocheras();
  const cocherasFiltradas = cocheras.filter((cochera) => cochera.state === filtroEstado);

  // --- HOOK MODIFICAR ---
  const { handleModify, loading: loadingEdit, error: errorEdit, success: successEdit } = useModifyCochera();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [editNumber, setEditNumber] = useState("");
  const [tipoVehiculoId, setTipoVehiculoId] = useState<number | "">("");

  const { tipos, loading: loadingTipos, error: errorTipos } = UseTipoVehiculos();

  const handleEdit = (number: number) => {
    const cochera = cocheras.find((c) => c.number === number);
    if (!cochera) return;

    setSelectedNumber(number);
    setEditNumber(String(cochera.number));
    setTipoVehiculoId(cochera.tipoVehiculo?.id || "");
    setModalOpen(true);
  };

  const handleTipoVehiculoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTipoVehiculoId(Number(e.target.value));
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNumber === null || tipoVehiculoId === "") return;

    await handleModify(selectedNumber, {
      number: Number(editNumber),
      tipoVehiculo: tipoVehiculoId,
      admin: 1,    // reemplazar con admin real si se necesita
      sucursal: 1, // reemplazar con sucursal real si se necesita
    });

    if (!errorEdit) setTimeout(() => setModalOpen(false), 1000);
  };

  // --- HOOK ELIMINAR ---
  const { handleEliminate} = useEliminateCochera();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteNumber, setDeleteNumber] = useState<number | null>(null);

  const handleDeleteClick = (number: number) => {
    setDeleteNumber(number);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteNumber === null) return;
    await handleEliminate(deleteNumber);
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-0 place-items-center">
        <button onClick={() => setFiltroEstado("ocupada")}>
          <InfoCard label="Cocheras Ocupadas" value={cantOcupadas} />
        </button>
        <button onClick={() => setFiltroEstado("disponible")}>
          <InfoCard label="Cocheras Disponibles" value={cantDesocupadas} />
        </button>
      </div>

      <div className="p-8 bg-gray-100 min-h-screen">
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
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4">Número</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4">Tipo de Vehículo</th>
                  <th className="py-3 px-4">Ubicación</th>
                  <th className="py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cocherasFiltradas.map((cochera, index) => (
                  <tr key={index} className="border-t border-gray-200">
                    <CocheraRows
                      listState={filtroEstado}
                      number={cochera.number}
                      state={cochera.state}
                      tipoVehiculo={cochera.tipoVehiculo?.description || "No tiene asignado un TipoVehiculo"}
                      ubicacion={cochera.sucursal.direction}
                    />
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        className="text-blue-700 font-medium hover:underline"
                        onClick={() => handleEdit(cochera.number)}
                      >
                        Editar
                      </button>
                      <button
                        className="text-red-600 font-medium hover:underline"
                        onClick={() => handleDeleteClick(cochera.number)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                  message={errorEdit || (successEdit ? "Modificado ✅" : "")}
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
