import type { Vehiculo } from "./VehiculoType";
import type { Cochera } from "./CocheraType";

export interface TipoVehiculo {
  id: number;                
  description: string;
  vehiculos: Vehiculo[];
  cocheras: Cochera[];
}

export type TipoVehiculoCreate = {
  description: string;
};