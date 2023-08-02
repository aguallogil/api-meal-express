import mongoose from "mongoose";

const mealSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    registerdate:{type:Date,required:true}
});
const Meal=mongoose.model('Meal',mealSchema);
export default Meal;