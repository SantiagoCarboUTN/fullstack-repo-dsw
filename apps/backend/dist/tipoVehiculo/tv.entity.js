import crypto from 'node:crypto';
export class TipoVehiculo {
    constructor(nombre, descripcion, id = crypto.randomUUID()) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.id = id;
    }
}
//# sourceMappingURL=tv.entity.js.map