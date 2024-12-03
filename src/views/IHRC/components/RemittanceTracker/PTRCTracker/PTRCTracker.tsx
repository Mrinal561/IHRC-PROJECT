

// import React, { useCallback, useEffect, useState } from 'react'
// import AdaptableCard from '@/components/shared/AdaptableCard'
// import PTRCTrackerTool from './components/PTRCTrackerTool'
// import PTRCTrackerTable from './components/PTRCTrackerTable'
// import { PTTrackerData} from '@/@types/PTTracker'
// import httpClient from '@/api/http-client'
// import { endpoints } from '@/api/endpoint'

// const PTRCTracker = () => {
//   const [filters, setFilters] = useState({ groupName: '', companyName: '', pfCode: '' })
//   const [data, setData] = useState<PTTrackerData[]>([])
//   const [isLoading, setIsLoading] = useState(false)

//   const fetchPtrcTrackerData = useCallback(async () => {
//     setIsLoading(true)
//     try {
//       const res = await httpClient.get(endpoints.ptrc.getAll())
//       console.log(res.data.data)
//       setData(res.data.data)
//     } catch (error) {
//       console.error('Error fetching PTRC tracker data:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }, [])

//   useEffect(() => {
//     fetchPtrcTrackerData()
//   }, [fetchPtrcTrackerData])

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters)
//   }

//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
//       <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
//         <div className="mb-4 lg:mb-0">
//           <h3 className="text-2xl font-bold">PT RC Tracker</h3>
//         </div>
//         <PTRCTrackerTool onFilterChange={handleFilterChange} />
//       </div>
//       <PTRCTrackerTable
//         dataSent={data}
//         loading={isLoading}
//         onRefresh={fetchPtrcTrackerData}
//       />
//     </AdaptableCard>
//   )
// }

// export default PTRCTracker


import React, { useCallback, useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import PTRCTrackerTool from './components/PTRCTrackerTool'
import PTRCTrackerTable from './components/PTRCTrackerTable'
import { PTTrackerData } from '@/@types/PTTracker'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'

const PTRCTracker: React.FC = () => {
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

    const fetchPtrcTrackerData = useCallback(
        async (page: number, pageSize: number) => {
            setIsLoading(true)
            try {
                    const params: any = {
                        page,
                        page_size: pageSize,
                        'group_id[]': filters.groupId,
                        'company_id[]': filters.companyId,
                    }
                    if (filters.ptCode) {
                        params['pt_code[]'] = filters.ptCode;
                    }
                const res = await httpClient.get(endpoints.ptrc.getAll(), {
                    params
                })
                setData(res.data.data)
                setPagination((prev) => ({
                    ...prev,
                    total: res.data.paginate_data.totalResults,
                }))
            } catch (error) {
                console.error('Error fetching PTRC tracker data:', error)
            } finally {
                setIsLoading(false)
            }
        },
        [filters.groupId, filters.companyId, filters.ptCode],
    )

    useEffect(() => {
        fetchPtrcTrackerData(pagination.pageIndex, pagination.pageSize)
    }, [fetchPtrcTrackerData, pagination.pageIndex, pagination.pageSize,filters.groupId, filters.companyId])

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
                    <h3 className="text-2xl font-bold">PT RC Tracker</h3>
                </div>
                <PTRCTrackerTool onFilterChange={handleFilterChange} />
            </div>
            <PTRCTrackerTable
                dataSent={data}
                loading={isLoading}
                companyName={filters.companyName} 
                code={filters.ptCode}
                onRefresh={() =>
                    fetchPtrcTrackerData(
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

export default PTRCTracker