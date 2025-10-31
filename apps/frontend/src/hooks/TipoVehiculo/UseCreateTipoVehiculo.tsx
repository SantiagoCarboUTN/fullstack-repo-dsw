import { useState } from "react";
import { createTipoVehiculo } from "../../services/TipoVehiculoService";
import type { TipoVehiculoCreate } from "../../types/TipoVehiculoType";

export const useCreateTipoVehiculo = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const nuevoTipo: TipoVehiculoCreate = { description };
      await createTipoVehiculo(nuevoTipo);
      setDescription("");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return {
    description,
    loading,
    error,
    success,
    handleChange,
    handleSubmit,
  };
};
