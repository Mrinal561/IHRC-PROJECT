import React, { useState } from 'react';
import PTTrackerFilter from './PTTrackerFilter';
import PTTrackerBulkUpload from './PTTrackerBulkUpload.js';
import { dummyData } from './PTTrackerTable';
import UploadedPTDetails from './UploadedPTDetails';


const PTTrackerTool: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
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

  return (
    <div>
      <div className="flex gap-3 items-center mb-4">
        <PTTrackerFilter data={dummyData} onFilterChange={onFilterChange} />
        <PTTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  );
};

export default PTTrackerTool;