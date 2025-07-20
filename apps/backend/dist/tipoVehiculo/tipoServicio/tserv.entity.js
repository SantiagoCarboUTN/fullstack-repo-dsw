import crypto from 'node:crypto';
export class TipoServicio {
    constructor(nombre, precio, id = crypto.randomUUID()) {
        this.nombre = nombre;
        this.precio = precio;
        this.id = id;
    }
}
//# sourceMappingURL=tserv.entity.js.map