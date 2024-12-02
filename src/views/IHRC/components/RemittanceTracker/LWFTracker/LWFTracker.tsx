// import React from 'react'
// import LWFTrackerTool from './components/LWFTrackerTool'
// import LWFTrackerTable from './components/LWFTrackerTable'
// import { AdaptableCard } from '@/components/shared'

// const LWFTracker = () => {
//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
//     <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
//       <div className="mb-4 lg:mb-0">
//         <h3 className="text-2xl font-bold">LWF Tracker</h3>
//       </div>
//       <LWFTrackerTool />
//     </div>
//     <LWFTrackerTable  />
//   </AdaptableCard>
//   )
// }

// export default LWFTracker

// import React, { useCallback, useEffect, useState } from 'react';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import LWFTrackerTable, { LWFTrackerData } from './components/LWFTrackerTable';
// import LWFTrackerTool from './components/LWFTrackerTool';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';

// const LWFTracker: React.FC = () => {
//   const [filters, setFilters] = useState({ groupName: '', companyName: '', lwfCode: '' });
//   const [data, setData] = useState<LWFTrackerData[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//       const [pagination, setPagination] = useState({
//     total: 0,
//     pageIndex: 1,
//     pageSize: 10,
//   });


//   const fetchLWFTrackerData = useCallback(async (page: number, pageSize: number) => {
//     setIsLoading(true);
//     try {
//       const res = await httpClient.get(endpoints.lwftracker.lwfGetAll(), {
//           params: {
//             page,
//             page_size: pageSize,
//           },
//         });
//       console.log(res.data.data);
//       setData(res.data.data);
//        setPagination((prev) => ({
//           ...prev,
//           total: res.data.paginate_data.totalResults,
//         }));
//     } catch (error) {
//       console.error('Error fetching LWF tracker data:', error);
//       // Optionally, you could add error state or toast notification here
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchLWFTrackerData(pagination.pageIndex, pagination.pageSize);
//   }, [fetchLWFTrackerData,pagination.pageIndex, pagination.pageSize]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };
//     const handlePaginationChange = (page: number) => {
//     setPagination((prev) => ({ ...prev, pageIndex: page }));
//   };

//   const handlePageSizeChange = (newPageSize: number) => {
//     setPagination((prev) => ({
//       ...prev,
//       pageSize: newPageSize,
//       pageIndex: 1, // Reset to first page when changing page size
//     }));
//   };

//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
//       <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
//         <div className="">
//           <h3 className="text-2xl font-bold">LWF Tracker</h3>
//         </div>
//         <LWFTrackerTool onFilterChange={handleFilterChange} />
//       </div>
//       <LWFTrackerTable
//         loading={isLoading}
//         dataSent={data}
//         onRefresh={() => fetchLWFTrackerData(pagination.pageIndex, pagination.pageSize)}
//        pagination={pagination}
//         onPaginationChange={handlePaginationChange}
//         onPageSizeChange={handlePageSizeChange}
//       />
//     </AdaptableCard>
//   );
// };

// export default LWFTracker;




import React, { useCallback, useEffect, useState } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import LWFTrackerTable, { LWFTrackerData } from './components/LWFTrackerTable';
import LWFTrackerTool from './components/LWFTrackerTool';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import Loading from '@/components/shared/Loading';

const LWFTracker: React.FC = () => {
    const [filters, setFilters] = useState({
        groupName: '',
        groupId: '',
        companyName: '',
        companyId: '',
        lwfCode: '',
    });
    const [data, setData] = useState<LWFTrackerData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
    });

    const fetchLWFTrackerData = useCallback(
        async (page: number, pageSize: number) => {
            setIsLoading(true);
            try {
                const params: any = {
                    page,
                    page_size: pageSize,
                    'group_id[]': filters.groupId,
                    'company_id[]': filters.companyId,
                };

                // Only add lwf_code[] to params if it's selected
                if (filters.lwfCode) {
                    params['register_number[]'] = filters.lwfCode;
                }

                const res = await httpClient.get(endpoints.lwftracker.lwfGetAll(), {
                    params
                });
                
                console.log(res.data.data);
                setData(res.data.data);
                setPagination((prev) => ({
                    ...prev,
                    total: res.data.paginate_data.totalResults,
                }));
            } catch (error) {
                console.error('Error fetching LWF tracker data:', error);
            } finally {
                setIsLoading(false);
            }
        },
        [filters.groupId, filters.companyId, filters.lwfCode]
    );

    useEffect(() => {
        fetchLWFTrackerData(pagination.pageIndex, pagination.pageSize);
    }, [
        fetchLWFTrackerData,
        pagination.pageIndex,
        pagination.pageSize,
        filters.groupId,
        filters.companyId
    ]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Reset pagination to first page when filters change
        setPagination((prev) => ({
            ...prev,
            pageIndex: 1,
        }));
    };

    const handlePaginationChange = (page: number) => {
        setPagination((prev) => ({ ...prev, pageIndex: page }));
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            pageSize: newPageSize,
            pageIndex: 1, // Reset to first page when changing page size
        }));
    };

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
                <div className="">
                    <h3 className="text-2xl font-bold">LWF Tracker</h3>
                </div>
                <LWFTrackerTool onFilterChange={handleFilterChange} />
            </div>
            <LWFTrackerTable
                loading={isLoading}
                dataSent={data}
                companyName={filters.companyName} 
                onRefresh={() => fetchLWFTrackerData(pagination.pageIndex, pagination.pageSize)}
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </AdaptableCard>
    );
};

export default LWFTracker;