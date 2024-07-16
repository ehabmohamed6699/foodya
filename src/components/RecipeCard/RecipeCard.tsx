import Image from 'next/image'
import React from 'react'

const RecipeCard = () => {
  return (
    <div className="card bg-base-100 w-52 shadow-xl">
        <figure>
            <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes" width={208} height={208}/>
        </figure>
        <div className="card-body px-4">
            <h2 className="card-title text-lg">
            Shoes!
            {/* <div className="badge badge-secondary">NEW</div> */}
            </h2>
            <p className='text-base'>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
                <div className="badge badge-outline">Fashion</div>
                <div className="badge badge-outline">Products</div>
            </div>
        </div>
    </div>
  )
}

export default RecipeCard