import { Router } from "express";
import { create } from "./pagos.controller.js";

export const PagosRouter = Router()
PagosRouter.post("/:id",create)
