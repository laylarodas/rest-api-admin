import express from "express";
import router from "./router";
import db from './config/db';



//connect to db
async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log('Connected successfully to db')

    } catch (error) {
        console.log(error)
        console.log('Failed to connect to db')
    }
}

connectDB();


const server = express();

server.use('/api/products',router);


export default server;