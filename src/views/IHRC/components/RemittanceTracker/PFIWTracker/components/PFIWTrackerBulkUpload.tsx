import React, { useState } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

const documentPath = "../store/AllMappedPFIWCompliancesDetails.xls";

interface PFIWTrackerBulkUploadProps {
  onUploadConfirm: () => void;
}

const PFIWTrackerBulkUpload: React.FC<PFIWTrackerBulkUploadProps> = ({ onUploadConfirm }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentGroup, setCurrentGroup] = useState('');
  const navigate = useNavigate();
  const groupOptions = [
    { value: '01', label: 'January 2023' },
    { value: '02', label: 'February 2023' },
    { value: '03', label: 'March 2023' },
    { value: '04', label: 'April 2023' },
    { value: '05', label: 'May 2023' },
    { value: '06', label: 'June 2023' },
    { value: '07', label: 'July 2023' },
    { value: '08', label: 'August 2023' },
    { value: '09', label: 'September 2023' },
    { value: '10', label: 'October 2023' },
    { value: '11', label: 'November 2023' },
    { value: '12', label: 'December 2023' },
  ];
  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    navigate('/uploadedpfiwdetail');
    onUploadConfirm();
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setRemark('');
    setFile(null);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    fetch(documentPath)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'AllMappedPFIWCompliancesDetails.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => console.error('Download failed'));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };
  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string) => (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      setter(selectedOption.value);
    }
  };


  return (
    <>
      <Button
      size='sm'
        variant="solid"
        icon={<HiUpload />}
        onClick={handleUploadClick}
      >
        Upload PF IW
      </Button>
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={450}
      >
        <h5 className="mb-4">Upload PFIW</h5>
        <div className='flex gap-3 w-full items-center mb-4'>
          <p className=''>Select Month:</p>
          <div className='w-40'>
          <OutlinedSelect
            label="Month"
            options={groupOptions}
            value={groupOptions.find((option) => option.value === currentGroup)}
            onChange={handleChange(setCurrentGroup, 'groupName')}
          />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Upload PF File:</p>
          <Input
            type="file"
            onChange={handleFileChange}
            className="mb-4"
          />
        </div>
        <div className="my-4 flex gap-2 items-center">
          <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
            <Button size="sm" icon={<HiDownload />}>Download Format</Button>
          </a>
        </div>
        <div className="mt-6 text-right">
          <Button
            size="sm"
            className="mr-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            size="sm"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default PFIWTrackerBulkUpload;