import React from 'react'

function Summary({resumeInfo}) {
  return (
    <div className='text-xs '>
        <p>{resumeInfo?.summery}</p>
    </div>
  )
}

export default Summary