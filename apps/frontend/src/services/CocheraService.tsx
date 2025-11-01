import type { CocheraForm } from "../types/CocheraType.tsx";

// Obtener todas las cocheras de un admin
export const getAllCocheras = async (adminId: number) => {
  const res = await fetch(`http://localhost:3000/api/cochera?admin=${adminId}`);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("No hay cocheras disponibles");
    }
    throw new Error("Error al traer cocheras");
  }
  const data = await res.json();
  return data;
};

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
export const modifyCochera = async (id: number, updatedCochera: CocheraForm) => {
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
