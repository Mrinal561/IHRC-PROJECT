import React, { useState } from 'react'
import LWFTrackerFilter from './LWFTrackerFilter'
import LWFTrackerBulkUpload from './LWFTrackerBulkUpload'
import CustomDateRangePicker from './CustomDateRangePicker';
import { Button } from '@/components/ui';
import { HiDownload } from 'react-icons/hi';

const LWFTrackerTool = () => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);



  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
  };

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };



  return (
    <div>
      <div className='flex gap-3 items-center mb-4'>
        <LWFTrackerFilter />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
        variant="solid" 
        size="sm" 
        icon={<HiDownload />}>Download LWF Data</Button>
        <LWFTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  )
}

export default LWFTrackerTool