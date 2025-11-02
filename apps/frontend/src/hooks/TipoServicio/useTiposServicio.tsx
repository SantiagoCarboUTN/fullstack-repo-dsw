import {  useEffect, useState } from "react";
import type { TipoServicio } from "../../types/index";
import { getTiposServicio } from "../../services/TipoServicioService.tsx";

export const useAllTiposServicio = () => {
  const [tipos, setTiposServicio] = useState<TipoServicio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const adminId = 1 //Para desarrollo 
  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await getTiposServicio(adminId)
        setTiposServicio(res);
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

    fetchTipos();
  }, []);
  return { tipos, loading, error};
}