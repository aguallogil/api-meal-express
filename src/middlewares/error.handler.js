// errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err); // Imprimir el error en la consola para fines de depuración
  
    // Respuesta al cliente con un mensaje de error detallado
    res.status(err.statusCode || 500).json({
      error: err.message || 'Ha ocurrido un error en el servidor',
    });
  };
  
  export default errorHandler;
  