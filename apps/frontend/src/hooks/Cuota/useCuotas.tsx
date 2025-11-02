import { useEffect, useState } from "react";
import { getAllCuotas } from "../../services/CuotaService";
import type { Cuota } from "../../types/CuotaType";

export const useCuotas = (state?: string) => {
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCuotas = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllCuotas(state);
        console.log("Respuesta del backend:", response);

        // 👇 usa directamente el array que devuelve el backend
        setCuotas(response || []);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError(String(err));
      } finally {
        setLoading(false);
      }
    };

    loadCuotas();
  }, [state]);

  return { cuotas, loading, error };
};
