import { Vehiculo } from "./vehiculo.entity.js";
import { Repository } from "../shared/repository.js"
const vehiculo = [
  new Vehiculo(
    'ABC123',
    'Auto de cars', 
  ),
  
]

export class VehiculoRepository implements Repository<Vehiculo> {
  public findAll(): Vehiculo[] | undefined {
    return vehiculo;
  }

  public findOne(item: { patente: string }): Vehiculo | undefined {
    return vehiculo.find((v) => v.patente === item.patente);
  }

  public add(item: Vehiculo): Vehiculo | undefined {
    vehiculo.push(item);
    return item;
  }

  public update(item: Vehiculo): Vehiculo | undefined {
    const patenteVehiculo = vehiculo.findIndex((v) => v.patente === item.patente);
    if (patenteVehiculo !== -1) {
      vehiculo[patenteVehiculo] = { ...vehiculo[patenteVehiculo], ...item };
    }
    return vehiculo[patenteVehiculo];
  }

  public delete(item: { patente: string }): Vehiculo | undefined {
    const patenteVehiculo = vehiculo.findIndex((v) => v.patente === item.patente);
    if (patenteVehiculo !== -1) {
      const deletedVehiculo = vehiculo[patenteVehiculo];
      vehiculo.splice(patenteVehiculo, 1);
      return deletedVehiculo;
    }
  }
}
