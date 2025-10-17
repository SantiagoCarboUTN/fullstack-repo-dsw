import { useState } from "react";
import type { Reserva } from "../../types/ReservaType.tsx";
import type { ReservaInput } from "../../types/ReservaType.tsx";

type ReservaData = ReservaInput;

export const useCreateReserva = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reserva, setReserva] = useState<Reserva | null>(null);

  const createReserva = async (data: ReservaData) => {
    try{
      setLoading(true);
      setError(null);
      setReserva(null);
      
      const res = await fetch("http://localhost:3000/api/reserva", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al crear la reserva");
      }
      setReserva(await res.json());

  }catch(err:unknown){
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err)); 
        }
      }finally {
    setLoading(false);
  }
  };

  return { createReserva, loading, error, reserva };
}