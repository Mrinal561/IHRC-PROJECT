import React, { useEffect, useState } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { Badge, Button } from '@/components/ui';
import { HiOutlineFilter } from 'react-icons/hi';
import OutlinedBadgeSelect from '@/components/ui/OutlinedBadgeSelect/OutlinedBadgeSelect';
import { RiUploadLine } from 'react-icons/ri';
import BulkUpload from './BulkUpload';
import { Company } from '@/views/IHRC/store/dummyCompany';
// import DashboardFilter from './DashboardFilter';
// import CustomDateRangePicker from './CustomDateRangePicker';


type SelectOption = {
  value: string;
  label: string;
};


const dummyData = {
  companyGroups: [
    { value: 'cg1', label: 'Company Group 1' },
    { value: 'cg2', label: 'Company Group 2' },
  ],
  companies: [
    { value: 'c1', label: 'CEAT' },
    { value: 'c2', label: 'MRF' },
  ],
  states: [
    { value: 's1', label: 'Maharashtra' },
    { value: 's2', label: 'West Bengal' },
  ],
  cities: [
    { value: 'city1', label: 'Mumbai' },
    { value: 'city2', label: 'Kolkata' },
  ],
  branches: [
    { value: 'b1', label: 'Branch 1' },
    { value: 'b2', label: 'Branch 2' },
  ],
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
  ],
  types: [
    { value: 'Uploaded', label: 'Uploaded' },
    { value: 'Not Uploaded', label: 'Not Uploaded' }
  ],


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

const BonusFilter = () => {
  const [selectedCompany, setSelectedCompany] = useState(dummyData.companies[0]);
  const [selectedState, setSelectedState] = useState(dummyData.states[0]);
  const [selectedRegisterStatus, setSelectedRegisterStatus] = useState(dummyData.registerStatus[0]);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState<SelectOption | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);



  const handleFinancialYearChange = (value: SelectOption | null) => {
    setSelectedFinancialYear(value);
    // You can add any additional logic here, such as fetching data for the selected year
  };

  const selectedCompanyData: Company = {
    company_name: selectedCompany.label,
    date: new Date().toISOString(),
    uploaded_Date: new Date().toISOString(),
    status: 'Active',
    id: selectedCompany.value
  };



  return (
    <>
    <div className="w-full flex flex-nowrap items-center gap-4">
      <div className="w-48">
        <OutlinedSelect
          label="Company"
          value={selectedCompany}
          onChange={setSelectedCompany}
          options={dummyData.companies}
        />
      </div>

      

      <div className="w-48">
      <FinancialYearFilter value={selectedFinancialYear} onChange={handleFinancialYearChange} />
      </div>


      

      <div>
        <Button
          size="sm"
          className="h-[38px] whitespace-nowrap"
          icon={<HiOutlineFilter />}
        >
          Filter
        </Button>
      </div>



      <div>
          <Button
            size="sm"
            variant='solid'
            className="h-[38px] whitespace-nowrap"
            icon={<RiUploadLine />}
            onClick={() => setIsDialogOpen(true)}
          >
            Upload
          </Button>
        </div>
    </div>

    <BulkUpload 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        company={selectedCompanyData}
      />

    </>
  );
};

export default BonusFilter;