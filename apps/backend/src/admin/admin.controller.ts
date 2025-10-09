import { Request, Response, NextFunction } from 'express';
import { orm} from '../shared/db/orm.js';
import { Admin } from './admin.entity.js';

const em = orm.em

function sanitizedAdminInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedAdminInput = {
    nombre: req.body.nombre,
    email: req.body.email,
    password: req.body.password,
    id: req.body.id
  } 
  Object.keys(req.body.sanitizedAdminInput).forEach((key) => {
    if (req.body.sanitizedAdminInput[key] === undefined) {
      delete req.body.sanitizedAdminInput[key]
    }
  }) 
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const admins = await em.find(Admin, {});
    res.status(200).json({message: 'Lista de administradores', data: admins });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los administradores' }); 
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id);
    const admin = await em.findOneOrFail(Admin, { id}); 
    res.status(200).json({message: 'Administrador encontrado', data: admin })
  }catch (error: any) {
    res.status(500).json({ error: 'Error al obtener el administrador' });
  } 
}

async function add(req: Request, res: Response) {
  try {
    const newAdmin = em.create(Admin, req.body);
    await em.flush();
    res.status(201).json({ message: 'Administrador creado', data: newAdmin });
  }catch (error:any) { 
    res.status(500).json({ error: 'Error al crear el administrador' });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const admin = em.getReference (Admin,  id );
    em.assign(admin, req.body);
    await em.flush();
    res.status(200).json({ message: 'Administrador actualizado', data: admin });
  } catch (error:any) { 
    res.status(500).json({ error: 'Error al actualizar el administrador' });
}
}

async function remove(req: Request, res: Response) {
  try { 
    const id = Number.parseInt(req.params.id);
    const admin = em.getReference (Admin,  id );
    await em.removeAndFlush(admin);
    res.status(200).json({ message: 'Administrador eliminado' });
    } catch (error: any) {
      res.status(500).json({ error: 'Error al eliminar el administrador' });
  }
}

export { findAll, findOne, add, update, remove, sanitizedAdminInput};