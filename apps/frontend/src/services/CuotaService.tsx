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
