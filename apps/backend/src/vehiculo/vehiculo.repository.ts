import { Vehiculo } from "./vehiculo.entity.js";
import { Repository } from "../shared/repository.js"
const vehiculo = [
  new Vehiculo(
    'ABC123',
    'Auto de cars', 
  ),
  
]

export class VehiculoRepository implements Repository<Vehiculo> {
  public async findAll(): Promise<Vehiculo[] | undefined> {
    return await vehiculo;
  }

  public async findOne(item: { patente: string }): Promise<Vehiculo | undefined>{
    return await vehiculo.find((v) => v.patente === item.patente);
  }

  public async add(item: Vehiculo):Promise<Vehiculo | undefined> {
    await vehiculo.push(item);
    return item;
  }

  public async update(item: Vehiculo): Promise<Vehiculo | undefined> {
    const patenteVehiculo = vehiculo.findIndex((v) => v.patente === item.patente);
    if (patenteVehiculo !== -1) {
      vehiculo[patenteVehiculo] = { ...vehiculo[patenteVehiculo], ...item };
    }
    return await vehiculo[patenteVehiculo];
  }

  public async delete(item: { patente: string }): Promise<Vehiculo | undefined> {
    const patenteVehiculo = vehiculo.findIndex((v) => v.patente === item.patente);
    if (patenteVehiculo !== -1) {
      const deletedVehiculo = vehiculo[patenteVehiculo];
      await vehiculo.splice(patenteVehiculo, 1);
      return deletedVehiculo;
    }
  }
}
