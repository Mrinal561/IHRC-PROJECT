import React, { useState } from 'react';
import PFIWTrackerFilter from './PFIWTrackerFilter';
import PFIWTrackerTable from './PFIWTrackerTable';
// import PFIWTrackerBulkUpload from './PFIWTrackerBulkUpload';
// import UploadedPFIWDetails from './UploadedPFIWDetails';
import { dummyData } from './PFIWTrackerTable';
import PFIWTrackerBulkUpload from './PFIWTrackerBulkUpload';
import UploadedPFIWDetails from './UploadedPFIWDetails';
import { HiDownload } from 'react-icons/hi';
import { Button } from '@/components/ui';
import CustomDateRangePicker from './CustomDateRangePicker';

const PFIWTrackerTool: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);
  const [filters, setFilters] = useState({ entityName: '', pfCode: '', location: '' });

  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
  };

  const handleBack = () => {
    setShowUploadedDetails(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  if (showUploadedDetails) {
    return <UploadedPFIWDetails onBack={handleBack} />;
    }

    const handleDateRangeApply = (start: Date, end: Date) => {
      setStartDate(start);
      setEndDate(end);
    };
  



  return (
    <div>
      <div className="flex gap-3 items-center mb-4">
        <PFIWTrackerFilter data={dummyData} onFilterChange={handleFilterChange} />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
        variant="solid" 
        size="sm" 
        icon={<HiDownload />}>Download PF IW Data</Button>
        <PFIWTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  );
};

export default PFIWTrackerTool;