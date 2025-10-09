import { Router } from "express"
import { TipoVehiculo } from "./tv.entity.js"
import {findAll, findOne, add, update, remove} from "./tv.controler.js" 
export const TipoVehiculoRouter = Router()

TipoVehiculoRouter.get('/', findAll)
TipoVehiculoRouter.get('/:id', findOne)
TipoVehiculoRouter.post('/',  add)
TipoVehiculoRouter.put('/:id', update)
TipoVehiculoRouter.delete('/:id', remove) 