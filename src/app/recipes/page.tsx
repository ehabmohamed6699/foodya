'use client'
import GridViewer from '@/components/GridViewer/GridViewer'
import LoadingSkeleton from '@/components/LoadingSkeleton/LoadingSkeleton'
import React, { useState, useEffect } from 'react'
import RecipeCard from '@/components/RecipeCard/RecipeCard'
import Paginator from '@/components/Paginator/Paginator'
import CreateRecipe from '@/components/CreateRecipe/CreateRecipe'

const Recipes = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [keyword, setKeyword] = useState<string>('')
  const [previousKeyword, setPreviousKeyword] = useState<string>('')
  const [recipes, setRecipes] = useState<{recipes:{[key:string]:any}[], totalPages:number}|null>()
  const [page, setPage] = useState<number>(1)
  const [error, setError] = useState<string>('')
  const fetchRecipes = async () => {
    setIsLoading(true)
    let data;
    try {
      if(keyword){
        data = await fetch(`/api/recipes?keyword=${keyword}&page=${page}`)
      }else{
        data = await fetch(`/api/recipes?page=${page}`)
      }
      setRecipes(await data.json())
    } catch (error) {
      setError('Failed to load recips')
    }finally{
      setIsLoading(false)
    }
  }
  const handleSearch = async () => {
    if(previousKeyword === keyword){
      return
    }
    setPage(1)
    await fetchRecipes()
    setPreviousKeyword(keyword)
  }
  useEffect(()=>{
    fetchRecipes()
  },[page])
  useEffect(() => {
    console.log(recipes)
  },[recipes])
  return (
    <div className='min-h-screenfill py-24 flex flex-col items-center gap-10 relative'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FB6D48]  to-[#FFAF45] text-center'>Explore food recipes to make your own sweet plates</h1>
      <form className='flex items-center' onSubmit={(e)=>{
        e.preventDefault()
        handleSearch()
      }}>
        <input type="text" value={keyword} onChange={(e)=>{
          setKeyword(e.target.value)
          if(!e.target.value){
            setPage(1)
            fetchRecipes()
          }
        }} placeholder='Search for recipes' className='px-4 py-2 bg-blue-100 rounded-tl-lg rounded-bl-lg focus:outline-none max-w-inherit md:w-96'/>
        <button type='submit' className='bg-[#FB6D48] text-white rounded-tr-lg rounded-br-lg py-2 px-4'>Search</button>
      </form>
      {isLoading?<LoadingSkeleton/>:error?<p className='text-2xl font-bold text-[#FB6D48]'>{error}</p>:recipes?.recipes?.length === 0?<p className='text-2xl font-bold text-[#FB6D48]'>No recipes to show</p>:<GridViewer>
          {recipes?.recipes?.map((recipe, index) => (<RecipeCard key={index} recipe={recipe}/>))}
        </GridViewer>}
      {!isLoading && !error && recipes?.recipes?.length !== 0 && <Paginator page={page} setPage={setPage} totalPages={recipes?.totalPages || 1}/>}
      <CreateRecipe fetchRecipes={fetchRecipes}/>
    </div>
  )
}

export default Recipes