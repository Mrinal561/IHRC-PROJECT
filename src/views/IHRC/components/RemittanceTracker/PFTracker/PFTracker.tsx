
// // import React, { useCallback, useEffect, useState } from 'react'
// // import AdaptableCard from '@/components/shared/AdaptableCard'
// // import PFTrackerTool from './components/PFTrackerTool'
// // import PFTrackerTable from './components/PFTrackerTable'
// // import { PfChallanData } from '@/@types/pfTracker'
// // import httpClient from '@/api/http-client'
// // import { endpoints } from '@/api/endpoint'
// // import Loading from '@/components/shared/Loading'
// // import { useDispatch } from 'react-redux'
// // import { fetchAuthUser } from '@/store/slices/login'
// // import { useNavigate } from 'react-router-dom'

// // const PFTracker: React.FC = () => {
// //     const [filters, setFilters] = useState({
// //         groupName: '',
// //         groupId: '',
// //         companyName: '',
// //         companyId: '',
// //         pfCode: '',
// //     })
// //     const [data, setData] = useState<PfChallanData[]>([])
// //     const dispatch = useDispatch()
// //     const navigate = useNavigate()
// //     const [isLoading, setIsLoading] = useState(false)
// //     const [canList, setCanList] = useState(false)
// //     const [canCreate, setCanCreate] = useState(false)
// //     const [canEdit, setCanEdit] = useState(false)
// //     const [canDelete, setCanDelete] = useState(false)
// //     const [pagination, setPagination] = useState({
// //         total: 0,
// //         pageIndex: 1,
// //         pageSize: 10,
// //     })


// //     useEffect(() => {
// //         const initializeAuth = async () => {
// //             try {
// //                 const response = await dispatch(fetchAuthUser())
// //                 // Find Remittance Tracker module
// //                 const remittanceModule = response.payload.moduleAccess?.find(
// //                     module => module.id === 3
// //                 )
                
// //                 // Find PF Tracker menu item
// //                 const pfTrackerMenu = remittanceModule?.menus?.find(
// //                     menu => menu.id === 16
// //                 )
    
// //                 if (pfTrackerMenu) {
// //                     // Check both permissions and access objects
// //                     const permissionsObject = pfTrackerMenu.permissions || pfTrackerMenu.access
    
// //                     if (permissionsObject) {
// //                         setCanList(permissionsObject.can_list)
// //                         setCanCreate(permissionsObject.can_create)
// //                         setCanEdit(permissionsObject.can_edit)
// //                         setCanDelete(permissionsObject.can_delete)
// //                     }
// //                 }
// //             } catch (error) {
// //                 console.error('Error fetching auth user:', error)
// //             }
// //         }
// //         initializeAuth()
// //     }, [dispatch])


// //     useEffect(() => {
// //         console.log(canList)
// //         // Redirect to /home if canList is false
// //         if (!canList) {
// //             // navigate('/home')
// //         }
// //     }, [ navigate])

// // const fetchPFTrackerData = useCallback(
// //     async (page: number, pageSize: number) => {
// //         setIsLoading(true)
// //         try {
// //             const params: any = {
// //                 page,
// //                 page_size: pageSize,
// //                 'group_id[]': filters.groupId,
// //                 'company_id[]': filters.companyId,
// //             }

// //             // Only add pf_code[] to params if it's selected
// //             if (filters.pfCode) {
// //                 params['pf_code[]'] = filters.pfCode;
// //             }

// //             const res = await httpClient.get(endpoints.tracker.pfGetALl(), {
// //                 params
// //             })
            
// //             console.log(res.data.data)
// //             setData(res.data.data)
// //             setPagination((prev) => ({
// //                 ...prev,
// //                 total: res.data.paginate_data.totalResults,
// //             }))
// //         } catch (error) {
// //             console.error('Error fetching PF tracker data:', error)
// //         } finally {
// //             setIsLoading(false)
// //         }
// //     },
// //     [filters.groupId, filters.companyId, filters.pfCode] // Add filters.pfCode to dependency array
// // )
// //     useEffect(() => {
// //         fetchPFTrackerData(pagination.pageIndex, pagination.pageSize)
// //     }, [fetchPFTrackerData, pagination.pageIndex, pagination.pageSize, filters.groupId, filters.companyId])

