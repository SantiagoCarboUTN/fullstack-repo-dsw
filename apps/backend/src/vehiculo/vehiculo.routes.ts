import { Router } from "express"
import {findAll, findOne, add, update, remove} from "./vehiculo.controler.js" 
export const VehiculoRouter = Router()

VehiculoRouter.get('/', findAll)
VehiculoRouter.get('/:patente', findOne)
VehiculoRouter.post('/', add)
VehiculoRouter.put('/:patente', update)
VehiculoRouter.delete('/:patente', remove) 