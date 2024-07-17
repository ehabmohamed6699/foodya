import { Recipe } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
export const GET = async (req:Request, context: { params: any }) => {
    const { id } = context.params;
    try{
        await connectToDB()
        const recipe = await Recipe.findById(id).populate('user','name email image')
        return new Response(JSON.stringify(recipe), {status: 200})
    }catch(error){
        return new Response('Server Error', {status: 500})
    }
}