

import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, Input, Notification, toast} from '@/components/ui';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { useDispatch } from 'react-redux';
import { createPfTracker } from '@/store/slices/pfSetup/pfTrackerSlice';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { addMonths, format, parse, startOfYear } from 'date-fns';

const documentPath = "../store/AllMappedCompliancesDetails.xls";


const FINANCIAL_YEAR_KEY = 'selectedFinancialYear';
const FINANCIAL_YEAR_CHANGE_EVENT = 'financialYearChanged';


interface PFTrackerBulkUploadProps {
  onUploadConfirm: () => void;
  canCreate:boolean;
}

const generateMonthOptions = (financialYear: string | null) => {
  if (!financialYear) return [];
  
  // Parse the financial year (format: "2023-24")
  const [startYear] = financialYear.split('-');
  const fullStartYear = parseInt(`20${startYear}`);
  
  const months = [];
  // Start from April of start year
  let startDate = new Date(fullStartYear, 3, 1); // Month is 0-based, so 3 is April
  
  // Generate 12 months starting from April
  for (let i = 0; i < 12; i++) {
      const date = addMonths(startDate, i);
      const twoDigitYear = format(date, 'yy'); // Get last two digits of the year
      months.push({
          value: format(date, 'yyyy-MM'),
          label: `${format(date, 'MMM')} ${twoDigitYear}` // Always shows format like "Jan 25"
      });
  }
  
  return months;
};


const PFTrackerBulkUpload: React.FC<PFTrackerBulkUploadProps> = ({ onUploadConfirm, canCreate }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [currentGroup, setCurrentGroup] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [financialYear, setFinancialYear] = useState<string | null>(
    sessionStorage.getItem(FINANCIAL_YEAR_KEY)
);
const groupOptions = useMemo(() => generateMonthOptions(financialYear), [financialYear]);

useEffect(() => {
  const handleFinancialYearChange = (event: CustomEvent) => {
      const newFinancialYear = event.detail;
      setFinancialYear(newFinancialYear);
      // Reset current selection when financial year changes
      setCurrentGroup('');
  };

  window.addEventListener(
      FINANCIAL_YEAR_CHANGE_EVENT,
      handleFinancialYearChange as EventListener
  );

  return () => {
      window.removeEventListener(
          FINANCIAL_YEAR_CHANGE_EVENT,
          handleFinancialYearChange as EventListener
      );
  };
}, []);

  const handleUploadClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = async () => {
    try {
      if (!file || !currentGroup) {
        toast.push(
          <Notification title="Error" type="danger" duration={3000}>
            Please select a file and a month to upload
          </Notification>
        );
        return;
      }
      setLoading(true);
      const formData = new FormData();
      formData.append('document', file);
      formData.append('month', currentGroup);

      console.log('FormData:', formData);

      const res = await dispatch(createPfTracker(formData))
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
            showErrorNotification(error);
        }
        throw error; // Re-throw to prevent navigation
    });

      if (res) {
        toast.push(
          <Notification title="Success" type="success" duration={3000}>
            Upload successful!
          </Notification>
        );

        // Close dialog and reset state
        handleCancel();

        // Refresh the table data
         onUploadConfirm();

        navigate('/uploadedpfdetail');
      }
    } catch (error) {
      // toast.push(
      //   // <Notification title="Error" type="danger">
      //   //   Upload failed. Please try again.
      //   // </Notification>
      // );
      console.error('Upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setFile(null);
    setCurrentGroup('');
  };

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!currentGroup) {
      toast.push(<Notification type="warning" title="Please select a month before downloading" />, {
      });
      return;
    }

    try {

      const selectedDate = parse(currentGroup, 'yyyy-MM', new Date());
      const reqBody = {
        month: selectedDate.getMonth() + 1, // Adding 1 because getMonth() returns 0-11
        year: selectedDate.getFullYear()
      };
      
      // const res = await httpClient.request({
      //   method: "GET",
      //   url: endpoints.tracker.downloadFormat(),
      //   data: reqBody, // Pass the body here
      //   responseType: "blob" // Configuration for response type
      // });
      
      const res = await httpClient.get(endpoints.tracker.downloadFormat(),{
        responseType: "blob",
        data: reqBody
      });
      if(res){
      toast.push(
        <Notification title="Success" type="success"  duration={3000}>
          File was Downloaded Successfully
        </Notification>
      );}
      const blob = new Blob([res.data], { type: "text/xlsx" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `pftracker.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download error:', error);
      toast.push(
        <Notification title="Error" type="danger"  duration={3000}>
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
          Upload PF
        </Button>
      )}


      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={450}
      >
        <h5 className="mb-4">Upload PF</h5>
        <div className='flex gap-3 w-full items-center'>
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
        
        <div className="flex flex-col gap-2 my-4">
          <p>Upload PF File:</p>
          <Input
            type="file"
            accept='.xlsx'
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
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            size="sm"
            onClick={handleConfirm}
            loading={loading}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default PFTrackerBulkUpload;