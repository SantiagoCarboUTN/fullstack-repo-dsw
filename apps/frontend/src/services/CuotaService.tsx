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
import type { Cuota } from '../types/CuotaType';

// 🔹 Obtener todas las cuotas (con o sin filtro de estado)
export const getCuotas = async (state?: string): Promise<Cuota[]> => {
  const params = state ? `?state=${state}` : '';
  const response = await fetch(`/api/cuota${params}`);

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const msg = data?.message || 'Error al obtener las cuotas';
    throw new Error(msg);
  }

  const result = await response.json();
  return result.data; // 🔹 acceder al array real
};

// 🔹 Crear una nueva cuota
export const createCuota = async (nuevaCuota: Cuota) => {
  const response = await fetch('/api/cuota', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevaCuota),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const msg = data?.message || 'Error al crear la cuota';
    throw new Error(msg);
  }

  return await response.json(); // Devuelve la cuota creada (opcional)
};
