import React, { useState } from 'react';
import PFTrackerFilter from './PFTrackerFilter';
import PFTrackerTable from './PFTrackerTable';
import PFTrackerBulkUpload from './PFTrackerBulkUpload';
import UploadedPFDetails from './UploadedPFDetails';
import { dummyData } from './PFTrackerTable';
import { Button } from '@/components/ui';
import { HiDownload } from 'react-icons/hi';
import CustomDateRangePicker from './CustomDateRangePicker';

const PFTrackerTool: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
  };

  const handleBack = () => {
    setShowUploadedDetails(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // You can apply the filters to your data here or pass them to PFTrackerTable
  };

  if (showUploadedDetails) {
    return <UploadedPFDetails onBack={handleBack} />;
  }

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <div className="flex gap-3 items-center mb-4">
        <PFTrackerFilter data={dummyData} onFilterChange={onFilterChange} />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
        variant="solid" 
        size="sm" 
        icon={<HiDownload />}>Download PF Data</Button>
        <PFTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  );
};

export default PFTrackerTool;