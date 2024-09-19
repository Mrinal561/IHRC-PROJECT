import React, { useState } from 'react';
import { dummyData } from './PTECTrackerTable';
import UploadedPTDetails from './UploadedPTECDetails';
import PTRCTrackerFilter from './PTECTrackerFilter';
import PTRCTrackerBulkUpload from './PTECTrackerBulkUpload.js';


const PTECTrackerTool: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
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
        <PTRCTrackerFilter data={dummyData} onFilterChange={onFilterChange} />
        <PTRCTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  );
};

export default PTECTrackerTool;