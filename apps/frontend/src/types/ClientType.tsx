import type { Vehiculo } from "./VehiculoType";

export interface Client {
  id: number;               // viene de BaseEntity
  mail: string;
  complete_name: string;
  phone: string;
  dni: string;
  password: string;
  vehiculos?: Vehiculo[];    // relación OneToMany
}

export interface ClientForm {
    complete_name: string,
    mail: string,
    dni: string,
    phone: string
}

export interface ClienteInput {
  complete_name: string,
  mail: string,
  dni: string,
  phone: string
  password: string;
}