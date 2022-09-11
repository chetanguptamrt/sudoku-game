import React from 'react';
import Box from './Box';

const Beginner = () => {
  return (
    <div>
      <h2 className='text-center mt-4 text-label'>Beginner</h2>
      <Box level={'BEGINNER'} warningLabelShow={true} />
    </div>
  )
}

export default Beginner