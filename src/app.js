import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import loginRoutes from './routes/login.routes.js';
import mealRoutes from './routes/meal.routes.js';
import errorHandler from './middlewares/error.handler.js';
//instanciamos la app
const app=express();
//le ponemos cors para que nos permita peticiones de otros dominios
app.use(cors());
//para que use json
app.use(express.json())

//configuramos las rutas
app.use('/users',userRoutes)
app.use('/auth',loginRoutes);
app.use('/meals',mealRoutes);
//para los errores, esto debe ir despues de las rutas
app.use(errorHandler);
//exportamos la variable app
export default app