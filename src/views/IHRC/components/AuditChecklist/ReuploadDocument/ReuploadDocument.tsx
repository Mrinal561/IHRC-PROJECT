import React, { useState } from 'react'
import { Button, Dialog, Notification } from '@/components/ui'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import ReuploadDocumentCards from './components/ReuploadDocumentCards'
import { toast } from '@/components/ui'
import { HiPlusCircle } from 'react-icons/hi'

const ReuploadDocument: React.FC = () => {
  const navigate = useNavigate()
  const [bulkUploadDialog, setBulkUploadDialog] = useState(false)

  const handleBulkUpload = () => {
    setBulkUploadDialog(true)
  }

  const handleConfirmBulkUpload = () => {
    setBulkUploadDialog(false)
    toast.push(
      <Notification title="Success" type="success">
        All documents uploaded successfully
      </Notification>
    )
  }

  return (
    <div className='flex flex-col gap-10'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Button
            icon={<IoArrowBack />}
            variant="plain"
            onClick={() => navigate(-1)}
          >
          </Button>
          <h3 className="mb-4 lg:mb-0">Compliance ReUpload</h3>
        </div>
        <Button icon={<HiPlusCircle />} variant="solid" onClick={handleBulkUpload}>Bulk Upload</Button>
      </div>
      <div>
        <ReuploadDocumentCards />
      </div>

      <Dialog
        isOpen={bulkUploadDialog}
        onClose={() => setBulkUploadDialog(false)}
      >
        <h5 className="mb-4">Bulk Upload Documents</h5>
        <p>Are you sure you want to upload these documents?</p>
        <div className="text-right mt-6">
          <Button
            className="mr-2"
            variant="plain"
            onClick={() => setBulkUploadDialog(false)}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleConfirmBulkUpload}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export default ReuploadDocument