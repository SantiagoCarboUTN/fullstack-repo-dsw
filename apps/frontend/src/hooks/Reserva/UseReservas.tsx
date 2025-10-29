import { useEffect, useState } from "react";
import type { Reserva } from '../../types/index';

export function useReservas(client?:number) {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const params = new URLSearchParams()
        if(client)params.append("client",client.toString())
        const res = await fetch(`http://localhost:3000/api/reserva?${params}`);
        if (!res.ok){ 
          if(res.status === 404){
            throw new Error("No hay reservas activas")
          }
          throw new Error("Error al traer reservas")
        }
        const data = await res.json();
        setReservas(data.data); // data.data viene de tu función findAll
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err)); // fallback si no es un Error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  return { reservas, loading, error };
}