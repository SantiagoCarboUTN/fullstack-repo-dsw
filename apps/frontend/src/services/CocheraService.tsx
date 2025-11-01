import type { CocheraForm } from "../types/CocheraType.tsx"

export const getAllCocheras = async(adminId:number)=>{
   const res = await fetch(`http://localhost:3000/api/cochera?admin=${adminId}`) 
   const data = await res.json()
    if (!res.ok){
      throw new Error(data.message || "Error al crear cochera");
    }
    return data
}

export const createOneCochera = async(nuevaCochera:CocheraForm)=>{
  const res = await fetch("http://localhost:3000/api/cochera",
    {
      method: "POST",              
      headers: {                   
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({...nuevaCochera,state:"disponible"}),
    })
    const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || "Error al crear cochera");
  }

    return data.data

  
}