import { useEffect,useState } from "react";
import type { Cochera } from "../../types/CocheraType.tsx";
import { getAllCocheras } from "../../services/CocheraService.tsx";

export const useCocheras = ()=>{
  const [cocheras,setCocheras] = useState<Cochera[]>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cantOcupadas,setCantocupadas] = useState<number>(0)
  const [cantDesocupadas,setCantdesocupadas] = useState<number>(0)
  
  const fetchCocheras = async ()=>{
      setLoading(true)
      try{
        const data = await getAllCocheras(1) //--> le paso el admin id 1 , solo
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
    useEffect(() => {
    fetchCocheras();
    },[])
  return {cocheras, loading,error,cantOcupadas, cantDesocupadas, fetchCocheras}
}