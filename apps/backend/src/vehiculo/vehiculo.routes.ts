import { Router } from "express"
import { Vehiculo } from "./vehiculo.entity.js"
import {findAll, findOne, add, update, remove, sanitizedVehiculoInput} from "./vehiculo.controler.js" 
export const VehiculoRouter = Router()

VehiculoRouter.get('/', findAll)
VehiculoRouter.get('/:patente', findOne)
VehiculoRouter.post('/', sanitizedVehiculoInput, add)
VehiculoRouter.put('/:patente', sanitizedVehiculoInput, update)
VehiculoRouter.delete('/:patente', remove)