import React, { useState } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import CustomDateRangePicker from './CustomDateRangePicker';
import DatePickerRange from '@/components/ui/DatePicker/DatePickerRange';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { createPfIwTracker } from '@/store/slices/pfSetup/pfIwTrackerSlice';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { createEsiTracker } from '@/store/slices/esiSetup/esiTrackerSlice';
import { useDispatch } from 'react-redux';

const documentPath = "../store/AllMappedESICompliancesDetails.xls";

interface ESITrackerBulkUploadProps {
    onUploadConfirm: () => void;
    canCreate: boolean;
}

const ESITrackerBulkUpload: React.FC<ESITrackerBulkUploadProps> = ({ onUploadConfirm, canCreate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentGroup, setCurrentGroup] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isloading, setIsloading] = useState(false);
  
  const dispatch = useDispatch();


  const navigate = useNavigate();
  const groupOptions = [
    { value: '2024-01', label: 'January 2024' },
    { value: '2024-02', label: 'February 2024' },
    { value: '2024-03', label: 'March 2024' },
    { value: '2024-04', label: 'April 2024' },
    { value: '2024-05', label: 'May 2024' },
    { value: '2024-06', label: 'June 2024' },
    { value: '2024-07', label: 'July 2024' },
    { value: '2024-08', label: 'August 2024' },
    { value: '2024-09', label: 'September 2024' },
    { value: '2024-10', label: 'October 2024' },
    { value: '2024-11', label: 'November 2024' },
    { value: '2024-12', label: 'December 2024' },
  ];

  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {      
      if (!file || !currentGroup) {
        toast.push(
          <Notification title="Error" type="danger">
            Please select a file to upload
          </Notification>
        );
        return;
      }
  
      const formData = new FormData();
      formData.append('document', file);
      formData.append('month', currentGroup);

      console.log('FormData:', formData);

      
      const res = await dispatch(createEsiTracker(formData))
      .unwrap()
      .catch((error: any) => {
        // Handle different error formats
        if (error.response?.data?.message) {
            // API error response
            showErrorNotification(error.response.data.message);
        } else if (error.message) {
            // Regular error object
            showErrorNotification(error.message);
        } else if (Array.isArray(error)) {
            // Array of error messages
            showErrorNotification(error);
        } else {
            // Fallback error message
            showErrorNotification('An unexpected error occurred. Please try again.');
        }
        throw error; // Re-throw to prevent navigation
    });
      if (res) {
        toast.push(
          <Notification title="Success" type="success">
            Upload successful!
          </Notification>
        );
        
        // Close dialog and reset state
        handleCancel();
        onUploadConfirm();
        navigate('/uploadedesidetails')
        
        // Refresh the table data
      //   await refreshTable();
      }
    } catch (error) {
      // toast.push(
      //   <Notification title="Error" type="danger">
      //     Upload failed. Please try again.
      //   </Notification>
      // );
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

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // if (!currentGroup) {
    //   toast.push(<Notification type="warning" title="Please select a month before downloading" />, {
    //   });
    //   return;
    // }
    try {
      const res = await httpClient.get(endpoints.esiTracker.download(), {
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
    {canCreate &&(
      <Button 
        variant="solid" 
        size="sm" 
        icon={<HiUpload />} 
        onClick={handleUploadClick}
      >
        Upload ESI
      </Button>
    )}

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={500}
      >
        <h5 className="mb-4">Upload ESI</h5>
        <div className='flex gap-3 w-full items-center mb-4'>
          <p className=''>Select Payroll Month:</p>
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