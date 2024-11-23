// import React, { useState } from 'react'
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import PTRCTrackerTool from './components/PTRCTrackerTool';
// import PTRCTrackerTable from './components/PTRCTrackerTable';

// const PTRCTracker = () => {
//   const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };


//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
//       <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
//         <div className="mb-4 lg:mb-0">
//           <h3 className="text-2xl font-bold">PT RC Tracker</h3>
//         </div>
//         <PTRCTrackerTool onFilterChange={handleFilterChange} />
//       </div>
//       <PTRCTrackerTable filters={filters} />
//     </AdaptableCard>
//   );
// };

// export default PTRCTracker

import React, { useCallback, useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import PTRCTrackerTool from './components/PTRCTrackerTool'
import PTRCTrackerTable from './components/PTRCTrackerTable'
import { PTTrackerData} from '@/@types/PTTracker'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'

const PTRCTracker = () => {
  const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' })
  const [data, setData] = useState<PTTrackerData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchPtrcTrackerData = useCallback(async () => {
    setIsLoading(true)
    try {
      const res = await httpClient.get(endpoints.ptrc.getAll())
      console.log(res.data.data)
      setData(res.data.data)
    } catch (error) {
      console.error('Error fetching PTRC tracker data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPtrcTrackerData()
  }, [fetchPtrcTrackerData])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-bold">PT RC Tracker</h3>
        </div>
        <PTRCTrackerTool onFilterChange={handleFilterChange} />
      </div>
      <PTRCTrackerTable 
        dataSent={data} 
        loading={isLoading} 
        onRefresh={fetchPtrcTrackerData}
      />
    </AdaptableCard>
  )
}

export default PTRCTracker