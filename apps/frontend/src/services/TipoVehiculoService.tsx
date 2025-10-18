import type { TipoVehiculoCreate, TipoVehiculo } from "../types/index";


export const createTipoVehiculo = async (nuevoTipo: TipoVehiculoCreate) => {
  const response = await fetch("/api/tipoVehiculo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoTipo),
  });


  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const msg = data?.message || "Error al guardar tipo de vehículo";
    throw new Error(msg);
  }


  return await response.json(); // Devuelve el objeto creado (opcional)
};


// 🔹 Obtener todos los tipos de vehículo
export const getAllTipoVehiculo = async (): Promise<TipoVehiculo[]> => {
  const response = await fetch("/api/tipoVehiculo");


  if (!response.ok) {
    throw new Error("Error al obtener los tipos de vehículo");
  }


  const result = await response.json();
  return result.data; // 🔹 acceder al array real
};
