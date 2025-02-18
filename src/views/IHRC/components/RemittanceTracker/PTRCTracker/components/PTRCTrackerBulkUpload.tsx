
import React, { useEffect, useMemo, useState } from 'react';
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

const FINANCIAL_YEAR_KEY = 'selectedFinancialYear';
const FINANCIAL_YEAR_CHANGE_EVENT = 'financialYearChanged';

interface PTTrackerBulkUploadProps {
  onUploadConfirm: () => void;
  canCreate: boolean;
}

const generateMonthOptions = (financialYear: string | null) => {
  if (!financialYear) return [];
  
  // Parse the financial year (format: "2023-24")
  const [startYear] = financialYear.split('-');
  const fullStartYear = parseInt(`${startYear}`);
  
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


const PTRCTrackerBulkUpload: React.FC<PTTrackerBulkUploadProps> = ({ onUploadConfirm , canCreate}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [currentGroup, setCurrentGroup] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [financialYear, setFinancialYear] = useState<string | null>(
    sessionStorage.getItem(FINANCIAL_YEAR_KEY)
);
  const [loading, setLoading] = useState(false);
  const groupOptions = useMemo(() => generateMonthOptions(financialYear), [financialYear]);

  // Listen for financial year changes
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
          <Notification title="Error" type="danger" closable={true}>
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
      setIsDialogOpen(false);
      console.error('Upload error:', error);
      handleCancel();
    } finally {
      setIsUploading(false);
      handleCancel();

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
       const payrollMonth = format(selectedDate, 'yyyy-MM');
      // const reqBody = {
      //   month: selectedDate.getMonth() + 1, // Adding 1 because getMonth() returns 0-11
      //   year: selectedDate.getFullYear()
      // };
      const res = await httpClient.get(endpoints.ptrc.download(), {
        responseType: "blob",
        // data: reqBody
        params: { 
          payrollMonth
        },
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
        <Notification title="Error" type="danger" closable={true}>
         No PT Setup data found for your company
        </Notification>
      );
      // throw error;
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
        width={500}  shouldCloseOnOverlayClick={false} 
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
        <div className="mt-6 text-right flex gap-2 justify-end items-center">
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