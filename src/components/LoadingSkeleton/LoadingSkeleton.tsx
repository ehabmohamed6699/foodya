import React from 'react'
import GridViewer from '../GridViewer/GridViewer'
import Skeleton from '../Skeleton/Skeleton'

const LoadingSkeleton = () => {
  return (
    <GridViewer>
        {Array(10).fill(0).map((_, i) => (<Skeleton key={i} />))}
    </GridViewer>
  )
}

export default LoadingSkeleton