// import React, { useState } from 'react';
// // import { dummyData } from './PTECTrackerTable';
// import UploadedPTDetails from './UploadedPTECDetails';
// import PTRCTrackerFilter from './PTECTrackerFilter';
// import PTRCTrackerBulkUpload from './PTECTrackerBulkUpload.js';
// import CustomDateRangePicker from './CustomDateRangePicker';
// import { Button } from '@/components/ui';
// import { HiDownload } from 'react-icons/hi';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';


// const PTECTrackerTool: React.FC<{ onFilterChange: (filters: any) => void }> = ({ onFilterChange }) => {
//   const [showUploadedDetails, setShowUploadedDetails] = useState(false);
//   const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });


//   const handleUploadConfirm = () => {
//     setShowUploadedDetails(true);
//   };

//   const handleBack = () => {
//     setShowUploadedDetails(false);
//   };

//   const handleFilterChange = (newFilters: any) => {
//     setFilters(newFilters);
//     // You can apply the filters to your data here or pass them to PFTrackerTable
//   };

//   if (showUploadedDetails) {
//     return <UploadedPTDetails onBack={handleBack} />;
//   }
//   // const handleDateRangeApply = (start: Date, end: Date) => {
//   //   setStartDate(start);
//   //   setEndDate(end);
//   // };

//        const handleDownload = async () => {
//     try {
//       const res = await httpClient.get(endpoints.ptec.downloadAll(), {
//         responseType: 'blob'
//       })
      
//       const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
//       const url = window.URL.createObjectURL(blob)
//       const link = document.createElement('a')
//       link.href = url
//       link.setAttribute('download', 'PTECData.xlsx')
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
//         <PTRCTrackerFilter  onFilterChange={onFilterChange} />
//         {/* <CustomDateRangePicker onApply={handleDateRangeApply} /> */}
//         <Button
//         variant="solid"
//         size="sm"
//           icon={<HiDownload />}
//         onClick={handleDownload}>Download PT EC Data</Button>
//         <PTRCTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
//       </div>
//     </div>
//   );
// };

// export default PTECTrackerTool;


import React, { useState } from 'react';
import UploadedPTDetails from './UploadedPTECDetails';
import PTRCTrackerFilter from './PTECTrackerFilter';
import PTRCTrackerBulkUpload from './PTECTrackerBulkUpload.js';
import CustomDateRangePicker from './CustomDateRangePicker';
import { Button } from '@/components/ui';
import { HiDownload } from 'react-icons/hi';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

const PTECTrackerTool: React.FC<{ 
  onFilterChange: (filters: { 
    groupName: string; 
    groupId: string;
    companyName: string; 
    companyId: string;
    ptCode: string ;
    startDate: string;
    endDate: string;
  }) => void ;
  canCreate: boolean;
}> = ({ onFilterChange, canCreate }) => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);
  const [filters, setFilters] = useState({ 
    groupName: '', 
    groupId: '',
    companyName: '', 
    companyId: '',
    ptCode: '' ,
    startDate:'',
    endDate:''
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const handleDateRangeApply = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);

        // console.log(startDate, endDate)
        setFilters(prevFilters => ({
          ...prevFilters,
          startDate: start.toISOString().split('T')[0], // Format: YYYY-MM-DD
          endDate: end.toISOString().split('T')[0]
        }));
      
        // Also call onFilterChange to notify parent component
        onFilterChange({
          ...filters,
          startDate: start.toISOString().split('T')[0],
          endDate: end.toISOString().split('T')[0]
        });
  };

  const handleDownload = async () => {
    try {
      const res = await httpClient.get(endpoints.ptec.downloadAll(), {
        responseType: 'blob'
      });
      
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'PTECData.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Error downloading PTEC data:', error);
      // Here you might want to show an error notification to the user
    }
  };

  if (showUploadedDetails) {
    return <UploadedPTDetails onBack={handleBack} />;
  }

  return (
    <div>
      <div className="flex gap-4 items-center mb-4 w-full">
        <PTRCTrackerFilter 
          onFilterChange={handleFilterChange} 
        />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
          variant="solid" 
          size="sm" 
          icon={<HiDownload />}
          onClick={handleDownload}
        >
          Download PT EC Data
        </Button>
        <PTRCTrackerBulkUpload onUploadConfirm={handleUploadConfirm} canCreate={canCreate} />
      </div>
    </div>
  );
};

export default PTECTrackerTool;