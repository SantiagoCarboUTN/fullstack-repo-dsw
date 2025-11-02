import { getCuotas } from "../../services/CuotaService.tsx";
import { useEffect, useState } from "react";
import type { Cuota } from '../../types/index';


export function useCuotas() {
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCuotas = async () => {
      try {
        const res = await getCuotas (1);
        setCuotas(res);
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

    fetchCuotas();
  }, []);

  return { cuotas, loading, error };
}