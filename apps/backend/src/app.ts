import express from "express"
import 'reflect-metadata'
import { ClientRouter } from "./clients/client.routes.js";
import { TipoServicioRouter } from "./tipoServicio/tserv.routes.js";
import { CocheraRouter } from "./cochera/cochera.routes.js";
import { ReservaRouter } from "./reserva/reserva.routes.js";
import { CuotaRouter } from "./cuotas/cuotas.routes.js";
import { orm, syncSchema } from "./shared/db/orm.js";
import { RequestContext } from "@mikro-orm/mysql";
import { VehiculoRouter } from "./vehiculo/vehiculo.routes.js";
import { TipoVehiculoRouter } from "./tipoVehiculo/tv.routes.js"; 

const app = express()

app.use(express.json())

app.use((req,res,next)=>{
  RequestContext.create(orm.em, next)
})

app.use("/api/vehiculo", VehiculoRouter)
app.use("/api/tipoVehiculo", TipoVehiculoRouter)
app.use("/api/clients", ClientRouter)

app.use("/api/tipoServicio", TipoServicioRouter)

app.use("/api/vehiculo", VehiculoRouter)

app.use("/api/cochera",CocheraRouter)

app.use("/api/reserva",ReservaRouter)

app.use("/api/cuota",CuotaRouter)

await syncSchema() //solo en desarrollo, nunca en produccion
app.listen(3000, ()=>{
  console.log('Server runnning on http://localhost:3000/')
})

