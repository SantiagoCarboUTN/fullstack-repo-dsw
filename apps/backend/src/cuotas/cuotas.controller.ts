
import { Request, Response, NextFunction } from "express"
import { Cuota } from "./cuotas.entity.js"
import { orm } from '../shared/db/orm.js'
import { Reserva } from "../reserva/reserva.entity.js";

const em = orm.em
function sanitizedCuotaInput(req: Request,res: Response,next: NextFunction) {
  req.body.sanitizedInput = {
    cocheraNumero: req.body.cocheraNumero,   
    vehiculoPatente: req.body.vehiculoPatente, 
    fechaInicio: req.body.fechaInicio,       
    estado:req.body.estado,
    monto:req.body.monto,    
    fechaPago: req.body.fechaPago
  };


  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try{
    const cuotas = await em.find(Cuota, {})
    res.status(200).json({message: 'found all cuotas', data:cuotas})
  }catch(error:any){
    res.status(500).json({message: error.message})
  }
} 

async function findOne(req: Request, res: Response) {
  try{
    const patenteVehiculo = req.params.vehiculoPatente
    const numeroCochera = Number.parseInt(req.params.cocheraNumero)
    const fechaIni = new Date(req.params.fechaInicio)
    const fechaPago = Number(req.params.fechaPago);
    const cuota = await em.findOneOrFail(Cuota, {
      reserva: {
        cochera: { numero: numeroCochera },
        vehiculo: { patente: patenteVehiculo },
        fechaInicio: fechaIni,
      },
      fechaPago: fechaPago,
    })
    res.status(200).json({message: 'found cuota', data:cuota})
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try{
    const cuota = em.create(Cuota,req.body)
    await em.flush()
    res.status(201).json({ message: "Se creó la cuota", data: cuota })
  }catch(error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try{
    const patenteVehiculo = req.params.vehiculoPatente
    const numeroCochera = Number.parseInt(req.params.cocheraNumero)
    const fechaIni = new Date(req.params.fechaInicio)
    const fechaPago = Number(req.params.fechaPago);
    const cuotaUpdated = await em.findOneOrFail(Cuota, {
      reserva: {
        cochera: { numero: numeroCochera },
        vehiculo: { patente: patenteVehiculo },
        fechaInicio: fechaIni,
      },
      fechaPago: fechaPago,
    })
    em.assign(cuotaUpdated, req.body.sanitizedInput)
    await em.flush()
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try{
    const patenteVehiculo = req.params.vehiculoPatente
    const numeroCochera = Number.parseInt(req.params.cocheraNumero)
    const fechaIni = new Date(req.params.fechaInicio)
    const fechaPago = Number(req.params.fechaPago);
    const cuotaDeleted = await em.findOneOrFail(Cuota, {
      reserva: {
        cochera: { numero: numeroCochera },
        vehiculo: { patente: patenteVehiculo },
        fechaInicio: fechaIni,
      },
      fechaPago: fechaPago,
    })
    await em.removeAndFlush(cuotaDeleted)
    return res.status(200).json({ message: "Se eliminó la cuota", data: cuotaDeleted })
}catch(error:any){
  res.status(500).json({ message: error.message })
}
}  

export { findAll,findOne, add,sanitizedCuotaInput, update, remove };