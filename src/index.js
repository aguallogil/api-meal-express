//importamos app
import app from './app.js'
import connectDB from './db.js'
const port=process.env.PORT||3000
//conectamos a la base de datos
connectDB()
//iniciamos el servidor
app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto: ${port}`)
})
