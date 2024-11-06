import React, { useState } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import CustomDateRangePicker from './CustomDateRangePicker';
import DatePickerRange from '@/components/ui/DatePicker/DatePickerRange';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

const documentPath = "../store/AllMappedESICompliancesDetails.xls";

interface ESITrackerBulkUploadProps {
    onUploadConfirm: () => void;
}

const ESITrackerBulkUpload: React.FC<ESITrackerBulkUploadProps> = ({ onUploadConfirm }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentGroup, setCurrentGroup] = useState('');
  const navigate = useNavigate();
  const groupOptions = [
    { value: '01', label: 'January 2024' },
    { value: '02', label: 'February 2024' },
    { value: '03', label: 'March 2024' },
    { value: '04', label: 'April 2024' },
    { value: '05', label: 'May 2024' },
    { value: '06', label: 'June 2024' },
    { value: '07', label: 'July 2024' },
    { value: '08', label: 'August 2024' },
    { value: '09', label: 'September 2024' },
    { value: '10', label: 'October 2024' },
    { value: '11', label: 'November 2024' },
    { value: '12', label: 'December 2024' },
  ];

  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    navigate('/uploadedesidetails')
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setRemark('');
    setFile(null);
  };

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    fetch(documentPath)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'AllMappedESICompliancesDetails.xls';
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

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
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
        variant="solid" 
        size="sm" 
        icon={<HiUpload />} 
        onClick={handleUploadClick}
      >
        Upload ESI
      </Button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={500}
      >
        <h5 className="mb-4">Upload ESI</h5>
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
          <p>Upload ESI File:</p>
          <Input
            type="file"
            onChange={handleFileChange}
            className="mb-4"
          />
        </div>
        <div className="my-4 flex gap-2 items-center">
          {/* <p>Download ESI Upload Format</p> */}
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

export default ESITrackerBulkUpload;