import type {  TipoServicioForm, TipoServicioInput } from "../types/TipoServicioType.tsx";

export const getTiposServicio= async (adminId:number)=>{
  const res = await fetch(`http://localhost:3000/api/tipoServicio?admin=${adminId}`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Error al traer los tipos");
  }
  return data.data
}


export const getTipoServicio = async (id_tipo:string)=>{
    const res = await fetch(`http://localhost:3000/api/tipoServicio/${id_tipo}`)
    const data =await res.json()
    if (!res.ok) {
      throw new Error(data.message || "Error al traer el tipo");
    }
    
    return data.data
}


export const updateTipoServicio = async (id:string, tipoData: TipoServicioForm)=>{
  const res = await fetch(`http://localhost:3000/api/tipoServicio/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipoData),
    });
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Error al modificar el tipo");
  }
  return data.data
}



export const deleteTipoServicio = async (id:string)=>{
  const res = await fetch(`http://localhost:3000/api/tipoServicio/${id}`, {
      method: "DELETE"});
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Error al eliminar el servicio");
  }
  return data.data
}


export const createTipoServicio = async (TipoData: TipoServicioInput)=>{
   const res = await fetch("http://localhost:3000/api/tipoServicio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(TipoData),
    });
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data.message || "Error al crear el servicio");
    }
    return data.data
}
