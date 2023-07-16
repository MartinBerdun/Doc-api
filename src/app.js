import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import __dirname from './dirname.js';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
//pimero importo ambas dependencias 

const app = express();
const PORT = process.env.PORT || 8080;
const connection = mongoose.connect("mongodb+srv://mberdun:corsa123@codercluster.gk2ir0t.mongodb.net/ecommerce?retryWrites=true&w=majority")

const swaggerOPtions = {
    definition :{
        openapi : "3.0.1" ,//hace referencia a la version del estandar de la documentacion a usar
        info: {
            title: "Adopt Me API",
            description: "Documentacíon que soporta al sistema Adopt Me",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
   
    
}

//cada vez que hago algo en un yaml tengo que volver a iniciar el servidor asi lo reconoce

const spec = swaggerJSDoc(swaggerOPtions)


app.use(express.json());
app.use(cookieParser());

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(spec))

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
