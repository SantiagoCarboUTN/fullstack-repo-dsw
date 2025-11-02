import { useState } from "react";
import { eliminateCochera } from "../../services/CocheraService.tsx";

// Hook para eliminar una cochera por su "number"
export const useDeleteCochera = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteNumber, setDeleteNumber] = useState<number | null>(null);
  const adminId = 1
  const handleDeleteClick = (number: number) => {
    setDeleteNumber(number);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteNumber === null) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await eliminateCochera(deleteNumber,adminId);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
    setDeleteModalOpen(false);
  };

  return { loading, error, success, isDeleteModalOpen, handleConfirmDelete,handleDeleteClick ,setDeleteModalOpen};
};