// //     const handleFilterChange = (newFilters) => {
// //         setFilters(newFilters)
// //         // Reset pagination to first page when filters change
// //         setPagination((prev) => ({
// //             ...prev,
// //             pageIndex: 1,
// //         }))
// //     }

// //     const handlePaginationChange = (page: number) => {
// //         setPagination((prev) => ({ ...prev, pageIndex: page }))
// //     }

// //     const handlePageSizeChange = (newPageSize: number) => {
// //         setPagination((prev) => ({
// //             ...prev,
// //             pageSize: newPageSize,
// //             pageIndex: 1, // Reset to first page when changing page size
// //         }))
// //     }

// //     return (
// //         <AdaptableCard className="h-full" bodyClass="h-full">
// //             <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
// //                 <div className="">
// //                     <h3 className="text-2xl font-bold">PF Tracker</h3>
// //                 </div>
// //                 <PFTrackerTool onFilterChange={handleFilterChange} />
// //             </div>
// //             <PFTrackerTable
// //                 loading={isLoading}
// //                 dataSent={data}
// //                 companyName={filters.companyName} 
// //                 code = {filters.pfCode}
// //                 onRefresh={() =>
// //                     fetchPFTrackerData(
// //                         pagination.pageIndex,
// //                         pagination.pageSize
// //                     )
// //                 }
// //                 pagination={pagination}
// //                 onPaginationChange={handlePaginationChange}
// //                 onPageSizeChange={handlePageSizeChange}
// //                 canEdit={canEdit}
// //                 canCreate={canCreate}
// //             />
// //         </AdaptableCard>
// //     )
// // }

// // export default PFTracker

// import React, { useCallback, useEffect, useState } from 'react'
// import AdaptableCard from '@/components/shared/AdaptableCard'
// import PFTrackerTool from './components/PFTrackerTool'
// import PFTrackerTable from './components/PFTrackerTable'
// import { PfChallanData } from '@/@types/pfTracker'
// import httpClient from '@/api/http-client'
// import { endpoints } from '@/api/endpoint'
// import { useDispatch } from 'react-redux'
// import { fetchAuthUser } from '@/store/slices/login'
// import { useNavigate } from 'react-router-dom'
// import toast from '@/components/ui/toast'
// import {Notification} from '@/components/ui'
// import { Loading } from '@/components/shared'

// // Interface for permissions
// interface Permissions {
//     canList: boolean;
//     canCreate: boolean;
//     canEdit: boolean;
//     canDelete: boolean;
// }

// const getPermissions = (menuItem: any): Permissions => {
//     const permissionsObject = menuItem?.permissions || menuItem?.access || {}
//     return {
//         canList: !!permissionsObject.can_list,
//         canCreate: !!permissionsObject.can_create,
//         canEdit: !!permissionsObject.can_edit,
//         canDelete: !!permissionsObject.can_delete,
//     }
// }

// const PFTracker: React.FC = () => {
//     const [filters, setFilters] = useState({
//         groupName: '',
//         groupId: '',
//         companyName: '',
//         companyId: '',
//         pfCode: '',
//     })
//     const [data, setData] = useState<PfChallanData[]>([])
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [isLoading, setIsLoading] = useState(false)
//     const [permissions, setPermissions] = useState<Permissions>({
//         canList: false,
//         canCreate: false,
//         canEdit: false,
//         canDelete: false,
//     })
//     const [isInitialized, setIsInitialized] = useState(false)
//     const [pagination, setPagination] = useState({
//         total: 0,
//         pageIndex: 1,
//         pageSize: 10,
//     })

