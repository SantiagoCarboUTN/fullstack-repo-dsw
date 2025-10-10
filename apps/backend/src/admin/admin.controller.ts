import { Request, Response, NextFunction } from 'express';
import { orm} from '../shared/db/orm.js';
import { Admin } from './admin.entity.js';

const em = orm.em

function sanitizedAdminInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    email: req.body.email,
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
    const admins = await em.find(Admin, {});
    res.status(200).json({message: 'Lista de administradores', data: admins });
  } catch (error: any) {
    res.status(500).json({message: error.message}); 
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id);
    const admin = await em.findOneOrFail(Admin, { id}); 
    res.status(200).json({message: 'Administrador encontrado', data: admin })
  }catch (error: any) {
    res.status(500).json({ message: error.message });
  } 
}

async function add(req: Request, res: Response) {
  try {
    const newAdmin = em.create(Admin, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'Administrador creado', data: newAdmin });
  }catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const admin = em.getReference (Admin,  id );
    em.assign(admin, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'Administrador actualizado', data: admin });
  } catch (error:any) { 
    res.status(500).json({ message: error.message });
}
}

async function remove(req: Request, res: Response) {
  try { 
    const id = Number.parseInt(req.params.id);
    const admin = em.getReference (Admin,  id );
    await em.removeAndFlush(admin);
    res.status(200).json({ message: 'Administrador eliminado' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove, sanitizedAdminInput};