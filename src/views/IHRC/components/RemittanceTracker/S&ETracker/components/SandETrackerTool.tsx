import React, { useState } from 'react'
import SandETrackerFilter from './SandETrackerFilter';
import SandETrackerBulkUpload from './SandETrackerBulkUpload';


const SandETrackerTool = () => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);



  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
  };




  return (
    <div>
      <div className='flex gap-3 items-center mb-4'>
        <SandETrackerFilter />
        <SandETrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  )
}

export default SandETrackerTool