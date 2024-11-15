import React, { useState } from 'react';
import ESITrackerFilter from './ESITrackerFilter';
import ESITrackerTable from './ESITrackerTable';
import ESITrackerBulkUpload from './ESITrackerBulkUpload';
import UploadedESIDetails from './UploadedESIDetails';
// import { sampleData } from './ESITrackerTable';
import { dummyData } from '../../PFTracker/components/PFTrackerTable';
import CustomDateRangePicker from './CustomDateRangePicker';
import { Button } from '@/components/ui';
import { HiDownload } from 'react-icons/hi';

const ESITrackerTool: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange })  => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);
  const [filters, setFilters] = useState({ groupName: '', companyName: '', esiCode: '' });
  const [isLoading, setIsLoading] = useState(false)


  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
    setIsLoading(true)

  };

  const handleBack = () => {
    setShowUploadedDetails(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // You can apply the filters to your data here or pass them to ESITrackerTable
  };
  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  if (showUploadedDetails) {
    return <UploadedESIDetails onBack={handleBack}                 loading={isLoading}
/>;
  }

  return (
    <div>
      <div className="flex gap-3 items-center mb-4">
        <ESITrackerFilter data={dummyData} onFilterChange={handleFilterChange} />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
        variant="solid" 
        size="sm" 
        icon={<HiDownload />}>Download ESI Data</Button>
        <ESITrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  );
};

export default ESITrackerTool;