import { Request, Response, NextFunction } from 'express';
import { Vehiculo } from './vehiculo.entity.js';
import { TipoVehiculo } from '../tipoVehiculo/tv.entity.js';
import { orm } from '../shared/db/orm.js'

const em = orm.em


/* function sanitizedVehiculoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedVehiculoInput = {
    patente: req.body.patente,
    tipoVehiculo: req.body.tipoVehiculo, 
  }; */
/* 
  Object.keys(req.body.sanitizedVehiculoInput).forEach((key) => {
    if (req.body.sanitizedVehiculoInput[key] === undefined) {
      delete req.body.sanitizedVehiculoInput[key];
    }
  }); 

  next();
}
 */

async function findAll(req: Request, res: Response) {
  try {
    const vehiculos = await em.find(Vehiculo, {}, { populate: ['tipoVehiculo'] });
    res.json({ data: vehiculos });
  } catch(error: any) {
    res.status(500).json({ error: error.message})
  }
}
async function findOne(req: Request, res: Response) {
  try {
  const patente = req.params.patente;
  const vehiculo = await em.findOneOrFail(Vehiculo,{patente},{ populate: ['tipoVehiculo'] });
    res.status(200).json({ data: vehiculo });
  } catch(error: any) {
    res.status(500).json({ error: error.message})
  }}


async function add(req: Request, res: Response) {
  try {
    const vehiculo = em.create(Vehiculo, req.body)
    await em.flush();
    res.status(201).json({ message: 'Vehículo creado', data: vehiculo });
  } catch(error: any) {
    res.status(500).json({ error: error.message})} 
}

async function update(req: Request, res: Response) {
  try {
    const patente = req.params.patente;
    const vehiculoToUpdate = await em.findOneOrFail(Vehiculo, { patente });
    em.assign(vehiculoToUpdate, req.body);
    await em.flush();
    res.status(200).json({ message: 'Vehículo actualizado', data: vehiculoToUpdate });  
  }catch(error: any) {
    res.status(500).json({ error: error.message}) 
  }
}

async function remove(req: Request, res: Response) {
  try {
    const patente = req.params.patente;
    
    const vehiculoToRemove = await em.findOneOrFail(Vehiculo, { patente });
    await em.removeAndFlush(vehiculoToRemove);
  } catch(error: any) {
    res.status(500).json({ error: error.message}) 
  }
}


export {findAll,findOne,add,update,remove}
