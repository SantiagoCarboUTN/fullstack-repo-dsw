import { Router } from "express";
import { add } from "./pagos.controller.js";

export const WebhookRouter = Router()
WebhookRouter.post("/",add)

