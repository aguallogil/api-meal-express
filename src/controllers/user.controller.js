import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
export const insert=async(req,res)=>{
    try{
        const {email,password}=req.body;
        //veririficamos si existe el usuario
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'Ya existe un usuario con el mismo email'})
        }
        //creamos un nuevo usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser=new User({email:email,password:hashedPassword});
        await newUser.save();
        res.status(201).json({newUser});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Ha ocurrido un error al insertar el usuario'})
    }
};
export const getAll=async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Ha ocurrido un error al obtener la lista de usuarios'})
    }
}
export const get=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await User.find(id);
        if(!user){
            return res.status(404).json({message:'Usuario no encontrado'})
        }
        res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'Ha ocurrido un error al obtener el usuario'})
    }
}
export const update = async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
  
      // Buscar un usuario por su ID en la base de datos
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Actualizar el correo electrónico y la contraseña del usuario
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);
      await user.save();
  
      // Enviar una respuesta al cliente
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ha ocurrido un error al actualizar el usuario' });
    }
  };
  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscar un usuario por su ID en la base de datos
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Eliminar el usuario de la base de datos
      await user.remove();
  
      // Enviar una respuesta al cliente
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ha ocurrido un error al eliminar el usuario' });
    }
  };