import type { ReservaInput } from "../types/ReservaType.tsx";

export const createReserva = async(reserva:ReservaInput)=>{
 const res = await fetch("http://localhost:3000/api/reserva", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...reserva, state: "ACTIVA"}),
  });
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Error al crear cochera");
  }
  
  return data.data
}