//     useEffect(() => {
//         const initializeAuth = async () => {
//             try {
//                 const response = await dispatch(fetchAuthUser())
                
//                 // Find Remittance Tracker module
//                 const remittanceModule = response.payload.moduleAccess?.find(
//                     (module: any) => module.id === 3
//                 )
                
//                 if (!remittanceModule) {
//                     console.warn('Remittance Tracker module not found')
//                     return
//                 }

//                 // Find PF Tracker menu item
//                 const pfTrackerMenu = remittanceModule.menus?.find(
//                     (menu: any) => menu.id === 16
//                 )

//                 if (!pfTrackerMenu) {
//                     console.warn('PF Tracker menu not found')
//                     return
//                 }

//                 // Get and set permissions only once
//                 const newPermissions = getPermissions(pfTrackerMenu)
//                 setPermissions(newPermissions)
//                 setIsInitialized(true)

//             } catch (error) {
//                 console.error('Error fetching auth user:', error)
//                 setIsInitialized(true) // Set initialized even on error to prevent loading state
//             }
//         }

//         if (!isInitialized) {
//             initializeAuth()
//         }
//     }, [dispatch, isInitialized])

//     // Only handle navigation after initialization
//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             console.log(permissions.canList, "Hello");
//             if (isInitialized && !permissions.canList) {
//                 toast.push(
//                     <Notification
//                         title="Unauthorized Access"
//                         type="danger"
//                     >
//                         You are not authorized to access this menu
//                     </Notification>
//                 )
//                 navigate('/home');
//             }
//         }, 1000);
    
//         // Clean up the timeout to avoid memory leaks
//         return () => clearTimeout(timeoutId);
//     }, [isInitialized, permissions.canList, navigate]);
    

//     const fetchPFTrackerData = useCallback(
//         async (page: number, pageSize: number) => {
//             if (!permissions.canList) return // Don't fetch if no permission
            
//             setIsLoading(true)
//             try {
//                 const params: any = {
//                     page,
//                     page_size: pageSize,
//                     'group_id[]': filters.groupId,
//                     'company_id[]': filters.companyId,
//                 }

//                 if (filters.pfCode) {
//                     params['pf_code[]'] = filters.pfCode
//                 }

//                 const res = await httpClient.get(endpoints.tracker.pfGetALl(), {
//                     params
//                 })
                
//                 setData(res.data.data)
//                 setPagination((prev) => ({
//                     ...prev,
//                     total: res.data.paginate_data.totalResults,
//                 }))
//             } catch (error) {
//                 console.error('Error fetching PF tracker data:', error)
//             } finally {
//                 setIsLoading(false)
//             }
//         },
//         [filters.groupId, filters.companyId, filters.pfCode, permissions.canList]
//     )

//     useEffect(() => {
//         if (isInitialized && permissions.canList) {
//             fetchPFTrackerData(pagination.pageIndex, pagination.pageSize)
//         }
//     }, [fetchPFTrackerData, pagination.pageIndex, pagination.pageSize, filters.groupId, filters.companyId, isInitialized, permissions.canList])

//     const handleFilterChange = (newFilters: any) => {
//         setFilters(newFilters)
//         setPagination((prev) => ({
//             ...prev,
//             pageIndex: 1,
//         }))
//     }

//     const handlePaginationChange = (page: number) => {
//         setPagination((prev) => ({ ...prev, pageIndex: page }))
//     }

//     const handlePageSizeChange = (newPageSize: number) => {
//         setPagination((prev) => ({
//             ...prev,
//             pageSize: newPageSize,
//             pageIndex: 1,
//         }))
//     }

//     if (!isInitialized) {
//         return (
//             <Loading loading={true} type="default">
//                 <div className="h-full" />
//             </Loading>)
//     }

