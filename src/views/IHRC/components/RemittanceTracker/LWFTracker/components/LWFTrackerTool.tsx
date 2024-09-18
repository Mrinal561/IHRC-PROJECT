import React, { useState } from 'react'
import LWFTrackerFilter from './LWFTrackerFilter'
import LWFTrackerBulkUpload from './LWFTrackerBulkUpload'

const LWFTrackerTool = () => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);



  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
  };




  return (
    <div>
      <div className='flex gap-3 items-center mb-4'>
        <LWFTrackerFilter />
        <LWFTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  )
}

export default LWFTrackerTool