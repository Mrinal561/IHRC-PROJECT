import { Button } from '@/components/ui'
import React from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ReuploadDocumentCards from './components/ReuploadDocumentCards'

const ReuploadDocument = () => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-10'>
    <div className='flex items-center'>
      <Button
        icon={<IoArrowBack />}
        variant="plain"
        onClick={() => navigate(-1)}
        >
      </Button>
     <h3 className="mb-4 lg:mb-0">Compliance ReUpload</h3>
     </div>
     <div>
     <ReuploadDocumentCards />
     </div>
    </div>
  )
}

export default ReuploadDocument