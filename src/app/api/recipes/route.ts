import { Recipe, User } from "@/lib/models"
import { connectToDB } from "@/lib/utils"
import bcrypt from "bcryptjs"
import jwt, { JwtPayload } from "jsonwebtoken"

const secret = process.env.NEXTAUTH_SECRET;

const authorizationCheck = (req:Request) => {
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
        } catch (error) {
            return false
        }
        return decodedToken.id;
}

export const GET = async (req:Request, res:Response) => {
    try{
        const {searchParams} = new URL(req.url)
        const page: any = parseInt(searchParams.get("page") || "1");
        const limit: any = parseInt(searchParams.get("limit") || "10");
        await connectToDB()
        const url = new URL(req.url);
        const keyword = url.searchParams.get('keyword');
        let recipes;
        const filters: any = {}
        if(keyword){
            filters.$or = [
                {
                    title: { $regex: keyword, $options: "i" },
                },
                {
                    category: { $regex: keyword, $options: "i" },
                },
            ];
        }
        const skip = (page - 1) * limit;
        const total = await Recipe.countDocuments(filters);
        recipes = await Recipe.find(filters).sort({createdAt:"desc"}).skip(skip).limit(limit).populate('user', 'name email image');
        return new Response(JSON.stringify({recipes, page, totalPages:parseInt(`${total/limit}`) + 1}), {status: 200})
    }catch(error){
        console.log(error)
        return new Response('Server Error', {status: 500})
    }
}

export const POST = async (req:Request, res:Response) => {
    try{
        await connectToDB()
        const data = await req.json()
        const keys = ["title", "category", "description", "ingredients", "instructions", "image", "servingSize", "cookTime"]
        if(JSON.stringify(keys.sort()) !== JSON.stringify(Object.keys(data).sort())){
            return new Response('All fields are required', {status: 400})
        }
        const uid: boolean|String = authorizationCheck(req)
        if(!authorizationCheck(req)){
            return new Response('Unauthorized', { status: 401 });
        }
        const user = await User.findById(uid);
        const newRecipe = new Recipe({...data, user:user})

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
        const uid = authorizationCheck(req)
        if(!uid){
            return new Response('Unauthorized', { status: 401 });
        }
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const recipe = await Recipe.findById(id)
        if(recipe.user != uid){
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
        const uid = authorizationCheck(req)
        if(!uid){
            return new Response('Unauthorized', { status: 401 });
        }
        const url = new URL(req.url);
        const id = url.searchParams.get('id');
        const recipe = await Recipe.findById(id)
        
        if(recipe.user != uid){
            return new Response('Unauthorized', { status: 401 });
        }
        await Recipe.findByIdAndDelete(id)
        return new Response('Recipe Deleted', {status: 201})
    }catch(error){
        console.log(error)
        return new Response('Server Error', {status: 500})
    }
}

