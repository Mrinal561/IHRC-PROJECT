import React, { useState } from 'react';
import PFTrackerFilter from './PFTrackerFilter';
import PFTrackerTable from './PFTrackerTable';
import PFTrackerBulkUpload from './PFTrackerBulkUpload';
import UploadedPFDetails from './UploadedPFDetails';
import { dummyData } from './PFTrackerTable';


const PFTrackerTool: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
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
    return <UploadedPFDetails onBack={handleBack} />;
  }

  return (
    <div>
      <div className="flex gap-3 items-center mb-4">
        <PFTrackerFilter data={dummyData} onFilterChange={onFilterChange} />
        <PFTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  );
};

export default PFTrackerTool;