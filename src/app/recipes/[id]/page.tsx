'use client'
import Image from 'next/image'
import React,{useEffect, useState} from 'react'
import { ImClock } from "react-icons/im";
import { BiDish } from "react-icons/bi";
import UpdateRecipe from '@/components/UpdateRecipe/UpdateRecipe';
import { MdDelete } from "react-icons/md";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const RecipePage = () => {
  const [recipe, setRecipe] = useState<{[key:string]:any}>({})
  const {data:session} = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const router = useRouter();
  const getRecipe = async () => {
    const res = await fetch(`/api/recipes/${window.location.pathname.split('/').pop()}`)
    const data = await res.json()
    setRecipe(data)
    setIsLoading(false)
  }

  const deleteRecipe = async () => {
    setDeleteLoading(true)
    const res = await fetch(`/api/recipes?id=${recipe._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(session?.user as any)?.token}`
      }
    })
    if(res.ok){
      setDeleteLoading(false)
      router.push('/recipes');
    }
    setDeleteLoading(false)
  }
  useEffect(()=>{
    getRecipe()
  },[])
  return (
    <div className={`w-full min-h-screenfill flex flex-col items-center pt-12`}>
      {isLoading ? (<div className="flex md:w-3/4 w-full items-center flex-col gap-4">
          <div className="skeleton h-48 w-full"></div>
          <div className="skeleton h-8 md:w-1/2 w-24"></div>
          <div className="skeleton h-8 w-full"></div>
          <div className="skeleton h-8 w-full"></div>
        </div>) : (
        <div className='md:w-3/4 w-full flex flex-col gap-8 pb-8'>
          <div className='flex flex-col md:flex-row items-center md:items-start gap-4 w-full'>
            <Image src={recipe?.image} alt="Recipe image" width={256} height={256} className="w-[256px] h-[256px]"/>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-2 items-center'>
                <Image src={recipe?.user?.image} alt={"user image"} width={60} height={60} className='w-[60px] h-[60px] rounded-full border-2 border-[#FB6D48]'/>
                <div className='flex flex-col  text-base'>
                  <p className='font-bold'>{recipe?.user?.name}</p>
                  <p className=''>{recipe?.user?.email}</p>
                </div>
              </div>
              <h1 className='font-bold text-3xl text-[#FB6D48]'>{recipe?.title}</h1>
              <div className='flex items-center gap-2'>
                <ImClock />
                <p>{recipe?.cookTime}</p>
              </div>
              <div className='flex items-center gap-2'>
                <BiDish />
                <p>{recipe?.servingSize} people</p>
              </div>
              <div className="card-actions">
                  <div className="badge badge-outline">{recipe?.category}</div>
                  {/* <div className="badge badge-outline">Products</div> */}
              </div>
            </div>
            <button onClick={deleteRecipe} className='bg-red-500 text-white text-lg p-4 rounded-full fixed bottom-28 right-10 md:right-32 flex items-center justify-center'>
              {deleteLoading?<span className="loading loading-spinner loading-sm"></span>:<MdDelete />}
            </button>
            <UpdateRecipe recipe={recipe} fetchRecipe={getRecipe}/>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#FB6D48]">Description</h1>
            <p className="text-lg">{recipe?.description}</p>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#FB6D48]">Ingredients</h1>
            <ul className='list-disc list-inside'>
              {recipe?.ingredients.map((ingredient:string, index:number) => (
                <li key={index}>{`${ingredient}`}</li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#FB6D48]">Instructions</h1>
            <ol>
              {recipe?.instructions.map((instruction:string, index:number) => (
                <li key={index}>{`${index + 1} - ${instruction}`}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipePage