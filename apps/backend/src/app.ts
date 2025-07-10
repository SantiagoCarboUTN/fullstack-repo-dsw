import express from "express"
import { Clientrouter } from "./clients/client.routes.js";
import { TipoVehiculoRouter } from "./tipoVehiculo/tv.routes.js";
import { TipoServicioRouter } from "./tipoServicio/tserv.routes.js";
import { VehiculoRouter } from "./vehiculo/vehiculo.routes.js";
import { CocheraRouter } from "./cochera/cochera.routes.js";

const app = express()

app.use(express.json())

app.use("/api/clients", Clientrouter)

app.use("/api/tipoVehiculo", TipoVehiculoRouter)

app.use("/api/tipoServicio", TipoServicioRouter)

app.use("/api/vehiculo", VehiculoRouter)

app.use("/api/cochera",CocheraRouter)

app.listen(3000, ()=>{
  console.log('Server runnning on http://localhost:3000/')
})

