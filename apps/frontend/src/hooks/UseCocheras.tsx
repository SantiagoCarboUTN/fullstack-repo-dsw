import { useEffect,useState } from "react";
import type { Cochera } from "../types/CocheraType.tsx";

export const UseCocheras = (adminId:string | number)=>{
  const [cocheras,setCocheras] = useState<Cochera[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cantOcupadas,setCantocupadas] = useState<number>(0)
  const [cantDesocupadas,setCantdesocupadas] = useState<number>(0)
  useEffect(()=>{
    const fetchCocheras = async ()=>{
      try{
       const res = await fetch(`http://localhost:3000/api/cochera?state=disponible&admin=${adminId}`) 
       if (!res.ok) throw new Error("Error al traer las cocheras")
       const data = await res.json()
       setCocheras(data.data); 
       setCantdesocupadas(data.cantDesocupadas)
       setCantocupadas(data.cantOcupadas)
      }catch(err:unknown){
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err)); 
        }
      }finally {
        setLoading(false);
      }
    }

    fetchCocheras()
  },[adminId])
  return {cocheras, loading,error,cantOcupadas, cantDesocupadas}
}