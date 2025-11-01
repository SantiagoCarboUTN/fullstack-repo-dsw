import { useState } from "react";
import type { TipoVehiculoCreate } from "../../types";

export const useModifyTipoVehiculo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  return { modifyTipoVehiculo, loading, error, success };
};
