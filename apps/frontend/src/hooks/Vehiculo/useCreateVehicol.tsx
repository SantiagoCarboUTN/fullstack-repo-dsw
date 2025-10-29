
import { useState } from "react";
import type { Vehiculo, VehiculoForm } from "../../types/VehiculoType.tsx";

export const useCreateVehiculo = () => {
  const [vehiculo, setVehiculo] = useState<Vehiculo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVehiculo = async (nuevoVehiculo: VehiculoForm) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/vehiculo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoVehiculo),
      });
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = await res.json();
      setVehiculo(data.data);
      return data.data;
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
  return { createVehiculo, vehiculo, loading, error };
};