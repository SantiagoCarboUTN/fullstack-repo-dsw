import { useEffect,useState } from "react";
import type { TipoVehiculo } from "../../types/index";

export const useTipoVehiculo = ()=>{
  const [tipos,setTiposVehiculo] = useState<TipoVehiculo[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(()=>{
    const fetchTipos = async ()=>{
      try{
        const res = await fetch(`http://localhost:3000/api/tipoVehiculo`) 
        if (!res.ok) {
          if(res.status === 404){
            throw new Error("No hay tipos disponibles")
          }
          throw new Error("Error al traer los tipos")
        }
       const data = await res.json()
       setTiposVehiculo(data.data); 
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

    fetchTipos()
  },[])
  return {tipos, loading,error}
}