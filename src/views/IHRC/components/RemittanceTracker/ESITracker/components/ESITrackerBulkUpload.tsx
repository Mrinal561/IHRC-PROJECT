

import React, { useMemo, useState, useEffect } from 'react';
import { Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { createEsiTracker } from '@/store/slices/esiSetup/esiTrackerSlice';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import { useDispatch } from 'react-redux';
import { addMonths, format, parse, setMonth, setYear } from 'date-fns';

const FINANCIAL_YEAR_KEY = 'selectedFinancialYear';
const FINANCIAL_YEAR_CHANGE_EVENT = 'financialYearChanged';

interface ESITrackerBulkUploadProps {
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


const ESITrackerBulkUpload: React.FC<ESITrackerBulkUploadProps> = ({ onUploadConfirm, canCreate }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [remark, setRemark] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [currentGroup, setCurrentGroup] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [financialYear, setFinancialYear] = useState<string | null>(
        sessionStorage.getItem(FINANCIAL_YEAR_KEY)
    );
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Generate month options based on financial year
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
                    <Notification title="Error" type="danger">
                        Please select a file and month to upload
                    </Notification>
                );
                return;
            }
            if (!financialYear) {
                toast.push(
                    <Notification title="Error" type="danger">
                        Please select a financial year first
                    </Notification>
                );
                return;
            }
            
            setLoading(true);
            const formData = new FormData();
            formData.append('document', file);
            formData.append('month', currentGroup);
            // formData.append('financial_year', financialYear);

            const res = await dispatch(createEsiTracker(formData))
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
                        Upload successful!
                    </Notification>
                );
                handleCancel();
                onUploadConfirm();
                navigate('/uploadedesidetails');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setIsDialogOpen(false)
        } finally {
            setIsUploading(false);
            setLoading(false);
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
        if (!financialYear) {
            toast.push(
                <Notification type="warning" title="Please select a financial year first" />
            );
            return;
        }

        try {
            const selectedDate = parse(currentGroup, 'yyyy-MM', new Date());
            const reqBody = {
                month: selectedDate.getMonth() + 1,
                year: selectedDate.getFullYear(),
                financial_year: financialYear
            };

            const res = await httpClient.get(endpoints.esiTracker.download(), {
                responseType: "blob",
                data: reqBody
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

export default ESITrackerBulkUpload;