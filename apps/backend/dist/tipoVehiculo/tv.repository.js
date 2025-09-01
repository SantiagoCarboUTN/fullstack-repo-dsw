import { pool } from "../shared/db/conn.js";
export class TipoVehiculoRepository {
    async findAll() {
        try {
            const [tvs] = await pool.query('SELECT * FROM tipo_vehiculo');
            return tvs;
        }
        catch (err) {
            console.error('Error en la consulta:', err);
        }
    }
    async findOne(item) {
        try {
            const [tv] = await pool.query('SELECT * FROM tipo_vehiculo WHERE id = ?', [item.id]);
            if (tv.length > 0) {
                return tv[0];
            }
            return undefined;
        }
        catch (err) {
            console.error('Error en la consulta:', err);
        }
    }
    async add(item) {
        try {
            const { ...tvatributes } = item;
            const [inserted] = await pool.query('INSERT INTO tipo_vehiculo SET ?', [tvatributes]); /* --> insert no devuelve un arreglo, devuelve un resultSetHeader */
            if (inserted.affectedRows === 0) {
                return undefined;
            }
            return { ...item, id: inserted.insertId };
        }
        catch (err) {
            console.error('Error en la consulta:', err);
        }
    }
    async update(item) {
        try {
            const { id, ...tvAtributes } = item;
            const [updated] = await pool.query('UPDATE tipo_vehiculo SET ? WHERE id = ?', [tvAtributes, id]);
            if (updated.affectedRows === 0) {
                return undefined;
            }
            return item;
        }
        catch (err) {
            console.error('Error en la consulta:', err);
        }
    }
    async delete(item) {
        try {
            const deletedtv = await this.findOne(item);
            const [deleted] = await pool.query('DELETE FROM tipo_vehiculo WHERE id = ?', item.id);
            if (deleted.affectedRows === 0) {
                return undefined;
            }
            return deletedtv;
        }
        catch (err) {
            console.error('Error en la consulta:', err);
        }
    }
}
//# sourceMappingURL=tv.repository.js.map