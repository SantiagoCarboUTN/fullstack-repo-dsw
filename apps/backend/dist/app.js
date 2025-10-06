import express from "express";
import { Clientrouter } from "./clients/client.routes.js";
import { TipoVehiculoRouter } from "./tipoVehiculo/tv.routes.js";
import { TipoServicioRouter } from "./tipoServicio/tserv.routes.js";
import { VehiculoRouter } from "./vehiculo/vehiculo.routes.js";
import { CocheraRouter } from "./cochera/cochera.routes.js";
import { ReservaRouter } from "./reserva/reserva.routes.js";
import { CuotaRouter } from "./cuotas/cuotas.routes.js";
const app = express();
console.log("hola mundo");
app.use(express.json());
app.use("/api/clients", Clientrouter);
app.use("/api/tipoVehiculo", TipoVehiculoRouter);
app.use("/api/tipoServicio", TipoServicioRouter);
app.use("/api/vehiculo", VehiculoRouter);
app.use("/api/cochera", CocheraRouter);
app.use("/api/reserva", ReservaRouter);
app.use("/api/cuota", CuotaRouter);
app.listen(3000, () => {
    console.log('Server runnning on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map