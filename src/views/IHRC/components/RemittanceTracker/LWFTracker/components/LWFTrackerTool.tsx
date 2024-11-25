import React, { useState } from 'react'
import LWFTrackerFilter from './LWFTrackerFilter'
import LWFTrackerBulkUpload from './LWFTrackerBulkUpload'
import CustomDateRangePicker from './CustomDateRangePicker';
import { Button } from '@/components/ui';
import { HiDownload } from 'react-icons/hi';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

const LWFTrackerTool = () => {
  const [showUploadedDetails, setShowUploadedDetails] = useState(false);



  const handleUploadConfirm = () => {
    setShowUploadedDetails(true);
  };

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
      link.setAttribute('download', 'LWFData.xlsx')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url) // Clean up the URL object
    } catch (error) {
      console.error('Error downloading LWF data:', error)
      // Here you might want to show an error notification to the user
    }
  }


  return (
    <div>
      <div className='flex gap-3 items-center mb-4'>
        <LWFTrackerFilter />
        <CustomDateRangePicker onApply={handleDateRangeApply} />
        <Button  
        variant="solid" 
        size="sm" 
          icon={<HiDownload />}
        onClick={handleDownload}>Download LWF Data</Button>
        <LWFTrackerBulkUpload onUploadConfirm={handleUploadConfirm} />
      </div>
    </div>
  )
}

export default LWFTrackerTool