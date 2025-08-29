import { TipoVehiculo } from "./tv.entity.js";
import { Repository } from "../shared/repository.js"
import { pool } from "../shared/db/conn.js";
import { ResultSetHeader } from "mysql2";
const tipoVehiculo= [
  new TipoVehiculo(
    'Automovil',
    1
  ),
  new TipoVehiculo(
    'Motocicleta',
    2
  ),
  new TipoVehiculo(
    'Camioneta',
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
    try{
    const {...tvatributes} = item
    const [inserted] = await pool.query<ResultSetHeader>('INSERT INTO tipo_vehiculo SET ?', [tvatributes])  /* --> insert no devuelve un arreglo, devuelve un resultSetHeader */
    if(inserted.affectedRows === 0){
      return undefined
    }
    return {...item, id:inserted.insertId}
  }catch (err) {
      console.error('Error en la consulta:', err)
    }

  }
  public async update(item: TipoVehiculo): Promise<TipoVehiculo | undefined> {
    try{
      const {id, ...tvAtributes} = item
      const [updated]=await pool.query<ResultSetHeader>('UPDATE tipo_vehiculo SET ? WHERE id = ?', [tvAtributes,id])
      if(updated.affectedRows === 0){
        return undefined
      }
      return item
    }catch(err){
      console.error('Error en la consulta:', err)
    }

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
