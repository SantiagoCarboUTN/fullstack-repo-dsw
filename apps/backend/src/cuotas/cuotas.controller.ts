/* 
import { Request, Response, NextFunction } from 'express'
import { Cuota } from "./cuotas.entity.js";
import { CuotaRepository } from "./cuotas.repository.js";
const repository = new CuotaRepository()
function sanitizedCuotaInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedCuotaInput = {
  fecha: req.body.fecha,
  estado: req.body.estado,
  id: req.body.id
}
Object.keys(req.body.sanitizedCuotaInput).forEach((key) => {
  if (req.body.sanitizedCuotaInput[key] === undefined) {
    delete req.body.sanitizedCuotaInput[key]
  } 
})
next()
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
}
async function findOne(req: Request, res: Response) {
  const id = req.params.id
  const cuota = await repository.findOne({id})
  if (!cuota) {
    return res.status(404).json({ error: 'No se encontró la cuota' })
  }
  res.json({ data: cuota })
}
async function add(req: Request, res: Response) {
  const input = req.body.sanitizedCuotaInput

  const cuotaInput = new Cuota(
    input.fecha,
    input.estado,
    input.id
  )
  const cuota = await repository.add(cuotaInput)
  return res.status(201).json({message: 'Se creó la cuota', data: cuota })
} 
async function update(req: Request, res: Response) {
  req.body.sanitizedCuotaInput.id = req.params.id
  const cuota = await repository.update(req.body.sanitizedCuotaInput)
  if (!cuota) {
    return res.status(404).json({ error: 'No se encontró la cuota' })
  }
  return res.status(200).json({message: 'Se actualizó la cuota', data: cuota })
}
async function remove(req: Request, res: Response) {
  const id = req.params.id
  const cuota = await repository.delete({id})
  if (!cuota) {
    return res.status(404).json({ error: 'No se encontró la cuota' })
  }else {
    return res.status(200).json({message: 'Se eliminó la cuota', data: cuota})
  }
}  
export { findAll, findOne, add, update, remove, sanitizedCuotaInput}; */