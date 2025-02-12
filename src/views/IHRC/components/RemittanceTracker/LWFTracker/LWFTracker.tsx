// import React from 'react'
// import LWFTrackerTool from './components/LWFTrackerTool'
// import LWFTrackerTable from './components/LWFTrackerTable'
// import { AdaptableCard } from '@/components/shared'

// const LWFTracker = () => {
//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
//     <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
//       <div className="mb-4 lg:mb-0">
//         <h3 className="text-2xl font-bold">LWF Trackers</h3>
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
//           <h3 className="text-2xl font-bold">LWF Trackers</h3>
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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Notification, toast } from '@/components/ui'
import { fetchAuthUser } from '@/store/slices/login';

const FINANCIAL_YEAR_KEY = 'selectedFinancialYear'
const FINANCIAL_YEAR_CHANGE_EVENT = 'financialYearChanged';


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


const LWFTracker: React.FC = () => {
    const [filters, setFilters] = useState({
        groupName: '',
        groupId: '',
        companyName: '',
        companyId: '',
        lwfCode: '',
        startDate:'',
        endDate:'',
          search:''
    });
    const [data, setData] = useState<LWFTrackerData[]>([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
    });

    const [permissions, setPermissions] = useState<Permissions>({
        canList: false,
        canCreate: false,
        canEdit: false,
        canDelete: false,
    })
    const [isInitialized, setIsInitialized] = useState(false)
    const [permissionCheckComplete, setPermissionCheckComplete] = useState(false)
    const [financialYear, setFinancialYear] = useState(sessionStorage.getItem(FINANCIAL_YEAR_KEY));

    useEffect(() => {
        // Handler for the custom event
        const handleFinancialYearChange = (event: CustomEvent) => {
            const newFinancialYear = event.detail;
            setFinancialYear(newFinancialYear);
        };

        // Add event listener for our custom event
        window.addEventListener(
            FINANCIAL_YEAR_CHANGE_EVENT, 
            handleFinancialYearChange as EventListener
        );

        // Cleanup
        return () => {
            window.removeEventListener(
                FINANCIAL_YEAR_CHANGE_EVENT, 
                handleFinancialYearChange as EventListener
            );
        };
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await dispatch(fetchAuthUser())

                if (!response.payload?.moduleAccess) {
                    toast.push(
                        <Notification
                            title="Permission"
                            type="danger"
                        >
                            You don't have access to any modules
                        </Notification>
                    )
                    navigate('/home')
                    setPermissionCheckComplete(true)
                    setIsInitialized(true)
                    return
                }
                
                // Find Remittance Tracker module
                const remittanceModule = response.payload.moduleAccess?.find(
                    (module: any) => module.id === 1
                )
                
                if (!remittanceModule) {
                    toast.push(
                        <Notification
                            title="Permission"
                            type="danger"
                        >
                            You don't have access to this module
                        </Notification>
                    )
                    navigate('/home')
                    setPermissionCheckComplete(true)
                    setIsInitialized(true)
                    return
                }

                // Find PF Tracker menu item
                const pfTrackerMenu = remittanceModule.menus?.find(
                    (menu: any) => menu.id === 4
                )

                if (!pfTrackerMenu) {
                    toast.push(
                        <Notification
                            title="Permission"
                            type="danger"
                        >
                            You don't have access to this menu
                        </Notification>
                    )
                    navigate('/home')
                    setPermissionCheckComplete(true)
                    setIsInitialized(true)
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
                            You don't have permission of PFIW Tracker
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
    }, [dispatch, isInitialized, navigate])


    const fetchLWFTrackerData = useCallback(
        async (page: number, pageSize: number) => {
            setIsLoading(true);
            try {
                const params: any = {
                    page,
                    page_size: pageSize,
                    'group_id[]': filters.groupId,
                    'company_id[]': filters.companyId,
                    'from_date': filters.startDate,
                    'to_date': filters.endDate,
                    'search' : filters.search,
                };

                // Only add lwf_code[] to params if it's selected
                if (filters.lwfCode) {
                    params['register_number[]'] = filters.lwfCode;
                }

                if (financialYear) {
                    params['financial_year'] = financialYear
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
        [filters.groupId, filters.companyId, filters.lwfCode, filters.startDate, filters.endDate, financialYear, filters.search]
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
                    <h3 className="text-2xl font-bold">LWF Trackers</h3>
                </div>
                <LWFTrackerTool onFilterChange={handleFilterChange} canCreate={permissions.canCreate} />
            </div>
            <LWFTrackerTable
                loading={isLoading}
                dataSent={data}
                companyName={filters.companyName} 
                 code={filters.lwfCode}
                onRefresh={() => fetchLWFTrackerData(pagination.pageIndex, pagination.pageSize)}
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                onPageSizeChange={handlePageSizeChange}
                canEdit={permissions.canEdit}
                canDelete={permissions.canDelete}
            />
        </AdaptableCard>
    );
};

export default LWFTracker;