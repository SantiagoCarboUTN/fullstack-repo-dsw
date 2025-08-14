import { Reserva } from "./reserva.entity.js";
import { ReservaRepository } from "./reserva.repository.js";
import { Request, Response, NextFunction } from 'express'
const repository = new ReservaRepository()

function sanitizedReservaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedReservaInput = {
  tarifa: req.body.tarifa,
  id: req.body.id
}
Object.keys(req.body.sanitizedReservaInput).forEach((key) => {
  if (req.body.sanitizedReservaInput[key] === undefined) {
    delete req.body.sanitizedReservaInput[key]
  } 

})
next()
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
}
async function findOne(req: Request, res: Response) {
  const id = req.params.id
  const reserva = await repository.findOne({id})
  if (!reserva) {
    return res.status(404).json({ error: 'No se encontró la reserva' })
  }
  res.json({ data: reserva })
}
async function add(req: Request, res: Response) {
  const input = req.body.sanitizedReservaInput

  const reservaInput = new Reserva(
    input.tarifa,
    input.id
  )
  const reserva = await repository.add(reservaInput)
  return res.status(201).json({message: 'Se creó la reserva', data: reserva })
} 
async function update(req: Request, res: Response) {
  req.body.sanitizedReservaInput.id = req.params.id
  const reserva = await repository.update(req.body.sanitizedReservaInput)
  if (!reserva) {
    return res.status(404).json({ error: 'No se encontró la reserva' })
  }
  return res.status(200).json({message: 'Se actualizó la reserva', data: reserva })
}
async function remove(req: Request, res: Response) {
  const id = req.params.id
  const reserva = await repository.delete({id})
  if (!reserva) {
    return res.status(404).json({ error: 'No se encontró la reserva' })
  }else {
    return res.status(200).json({message: 'Se eliminó la reserva', data: reserva})
  }
}  
export { findAll, findOne, add, update, remove, sanitizedReservaInput};