import React, { useCallback, useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
// import NoticeTrackerTool from './components/NoticeTrackerTool'
// import NoticeTrackerTable from './components/NoticeTrackerTable'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'
import Loading from '@/components/shared/Loading'
import NoticeTrackerTable from './components/SandETrackerTable'
import SandETrackerTool from './components/SandETrackerTool'
import { useDispatch } from 'react-redux'



const SandETracker = () => {

  const [filters, setFilters] = useState({
    companyName: '',
    companyId: '',
    employeeName: '',
    department: '',
    startDate: '',
    endDate: '',
    status: ''
})
const dispatch = useDispatch()
const [data, setData] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [pagination, setPagination] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
})

const fetchNoticeTrackerData = useCallback(
    async (page: number, pageSize: number) => {
        setIsLoading(true)
        try {
            const params: any = {
                page,
                page_size: pageSize,
                // 'company_id[]': filters.companyId,
                // 'from_date': filters.startDate,
                // 'to_date': filters.endDate,
            }

            const res = await httpClient.get(endpoints.noticeTracker.list(), {
                params
            })
            
            setData(res.data.data)
            setPagination((prev) => ({
                ...prev,
                total: res.data.paginate_data.totalResults,
            }))
        } catch (error) {
            console.error('Error fetching Notice tracker data:', error)
        } finally {
            setIsLoading(false)
        }
    },
    [filters]
)

useEffect(() => {
    fetchNoticeTrackerData(pagination.pageIndex, pagination.pageSize)
}, [fetchNoticeTrackerData, pagination.pageIndex, pagination.pageSize])

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
        pageIndex: 1,
    }))
}

if (isLoading) {
    return (
        <Loading loading={true} type="default">
            <div className="h-full" />
        </Loading>
    )
}

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
    <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
      <div className="mb-4 lg:mb-0">
        <h3 className="text-2xl font-bold">Notice Tracker</h3>
      </div>
      <SandETrackerTool  onRefresh={() => fetchNoticeTrackerData(pagination.pageIndex, pagination.pageSize)}  />
    </div>
    <NoticeTrackerTable
    loading={isLoading}
    data={data}
    onRefresh={() =>
        fetchNoticeTrackerData(
            pagination.pageIndex,
            pagination.pageSize
        )
    }
    pagination={pagination}
    onPaginationChange={handlePaginationChange}
    onPageSizeChange={handlePageSizeChange}  />
  </AdaptableCard>
  )
}

export default SandETracker