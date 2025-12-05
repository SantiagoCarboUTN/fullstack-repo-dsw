import { Request, Response, NextFunction } from 'express';
import { orm} from '../shared/db/orm.js';
import { populate } from 'dotenv';
import { ForeignKeyConstraintViolationException, UniqueConstraintViolationException, ValidationError } from '@mikro-orm/core';
import { User } from './user.entity.js';

const em = orm.em

function sanitizedUserInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
  complete_name: req.body.complete_name,
  mail: req.body.mail,
  phone: req.body.phone,
  dni: req.body.dni,
  password: req.body.password,
  id: req.body.id,
  type: req.body.type
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
    const users = await em.find(User, {});

    if(users.length === 0){
      res.status(404).json({message: 'Users not found'})
    }else{
      res.status(200).json({message: 'Lista de Users', data: users })
    }
    
  } catch (error:any) {
    res.status(500).json({message: error.message}); 
  }
}

async function findOne(req: Request, res: Response) {
  try{
  const id = Number.parseInt(req.params.id)
  const user = await em.findOneOrFail(User, {id}); res.status(200).json({message: 'User encontrado', data: user })
}catch (error: any) {
  res.status(500).json({ message: error.message });
  }
}


async function add(req: Request, res: Response) {
  try {
    const newUser = em.create(User, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({ message: 'user creado', data: newUser });
  }catch (error:any) { 
    /* valido los atributos unique  */
    if (error instanceof UniqueConstraintViolationException) {
      return res.status(400).json({ message: 'Ese email ya está registrado' });
    }
    
    if (error instanceof ValidationError) {
      return res.status(422).json({ message: 'Datos inválidos', errors: error.message });
    }
   
    res.status(500).json({ message: 'Error inesperado al crear el User' });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(User,  id );

    em.assign(user, req.body.sanitizedInput);
    await em.flush();
    res.status(200).json({ message: 'user actualizado', data: user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try { 
    const id = Number.parseInt(req.params.id);
    const user = await em.findOneOrFail(User,  id, {populate:["vehiculos"]} );

    await em.removeAndFlush(user);
    res.status(200).json({ message: 'user eliminado' , data:user});
    } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove, sanitizedUserInput}; 