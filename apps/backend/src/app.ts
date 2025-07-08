import express from "express"
import { Clientrouter } from "./clients/client.routes.js";
import { TipoVehiculo } from "./tipoVehiculo/tv.entity.js";
import { TipoVehiculoRouter } from "./tipoVehiculo/tv.routes.js";
const app = express()

app.use(express.json())

app.use("/api/clients", Clientrouter)

app.use("/api/tipoVehiculo", TipoVehiculoRouter)

app.listen(3000, ()=>{
  console.log('Server runnning on http://localhost:3000/')
})

