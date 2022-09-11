import React from 'react'
import Box from './Box';

const Intermediate = () => {
  return (
    <div>
      <h2 className='text-center mt-4 text-label'>Intermediate</h2>
      <Box level={'BEGINNER'} warningLabelShow={true} />
    </div>
  )
}

export default Intermediate