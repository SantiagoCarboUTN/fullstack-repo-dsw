import { useState } from "react";

export const useDeleteTipoVehiculo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;

    if (!confirm("¿Seguro que deseas eliminar este tipo de vehículo?")) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`http://localhost:3000/api/tipoVehiculo/${deleteId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error al eliminar tipo de vehículo");
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
    setDeleteModalOpen(false);
  };


  return {  loading, error, success,handleConfirmDelete,handleDeleteClick,setDeleteModalOpen,isDeleteModalOpen };
};
