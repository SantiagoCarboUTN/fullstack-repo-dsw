import type { Cochera } from "./CocheraType";
import type { Vehiculo } from "./VehiculoType";
import type { TipoServicio } from "./TipoServicioType";

export interface Reserva {
  cochera: Cochera;
  vehiculo: Vehiculo;
  tipoServicio: TipoServicio;
  fechaInicio: string; // se recomienda usar string al recibir del backend
  fechaFin?: string;
  estado: "ACTIVA" | "FINALIZADA";
}

export interface ReservaInput {
  vehiculo: string;
  clienteDni: number;
  cochera: number;
  tipoServicio: number;
  fechaInicio: Date;
  fechaFin?: Date;
}