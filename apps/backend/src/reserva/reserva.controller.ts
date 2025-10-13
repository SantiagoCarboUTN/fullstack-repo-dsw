import { Request, Response, NextFunction } from "express"
import { Reserva } from "./reserva.entity.js"
import { orm } from '../shared/db/orm.js'

const em = orm.em
function sanitizedReservaInput(req: Request,res: Response,next: NextFunction) {
  req.body.sanitizedInput = {
    cochera: req.body.cochera,   
    vehiculo: req.body.vehiculo, 
    tipoServicio: req.body.tipoServicio, 
    fechaInicio: req.body.fechaInicio,       
    fechaFin: req.body.fechaFin,
    estado: req.body.estado              
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
  /*   const {state}= req.params
    if(state){
      const reservas = await em.find(Reserva, {state: state },{ populate: ['vehiculo', 'cochera'] })
      res.status(200).json({message: `found all ${req.params.state} reservas`, data:reservas})
    } */
    const reservas = await em.find(Reserva, {},{ populate: ['vehiculo', 'cochera'] })
    res.status(200).json({message: 'found all reservas', data:reservas})
  }catch(error:any){
    res.status(500).json({message: error.message})
  }
} 

async function findOne(req: Request, res: Response) {
  try{
    const patenteVehiculo = req.params.vehiculo
    const numberCochera = Number.parseInt(req.params.cochera)
    const fechaini = new Date(req.params.fechaInicio)
    const reserva = await em.findOneOrFail(Reserva, {
      cochera: { number:numberCochera },
      vehiculo: { patente: patenteVehiculo },
      fechaInicio: fechaini}
    )
    res.status(200).json({message: 'found reserva', data:reserva})
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try{
    const reserva = em.create(Reserva,req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: "Se creó la reserva", data: reserva })
  }catch(error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try{
    const patenteVehiculo = req.params.vehiculo
    const numberCochera = Number.parseInt(req.params.cochera)
    const fechaini = new Date(req.params.fechaInicio)
    const reservaUpdated = await em.findOneOrFail(Reserva, {
        cochera: { number:numberCochera },
        vehiculo: { patente: patenteVehiculo },
        fechaInicio: fechaini}
    )
  em.assign(reservaUpdated, req.body.sanitizedInput)
  await em.flush()
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try{
    const patenteVehiculo = req.params.vehiculo
    const numberCochera = Number.parseInt(req.params.cochera)
    const fechaini = new Date(req.params.fechaInicio)
    const reservaDeleted = await em.findOneOrFail(Reserva, {
      cochera: { number:numberCochera },
      vehiculo: { patente: patenteVehiculo },
      fechaInicio: fechaini}
    )
    await em.removeAndFlush(reservaDeleted)
    return res.status(200).json({ message: "Se eliminó la reserva", data: reservaDeleted })
}catch(error:any){
  res.status(500).json({ message: error.message })
}
}  

export { findAll,findOne, add,sanitizedReservaInput, update, remove };

