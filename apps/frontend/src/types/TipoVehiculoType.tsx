import type { Vehiculo } from "./VehiculoType";
import type { Cochera } from "./CocheraType";

export interface TipoVehiculo {
  id: number;                // viene de BaseEntity
  description: string;
  vehiculos: Vehiculo[];
  cocheras: Cochera[];
  createdAt?: string;
  updatedAt?: string;
}