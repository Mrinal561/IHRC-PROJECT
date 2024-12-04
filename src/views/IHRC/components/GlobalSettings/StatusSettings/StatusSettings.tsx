import React from 'react'
import { HiOutlineViewGrid } from 'react-icons/hi'

const StatusSettings = () => {
  return (
    <>
       <div className='mb-12 flex justify-between items-center'>
            <h3 className="text-2xl font-bold">Status Settings</h3>
       </div>

    <div className="flex flex-col items-center justify-center h-full text-gray-500 border rounded-xl">
    <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
    <p className="text-center">
Still in Development Phase
    </p>
</div>
    </>
  )
}

export default StatusSettings