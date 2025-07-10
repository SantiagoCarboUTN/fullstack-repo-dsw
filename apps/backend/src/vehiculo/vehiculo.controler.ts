import { Request, Response, NextFunction } from 'express';
import { VehiculoRepository } from './vehiculo.repository.js';
import { Vehiculo } from './vehiculo.entity.js';
import { TipoVehiculo } from '../tipoVehiculo/tv.entity.js';

const repository = new VehiculoRepository();

function sanitizedVehiculoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedVehiculoInput = {
    patente: req.body.patente,
    tipoVehiculo: req.body.tipoVehiculo, 
  };

  Object.keys(req.body.sanitizedVehiculoInput).forEach((key) => {
    if (req.body.sanitizedVehiculoInput[key] === undefined) {
      delete req.body.sanitizedVehiculoInput[key];
    }
  });

  next();
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() });
}

function findOne(req: Request, res: Response) {
  const patente = req.params.patente;
  const vehiculo = repository.findOne({ patente });

  if (!vehiculo) {
    return res.status(404).json({ error: 'No se encontró el vehículo' });
  }

  res.json({ data: vehiculo });
}

function add(req: Request, res: Response) {
  const input = req.body.sanitizedVehiculoInput;

  const vehiculoInput = new Vehiculo(
    input.patente,
    input.tipoVehiculo,
  );

  const vehiculo = repository.add(vehiculoInput);

  return res.status(201).json({
    message: 'Se creó el vehículo',
    data: vehiculo
  });
}

function update(req: Request, res: Response) {
  req.body.sanitizedVehiculoInput.patente = req.params.patente;

  const vehiculo = repository.update(req.body.sanitizedVehiculoInput);

  if (!vehiculo) {
    return res.status(404).json({ error: 'No se encontró el vehículo' });
  }

  return res.status(200).json({
    message: 'Se actualizó el vehículo',
    data: vehiculo
  });
}

function remove(req: Request, res: Response) {
  const patente = req.params.patente;
  const vehiculo = repository.delete({ patente });

  if (!vehiculo) {
    return res.status(404).json({ error: 'No se encontró el vehículo' });
  } else {
    return res.status(200).json({
      message: 'Se eliminó el vehículo',
      data: vehiculo
    });
  }
}

export {findAll,findOne,add,update,remove,sanitizedVehiculoInput};
