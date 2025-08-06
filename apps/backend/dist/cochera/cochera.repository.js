import { Cochera } from "./cochera.entity.js";
const cocheras = [
    new Cochera('12a', 'Ocupada'),
];
export class CocheraRepository {
    async findAll() {
        return await cocheras;
    }
    async findOne(item) {
        return await cocheras.find((co) => co.numero === item.numero);
    }
    add(item) {
        cocheras.push(item);
        return item;
    }
    update(item) {
        const numCochera = cocheras.findIndex((co) => co.numero === item.numero);
        if (numCochera !== -1) {
            cocheras[numCochera] = { ...cocheras[numCochera], ...item };
        }
        return cocheras[numCochera];
    }
    delete(item) {
        const numCochera = cocheras.findIndex((ts) => ts.numero === item.numero);
        if (numCochera !== -1) {
            const deletedCochera = cocheras[numCochera];
            cocheras.splice(numCochera, 1)[0];
            return deletedCochera;
        }
    }
}
//# sourceMappingURL=cochera.repository.js.map