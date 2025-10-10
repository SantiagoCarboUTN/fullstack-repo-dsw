import { Request, Response, NextFunction } from "express"
import {orm} from "../shared/db/orm.js"
import { TipoServicio } from "./tserv.entity.js"
const em = orm.em



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
  try{
    const tipoServicios = await em.find(TipoServicio, {});
    res.status(200).json({message: 'Lista de tipos de servicios', data: tipoServicios }); 
  }catch (error:any){
    res.status(500).json({ message: error.message});
  }
} 

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id);
    const tipoServicio = await em.findOneOrFail(TipoServicio, { id}); 
    res.status(200).json({message: 'Tipo de servicio encontrado', data: tipoServicio })
  }catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const newTipoServicio = em.create(TipoServicio, req.body);
    await em.flush();
    res.status(201).json({ message: 'Tipo de servicio creado', data: newTipoServicio });
  }catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoServicio = em.getReference (TipoServicio,  id );
    em.assign(tipoServicio, req.body);
    await em.flush();
    res.status(200).json({ message: 'Tipo de servicio actualizado', data: tipoServicio });
  } catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try { 
    const id = Number.parseInt(req.params.id);
    const tipoServicio = em.getReference (TipoServicio,  id );
    await em.removeAndFlush(tipoServicio);
    res.status(200).json({ message: 'Tipo de servicio eliminado' });
    } catch (error: any) {
      res.status(500).json({ message: error.message});
  }
}  

export { findAll, findOne, add, update, remove, sanitizedTipoServicioInput };

