const mongoose = require('mongoose');

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(" Conectado a MongoDB Atlas");
    } catch (error) {
        console.error(" Error al conectar con MongoDB:", error.message);
        throw error;
    }
};

module.exports = { connectMongo };
