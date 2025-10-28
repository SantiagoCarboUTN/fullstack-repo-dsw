import type { Reserva } from "./ReservaType.tsx";

export interface Cuota {
  id:number
  state:'pendiente' | 'pagada' ;           
  fechaPago: string;
  monto: number;
  reserva?: Reserva;
}