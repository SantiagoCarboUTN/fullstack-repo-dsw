import { Request, Response, NextFunction } from 'express';
import { ClientRepository } from './client.repository.js';
const repository = new ClientRepository();

function sanitizeClientInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
  name: req.body.name,
  mail: req.body.mail,
  telefono: req.body.telefono,
  dni: req.body.dni,
  contraseña: req.body.contraseña,
  id: req.body.id
}
Object.keys(req.body.sanitizedInput).forEach((key) => {
  if (req.body.sanitizedInput[key] === undefined) {
    delete req.body.sanitizedInput[key]
  } 

})
next()
}

function findAll(req: Request, res: Response) {
  res.json({ data: repository.findAll() })
}

function findOne(req: Request, res: Response) {
  const id = req.params.id;
  const cliente = repository.findOne({id});
  if (!cliente) {
    return res.status(404).json({ error: 'No se encontro el cliente' });
  }
  res.json({ data: cliente })
}

export { findAll, findOne , sanitizeClientInput};