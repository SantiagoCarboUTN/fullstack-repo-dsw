/* import { Request, Response, NextFunction } from "express"
import { TipoServicioRepository } from "./tserv.repository.js"
import { TipoServicio } from "./tserv.entity.js"
const repository = new TipoServicioRepository()

function sanitizedTipoServicioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedTipoServicioInput = {
    nombre: req.body.nombre,
    precio: req.body.precio,
    id: req.body.id
  }
  Object.keys(req.body.sanitizedTipoServicioInput).forEach((key) => {
    if (req.body.sanitizedTipoServicioInput[key] === undefined) {
      delete req.body.sanitizedTipoServicioInput[key]
    } 
  })
  next()
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
} 

async function findOne(req: Request, res: Response) {
  const id = req.params.id
  const tipoServicio = await repository.findOne({ id })
  if (!tipoServicio) {
    return res.status(404).json({ error: "No se encontró el tipo de servicio" })
  }
  res.json({ data: tipoServicio })
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedTipoServicioInput
  const tipoServicioInput = new TipoServicio(
    input.nombre,
    input.precio,
    input.id
  )
  const tipoServicio = await repository.add(tipoServicioInput)
  return res.status(201).json({ message: "Se creó el tipo de servicio", data: tipoServicio })
}

async function update(req: Request, res: Response) {
  req.body.sanitizedTipoServicioInput.id = req.params.id
  const tipoServicio = await repository.update(req.body.sanitizedTipoServicioInput)
  if (!tipoServicio) {
    return res.status(404).json({ error: "No se encontró el tipo de servicio" })
  }
  return res.status(200).json({ message: "Se actualizó el tipo de servicio", data: tipoServicio })
}

async function remove(req: Request, res: Response) {
  const id = req.params.id
  const tipoServicio = await repository.delete({ id })
  if (!tipoServicio) {
    return res.status(404).json({ error: "No se encontró el tipo de servicio" })
  }else {
    return res.status(200).json({ message: "Se eliminó el tipo de servicio", data: tipoServicio })
  } 
}  

export { findAll, findOne, add, update, remove, sanitizedTipoServicioInput };

 */