import mysql from 'mysql2/promise'
import 'dotenv/config'
export const pool = mysql.createPool({
 uri: process.env.MYSQL_URL
})

/* async function testDB():Promise<void> {
  const [rows] = await pool.query(`CREATE TABLE IF NOT EXISTS tipo_vehiculo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40)
  );`);
  console.log(rows);
}

testDB();
console.log(process.env.MYSQL_URL) */