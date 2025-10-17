import { useState } from "react";
import type { TipoVehiculoCreate } from "../../types/TipoVehiculoType";

export const useTipoVehiculo = () => {
  // Estado del campo de entrada
  const [description, setDescription] = useState<string>("");

  // Estados de carga y error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Maneja los cambios del input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Creamos el objeto con el único campo necesario
      const nuevoTipo: TipoVehiculoCreate = { description };

      const response = await fetch("/api/tipoVehiculo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoTipo),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const msg = data?.message || "Error al guardar tipo de vehículo";
        throw new Error(msg);
      }

      // Si todo salió bien, limpiar el formulario
      setDescription("");
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
    handleChange,
    handleSubmit,
  };
};
