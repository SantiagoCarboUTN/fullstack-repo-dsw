import crypto from 'node:crypto';
export class Client {
    constructor(name, contraseña, mail, telefono, dni, id = crypto.randomUUID()) {
        this.name = name;
        this.contraseña = contraseña;
        this.mail = mail;
        this.telefono = telefono;
        this.dni = dni;
        this.id = id;
    }
}
//# sourceMappingURL=client.entity.js.map