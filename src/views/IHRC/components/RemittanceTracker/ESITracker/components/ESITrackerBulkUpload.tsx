import React, { useState } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import CustomDateRangePicker from './CustomDateRangePicker';
import DatePickerRange from '@/components/ui/DatePicker/DatePickerRange';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

const documentPath = "../store/AllMappedESICompliancesDetails.xls";

interface ESITrackerBulkUploadProps {
    onUploadConfirm: () => void;
}

const ESITrackerBulkUpload: React.FC<ESITrackerBulkUploadProps> = ({ onUploadConfirm }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentGroup, setCurrentGroup] = useState('');
  const [isUploading, setIsUploading] = useState(false);

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

  const handleConfirm = async () => {
    try {
      setIsUploading(true);
      
      if (!file) {
        toast.push(
          <Notification title="Error" type="danger">
            Please select a file to upload
          </Notification>
        );
        return;
      }
  
      const formData = new FormData();
      formData.append('document', file);
      formData.append('remark', remark);
      
      const res = await httpClient.post(
        endpoints.esiSetup.bulkUpload(),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (res) {
        toast.push(
          <Notification title="Success" type="success">
            Upload successful!
          </Notification>
        );
        
        // Close dialog and reset state
        handleCancel();
        
        // Refresh the table data
      //   await refreshTable();
      }
    } catch (error) {
      toast.push(
        <Notification title="Error" type="danger">
          Upload failed. Please try again.
        </Notification>
      );
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setRemark('');
    setFile(null);
  };

  const handleDownload = async () => {
    try {
      const res = await httpClient.get(endpoints.esiSetup.download(), {
        responseType: "blob",
      });
      
      const blob = new Blob([res.data], { type: "text/xlsx" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "EsiTrackerData.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      toast.push(
        <Notification title="Error" type="danger">
          Failed to download template. Please try again.
        </Notification>
      );
    }
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
          <a onClick={handleDownload} className="text-blue-600 hover:underline">
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