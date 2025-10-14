import type { Reserva } from "./ReservaType";

export interface TipoServicio {
  id: number;           // viene de BaseEntity
  nombre: string;
  precio: number;
  reservas: Reserva[];
  createdAt?: string;
  updatedAt?: string;
}