import express from 'express';
import authenticateToken from '../middlewares/auth.guard.js';
import {insertMeal,updateMeal,deleteMeal,getAllMeals,getMealById, getAllByName,getMealPagination} from '../controllers/meal.controller.js';

const routes=express.Router();

routes.post('/insert',authenticateToken,insertMeal);
routes.get('/:id',authenticateToken,getMealById);
routes.get('/',authenticateToken,getAllMeals);
routes.get('/getAllByName/:name',authenticateToken,getAllByName);
routes.get('/pagination/:page',authenticateToken,getMealPagination)
routes.patch('/:id',authenticateToken,updateMeal);
routes.delete('/:id',authenticateToken,deleteMeal);

export default routes;
