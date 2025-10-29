import { Router } from "express";
import { findAll,findOne,add, update, remove ,sanitizedReservaInput} from "./reserva.controller.js";
export const ReservaRouter = Router()

ReservaRouter.get('/', findAll)
ReservaRouter.get('/:admin/:number/:vehiculo/:fechaInicio', findOne)
ReservaRouter.post('/', sanitizedReservaInput, add)
ReservaRouter.put('/:admin/:number/:vehiculo/:fechaInicio', sanitizedReservaInput, update)
ReservaRouter.delete('/:admin/:number/:vehiculo/:fechaInicio', remove)