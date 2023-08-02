import Meal from "../models/meal.model.js";

// Insertar una nueva comida
export const insertMeal = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const existingMeal = await Meal.findOne({ name });
    if (existingMeal) {
      return res.status(400).json({ message: 'Ya existe un producto con ese nombre' });
    }

    const newMeal = new Meal({
      name,
      description,
      price,
      registerdate:Date.now(),
    });

    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al guardar' });
  }
};

// Actualizar una comida existente
export const updateMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, price,name } = req.body;

    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    meal.description = description || meal.description;
    meal.price = price || meal.price;
    meal.name=name||meal.name;
    await meal.save();
    res.status(200).json(meal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al actualizar' });
  }
};

// Eliminar una comida existente
export const deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await  Meal.findByIdAndDelete(id);
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al borrar' });
  }
};

// Obtener todas las comidas
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al listar' });
  }
};
export const getAllByName = async (req, res) => {
  try {
    const{name}=req.params;
    const meals = await Meal.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json(meals);
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al listar por nombre' });
  }
};

// Obtener una comida por su ID
export const getMealById = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await Meal.findById(id);
    if (!meal) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(meal);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocurrió un error al obtener' });
  }
};
const ITEMS_PER_PAGE = 10; 
export const getMealPagination=async (req,res)=>{
  try{
    const page = +req.params.page || 1;
    const totalItems = await Meal.countDocuments();
    const meals = await Meal.find()
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.status(200).json({
      meals,
      currentPage: page,
      totalPages: Math.ceil(totalItems / ITEMS_PER_PAGE),
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPrevPage: page > 1,
      nextPage: page + 1,
      prevPage: page - 1,
    });
  }
  catch(error){
    console.log(error);
    res.status(500).json({message:'Ha ocurrido un error'})
  }
};
