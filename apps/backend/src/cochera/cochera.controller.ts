import { Request, Response, NextFunction } from "express"
import { Cochera } from "./cochera.entity.js"
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizedCocheraInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    number: req.body.number,
    state: req.body.state,
    admin: req.body.admin,
    tipoVehiculo: req.body.tipoVehiculo,
    reservas: req.body.reservas,
    sucursal: req.body.sucursal
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
    const { state, vehicleType, admin } = req.query;
    const filters: any = {}; 

    if (state) {
      filters.state = state; 
    }

    if (admin) {
      filters.admin = admin;
    }

    if (vehicleType) {
      filters.tipoVehiculo = vehicleType; 
    }

    if (!admin && !state && !vehicleType){ //Todas las cocheras
      const cocheras = await em.find(Cochera, {});
      if (cocheras.length === 0){
        res.status(404).json({message:'cocheras not found'})
      }else{
      res.status(200).json({
        message: "Lista de cocheras",
        data: cocheras,
        })
      }
      return;
    }

    if(state =='ocupada'){ //listado de cocheras ocupadas
      const cocheras = await em.find(Cochera, filters, { populate: ['reservas'],filters: { reservas: {state: 'ACTIVA'} } });
      if (cocheras.length === 0){
        res.status(404).json({message:'No hay cocheras ocupadas'})
      }else{
      res.status(200).json({
        message: "found cocheras",
        data: cocheras,
        })
      }
      return;
    }

    const cocheras = await em.find(Cochera, filters,{ populate: ['tipoVehiculo','sucursal']});
    
    const filtersCount: any = [] //filtros para obtener las cantidades de cocheras ocupadas/desocupadas
   
    filtersCount.admin = admin

    const cantOcupadas = await em.count(Cochera, {admin:filtersCount.admin, state:'ocupada'});
    const cantCocheras = await em.count(Cochera,{admin:filtersCount.admin});
    const cantDesocupadas = cantCocheras -cantOcupadas

    if (cocheras.length === 0){
      res.status(404).json({message:'cocheras not found'})
    }else{
      res.status(200).json({
        message: "found cocheras",
        data: cocheras, cantDesocupadas, cantOcupadas
        })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const number = Number.parseInt(req.params.number)
    const cochera = await em.findOneOrFail(Cochera, {number})
    res.status(200).json({message: 'Found cochera', data:cochera})
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}
async function add(req: Request, res: Response) {
  try{
    const cochera = em.create(Cochera,req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: "Se creó la cochera", data: cochera })
  }catch(error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try{
    const number = Number.parseInt(req.params.number)
    const cocheraUpdated = await  em.findOneOrFail(Cochera, {number})

    em.assign(cocheraUpdated, req.body.sanitizedInput)
    await em.flush()

    res.status(201).json({ message: "Se actualizó la cochera", data: cocheraUpdated })
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try{
    const number = Number.parseInt(req.params.number)
    const cocheraDeleted =  await em.findOneOrFail(Cochera, {number})

    await em.removeAndFlush(cocheraDeleted)

    res.status(200).json({ message: "Se eliminó la cochera", data: cocheraDeleted })
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

export { findAll,findOne, add,sanitizedCocheraInput, update, remove };

