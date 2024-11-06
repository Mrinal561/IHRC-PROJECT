import React, { useState } from 'react';
import { dummyData } from './PTRCTrackerTable';
import UploadedPTDetails from './UploadedPTRCDetails';
import PTRCTrackerFilter from './PTRCTrackerFilter';
import PTRCTrackerBulkUpload from './PTRCTrackerBulkUpload.js';
import CustomDateRangePicker from '../../PFTracker/components/CustomDateRangePicker';
import { Button } from '@/components/ui';
import { HiDownload } from 'react-icons/hi';


const PTRCTrackerTool: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });


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
    return <UploadedPTDetails onBack={handleBack} />;
  }
  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <div className="flex gap-3 items-center mb-4">
        <PTRCTrackerFilter data={dummyData} onFilterChange={onFilterChange} />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
        variant="solid" 
        size="sm" 
        icon={<HiDownload />}>Download PT RC Data</Button>
        <PTRCTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  );
};

export default PTRCTrackerTool;