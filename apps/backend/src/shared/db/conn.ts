import mysql from 'mysql2/promise'
import 'dotenv/config'
export const pool = mysql.createPool({
 uri: process.env.MYSQL_URL
})
async function testDB():Promise<void> {
  const [rows] = await pool.query('SELECT NOW() as now');
  console.log(rows);
}

testDB();