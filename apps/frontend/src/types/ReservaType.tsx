import type { Cochera } from "./CocheraType";
import type { Vehiculo } from "./VehiculoType";
import type { TipoServicio } from "./TipoServicioType";
import type { Cuota } from "./CuotaType.tsx";

export interface Reserva {
  cochera: Cochera;
  vehiculo: Vehiculo;
  tipoServicio: TipoServicio;
  fechaInicio: string; // se recomienda usar string al recibir del backend
  fechaFin: string;
  state: "ACTIVA" | "FINALIZADA";
  cuotas: Cuota[]
}

export interface ReservaInput {
  vehiculo: string;
  clienteDni: number;
  cochera: {
    number:number, 
    admin:number
  };
  tipoServicio: number;
  fechaInicio: Date;
  fechaFin?: Date;
}