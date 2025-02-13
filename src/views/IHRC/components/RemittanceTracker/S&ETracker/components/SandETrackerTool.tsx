// import React, { useState } from 'react'
// import SandETrackerFilter from './SandETrackerFilter';
// import SandETrackerBulkUpload from './SandETrackerBulkUpload';
// import { Button } from '@/components/ui';
// import CustomDateRangePicker from '../../PFTracker/components/CustomDateRangePicker';
// import { HiDownload } from 'react-icons/hi';
// import NoticeUploadDialog from './SandETrackerBulkUpload';

// interface SandETrackerToolProps {
//   onRefresh: () => void;
//   onFilterChange: (filters: {
//     groupName: string;
//     groupId: string;
//     companyName: string;
//     companyId: string;
//     startDate: string;
//     endDate: string;
//   }) => void;
// }


// const SandETrackerTool: React.FC<SandETrackerToolProps> = ({ onRefresh, onFilterChange }) => {
//   const [showUploadedDetails, setShowUploadedDetails] = useState(false);



//   const handleUploadConfirm = () => {
//     setShowUploadedDetails(true);
//   };

//   const handleDateRangeApply = (start: Date, end: Date) => {
//     setStartDate(start);
//     setEndDate(end);
//   };


//   return (
//     <div>
//       <div className='flex gap-3 items-center mb-4'>
//         <SandETrackerFilter />
//         <CustomDateRangePicker onApply={handleDateRangeApply} />
//         <Button  
//         variant="solid" 
//         size="sm" 
//         icon={<HiDownload />}>Download Notice Data</Button>
//         {/* <SandETrackerBulkUpload onUploadConfirm={handleUploadConfirm} /> */}
//         <NoticeUploadDialog onSuccess={onRefresh} />
//       </div>
//     </div>
//   )
// }

// export default SandETrackerTool

import React, { useState } from 'react'
import SandETrackerFilter from './SandETrackerFilter';
import SandETrackerBulkUpload from './SandETrackerBulkUpload';
import { Button } from '@/components/ui';
import CustomDateRangePicker from '../../PFTracker/components/CustomDateRangePicker';
import { HiDownload, HiPlusCircle } from 'react-icons/hi';
import NoticeUploadDialog from './SandETrackerBulkUpload';
import { useNavigate } from 'react-router-dom';

interface SandETrackerToolProps {
  canCreate:boolean;
  onRefresh: () => void;
  onFilterChange: (filters: {
    groupName: string;
    groupId: string;
    companyName: string;
    companyId: string;
    startDate: string;
    endDate: string;
  }) => void;
}

const SandETrackerTool: React.FC<SandETrackerToolProps> = ({ onRefresh, onFilterChange, canCreate }) => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState({
    groupName: '',
    groupId: '',
    companyName: '',
    companyId: '',
    startDate: '',
    endDate: ''
  });
  const navigate = useNavigate()
  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    console.log('Filter values changed:', newFilters);
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    
    const updatedFilters = {
      ...filters,
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
    
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className='w-full'>
      <div className='flex gap-3 items-center mb-4'>
        <SandETrackerFilter onFilterChange={handleFilterChange} />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
          variant="solid" 
          size="sm" 
          icon={<HiDownload />}
        >
          Download Notice Data
        </Button>
        {canCreate && (
        <Button
          variant="solid"
          size="sm"
          icon={<HiPlusCircle />}
          onClick={() => navigate('/notice-tracker/create')} // Adjust this path to match your routing structure
        >
          Add Notice
        </Button>
      )}
      </div>
    </div>
  )
}

export default SandETrackerTool