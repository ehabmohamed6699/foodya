import React, {useEffect, useState} from 'react'
import Modal from '../Modal/Modal'
import { UploadButton } from "@/utils/uploadthing";
import { FaCirclePlus } from "react-icons/fa6";
import Image from 'next/image';
import placeholder from "@/assets/images/placeholder.jpg"
import { FaPlus } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { useSession } from 'next-auth/react';

const CreateRecipe = ({fetchRecipes}:{fetchRecipes: () => void}) => {
    const {data:session} = useSession()
    const [open, setOpen] = useState(false)
    const [error, setError] = useState<string>("")
    const [categoriesError, setCategoriesError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true)
    const [previousImage, setPreviousImage] = useState<string>("")
    const [instruction, setInstruction] = useState<string>("")
    const [recipe, setRecipe] = useState<{[key:string]:any}>({
        title: "",
        description: "",
        ingredients: "",
        instructions: [],
        image: "",
        servingSize: 1,
        cookTime:"",
        category:""
    })
    const [categories, setCategories] = useState<{[key:string]:any}[]>([])
    const deleteImageFromUploadThing = async (url:string) => {
        await fetch('/api/uploadthing', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({url:url})
        })
    }
    useEffect(()=>{
        const validateImage = async () => {
            if(recipe.image !== previousImage && previousImage){
                deleteImageFromUploadThing(previousImage)
            }
            setPreviousImage(recipe.image)
        }

        validateImage()
    },[recipe.image])
    useEffect(()=>{
        const getCategories = async () => {
            setCategoriesLoading(true)
            try {
                const data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
                const response = await data.json() as {categories:{[key:string]:any}[]}
                setCategories(response.categories.map(category => {return {name: category.strCategory, thumb: category.strCategoryThumb}}))
            } catch (error) {
                setCategoriesError('Failed to load categories')
            }finally{
                setCategoriesLoading(false)
            }
        }
        getCategories()
    },[])
    
    const createRecipe = async () => {
        setIsLoading(true)
        const createdRecipe = {...recipe, ingredients:recipe.ingredients.split(",").map((item:string) => item.trim())}
        try{
            for (const key in createdRecipe) {
                if (key !== 'servingSize') {
                  const value = (createdRecipe as {[key:string]:any})[key];
                  if (
                    (typeof value === 'string' && value.trim() === '') ||
                    (Array.isArray(value) && value.length === 0)
                  ) {
                    setError("All fields are required")
                    setIsLoading(false)
                  }
                }
              }
            const res = await fetch('/api/recipes', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${(session?.user as any)?.token}`
                },
                body: JSON.stringify(createdRecipe)
              });
            if(res.ok){
                setOpen(false)
                setRecipe({
                    title: "",
                    description: "",
                    ingredients: "",
                    instructions: [],
                    image: "",
                    servingSize: 1,
                    cookTime:"",
                    category:""
                })
                await fetchRecipes()
                await deleteImageFromUploadThing(previousImage)
            }
        }catch (error) {
            setError('Failed to create recipe')
        }finally{
            setIsLoading(false)
        }
    }
    if(!(session?.user as any)?.token){
        return(<></>)
    }
  return (
        
        <Modal content={<FaCirclePlus />} buttonStyle="bg-[#FB6D48] text-white text-xl p-4 rounded-full fixed bottom-10 right-10 md:right-32" onClick={()=>{}} isOpen={open} setIsOpen={setOpen}>
            <h1 className="text-3xl font-bold mb-6 text-[#FB6D48]">Create a recipe</h1>
            <form onSubmit={(e)=>{
                e.preventDefault()
                createRecipe()
            }} className="flex flex-col items-start gap-4 w-3/4">
                <input type="text" value={recipe.title} onChange={(e)=>{
                    setError("")
                    setRecipe({...recipe, title: e.target.value})
                }} placeholder="Title" className='px-4 py-2 bg-blue-100 rounded-lg focus:outline-none w-full'/>
                <input type="text" value={recipe.description} onChange={(e)=>{
                    setError("")
                    setRecipe({...recipe, description: e.target.value})
                }} placeholder="Description" className='px-4 py-2 bg-blue-100 rounded-lg focus:outline-none w-full'/>
                <input type="text" value={recipe?.ingredients} onChange={(e)=>{
                    setError("")
                    setRecipe({...recipe, ingredients: e.target.value})
                }} placeholder="Ingredients (enter ingredients comma separated)" className='px-4 py-2 bg-blue-100 rounded-lg focus:outline-none w-full'/>
                <ol className='list-decimal flex flex-col gap-2'>
                    {recipe.instructions.map((ingredient : string, index : number) => <li key={index} className='flex items-center gap-2'>
                        {ingredient}
                        <button type='button' className="text-red-500 text-xl" onClick={()=>{
                            setError("")
                            setRecipe({...recipe, instructions: recipe.instructions.filter((_:any, i:number) => i !== index)})
                        }}><TiDelete /></button>
                        </li>)}
                </ol>
                <div className='flex items-center gap-2'>
                    <input type="text" value={instruction} onChange={(e)=>{
                        setInstruction(e.target.value)
                    }} placeholder="Instructions" className='px-4 py-2 bg-blue-100 rounded-lg focus:outline-none w-full'/>
                    <div className='text-white bg-[#FB6D48] h-full p-3 rounded-lg cursor-pointer' onClick={()=>{
                        setError("")
                        setRecipe({...recipe, instructions: [...recipe.instructions, instruction]})
                        setInstruction("")
                    }}><FaPlus />
                    </div>
                </div>
                <input type="text" value={recipe.cookTime} onChange={(e)=>{
                    setError("")
                    setRecipe({...recipe, cookTime: e.target.value})
                }} placeholder="Cook time" className='px-4 py-2 bg-blue-100 rounded-lg focus:outline-none w-full'/>
                <label htmlFor="servingSize">Serving size</label>
                <input type="number" id="servingSize" value={recipe.servingSize} onChange={(e)=>{
                    +e.target.value >= 1 && setRecipe({...recipe, servingSize: Number(e.target.value)})
                }} placeholder="Serving size" className='px-4 py-2 bg-blue-100 rounded-lg focus:outline-none w-full'/>
                <select value={recipe.category} onChange={(e)=>{
                    setError("")
                    setRecipe({...recipe, category: e.target.value})
                }} className='px-4 py-2 bg-blue-100 rounded-lg focus:outline-none w-full'>
                    <option value="">Select category</option>
                    {categories.map((category, index) => <option key={index} value={category.name}><div className='flex items-center gap-2'>
                            <p>{category.name}</p>
                            <Image src={category.thumb} width={10} height={10} alt={category.name}/>
                        </div></option>)}
                </select>
                <Image src={recipe.image ? recipe.image : placeholder} width={200} height={200} alt="recipe image" className='w-[200px] h-[200px]'/>
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={async (res) => {
                        if(res){
                            setError("")
                            setRecipe({...recipe, image: res[0]?.url})
                        }
                    }}
                    onUploadError={(error: Error) => {
                    // Do something with the error.
                    //   alert(`ERROR! ${error.message}`);
                    }}
                />
                {error && <p className='text-red-500 text-lg'>{error}</p>}
                <button type="submit" disabled={isLoading} className='bg-[#FB6D48] text-white w-48 h-11 flex items-center justify-center rounded-full'>{isLoading?<span className="loading loading-spinner loading-md"></span>:"Create recipe"}</button>
            </form>
            
        </Modal>
  )
}

export default CreateRecipe