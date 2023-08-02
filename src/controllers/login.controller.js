import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import config from "../config.js";
export const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }
          // Generar un token de acceso
        const accessToken = jwt.sign({ userId: user._id }, config.SECRET);

        // Enviar una respuesta al cliente
        res.status(200).json({ accessToken });
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Ha ocurrido un error al iniciar sesion'});
    }
};