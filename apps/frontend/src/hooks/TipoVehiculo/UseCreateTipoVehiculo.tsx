import { useState } from "react";
import { createTipoVehiculo } from "../../services/TipoVehiculoService";
import type { TipoVehiculoCreate } from "../../types/TipoVehiculoType";

export const UseCreateTipoVehiculo = () => {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const nuevoTipo: TipoVehiculoCreate = { description };
      await createTipoVehiculo(nuevoTipo);

      setDescription("");
      setSuccessMessage(" Tipo vehículo creado con éxito ✅");
    } catch (err) {
      const mensajeError = err instanceof Error ? err.message : String(err);
      setError(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  return {
    description,
    loading,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    setSuccessMessage, // si quieres controlarlo manualmente también
  };
};
