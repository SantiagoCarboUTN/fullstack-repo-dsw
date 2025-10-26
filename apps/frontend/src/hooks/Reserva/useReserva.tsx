import { useEffect, useState } from "react";
import type { Cuota, Reserva } from '../../types/index';

export function useReserva(admin?:string, number?:string, vehiculo?:string, fechaInicio?:string ) {
  const [reserva, setReserva] = useState<Reserva>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const[cuotas, setCuotas] =useState<Cuota[]>([])
  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/reserva/${admin}/${number}/${vehiculo}/${fechaInicio}`);
        if (!res.ok){ 
          if(res.status === 404){
            throw new Error("No se encontró la reserva")
          }
          throw new Error("Error al traer reserva")
        }
        const data = await res.json();
        setReserva(data.data);
        setCuotas(data.data.cuotas) 
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

    fetchReserva();
  }, []);

  return { reserva, loading, error, cuotas };
}