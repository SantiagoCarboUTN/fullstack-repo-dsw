import type { Reserva } from "./ReservaType";

export interface TipoServicio {
  id: number;           
  nombre: string;
  precio: number;
  reservas: Reserva[];
}