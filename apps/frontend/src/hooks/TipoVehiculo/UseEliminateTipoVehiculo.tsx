import { useState } from "react";

export const UseEliminateTipoVehiculo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const eliminateTipoVehiculo = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar este tipo de vehículo?")) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch(`http://localhost:3000/api/tipoVehiculo/${id}`, {
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
  };

  return { eliminateTipoVehiculo, loading, error, success };
};
