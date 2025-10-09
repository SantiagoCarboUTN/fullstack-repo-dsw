import { Request, Response, NextFunction } from 'express'
import { TipoVehiculo } from './tv.entity.js'
import { orm } from '../shared/db/orm.js'
/* function sanitizedTipoVehiculoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedTipoVehiculoInput = {
  nombre: req.body.nombre,
  id:req.body.id
}
Object.keys(req.body.sanitizedTipoVehiculoInput).forEach((key) => {
  if (req.body.sanitizedTipoVehiculoInput[key] === undefined) {
    delete req.body.sanitizedTipoVehiculoInput[key]
  } 

})
next()
}
 */
const em = orm.em

async function findAll(req: Request, res: Response) {
  try {
    const tipoVehiculos = await em.find(TipoVehiculo, {}, {populate: ['vehiculos', 'cocheras']})
    res.status(200).json({message: 'Lista de tipos de vehículos', data: tipoVehiculos})
  }catch (error:any) {
      res.status(500).json({ error: error.message })
    }
  }


async function findOne(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const tipoVehiculo = await em.findOneOrFail(TipoVehiculo, { id }, {populate: ['vehiculos', 'cocheras']})
    res.status(200).json({ message: 'Tipo de vehículo encontrado', data: tipoVehiculo })
  } catch (error:any) {
    res.status(500).json({ error: error.message })}
  }

async function add(req: Request, res: Response) {
  try {
    const newTipoVehiculo = em.create(TipoVehiculo, req.body)
    await em.persistAndFlush(newTipoVehiculo)
    res.status(201).json({message: 'Se creó el tipo de vehículo', data: newTipoVehiculo})
  } catch (error:any) {
    res.status(500).json({ error: error.message })
  }}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoVehiculoToUpdate = await em.findOneOrFail(TipoVehiculo, { id })
    em.assign(tipoVehiculoToUpdate, req.body)
    await em.flush()
    res.status(200).json({message: 'Se actualizó el tipo de vehículo', data: tipoVehiculoToUpdate})
  }catch (error:any) {
    res.status(500).json({ error: error.message })
}}

async function remove(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id)
    const tipoVehiculoToRemove = await em.getReference(TipoVehiculo, id )
    await em.removeAndFlush(tipoVehiculoToRemove)
  }catch (error:any) {
    res.status(500).json({ error: error.message })
  }}

export { findAll, findOne, add, update, remove }