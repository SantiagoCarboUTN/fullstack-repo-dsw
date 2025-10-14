import { useEffect, useState } from "react";
import type { Reserva } from '../types/index';

export function UseReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/reserva");
        if (!res.ok) throw new Error("Error al traer reservas");
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