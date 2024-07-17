import React, { Dispatch, SetStateAction } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";


const Paginator = ({page, setPage, totalPages}:{page:number, setPage:Dispatch<SetStateAction<number>>, totalPages:number}) => {
  return (
    <div className='flex items-center gap-10'>
      <button onClick={()=>{
        setPage(page-1)
      }} disabled={page == 1} className='flex items-center disabled:text-gray-700 text-[#FB6D48]'>
        <FaAngleLeft />
        prev
      </button>
      <button onClick={()=>{
        setPage(page+1)
      }} disabled={page == totalPages} className='flex items-center disabled:text-gray-700 text-[#FB6D48]'>
        next
        <FaAngleRight />
      </button>
    </div>
  )
}

export default Paginator