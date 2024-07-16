'use client'
import LoadingSkeleton from '@/components/LoadingSkeleton/LoadingSkeleton'
import React from 'react'

const Recipes = () => {
  const handleSearch = () => {
    
    
  }
  return (
    <div className='min-h-screenfill py-24 flex flex-col items-center gap-10'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FB6D48]  to-[#FFAF45] text-center'>Explore food recipes to make your own sweet plates</h1>
      <form className='flex items-center' onSubmit={(e)=>{
        e.preventDefault()
        handleSearch()
      }}>
        <input type="text" placeholder='Search for recipes' className='px-4 py-2 bg-blue-100 rounded-tl-lg rounded-bl-lg focus:outline-none max-w-inherit md:w-96'/>
        <button type='submit' className='bg-[#FB6D48] text-white rounded-tr-lg rounded-br-lg py-2 px-4'>Search</button>
      </form>
      <LoadingSkeleton/>
    </div>
  )
}

export default Recipes