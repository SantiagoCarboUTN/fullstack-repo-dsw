import { useState } from "react";
import type { Cochera, CocheraForm } from "../types/CocheraType.tsx"

export const useCreateCochera = ()=>{
const [cochera,setCochera] = useState<Cochera>()
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

  const createCochera = async (nuevaCochera:CocheraForm)=>{
    setLoading(true)
    try{
        const res = await fetch("http://localhost:3000/api/cochera",
        {
          method: "POST",              
          headers: {                   
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({...nuevaCochera,state:"disponible"}),
        })

        if (!res.ok) throw new Error("Error al traer las cocheras")
        const data = await res.json()
        setCochera(data.data)
        return data

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err)); // fallback si no es un Error
        }
      } finally {
        setLoading(false);
      }
    
}
 return { createCochera, cochera, loading, error };
}