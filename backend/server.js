const express = require('express');
const cors = require('cors');
require('dotenv').config();

const Admin = require('./Routers/usersRouters');
const login = require('./Routers/loginRouters');
const dashboardRouter = require('./Routers/dashboardRouters');

const { connectMySQL } = require('./config/mysql');
const { connectMongo } = require('./config/mongo');

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/login", login);
app.use("/users", Admin);
app.use("/api", dashboardRouter);

const startServer = async () => {
    try {
        await connectMySQL();
        await connectMongo();

        app.listen(port, () => {
            console.log(`Servidor backend corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
};

startServer();
