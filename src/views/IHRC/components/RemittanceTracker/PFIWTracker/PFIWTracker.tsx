

// import React, { useCallback, useEffect, useState } from 'react';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import PFIWTrackerTable, { PFIWTrackerData } from './components/PFIWTrackerTable';
// import PFIWTrackerTool from './components/PFIWTrackerTool';
// import { PfiwChallanData } from '@/@types/PfiwChallanData';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';
// import Loading from '@/components/shared/Loading';

// const PFIWTracker: React.FC = () => {
//   const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });
//   const [data, setData] = useState<PFIWTrackerData[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [pagination, setPagination] = useState({
//     total: 0,
//     pageIndex: 1,
//     pageSize: 10,
//   });

//   const fetchPFIWTrackerData = useCallback(
//     async (page: number, pageSize: number) => {
//       setIsLoading(true);
//       try {
//         const res = await httpClient.get(endpoints.pfiwtracker.pfiwGetAll(), {
//           params: {
//             page,
//             page_size: pageSize,
//           },
//         });
//         console.log(res.data.data);
//         setData(res.data.data);
//         setPagination((prev) => ({
//           ...prev,
//           total: res.data.paginate_data.totalResults,
//         }));
//       } catch (error) {
//         console.error('Error fetching PFIW tracker data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [],
//   );

//   useEffect(() => {
//     fetchPFIWTrackerData(pagination.pageIndex, pagination.pageSize);
//   }, [fetchPFIWTrackerData, pagination.pageIndex, pagination.pageSize]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//   };

//   const handlePaginationChange = (page: number) => {
//     setPagination((prev) => ({ ...prev, pageIndex: page }));
//   };

//   const handlePageSizeChange = (newPageSize: number) => {
//     setPagination((prev) => ({
//       ...prev,
//       pageSize: newPageSize,
//       pageIndex: 1, // Reset to first page when changing page size
//     }));
//   };

  // return (
  //   <AdaptableCard className="h-full" bodyClass="h-full">
  //     <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
  //       <div className="">
  //         <h3 className="text-2xl font-bold">PF IW Tracker</h3>
  //       </div>
  //       <PFIWTrackerTool onFilterChange={handleFilterChange} />
  //     </div>
  //     <PFIWTrackerTable
  //       loading={isLoading}
  //       dataSent={data}
  //       onRefresh={() => fetchPFIWTrackerData(pagination.pageIndex, pagination.pageSize)}
  //       pagination={pagination}
  //       onPaginationChange={handlePaginationChange}
  //       onPageSizeChange={handlePageSizeChange}
  //     />
  //   </AdaptableCard>
  // );
// };

// export default PFIWTracker;

import React, { useCallback, useEffect, useState } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import PFIWTrackerTable from './components/PFIWTrackerTable';
import PFIWTrackerTool from './components/PFIWTrackerTool';
import { PfiwChallanData } from '@/@types/PfiwChallanData';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import Loading from '@/components/shared/Loading';

const PFIWTracker: React.FC = () => {
    const [filters, setFilters] = useState({
        groupName: '',
        groupId: '',
        companyName: '',
        companyId: '',
        pfCode: '',
    })
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pagination, setPagination] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
    })

    const fetchPFIWTrackerData = useCallback(
        async (page: number, pageSize: number) => {
            setIsLoading(true)
            try {
                const params: any = {
                    page,
                    page_size: pageSize,
                    'group_id[]': filters.groupId,
                    'company_id[]': filters.companyId,
                }

                // Only add pf_code[] to params if it's selected
                if (filters.pfCode) {
                    params['pf_code[]'] = filters.pfCode;
                }

                const res = await httpClient.get(endpoints.pfiwtracker.pfiwGetAll(), {
                    params
                })
                
                console.log(res.data.data)
                setData(res.data.data)
                setPagination((prev) => ({
                    ...prev,
                    total: res.data.paginate_data.totalResults,
                }))
            } catch (error) {
                console.error('Error fetching PFIW tracker data:', error)
            } finally {
                setIsLoading(false)
            }
        },
        [filters.groupId, filters.companyId, filters.pfCode]
    )

    useEffect(() => {
        fetchPFIWTrackerData(pagination.pageIndex, pagination.pageSize)
    }, [fetchPFIWTrackerData, pagination.pageIndex, pagination.pageSize, filters.groupId, filters.companyId])

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters)
        // Reset pagination to first page when filters change
        setPagination((prev) => ({
            ...prev,
            pageIndex: 1,
        }))
    }

    const handlePaginationChange = (page: number) => {
        setPagination((prev) => ({ ...prev, pageIndex: page }))
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPagination((prev) => ({
            ...prev,
            pageSize: newPageSize,
            pageIndex: 1, // Reset to first page when changing page size
        }))
    }

    return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
        <div className="">
          <h3 className="text-2xl font-bold">PF IW Tracker</h3>
        </div>
        <PFIWTrackerTool onFilterChange={handleFilterChange} />
      </div>
      <PFIWTrackerTable
        loading={isLoading}
        dataSent={data}
        onRefresh={() => fetchPFIWTrackerData(pagination.pageIndex, pagination.pageSize)}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </AdaptableCard>
  );
}

export default PFIWTracker