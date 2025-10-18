import { Request, Response, NextFunction } from 'express';
import { orm} from '../shared/db/orm.js';
import { Client } from './client.entity.js';
const em = orm.em

function sanitizedClientInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
  complete_name: req.body.complete_name,
  mail: req.body.mail,
  phone: req.body.phone,
  dni: req.body.dni,
  password: req.body.password,
  id: req.body.id
}
Object.keys(req.body.sanitizedInput).forEach((key) => {
  if (req.body.sanitizedInput[key] === undefined) {
    delete req.body.sanitizedInput[key]
  } 

})
next()
}

async function findAll(req: Request, res: Response) {
  try {
    const clientes = await em.find(Client, {});

    if(clientes.length === 0){
      res.status(404).json({message: 'Clientes not found'})
    }else{
      res.status(200).json({message: 'Lista de clientes', data: clientes })
    }
    
  } catch (error:any) {
    res.status(500).json({message: error.message}); 
  }
}

async function findOne(req: Request, res: Response) {
  try{
  const id = Number.parseInt(req.params.id)
  const cliente = await em.findOneOrFail(Client, {id}); res.status(200).json({message: 'Cliente encontrado', data: cliente })
}catch (error: any) {
  res.status(500).json({ message: error.message });
  }
}


async function add(req: Request, res: Response) {
  try {
    const newClient = em.create(Client, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Cliente creado', data: newClient });
  }catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const cliente = em.findOneOrFail(Client,  id );

    em.assign(cliente, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Cliente actualizado', data: cliente });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try { 
    const id = Number.parseInt(req.params.id);
    const cliente = em.findOneOrFail(Client,  id );

    await em.removeAndFlush(cliente);
    res.status(200).json({ message: 'Cliente eliminado' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove, sanitizedClientInput}; 