import { Request, Response, NextFunction } from "express"
import { Cochera } from "./cochera.entity.js"

import { orm } from '../shared/db/orm.js'
import { t } from '@mikro-orm/core'
const em = orm.em

function sanitizedCocheraInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    numero: req.body.numero,
    estado: req.body.estado
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
    const cocheras = await em.find(Cochera, {})
    res.status(200).json({message: 'found all cocheras', data:cocheras})
  }catch(error:any){
    res.status(500).json({message: error.message})
  }
} 

async function findOne(req: Request, res: Response) {
  try{
    const numero = Number.parseInt(req.params.numero)
    const cochera = await em.findOneOrFail(Cochera, {numero})
    res.status(200).json({message: 'found cochera', data:cochera})
    if (!cochera) {
      return res.status(404).json({ error: "cochera not found" })
    }
    res.json({ data: cochera })
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try{
    const cochera = em.create(Cochera,req.body)
    await em.flush()
    res.status(201).json({ message: "Se creó la cochera", data: cochera })
  }catch(error:any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try{
    const numero = Number.parseInt(req.params.numero)
    const cocheraUpdated =  em.findOneOrFail(Cochera, {numero})
    em.assign(cocheraUpdated, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: "Se actualizó la cochera", data: cocheraUpdated })
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try{
    const numero = Number.parseInt(req.params.numero)
    const cocheraDeleted =  em.findOneOrFail(Cochera, {numero})
    await em.removeAndFlush(cocheraDeleted)
    return res.status(200).json({ message: "Se eliminó la cochera", data: cocheraDeleted })
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}  

export { findAll,findOne, add,sanitizedCocheraInput, update, remove };

