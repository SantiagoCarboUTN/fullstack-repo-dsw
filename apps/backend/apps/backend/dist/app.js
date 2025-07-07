import express from "express";
import { Clientrouter } from "./clients/client.routes.js";
const app = express();
app.use(express.json());
app.use("/api/clients", Clientrouter);
app.listen(3000, () => {
    console.log('Server runnning on http://localhost:3000/');
});
//# sourceMappingURL=app.js.map