import React from 'react'

const GridViewer = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>{children}</div>
  )
}

export default GridViewer