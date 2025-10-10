import { Request, Response, NextFunction } from 'express';
import { orm} from '../shared/db/orm.js';
import { Client } from './client.entity.js';
const em = orm.em

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
  try {
    const clientes = await em.find(Client, {});
    res.status(200).json({message: 'Lista de clientes', data: clientes });
  } catch (error:any) {
    res.status(500).json({message: error.message}); 
  }
}

async function findOne(req: Request, res: Response) {
  try{
  const id = Number.parseInt(req.params.id)
  ;
  const cliente = await em.findOneOrFail(Client, {id}); res.status(200).json({message: 'Cliente encontrado', data: cliente })
}catch (error: any) {
  res.status(500).json({ message: error.message });
  }
}


async function add(req: Request, res: Response) {
  try {
    const newClient = em.create(Client, req.body);
    await em.flush();
    res.status(201).json({ message: 'Cliente creado', data: newClient });
  }catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const cliente = em.getReference (Client,  id );
    em.assign(cliente, req.body);
    await em.flush();
    res.status(200).json({ message: 'Cliente actualizado', data: cliente });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try { 
    const id = Number.parseInt(req.params.id);
    const cliente = em.getReference (Client,  id );
    await em.removeAndFlush(cliente);
    res.status(200).json({ message: 'Cliente eliminado' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove, sanitizedClientInput}; 