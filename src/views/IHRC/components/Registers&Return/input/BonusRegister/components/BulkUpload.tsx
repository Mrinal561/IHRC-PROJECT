import React, { useEffect, useState } from 'react';
import { Badge, Button, Dialog, Input, Notification, toast } from '@/components/ui';
import { Company } from '@/views/IHRC/store/dummyCompany';
import { HiDownload } from 'react-icons/hi';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedBadgeSelect from '@/components/ui/OutlinedBadgeSelect/OutlinedBadgeSelect';

interface BulkUploadProps {
    isOpen: boolean;
    onClose: () => void;
    company: Company;
}
const dummyData = {
    registerStatus: [
      { value: 'march 2024', label: 'March 2024' },
      { value: 'april 2024', label: 'April 2024' },
      { value: 'may 2024', label: 'May 2024' },
      { value: 'june 2024', label: 'June 2024' },
      { value: 'july 2024', label: 'July 2024' },
      { value: 'august 2024', label: 'August 2024' },
      { value: 'september 2024', label: 'September 2024' },
      { value: 'october 2024', label: 'October 2024' },
      { value: 'november 2024', label: 'November 2024' },
      { value: 'december 2024', label: 'December 2024' },
      { value: 'january 2025', label: 'January 2025' },
      { value: 'february 2025', label: 'February 2025' },
    ]
  };


  type SelectOption = {
    value: string;
    label: string;
  };
  

  interface FinancialYearFilterProps {
    value: SelectOption | null;
    onChange: (value: SelectOption | null) => void;
  }
  
  const FinancialYearFilter: React.FC<FinancialYearFilterProps> = ({ value, onChange }) => {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [defaultOption, setDefaultOption] = useState<SelectOption | null>(null);
  
    useEffect(() => {
      // Generate financial year options
      const currentYear = new Date().getFullYear();
      const financialYearOptions = [
        { value: `${currentYear}-${currentYear + 1}`, label: `${currentYear}-${currentYear + 1}` },
        { value: `${currentYear - 1}-${currentYear}`, label: `${currentYear - 1}-${currentYear}` },
        { value: `${currentYear - 2}-${currentYear - 1}`, label: `${currentYear - 2}-${currentYear - 1}` },
        { value: `${currentYear - 3}-${currentYear - 2}`, label: `${currentYear - 3}-${currentYear - 2}` },
        { value: `${currentYear - 4}-${currentYear - 3}`, label: `${currentYear - 4}-${currentYear - 3}` },
      ];
  
      setOptions(financialYearOptions);
      setDefaultOption(financialYearOptions[0]);
    }, []);
  
    const handleChange = (selectedOption: SelectOption | null) => {
      onChange(selectedOption);
    };
  
    useEffect(() => {
      // If value is not set, select the default option
      if (!value) {
        onChange(defaultOption);
      }
    }, [value, defaultOption, onChange]);
  
    return (
      <OutlinedBadgeSelect
        label="Financial Year"
        value={value || defaultOption}
        options={options}
        onChange={handleChange}
        optionRenderer={(option, isSelected) => (
          <div className="flex items-center justify-between w-full">
            <span>{option.label}</span>
            {isSelected && <Badge className="w-2 h-2 rounded-full bg-emerald-500" />}
          </div>
        )}
      />
    );
  };
  
  

const BulkUpload: React.FC<BulkUploadProps> = ({ isOpen, onClose, company }) => {
    const [file, setFile] = useState<File | null>(null);
    const [remark, setRemark] = useState('');
    const [selectedRegisterStatus, setSelectedRegisterStatus] = useState(dummyData.registerStatus[0]);
    const [selectedFinancialYear, setSelectedFinancialYear] = useState<SelectOption | null>(null);

    const handleFinancialYearChange = (value: SelectOption | null) => {
        setSelectedFinancialYear(value);
        // You can add any additional logic here, such as fetching data for the selected year
      };
    

    const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                {message}
            </Notification>
        );
    };

    const handleConfirm = () => {
        if (file) {
            // Handle file upload logic here
            console.log('Uploading file:', file, 'for company:', company.company_name, 'with remark:', remark);
            openNotification('success', 'Salary register uploaded successfully');
        }
        handleCancel();
    };

    const handleCancel = () => {
        setFile(null);
        setRemark('');
        onClose();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <Dialog isOpen={isOpen}>
            <h5 className="mb-4">
                Upload Bonus Register
            </h5>

            <div className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center my-4'>
                   <p> Select the Month</p>
                   <div className="w-48">
                   <FinancialYearFilter value={selectedFinancialYear} onChange={handleFinancialYearChange} />

                  </div>
                </div>
            </div>
            
            <div className="flex flex-col gap-4">
            <div className="my-4 flex gap-2 items-center">
          <p>Download Salary Register Format</p>
          <a className="text-blue-600 hover:underline">
            <Button size="xs" icon={<HiDownload />} >Download</Button>
          </a>
        </div>
                <div className='flex flex-col gap-2'>
                    <label className="block mb-2">Upload Document</label>
                    <Input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileChange}
                    />
                    {file && (
                        <div className="text-sm text-gray-600 mt-1">
                            Selected file: {file.name}
                        </div>
                    )}
                </div>

                {/* <div>
                    <label className="block mb-2">Remark:</label>
                    <Input
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        placeholder="Enter your remark here"
                    />
                </div> */}
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
    );
};

export default BulkUpload;