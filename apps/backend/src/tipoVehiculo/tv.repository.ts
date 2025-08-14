import { TipoVehiculo } from "./tv.entity.js";
import { Repository } from "../shared/repository.js"
const tipoVehiculo= [
  new TipoVehiculo(
    'Automovil',
    'Vehiculo de cuatro ruedas',
    'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
  new TipoVehiculo(
    'Motocicleta',
    'Vehiculo de dos ruedas',
    'b02b91bc-3769-4221-beb1-d7a3aeba7dad'
  ),
  new TipoVehiculo(
    'Camioneta',
    'Vehiculo utilitario',
    'c02b91bc-3769-4221-beb1-d7a3aeba7dad'
  )
]

export class TipoVehiculoRepository implements Repository<TipoVehiculo> {
  public async findAll(): Promise<TipoVehiculo[] | undefined> {
    return tipoVehiculo;
  }
  public async findOne(item: { id: string }): Promise<TipoVehiculo | undefined> {
    return await tipoVehiculo.find((tv) => tv.id === item.id);
  }
  public async add(item: TipoVehiculo):Promise<TipoVehiculo | undefined> {
    await tipoVehiculo.push(item);
    return item;
  }
  public async update(item: TipoVehiculo): Promise<TipoVehiculo | undefined> {
    const idTipoVehiculo = tipoVehiculo.findIndex((tv) => tv.id === item.id);
    if (idTipoVehiculo !== -1) {
      tipoVehiculo[idTipoVehiculo] = { ...tipoVehiculo[idTipoVehiculo], ...item };
    }
    return await tipoVehiculo[idTipoVehiculo];
  }
  public async delete(item: { id: string }): Promise<TipoVehiculo | undefined> {
    const idTipoVehiculo = tipoVehiculo.findIndex((tv) => tv.id === item.id);
    if (idTipoVehiculo !== -1) {
      const deletedTipoVehiculo = tipoVehiculo[idTipoVehiculo];
      await tipoVehiculo.splice(idTipoVehiculo, 1)[0];
      return deletedTipoVehiculo;
    }
  }
}
