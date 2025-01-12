
import React, { useMemo, useState } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
// import { createPtrcTracker } from '@/store/slices/ptrcSetup/ptrcTrackerSlice';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { createPtrcTracker } from '@/store/slices/ptSetup/ptrcTrackerSlice';
import { addMonths, format, parse, startOfYear } from 'date-fns';

const documentPath = "../store/AllMappedCompliancesDetails.xls";

interface PTTrackerBulkUploadProps {
  onUploadConfirm: () => void;
  canCreate: boolean;
}

const generateMonthOptions = () => {
  const currentYear = new Date().getFullYear();
  const twoDigitYear = String(currentYear) // Gets last 2 digits of year
  const months = [];
  
  // Generate options for current year only
  const startDate = startOfYear(new Date(currentYear, 0));
  for (let i = 0; i < 12; i++) {
    const date = addMonths(startDate, i);
    months.push({
      value: format(date, 'yyyy-MM'),
      label: `${format(date, 'MMM')} ${twoDigitYear}`  // Shows "Jan 25", "Feb 25", etc.
    });
  }
  
  return months;
};

const PTRCTrackerBulkUpload: React.FC<PTTrackerBulkUploadProps> = ({ onUploadConfirm , canCreate}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentGroup, setCurrentGroup] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const groupOptions = useMemo(() => generateMonthOptions(), []);
  const [loading, setLoading] = useState(false);

  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {      
      if (!file || !currentGroup) {
        toast.push(
          <Notification title="Error" type="danger">
            Please select both a file and month to upload
          </Notification>
        );
        return;
      }
  
      const formData = new FormData();
      formData.append('document', file);
      formData.append('month', currentGroup);

      setIsUploading(true);
      
      const res = await dispatch(createPtrcTracker(formData))
        .unwrap()
        .catch((error: any) => {
          if (error.response?.data?.message) {
            showErrorNotification(error.response.data.message);
          } else if (error.message) {
            showErrorNotification(error.message);
          } else if (Array.isArray(error)) {
            showErrorNotification(error);
          } else {
            showErrorNotification('An unexpected error occurred. Please try again.');
          }
          throw error;
        });

      if (res) {
        toast.push(
          <Notification title="Success" type="success">
            PTRC data uploaded successfully!
          </Notification>
        );
        
        handleCancel();
        onUploadConfirm();
        navigate('/uploadedptrcdetail');
      }
    } catch (error) {
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
    if (!currentGroup) {
      toast.push(
        <Notification type="warning" title="Please select a month before downloading" />
      );
      return;
    }
    
    try {
      const selectedDate = parse(currentGroup, 'yyyy-MM', new Date());
      const reqBody = {
        month: selectedDate.getMonth() + 1, // Adding 1 because getMonth() returns 0-11
        year: selectedDate.getFullYear()
      };
      const res = await httpClient.get(endpoints.ptrc.download(), {
        responseType: "blob",
        data: reqBody
      });
      
      const blob = new Blob([res.data], { type: "text/xlsx" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "PTRCTrackerData.xlsx");
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

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>, field: string) => (
    selectedOption: { value: string; label: string } | null
  ) => {
    if (selectedOption) {
      setter(selectedOption.value);
    }
  };

  return (
    <>
    {canCreate && (
      <Button 
        variant="solid" 
        size="sm" 
        icon={<HiUpload />} 
        onClick={handleUploadClick}
      >
        Upload PT RC
      </Button>
    )}
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={500}
      >
        <h5 className="mb-4">Upload PT RC</h5>
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
          <p>Upload PT RC File:</p>
          <Input
            type="file"
            onChange={handleFileChange}
            className="mb-4"
          />
        </div>
        <div className="my-4 flex gap-2 items-center">
          <a onClick={handleDownload} className="text-blue-600 hover:underline">
            <Button size="sm" icon={<HiDownload />}>Download Format</Button>
          </a>
        </div>
        <div className="mt-6 text-right">
          <Button
            size="sm"
            className="mr-2"
            onClick={handleCancel}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            size="sm"
            onClick={handleConfirm}
            loading={isUploading}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default PTRCTrackerBulkUpload;