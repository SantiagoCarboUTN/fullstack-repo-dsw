import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER ||'root',
  password: process.env.DB_PASSWORD || 'dsw2025',
  database: process.env.DB_NAME ||  'CocheraTpDSW',
  connectionLimit: 10 ,
  port: 3308
})
