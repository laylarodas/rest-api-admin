import express from "express";
import router from "./router";
import db from './config/db';
import colors from 'colors';
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


//read data from form
server.use(express.json());

server.use('/api/products',router);


//Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

export default server;