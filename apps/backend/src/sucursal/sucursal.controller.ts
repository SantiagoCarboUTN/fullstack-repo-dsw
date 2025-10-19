import { Request, Response, NextFunction } from "express"
import {orm} from "../shared/db/orm.js"
import { Sucursal } from "./sucursal.entity.js"
const em = orm.em



function sanitizedSucursalInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    imageUrl: req.body.imageUrl,
    admin: req.body.admin,
    id: req.body.id,
    direction:req.body.direction,
    razonSocial: req.body.razonSocial
  }
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    } 
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try{
    const Sucursals = await em.find(Sucursal, {});
    
    if(Sucursals.length === 0){
        res.status(404).json({message:'Sucursales not found'})
      }else{
        res.status(200).json({message: 'Lista de tipos', data: Sucursals });
      }
  }catch (error:any){
    res.status(500).json({ message: error.message});
  }
} 

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id);

    const sucursal = await em.findOneOrFail(Sucursal, { id}); 
    res.status(200).json({message: 'Sucursal encontrada', data: sucursal })
  }catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const newSucursal = em.create(Sucursal, req.body.sanitizedInput);
    await em.flush();

    res.status(201).json({ message: 'Sucursal creada', data: newSucursal });
  }catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const sucursal = em.findOneOrFail (Sucursal,  id );

    em.assign(Sucursal, req.body.sanitizedInput);
    await em.flush();

    res.status(200).json({ message: 'Tipo de servicio actualizado', data: sucursal });
  } catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try { 
    const id = Number.parseInt(req.params.id);
    const sucursal = em.findOneOrFail (Sucursal,  id );

    await em.removeAndFlush(sucursal);

    res.status(200).json({ message: 'Tipo de servicio eliminado' });
    } catch (error: any) {
      res.status(500).json({ message: error.message});
  }
}  

export { findAll, findOne, add, update, remove, sanitizedSucursalInput };