//     return (
//         <AdaptableCard className="h-full" bodyClass="h-full">
//             <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
//                 <div className="">
//                     <h3 className="text-2xl font-bold">PF Tracker</h3>
//                 </div>
//                 <PFTrackerTool onFilterChange={handleFilterChange} canCreate={permissions.canCreate} />
//             </div>
//             <PFTrackerTable
//                 loading={isLoading}
//                 dataSent={data}
//                 companyName={filters.companyName} 
//                 code={filters.pfCode}
//                 onRefresh={() =>
//                     fetchPFTrackerData(
//                         pagination.pageIndex,
//                         pagination.pageSize
//                     )
//                 }
//                 pagination={pagination}
//                 onPaginationChange={handlePaginationChange}
//                 onPageSizeChange={handlePageSizeChange}
//                 canEdit={permissions.canEdit}
//                 canDelete={permissions.canDelete}
//             />
//         </AdaptableCard>
//     )
// }

// export default PFTracker


import React, { useCallback, useEffect, useState } from 'react'
import AdaptableCard from '@/components/shared/AdaptableCard'
import PFTrackerTool from './components/PFTrackerTool'
import PFTrackerTable from './components/PFTrackerTable'
import { PfChallanData } from '@/@types/pfTracker'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'
import { useDispatch } from 'react-redux'
import { fetchAuthUser } from '@/store/slices/login'
import { useNavigate } from 'react-router-dom'
import toast from '@/components/ui/toast'
import { Notification } from '@/components/ui'
import Loading from '@/components/shared/Loading'
// import Loading from '@/components/ui/Loading'

// Interface for permissions
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

const PFTracker: React.FC = () => {
    const [filters, setFilters] = useState({
        groupName: '',
        groupId: '',
        companyName: '',
        companyId: '',
        pfCode: '',
    })
    const [data, setData] = useState<PfChallanData[]>([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [permissions, setPermissions] = useState<Permissions>({
        canList: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
    })
    const [isInitialized, setIsInitialized] = useState(false)
    const [permissionCheckComplete, setPermissionCheckComplete] = useState(false)
    const [pagination, setPagination] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
    })

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
                    (menu: any) => menu.id === 16
                )

                if (!pfTrackerMenu) {
                    console.warn('PF Tracker menu not found')
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
                            You don't have permission of PF Tracker
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

    const fetchPFTrackerData = useCallback(
        async (page: number, pageSize: number) => {
            if (!permissions.canList) return // Don't fetch if no permission
            
            setIsLoading(true)
            try {
                const params: any = {
                    page,
                    page_size: pageSize,
                    'group_id[]': filters.groupId,
                    'company_id[]': filters.companyId,
                }

                if (filters.pfCode) {
                    params['pf_code[]'] = filters.pfCode
                }

                const res = await httpClient.get(endpoints.tracker.pfGetALl(), {
                    params
                })
                
                setData(res.data.data)
                setPagination((prev) => ({
                    ...prev,
                    total: res.data.paginate_data.totalResults,
                }))
            } catch (error) {
                console.error('Error fetching PF tracker data:', error)
            } finally {
                setIsLoading(false)
            }
        },
        [filters.groupId, filters.companyId, filters.pfCode, permissions.canList]
    )

    useEffect(() => {
        if (isInitialized && permissions.canList) {
            fetchPFTrackerData(pagination.pageIndex, pagination.pageSize)
        }
    }, [fetchPFTrackerData, pagination.pageIndex, pagination.pageSize, filters.groupId, filters.companyId, isInitialized, permissions.canList])

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
                <div className="">
                    <h3 className="text-2xl font-bold">PF Tracker</h3>
                </div>
                <PFTrackerTool onFilterChange={handleFilterChange} canCreate={permissions.canCreate} />
            </div>
            <PFTrackerTable
                loading={isLoading}
                dataSent={data}
                companyName={filters.companyName} 
                code={filters.pfCode}
                onRefresh={() =>
                    fetchPFTrackerData(
                        pagination.pageIndex,
                        pagination.pageSize
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

export default PFTracker