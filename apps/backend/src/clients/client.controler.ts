import { Request, Response, NextFunction } from 'express';
import { ClientRepository } from './client.repository.js';
import { Client } from './client.entity.js';
const repository = new ClientRepository();

function sanitizedClientInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedClientInput = {
  name: req.body.name,
  mail: req.body.mail,
  telefono: req.body.telefono,
  dni: req.body.dni,
  contraseña: req.body.contraseña,
  id: req.body.id
}
Object.keys(req.body.sanitizedClientInput).forEach((key) => {
  if (req.body.sanitizedClientInput[key] === undefined) {
    delete req.body.sanitizedClientInput[key]
  } 

})
next()
}

async function findAll(req: Request, res: Response) {
  res.json({ data: await repository.findAll() })
}

async function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const cliente = await repository.findOne({id});
  if (!cliente) {
    return res.status(404).json({ error: 'No se encontro el cliente' });
  }
  res.json({ data: cliente })
}

async function add(req: Request, res: Response) {
  const input = req.body.sanitizedClientInput

  const clientInput = new Client(
    input.name,
    input.contraseña,
    input.mail,
    input.telefono,
    input.dni,
  )
  const cliente = await repository.add(clientInput);
  return res.status(201).json({message: 'Se creó el cliente', data: cliente });
}

async function update(req: Request, res: Response) {
  req.body.sanitizedClientInput.id = req.params.id;
  const cliente= await repository.update( req.body.sanitizedClientInput);
  if (!cliente) {
    return res.status(404).json({ error: 'No se encontro el cliente' });
  }
  return res.status(200).json({message: 'Se actualizó el cliente', data: cliente });
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;
  const cliente = await repository.delete({id});
  if (!cliente) {
    return res.status(404).json({ error: 'No se encontro el cliente' });
  }else{
  return res.status(200).json({message: 'Se eliminó el cliente', data: cliente })}
}

export { findAll, findOne, add, update, remove, sanitizedClientInput};