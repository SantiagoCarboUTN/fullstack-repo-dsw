import type { VehiculoForm } from "../types/VehiculoType.tsx";

export const createVehiculo = async (nuevoVehiculo:VehiculoForm)=>{
   const res = await fetch("http://localhost:3000/api/vehiculo", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoVehiculo),
      });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Error al crear cochera");
    }
    return data.data
}