import React, { useState } from 'react';
import ESITrackerFilter from './ESITrackerFilter';
import ESITrackerTable from './ESITrackerTable';
import ESITrackerBulkUpload from './ESITrackerBulkUpload';
import UploadedESIDetails from './UploadedESIDetails';
import { sampleData } from './ESITrackerTable';

const ESITrackerTool: React.FC = () => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);
  const [filters, setFilters] = useState({ groupName: '', companyName: '', esiCode: '' });

  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
  };

  const handleBack = () => {
    setShowUploadedDetails(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // You can apply the filters to your data here or pass them to ESITrackerTable
  };

  if (showUploadedDetails) {
    return <UploadedESIDetails onBack={handleBack} />;
  }

  return (
    <div>
      <div className="flex gap-3 items-center mb-4">
        <ESITrackerFilter data={sampleData} onFilterChange={handleFilterChange} />
        <ESITrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  );
};

export default ESITrackerTool;