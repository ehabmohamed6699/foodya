import { Recipe, User } from "@/lib/models"
import { connectToDB } from "@/lib/utils"
import bcrypt from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"

const secret = process.env.NEXTAUTH_SECRET;

const authorizationCheck = (req:Request, data:{userId:String}) => {
        const token = req.headers.get('Authorization')?.split(' ')[1];

        if (!token) {
            return false;
        }

        if (!secret) {
            throw new Error('JWT secret is not defined');
        }

        let decodedToken: JwtPayload;
        try {
            decodedToken = jwt.verify(token, secret) as JwtPayload;
            if(decodedToken.id !== data.userId){
                return false
            }
        } catch (error) {
            return false
        }
        return true
}

export const GET = async (req:Request, res:Response) => {
    try{
        await connectToDB()
        const url = new URL(req.url);
        const keyword = url.searchParams.get('keyword');
        let recipes;
        if(keyword){
            const regex = new RegExp(keyword, 'i');
            recipes = await Recipe.find({
                $or: [
                    { title: { $regex: regex } },
                    { category: { $regex: regex } }
                ]
            });
        }else{
            recipes = await Recipe.find()
        }
        return new Response(JSON.stringify(recipes), {status: 200})
    }catch(error){
        console.log(error)
        return new Response('Server Error', {status: 500})
    }
}

export const POST = async (req:Request, res:Response) => {
    try{
        await connectToDB()
        const data = await req.json()
        const keys = ["title", "category", "description", "ingredients", "instructions", "image", "servingSize", "cookTime", "userId"]
        if(JSON.stringify(keys.sort()) !== JSON.stringify(Object.keys(data).sort())){
            return new Response('All fields are required', {status: 400})
        }
        if(!authorizationCheck(req, data)){
            return new Response('Unauthorized', { status: 401 });
        }
        const user = await User.findById(data.userId);
        const newRecipe = new Recipe({...data, user:user})
        // return new Response(JSON.stringify(newRecipe), {status: 200})

        await newRecipe.save()
        return new Response('Recipe Created', {status: 201})
    }catch(error){
        console.log(error)
        return new Response('Server Error', {status: 500})
    }
}
export const PATCH = async (req:Request, res:Response) => {
    try{
        await connectToDB()
        const data = await req.json()
        if(!authorizationCheck(req, data)){
            return new Response('Unauthorized', { status: 401 });
        }
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const recipe = await Recipe.findById(id)
        // return new Response(JSON.stringify(recipe), {status: 200})
        const token = req.headers.get('Authorization')?.split(' ')[1];
        if(!token){
            return new Response('Unauthorized', { status: 401 });
        }
        const decodedToken = jwt.verify(token, secret!) as JwtPayload;
        if(recipe.user != decodedToken.id){
            return new Response('Unauthorized', { status: 401 });
        }
        await Recipe.findByIdAndUpdate(id, data)
        return new Response('Recipe Updates', {status: 201})
    }catch(error){
        console.log(error)
        return new Response('Server Error', {status: 500})
    }
}
export const DELETE = async (req:Request, res:Response) => {
    try{
        await connectToDB()
        const data = await req.json()
        if(!authorizationCheck(req, data)){
            return new Response('Unauthorized', { status: 401 });
        }
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const recipe = await Recipe.findById(id)
        // return new Response(JSON.stringify(recipe), {status: 200})
        const token = req.headers.get('Authorization')?.split(' ')[1];
        if(!token){
            return new Response('Unauthorized', { status: 401 });
        }
        const decodedToken = jwt.verify(token, secret!) as JwtPayload;
        if(recipe.user != decodedToken.id){
            return new Response('Unauthorized', { status: 401 });
        }
        await Recipe.findByIdAndDelete(id)
        return new Response('Recipe Deleted', {status: 201})
    }catch(error){
        console.log(error)
        return new Response('Server Error', {status: 500})
    }
}

