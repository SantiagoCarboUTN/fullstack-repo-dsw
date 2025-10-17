
import type { Admin } from "./AdminType";
import type { Reserva } from "./ReservaType";
import type { TipoVehiculo } from "./TipoVehiculoType.tsx";

export interface Cochera {
  number: number;
  state: "DISPONIBLE" | "OCUPADA";
  tipoVehiculo: TipoVehiculo;
  admin?: Admin | null;
  reservas?: Reserva[];
}

export interface CocheraForm {
  number: number;
  tipoVehiculo: number
  admin:number
}