import Image from 'next/image'
import React from 'react'
import { ImClock } from "react-icons/im";
import { BiDish } from "react-icons/bi";
import Link from 'next/link';



const RecipeCard = ({recipe}:{recipe:{[key:string]:any}}) => {
  return (
    <Link href={`/recipes/${recipe?._id}`} className="card bg-base-100 w-64 shadow-xl">
        <figure>
            <Image
            src={recipe?.image}
            alt="Recipe image" width={256} height={256}/>
        </figure>
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