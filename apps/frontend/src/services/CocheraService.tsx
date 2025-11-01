import type { CocheraForm } from "../types/CocheraType.tsx";

export const getAllCocheras = async(adminId:number)=>{
   const res = await fetch(`http://localhost:3000/api/cochera?admin=${adminId}`) 
   const data = await res.json()
    if (!res.ok){
      throw new Error(data.message || "Error al obtener las cocheras");
    }
    return data
}

// Crear una nueva cochera
export const createOneCochera = async (nuevaCochera: CocheraForm) => {
  const res = await fetch("http://localhost:3000/api/cochera", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...nuevaCochera, state: "disponible" }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al crear cochera");
  }
  return data.data;
};

// Modificar una cochera existente
export const updateCochera = async (id: string, updatedCochera: CocheraForm) => {
  const res = await fetch(`http://localhost:3000/api/cochera/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedCochera),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al modificar cochera");
  }
  return data.data;
};

// Eliminar una cochera
export const eliminateCochera = async (id: number) => {
  const res = await fetch(`http://localhost:3000/api/cochera/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al eliminar cochera");
  }
  return data.data;
};
