import Image from 'next/image'
import React from 'react'
import { ImClock } from "react-icons/im";
import { BiDish } from "react-icons/bi";
import Link from 'next/link';



const RecipeCard = ({recipe}:{recipe:{[key:string]:any}}) => {
  return (
    <Link href={`/recipes/${recipe?._id}`} className="card bg-base-100 w-64 shadow-xl relative overflow-hidden">
        <figure>
            <Image
            src={recipe?.image}
            alt="Recipe image" width={256} height={256} className="w-[256px] h-[256px]"/>
        </figure>
        <div className='absolute top-0 left-0 w-64 h-64 bg-gradient-to-b from-black/50 to-black/10 opacity-100 md:opacity-0 hover:opacity-100 transition-all duration-300'>
          <div className='absolute top-5 left-5 flex gap-2 items-center justify-center'>
            <Image src={recipe?.user?.image} alt={"user image"} width={40} height={40} className='w-[40px] h-[40px] rounded-full border-2 border-white'/>
            <div className='flex flex-col text-white text-xs'>
              <p className='font-bold'>{recipe?.user?.name}</p>
              <p className=''>{recipe?.user?.email}</p>
            </div>
          </div>
        </div>
        <div className="card-body px-4">
            <h2 className="card-title text-base">
            {recipe?.title?.length > 20 ? recipe?.title?.substring(0,20) + "...": recipe?.title}
            </h2>
            <p className='text-base'>{recipe?.description?.length > 20 ? recipe?.description?.substring(0,20) + "...": recipe?.description}</p>
            <div className='flex items-center gap-2'>
              <ImClock />
              <p>{recipe?.cookTime}</p>
            </div>
            <div className='flex items-center gap-2'>
              <BiDish />
              <p>{recipe?.servingSize} people</p>
            </div>
            <div className="card-actions justify-end">
                <div className="badge badge-outline">{recipe?.category}</div>
                {/* <div className="badge badge-outline">Products</div> */}
            </div>
        </div>
    </Link>
  )
}

export default RecipeCard