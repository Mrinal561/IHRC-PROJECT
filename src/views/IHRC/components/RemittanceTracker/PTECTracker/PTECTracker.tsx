// import React, { useEffect, useState } from 'react'
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import PTECTrackerTool from './components/PTECTrackerTool';
// import PTECTrackerTable from './components/PTECTrackerTable';
// import { PTTrackerData } from '@/@types/PTTracker';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';

// const PTECTracker = () => {
//   const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' });
//   const [data, setData] = useState<PTTrackerData[]>([]);
//   const [isLoading, setIsLoading] = useState(false)



//   const handleFilterChange = (newFilters: any) => {
//     setFilters(newFilters);
//   };


//   useEffect(() => {
//     fetchPTTrackerData();
//   }, []);

//   const fetchPTTrackerData = async () => {
//     setIsLoading(true)

//     try {
//       const res = await httpClient.get(endpoints.ptec.getAll())
//       console.log(res.data.data)
//       setData(res.data.data);
//     } catch (error) {
//       console.error('Error fetching PT tracker data:', error);
//     } finally {
//       setIsLoading(false)
//   }
//   };


//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
//       <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
//         <div className="mb-4 lg:mb-0">
//           <h3 className="text-2xl font-bold">PT EC Tracker</h3>
//         </div>
//         <PTECTrackerTool onFilterChange={handleFilterChange} />
//       </div>
//       <PTECTrackerTable dataSent={data}  loading={isLoading}/>
//     </AdaptableCard>
//   );
// };

// export default PTECTracker




import React, { useCallback, useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import PTECTrackerTool from './components/PTECTrackerTool'
import PTECTrackerTable from './components/PTECTrackerTable'
import { PTTrackerData } from '@/@types/PTTracker'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'

const PTECTracker: React.FC = () => {
    const [filters, setFilters] = useState({
        groupName: '',
        groupId: '',
        companyName: '',
        companyId: '',
        ptCode: '',
    })
    const [data, setData] = useState<PTTrackerData[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [pagination, setPagination] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
    })

    const fetchPTTrackerData = useCallback(
        async (page: number, pageSize: number) => {
            setIsLoading(true)
            try {
                console.log(filters)
                 const params: any = {
                    page,
                    page_size: pageSize,
                    'group_id[]': filters.groupId,
                    'company_id[]': filters.companyId,
                }
                  if (filters.ptCode) {
                    params['pt_code[]'] = filters.ptCode;
                }
                const res = await httpClient.get(endpoints.ptec.getAll(), {
                    params
                })
                setData(res.data.data)
                setPagination((prev) => ({
                    ...prev,
                    total: res.data.paginate_data.totalResults,
                }))
            } catch (error) {
                console.error('Error fetching PT tracker data:', error)
            } finally {
                setIsLoading(false)
            }
        },
        [filters.groupId, filters.companyId, filters.ptCode],
    )

    useEffect(() => {
        fetchPTTrackerData(pagination.pageIndex, pagination.pageSize)
    }, [fetchPTTrackerData, pagination.pageIndex, pagination.pageSize,filters.groupId, filters.companyId])

    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters)
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
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">PT EC Tracker</h3>
                </div>
                <PTECTrackerTool onFilterChange={handleFilterChange} />
            </div>
            <PTECTrackerTable
                dataSent={data}
                loading={isLoading}
                onRefresh={() =>
                    fetchPTTrackerData(
                        pagination.pageIndex,
                        pagination.pageSize,
                    )
                }
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </AdaptableCard>
    )
}

export default PTECTracker