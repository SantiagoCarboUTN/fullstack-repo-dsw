import { useState } from "react";
import { eliminateCochera } from "../../services/CocheraService.tsx";

// Hook para eliminar una cochera por su "number"
export const useEliminateCochera = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEliminate = async (number: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await eliminateCochera(number);
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

  return { loading, error, success, handleEliminate };
};
