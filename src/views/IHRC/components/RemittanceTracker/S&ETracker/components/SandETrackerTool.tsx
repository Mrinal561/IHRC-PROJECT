import React, { useState } from 'react'
import SandETrackerFilter from './SandETrackerFilter';
import SandETrackerBulkUpload from './SandETrackerBulkUpload';
import { Button } from '@/components/ui';
import CustomDateRangePicker from '../../PFTracker/components/CustomDateRangePicker';
import { HiDownload } from 'react-icons/hi';
import NoticeUploadDialog from './SandETrackerBulkUpload';


const SandETrackerTool = () => {
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
        <SandETrackerFilter />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
        variant="solid" 
        size="sm" 
        icon={<HiDownload />}>Download Notice Data</Button>
        {/* <SandETrackerBulkUpload onUploadConfirm={handleUploadConfirm} /> */}
        <NoticeUploadDialog />
      </div>
    </div>
  )
}

export default SandETrackerTool