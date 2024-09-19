import React, { useState } from 'react';
import PFIWTrackerFilter from './PFIWTrackerFilter';
import PFIWTrackerTable from './PFIWTrackerTable';
// import PFIWTrackerBulkUpload from './PFIWTrackerBulkUpload';
// import UploadedPFIWDetails from './UploadedPFIWDetails';
import { dummyData } from './PFIWTrackerTable';
import PFIWTrackerBulkUpload from './PFIWTrackerBulkUpload';
import UploadedPFIWDetails from './UploadedPFIWDetails';

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

  return (
    <div>
      <div className="flex gap-3 items-center mb-4">
        <PFIWTrackerFilter data={dummyData} onFilterChange={handleFilterChange} />
        <PFIWTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  );
};

export default PFIWTrackerTool;