// import React, { useState } from 'react';
// import PFIWTrackerFilter from './PFIWTrackerFilter';
// import PFIWTrackerTable from './PFIWTrackerTable';
// // import PFIWTrackerBulkUpload from './PFIWTrackerBulkUpload';
// // import UploadedPFIWDetails from './UploadedPFIWDetails';
// import { dummyData } from './PFIWTrackerTable';
// import PFIWTrackerBulkUpload from './PFIWTrackerBulkUpload';
// import UploadedPFIWDetails from './UploadedPFIWDetails';
// import { HiDownload } from 'react-icons/hi';
// import { Button } from '@/components/ui';
// import CustomDateRangePicker from './CustomDateRangePicker';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';

// const PFIWTrackerTool: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
//   const [showUploadedDetails, setShowUploadedDetails] = useState(false);
//   const [filters, setFilters] = useState({ entityName: '', pfCode: '', location: '' });
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
  
//   const handleUploadConfirm = () => {
//     setShowUploadedDetails(true);
//   };

//   const handleBack = () => {
//     setShowUploadedDetails(false);
//   };

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   if (showUploadedDetails) {
//     return <UploadedPFIWDetails onBack={handleBack} />;
//     }

//     const handleDateRangeApply = (start: Date, end: Date) => {
//       setStartDate(start);
//       setEndDate(end);
//     };
  
//     const handleDownload = async () => {
//     try {
//       const res = await httpClient.get(endpoints.pfiwtracker.downloadALl(), {
//         responseType: 'blob'
//       })
      
//       const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
//       const url = window.URL.createObjectURL(blob)
//       const link = document.createElement('a')
//       link.href = url
//       link.setAttribute('download', 'PFIWData.xlsx')
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//       window.URL.revokeObjectURL(url) // Clean up the URL object
//     } catch (error) {
//       console.error('Error downloading LWF data:', error)
//       // Here you might want to show an error notification to the user
//     }
//   }




//   return (
//     <div>
//       <div className="flex gap-3 items-center mb-4">
//         <PFIWTrackerFilter data={dummyData} onFilterChange={handleFilterChange} />
//         <CustomDateRangePicker onApply={handleDateRangeApply} />
//         <Button
//         variant="solid"
//         size="sm"
//           icon={<HiDownload />}
//         onClick={handleDownload}>Download PF IW Data</Button>
//         <PFIWTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
//       </div>
//     </div>
//   );
// };

// export default PFIWTrackerTool;

import React, { useState } from 'react';
import PFIWTrackerFilter from './PFIWTrackerFilter';
import PFIWTrackerTable from './PFIWTrackerTable';
import PFIWTrackerBulkUpload from './PFIWTrackerBulkUpload';
import UploadedPFIWDetails from './UploadedPFIWDetails';
import { dummyData } from './PFIWTrackerTable';
import { Button } from '@/components/ui';
import { HiDownload } from 'react-icons/hi';
import CustomDateRangePicker from './CustomDateRangePicker';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

const PFIWTrackerTool: React.FC<{ 
  onFilterChange: (filters: { 
    groupName: string; 
    groupId: string;
    companyName: string; 
    companyId: string;
    pfCode: string 
  }) => void ;
  canCreate:boolean
}> = ({ onFilterChange, canCreate }) => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);
  const [filters, setFilters] = useState({ 
    groupName: '', 
    groupId: '',
    companyName: '', 
    companyId: '',
    pfCode: '' 
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
  };

  const handleBack = () => {
    setShowUploadedDetails(false);
  };

  const handleFilterChange = (newFilters: { 
    groupName: string; 
    groupId: string;
    companyName: string; 
    companyId: string;
    pfCode: string 
  }) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  if (showUploadedDetails) {
    return <UploadedPFIWDetails onBack={handleBack} />;
  }

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleDownload = async () => {
    try {
      const res = await httpClient.get(endpoints.pfiwtracker.downloadALl(), {
        responseType: 'blob'
      })
      
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'PFIWData.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url) // Clean up the URL object
    } catch (error) {
      console.error('Error downloading PFIW data:', error)
      // Here you might want to show an error notification to the user
    }
  }

  return (
    <div>
      <div className="flex gap-4 items-center mb-4 w-full">
        <PFIWTrackerFilter 
          onFilterChange={handleFilterChange} 
        />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
          variant="solid" 
          size="sm" 
          icon={<HiDownload />}
          onClick={handleDownload}>
          Download PF IW Data
        </Button>
        <PFIWTrackerBulkUpload onUploadConfirm={handleUploadConfirm} canCreate={canCreate} />
      </div>
    </div>
  );
};

export default PFIWTrackerTool;