import type { Vehiculo } from "./VehiculoType";

export interface Client {
  id?: number;               // viene de BaseEntity
  mail: string;
  complete_name: string;
  phone?: string;
  dni?: string;
  password: string;
  vehiculos?: Vehiculo[];    // relación OneToMany
}