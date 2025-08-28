import { TipoVehiculo } from "./tv.entity.js";
import { Repository } from "../shared/repository.js"
import { pool } from "../shared/db/conn.js";
const tipoVehiculo= [
  new TipoVehiculo(
    'Automovil',
    'Vehiculo de cuatro ruedas',
    1
  ),
  new TipoVehiculo(
    'Motocicleta',
    'Vehiculo de dos ruedas',
    2
  ),
  new TipoVehiculo(
    'Camioneta',
    'Vehiculo utilitario',
    4
  )
]

export class TipoVehiculoRepository implements Repository<TipoVehiculo> {
  public async findAll(): Promise<TipoVehiculo[] | undefined> {
    try{
      const [tvs] = await pool.query('SELECT * FROM tipo_vehiculo')
      return tvs as TipoVehiculo[]
    }catch (err) {
      console.error('Error en la consulta:', err)
    }
  }
  public async findOne(item: { id: number }): Promise<TipoVehiculo | undefined> {
    try{
      const [tv] = await pool.query('SELECT * FROM tipo_vehiculo WHERE id = ?',[item.id])
      if((tv as TipoVehiculo[]).length > 0 ){
        return (tv as TipoVehiculo[])[0]
      } 
      return undefined
    }catch (err) {
      console.error('Error en la consulta:', err)
    }

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
  public async delete(item: { id: number }): Promise<TipoVehiculo | undefined> {
    const idTipoVehiculo = tipoVehiculo.findIndex((tv) => tv.id === item.id);
    if (idTipoVehiculo !== -1) {
      const deletedTipoVehiculo = tipoVehiculo[idTipoVehiculo];
      await tipoVehiculo.splice(idTipoVehiculo, 1)[0];
      return deletedTipoVehiculo;
    }
  }
}
