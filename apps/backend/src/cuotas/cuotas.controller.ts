
import { Request, Response, NextFunction } from "express"
import { Cuota } from "./cuotas.entity.js"
import { orm } from '../shared/db/orm.js'
import { Reserva } from "../reserva/reserva.entity.js";
import { Cochera } from "../cochera/cochera.entity.js";
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import { Client } from "../clients/client.entity.js";
import { Admin } from "../admin/admin.entity.js";

const em = orm.em
function sanitizedCuotaInput(req: Request,res: Response,next: NextFunction) {
  req.body.sanitizedInput = {
    reserva:req.body.reserva,
    fechaInicio: req.body.fechaInicio,       
    state:req.body.state,
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
    const {state} = req.query //filtrado por estado
    const {clientId} = req.query //filtrado por cliente
    const filters:any = {}
    if(state){
      filters.state = state
    }
    if(clientId){
      filters.reserva = {vehiculo: {client: {id: Number(clientId)}}}
    }
    const cuotas = await em.find(Cuota, filters) 
    
    res.status(200).json({message: 'found all cuotas', data:cuotas})
  }catch(error:any){
    res.status(500).json({message: error.message})
  }
} 

async function findOne(req: Request, res: Response) {
  try{
/*    const patenteVehiculo = req.params.vehiculo
   const adminRef = em.getReference(Admin, Number(req.params.admin))
   const cocheraRef = await em.findOne(Cochera,{
      admin:adminRef,
      number:Number.parseInt(req.params.number)
    })
   const fechaIni = new Date(req.params.fechaInicio) 
   const fechaPago = new Date(req.params.fechaPago);
   const cuota = await em.findOneOrFail(Cuota, {
      reserva: {
        cochera: cocheraRef,
        vehiculo: { patente: patenteVehiculo },
        fechaInicio: fechaIni,
      },
      fechaPago: fechaPago,
    }) */

    const id = Number(req.params.id)
    const cuota = await em.findOneOrFail(Cuota, {id}) 
    res.status(200).json({message: 'found cuota', data:cuota})
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try{
    const adminRef = em.getReference(Admin, Number(req.body.sanitizedInput.reserva.cochera.admin))
    const cocheraRef = await em.findOne(Cochera,{
      admin:adminRef,
      number:Number.parseInt(req.body.sanitizedInput.reserva.cochera.number)
    })
    const vehiculoRef = em.getReference(Vehiculo,req.body.sanitizedInput.reserva.vehiculo )
    const fechaini = new Date(req.body.sanitizedInput.reserva.fechaInicio)
    const reservaRef = await em.findOne(Reserva,{
      cochera: cocheraRef,
      vehiculo: vehiculoRef,
      fechaInicio: fechaini
    }
    );
    if(!reservaRef){
      res.status(404).json({ message: "Reserva no encontrada" })
      return;
    }
    const cuota = em.create(Cuota,{...req.body.sanitizedInput,reserva: reservaRef})
    await em.flush()
    res.status(201).json({ message: "Se creó la cuota", data: cuota })
  }catch(error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try{
    /* const patenteVehiculo = req.params.vehiculo
    const adminRef = em.getReference(Admin, Number(req.params.admin))
    const cocheraRef = await em.findOne(Cochera,{
      admin:adminRef,
      number:Number.parseInt(req.params.number)
    })
    const fechaIni = new Date(req.params.fechaInicio)
    const fechaPago = new Date(req.params.fechaPago);
    const reservaRef = await em.findOne(Reserva,{
      cochera:cocheraRef,
      vehiculo: { patente: patenteVehiculo },
      fechaInicio: fechaIni
    })
    const cuotaUpdated = await em.findOneOrFail(Cuota, {
      reserva: reservaRef,
      fechaPago: fechaPago
    }) */
    const id = Number(req.params.id)
    const cuotaUpdated = await em.findOneOrFail(Cuota, {id}) 
    em.assign(cuotaUpdated, req.body.sanitizedInput)
    await em.flush()
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try{
   /*  const patenteVehiculo = req.params.vehiculoPatente
    const adminRef = em.getReference(Admin, Number(req.params.admin))
    const cocheraRef = await em.findOne(Cochera,{
      admin:adminRef,
      number:Number.parseInt(req.params.number)
    })
    const fechaIni = new Date(req.params.fechaInicio)
    const fechaPago = new Date(req.params.fechaPago);
    const cuotaDeleted = await em.findOneOrFail(Cuota, {
      reserva: {
        cochera: cocheraRef,
        vehiculo: { patente: patenteVehiculo },
        fechaInicio: fechaIni,
      },
      fechaPago: fechaPago,
    }) */
    const id = Number(req.params.id)
    const cuotaDeleted = await em.findOneOrFail(Cuota, {id}) 
    await em.removeAndFlush(cuotaDeleted)
    return res.status(200).json({ message: "Se eliminó la cuota", data: cuotaDeleted })
}catch(error:any){
  res.status(500).json({ message: error.message })
}
}  

export { findAll,findOne, add,sanitizedCuotaInput, update, remove };