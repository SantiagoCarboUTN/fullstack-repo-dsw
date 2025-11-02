import { useState } from "react";
import type { TipoVehiculoCreate } from "../../types";

export const useUpdateTipoVehiculo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editDescription, setEditDescription] = useState("");

  const handleEdit = (id: number, desc: string) => {
    setSelectedId(id);
    setEditDescription(desc);
    setModalOpen(true);
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedId) return;

    await modifyTipoVehiculo(selectedId, { description: editDescription });

    if (!error) {
      setTimeout(() => setModalOpen(false), 1000);
    }
  };
  const modifyTipoVehiculo = async (id: number, data: TipoVehiculoCreate) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`http://localhost:3000/api/tipoVehiculo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error("Error al modificar tipo de vehículo");
      }

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  return { modifyTipoVehiculo, loading, error, success,handleEdit,handleSubmitEdit,isModalOpen,setModalOpen,editDescription,setEditDescription };
};
