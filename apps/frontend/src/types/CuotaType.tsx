import type { Reserva } from "./ReservaType.tsx";

export interface Cuota {
  state:'pendiente' | 'pagada' ;           
  fechaPago: string;
  monto: number;
  reserva?: Reserva;
}