import type { CocheraForm } from "../types/CocheraType.tsx"

export const getAllCocheras = async(adminId:number)=>{
   const res = await fetch(`http://localhost:3000/api/cochera?admin=${adminId}`) 
       if (!res.ok){
        if(res.status === 404){
          throw new Error("No hay cocheras disponibles")
          }
          throw new Error("Error al traer cocheras")
       }
    const data = await res.json()
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