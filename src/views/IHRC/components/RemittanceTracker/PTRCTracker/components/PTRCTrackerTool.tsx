

import React, { useState } from 'react';
import UploadedPTDetails from './UploadedPTRCDetails';
import PTRCTrackerFilter from './PTRCTrackerFilter';
import PTRCTrackerBulkUpload from './PTRCTrackerBulkUpload';
import CustomDateRangePicker from '../../PFTracker/components/CustomDateRangePicker';
import { Button, toast, Notification } from '@/components/ui';
import { HiDownload } from 'react-icons/hi';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

const PTRCTrackerTool: React.FC<{ 
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

  if (showUploadedDetails) {
    return <UploadedPTDetails onBack={handleBack} />;
  }

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
      const formattedStartDate = filters.startDate ? new Date(filters.startDate).toISOString().split('T')[0].replace(/-/g, '/') : '';
      const formattedEndDate = filters.endDate ? new Date(filters.endDate).toISOString().split('T')[0].replace(/-/g, '/') : '';

      const res = await httpClient.get(endpoints.ptrc.downloadAll(), {
        responseType: 'blob',
        params: {
          'group_id[]': filters.groupId,
          'code[]': filters.ptCode,
          'company_id[]': filters.companyId,
          'to_date[]': formattedEndDate,
          'from_date': formattedStartDate
        }
      });
      if(res){
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'PTRCData.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
      
    }
    } catch (error) {
      console.error('Error downloading PTRC data:', error);
      // Here you might want to show an error notification to the user
      toast.push(
        <Notification title='Error' type='danger'>
            No data is available.
        </Notification>
      )
    }
  };

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
          Download PT RC Data
        </Button>
        <PTRCTrackerBulkUpload onUploadConfirm={handleUploadConfirm} canCreate={canCreate}/>
      </div>
    </div>
  );
};

export default PTRCTrackerTool;