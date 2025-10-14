import type { TipoVehiculo } from "./TipoVehiculoType";
import type { Admin } from "./admin";
import type { Reserva } from "./ReservaType";

export interface Cochera {
  number: number;
  state: "DISPONIBLE" | "OCUPADA";
  tipoVehiculo: TipoVehiculo;
  admin?: Admin | null;
  reservas: Reserva[];
}