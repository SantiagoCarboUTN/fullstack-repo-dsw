import { useState } from "react";
import type { CocheraForm } from "../../types/CocheraType.tsx";
import { modifyCochera } from "../../services/CocheraService.tsx";

// Hook para modificar una cochera por su "number"
export const useModifyCochera = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleModify = async (number: number, data: CocheraForm) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await modifyCochera(number, data);
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

  return { loading, error, success, handleModify };
};
