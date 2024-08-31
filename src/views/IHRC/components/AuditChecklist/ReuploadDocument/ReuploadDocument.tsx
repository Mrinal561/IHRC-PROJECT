import React, { useState } from 'react'
import { Button, Dialog, Notification } from '@/components/ui'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui'
import ReuploadDocumentTable from './components/ReuploadDocumentTable'
import { HiDownload } from 'react-icons/hi'

const ReuploadDocument: React.FC = () => {
  const navigate = useNavigate();
  const [bulkUploadDialog, setBulkUploadDialog] = useState(false);

  const handleBulkUpload = () => {
    setBulkUploadDialog(true);
  };

  const handleConfirmBulkUpload = () => {
    setBulkUploadDialog(false);
    toast.push(
      <Notification title="Success" type="success">
        All documents submitted successfully
      </Notification>
    );
  };
  const handleConfirmBulkDownload = () => {
    setBulkUploadDialog(false);
    toast.push(
      <Notification title="Success" type="success">
        All Documents downloaded successfully
      </Notification>
    );
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Button
            icon={<IoArrowBack />}
            variant="plain"
            onClick={() => navigate(-1)}
          >
          </Button>
          <h3 className="mb-4 lg:mb-0">Copy from Previous Month Data</h3>
        </div>
        <div className='flex gap-2'>
        <Button size='sm' variant='solid' icon={<HiDownload />} onClick={handleConfirmBulkDownload}>Download</Button>
        <Button size='sm' variant="solid" onClick={handleBulkUpload}>Submit</Button>
        </div>
      </div>
      <div>
        <ReuploadDocumentTable />
      </div>

      <Dialog
        isOpen={bulkUploadDialog}
        onClose={() => setBulkUploadDialog(false)}
      >
        <h5 className="mb-4">Submit Documents</h5>
        <p>Are you sure you want to submit these documents?</p>
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
  );
};

export default ReuploadDocument;

