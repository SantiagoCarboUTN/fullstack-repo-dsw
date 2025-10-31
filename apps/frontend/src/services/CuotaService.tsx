export const getCuotas = async  (clientID:number) =>{
        const res = await fetch(`http://localhost:3000/api/cuota?state=pendiente&clientId=${clientID}`);
          if (!res.ok){ 
            if(res.status === 404){ 
              throw new Error("No se encontraron las cuotas")
          }
            throw new Error("Error al traer cuotas")
        } 
        const data = await res.json();
        return data.data;
}