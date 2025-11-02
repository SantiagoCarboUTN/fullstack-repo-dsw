import type { Reserva } from "./ReservaType";

export interface TipoServicio {
  id: number;           
  nombre: string;
  precioCuota: number;
  cantCuotas:number
  reservas: Reserva[];
}
export interface TipoServicioForm {        
  nombre: string;
  precioCuota: number;
  cantCuotas:number

}

export interface TipoServicioInput {        
  nombre: string;
  precioCuota: string;
  cantCuotas:string;
  admin:number
}