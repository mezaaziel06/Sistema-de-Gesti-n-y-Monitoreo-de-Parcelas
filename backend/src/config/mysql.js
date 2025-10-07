const mysql = require('mysql2/promise');

let pool;

const connectMySQL = async () => {
    try {
        pool = await mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });
        console.log(" Conectado a MySQL (AlwaysData)");
    } catch (error) {
        console.error(" Error al conectar con MySQL:", error.message);
        throw error;
    }
};

const getMySQLPool = () => pool;

module.exports = { connectMySQL, getMySQLPool };
