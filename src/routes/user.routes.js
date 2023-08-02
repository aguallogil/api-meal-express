import  express  from "express";
import {deleteUser, getAll, insert, update,get}from './../controllers/user.controller.js'
import authenticateToken from '../middlewares/auth.guard.js';
const router=express.Router();

router.post('/insert',authenticateToken,insert);
router.get('/getAll',authenticateToken,getAll);
router.get('/:id',authenticateToken,get);
router.patch('/:id',authenticateToken,update);
router.delete('/:id',authenticateToken,deleteUser)

export default router;