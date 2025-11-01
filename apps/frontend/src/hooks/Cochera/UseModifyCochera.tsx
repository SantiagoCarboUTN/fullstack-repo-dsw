import { useState } from "react";
import type { CocheraForm } from "../../types/CocheraType.tsx";
import { updateCochera } from "../../services/CocheraService.tsx";

// Hook para modificar una cochera por su "number"
export const useUpdateCochera = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
 const [isModalOpen, setModalOpen] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [editNumber, setEditNumber] = useState("");
  const [tipoVehiculoId, setTipoVehiculoId] = useState<number | "">("");

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

    if (!error) setTimeout(() => setModalOpen(false), 1000);
  };
  const handleModify = async (number: string, data: CocheraForm) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await updateCochera(number, data);
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
  };

  return { loading, error, success, handleModify, handleSubmitEdit,isModalOpen,setModalOpen,
    handleTipoVehiculoChange,
    setEditNumber,setSelectedNumber
  ,setTipoVehiculoId ,tipoVehiculoId,
    editNumber};
};
