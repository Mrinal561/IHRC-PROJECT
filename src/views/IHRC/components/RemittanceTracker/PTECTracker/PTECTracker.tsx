
import React, { useCallback, useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import PTECTrackerTool from './components/PTECTrackerTool'
import PTECTrackerTable from './components/PTECTrackerTable'
import { PTTrackerData } from '@/@types/PTTracker'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Notification, toast } from '@/components/ui'
import { fetchAuthUser } from '@/store/slices/login'
import { Loading } from '@/components/shared'


interface Permissions {
    canList: boolean;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
}

const getPermissions = (menuItem: any): Permissions => {
    const permissionsObject = menuItem?.permissions || menuItem?.access || {}
    return {
        canList: !!permissionsObject.can_list,
        canCreate: !!permissionsObject.can_create,
        canEdit: !!permissionsObject.can_edit,
        canDelete: !!permissionsObject.can_delete,
    }
}


const PTECTracker: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
    const [permissions, setPermissions] = useState<Permissions>({
        canList: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
    })
    const [isInitialized, setIsInitialized] = useState(false)
    const [permissionCheckComplete, setPermissionCheckComplete] = useState(false)




    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await dispatch(fetchAuthUser())
                
                // Find Remittance Tracker module
                const remittanceModule = response.payload.moduleAccess?.find(
                    (module: any) => module.id === 3
                )
                
                if (!remittanceModule) {
                    console.warn('Remittance Tracker module not found')
                    setPermissionCheckComplete(true)
                    return
                }

                // Find PF Tracker menu item
                const pfTrackerMenu = remittanceModule.menus?.find(
                    (menu: any) => menu.id === 21
                )

                if (!pfTrackerMenu) {
                    console.warn('PTEC Tracker menu not found')
                    setPermissionCheckComplete(true)
                    return
                }

                // Get and set permissions only once
                const newPermissions = getPermissions(pfTrackerMenu)
                setPermissions(newPermissions)
                setIsInitialized(true)
                
                // If no list permission, show notification and redirect
                if (!newPermissions.canList) {
                    toast.push(
                        <Notification
                            title="Permission"
                            type="danger"
                        >
                            You don't have permission of PTEC Tracker
                        </Notification>
                    )
                    navigate('/home')
                }
                setPermissionCheckComplete(true)

            } catch (error) {
                console.error('Error fetching auth user:', error)
                setIsInitialized(true)
                setPermissionCheckComplete(true)
            }
        }

        if (!isInitialized) {
            initializeAuth()
        }
    }, [dispatch, isInitialized])


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

    if (!isInitialized || !permissionCheckComplete) {
        return (
            <Loading loading={true} type="default">
                <div className="h-full" />
            </Loading>
        )
    }

    // Only render if we have list permission
    if (!permissions.canList) {
        return null
    }

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">PT EC Tracker</h3>
                </div>
                <PTECTrackerTool onFilterChange={handleFilterChange} canCreate={permissions.canCreate} />
            </div>
            <PTECTrackerTable
                dataSent={data}
                loading={isLoading}
                companyName={filters.companyName} 
                code={filters.ptCode}
                onRefresh={() =>
                    fetchPTTrackerData(
                        pagination.pageIndex,
                        pagination.pageSize,
                    )
                }
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                onPageSizeChange={handlePageSizeChange}
                canEdit={permissions.canEdit}
                canDelete={permissions.canDelete}
            />
        </AdaptableCard>
    )
}

export default PTECTracker