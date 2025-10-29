import type { Client } from "./ClientType";
import type { TipoVehiculo } from "./TipoVehiculoType";
import type { Reserva } from "./ReservaType";

// Modelo Vehiculo según la entidad de MikroORM
export interface Vehiculo {
  patente: string;
  modelo: string;
  client: Client;
  tipoVehiculo: TipoVehiculo;
  reservas: Reserva[];
}

export interface VehiculoForm {
  patente: string;
  modelo: string;
  clientId: number;
  tipoVehiculo: number;
}