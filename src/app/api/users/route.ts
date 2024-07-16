import { User } from "@/lib/models"
import { connectToDB } from "@/lib/utils"
import bcrypt from "bcryptjs"

// export const GET = async (req:Request, res:Response) => {
//     try{
//         await connectToDB()
//         const users = await User.find()
//         return new Response(JSON.stringify(users), {status: 200})
//     }catch(error){
//         console.log(error)
//         return new Response('Server Error', {status: 500})
//     }
// }

export const POST = async (req:Request, res:Response) => {
    try{
        await connectToDB()
        const data = await req.json()
        if(!data.name || !data.email){
            return new Response('Name and Email are required', {status: 400})
        }
        if(await User.findOne({email:data.email})){
            return new Response('User already exists', {status: 400})
        }
        if(!data.password){
            return new Response('Password is required', {status: 400})
        }
        if(data.password.length < 8){
            return new Response('Password is too short', {status: 400})
        }
        const hashedPassword = await bcrypt.hash(data.password, 10)
        data.password = hashedPassword
        const newUser = new User(data)
        await newUser.save()
        return new Response('User Created', {status: 201})
    }catch(error){
        console.log(error)
        return new Response('Server Error', {status: 500})
    }
}
export const PATCH = async (req:Request, res:Response) => {
    try{
        await connectToDB()
        const data = await req.json()
        // if(!data.name || !data.email){
        //     return new Response('Name and Email are required', {status: 400})
        // }
        // if(await User.findOne({email:data.email})){
        //     return new Response('User already exists', {status: 400})
        // }
        // if(!data.password){
        //     return new Response('Password is required', {status: 400})
        // }
        // if(data.password.length < 8){
        //     return new Response('Password is too short', {status: 400})
        // }
        // const hashedPassword = await bcrypt.hash(data.password, 10)
        // data.password = hashedPassword
        // const newUser = new User(data)
        // await newUser.save()
        await User.findOneAndUpdate({email: data.email}, data)
        return new Response('User Updates', {status: 201})
    }catch(error){
        console.log(error)
        return new Response('Server Error', {status: 500})
    }
}

