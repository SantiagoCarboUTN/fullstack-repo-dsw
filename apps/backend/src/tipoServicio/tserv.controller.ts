import { Request, Response, NextFunction } from "express"
import {orm} from "../shared/db/orm.js"
import { TipoServicio } from "./tserv.entity.js"
const em = orm.em



function sanitizedTipoServicioInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    precioCuota: req.body.precioCuota,
    cantCuotas: req.body.cantCuotas,
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
  try{
    const tipoServicios = await em.find(TipoServicio, {});
    
    if(tipoServicios.length === 0){
        res.status(404).json({message:'tipos not found'})
      }else{
        res.status(200).json({message: 'Lista de tipos', data: tipoServicios });
      }
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
    const newTipoServicio = em.create(TipoServicio, req.body.sanitizedInput);
    await em.flush();

    res.status(201).json({ message: 'Tipo de servicio creado', data: newTipoServicio });
  }catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const tipoServicio = await em.findOneOrFail (TipoServicio,  id );

    em.assign(tipoServicio, req.body.sanitizedInput);
    await em.flush();

    res.status(200).json({ message: 'Tipo de servicio actualizado', data: tipoServicio });
  } catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try { 
    const id = Number.parseInt(req.params.id);
    const tipoServicio = await em.findOneOrFail (TipoServicio,  id );

    await em.removeAndFlush(tipoServicio);

    res.status(200).json({ message: 'Tipo de servicio eliminado' });
    } catch (error: any) {
      res.status(500).json({ message: error.message});
  }
}  

export { findAll, findOne, add, update, remove, sanitizedTipoServicioInput };

