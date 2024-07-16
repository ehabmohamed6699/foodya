import mongoose from "mongoose";
import { StringXor } from "next/dist/compiled/webpack/webpack";

const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min:[8, "Too short password"]
    },
    image:{
        type: String,

    }
},{timestamps: true})

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    servingSize: {
        type: Number,
        required: true,
    },
    cookTime: {
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
    },
    instructions: {
        type: Array,
        required: true,
    },category:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

export const User = mongoose.models.User ||  mongoose.model('User', userSchema);
export const Recipe = mongoose.models.Recipe ||  mongoose.model('Recipe', recipeSchema);