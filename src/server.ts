import express from "express";
import router from "./router";
import db from './config/db';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";


//connect to db
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log(colors.bgCyan('Connected successfully to db'))

    } catch (error) {
        console.log(colors.bgRed.white('Failed to connect to db'))
    }
}

connectDB();

//express instance
const server = express();

//allow connections
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin == process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('CORS error'))
        }
    }
}
server.use(cors(corsOptions))

//read data from form
server.use(express.json());

server.use('/api/products',router);


//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

export default server;