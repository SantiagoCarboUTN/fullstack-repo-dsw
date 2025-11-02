import { Request, Response, NextFunction } from 'express';
import { Vehiculo } from './vehiculo.entity.js';
import { orm } from '../shared/db/orm.js'
import { ForeignKeyConstraintViolationException, ValidationError } from '@mikro-orm/core';

const em = orm.em

 function sanitizedVehiculoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedVehiculoInput = {
    patente: req.body.patente,
    modelo: req.body.modelo,
    client: req.body.client,
    tipoVehiculo: req.body.tipoVehiculo, 
    reservas: req.body.reservas
  }; 

  Object.keys(req.body.sanitizedVehiculoInput).forEach((key) => {
    if (req.body.sanitizedVehiculoInput[key] === undefined) {
      delete req.body.sanitizedVehiculoInput[key];
    }
  }); 

  next();
}

async function findAll(req: Request, res: Response) {
  try {
    const vehiculos = await em.find(Vehiculo, {}, { populate: ['tipoVehiculo'] });
    if(vehiculos.length === 0){
        res.status(404).json({message:'vehiculos not found'})
      }else{
        res.status(200).json({message: 'Lista de vehiculos', data: vehiculos });
      }
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
    const vehiculo = em.create(Vehiculo, req.body.sanitizedVehiculoInput)
    await em.flush();
    res.status(201).json({ message: 'Vehículo creado', data: vehiculo });
  } catch(error: any) {
     if (error instanceof ValidationError) {
            return res.status(422).json({ message: 'Datos inválidos', errors: error.message });
          }
            /* manejo solo el fallo de tipo porque es lo unico que ingresa el cliente */
    if (error instanceof ForeignKeyConstraintViolationException) {
       return res.status(400).json({ message: 'No existe el cliente' });
    }
    res.status(500).json({ message: 'Error inesperado al crear el vehiculo' });
  }
}

async function update(req: Request, res: Response) {
  try {
    const patente = req.params.patente;
    const vehiculoToUpdate = await em.findOneOrFail(Vehiculo, { patente });
    em.assign(vehiculoToUpdate, req.body.sanitizedVehiculoInput);
    await em.flush();
    res.status(200).json({ message: 'Vehículo actualizado', data: vehiculoToUpdate });  
  }catch(error: any) {
    res.status(500).json({ error: error.message}) 
  }
}

async function remove(req: Request, res: Response) {
  try {
    const patente = req.params.patente;
    
    const vehiculoToRemove = await em.findOneOrFail(Vehiculo, { patente }, {populate:['reservas']});
    await em.removeAndFlush(vehiculoToRemove);
  } catch(error: any) {
    res.status(500).json({ error: error.message}) 
  }
}


export {findAll,findOne,add,update,remove, sanitizedVehiculoInput}
