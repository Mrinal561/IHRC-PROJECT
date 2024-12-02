// // import  AdaptableCard  from '@/components/shared/AdaptableCard'
// // import ESITrackerTable from './components/ESITrackerTable';
// // import ESITrackerTool from './components/ESITrackerTool';
// // import React, { useCallback, useEffect, useState } from 'react'
// // import { esiChallanData } from '@/@types/esiTracker';
// // import httpClient from '@/api/http-client';
// // import { endpoints } from '@/api/endpoint';

// // const ESITracker = () => {
// //   const [filters, setFilters] = useState({ groupName: '', companyName: '', esiCode: '' });

// //   const [data, setData] = useState<esiChallanData[]>([]);
// //   const [isLoading, setIsLoading] = useState(false)
// //     const [pagination, setPagination] = useState({
// //     total: 0,
// //     pageIndex: 1,
// //     pageSize: 10,
// //   });




// //   const fetchEsiTrackerData =  useCallback(async (page: number, pageSize: number) => {
// //     setIsLoading(true)

// //     try {
// //       const res = await httpClient.get(endpoints.esiTracker.getAll(), {
// //           params: {
// //             page,
// //             page_size: pageSize,
// //           },
// //         });
// //       console.log(res.data.data)
// //       setData(res.data.data);
// //         setPagination((prev) => ({
// //           ...prev,
// //           total: res.data.paginate_data.totalResults,
// //         }));
// //     } catch (error) {
// //       console.error('Error fetching PF tracker data:', error);
// //     } finally {
// //       setIsLoading(false)
// //   }
// //   }, []);
// //     useEffect(() => {
// //     fetchEsiTrackerData(pagination.pageIndex, pagination.pageSize);
// //   }, [fetchEsiTrackerData, pagination.pageIndex, pagination.pageSize]);

// //   const handleFilterChange = (newFilters) => {
// //     setFilters(newFilters);
// //   };
// //   const handlePaginationChange = (page: number) => {
// //     setPagination((prev) => ({ ...prev, pageIndex: page }));
// //   };

// //   const handlePageSizeChange = (newPageSize: number) => {
// //     setPagination((prev) => ({
// //       ...prev,
// //       pageSize: newPageSize,
// //       pageIndex: 1, // Reset to first page when changing page size
// //     }));
// //   };

// //   return (
// //     <AdaptableCard className="h-full" bodyClass="h-full">
// //       <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
// //         <div className="mb-4 lg:mb-0">
// //           <h3 className="text-2xl font-bold">ESI Tracker</h3>
// //         </div>
// //         <ESITrackerTool onFilterChange={handleFilterChange} />
// //       </div>
// //       <ESITrackerTable dataSent={data} loading={isLoading}
// //         onRefresh={()=>fetchEsiTrackerData(pagination.pageIndex, pagination.pageSize)}
// //          pagination={pagination}
// //         onPaginationChange={handlePaginationChange}
// //         onPageSizeChange={handlePageSizeChange}
// //       />
// //     </AdaptableCard>
// //   )
// // }

// // export default ESITracker

// import React, { useCallback, useEffect, useState } from 'react';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import ESITrackerTable from './components/ESITrackerTable';
// import ESITrackerTool from './components/ESITrackerTool';
// import { esiChallanData } from '@/@types/esiTracker';
// import httpClient from '@/api/http-client';
// import { endpoints } from '@/api/endpoint';

// const ESITracker: React.FC = () => {
//     const [filters, setFilters] = useState({
//         groupName: '',
//         groupId: '',
//         companyName: '',
//         companyId: '',
//         esiCode: '',
//     });

//     const [data, setData] = useState<esiChallanData[]>([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [pagination, setPagination] = useState({
//         total: 0,
//         pageIndex: 1,
//         pageSize: 10,
//     });

//     const fetchEsiTrackerData = useCallback(
//         async (page: number, pageSize: number) => {
//             setIsLoading(true);
//             try {
//                 const params: any = {
//                     page,
//                     page_size: pageSize,
//                     'group_id[]': filters.groupId,
//                     'company_id[]': filters.companyId,
//                 };

//                 // Only add pf_code[] to params if it's selected
//                 if (filters.esiCode) {
//                     params['esi_code[]'] = filters.esiCode;
//                 }

//                 const res = await httpClient.get(endpoints.esiTracker.getAll(), {
//                     params
//                 });
                
//                 console.log(res.data.data);
//                 setData(res.data.data);
//                 setPagination((prev) => ({
//                     ...prev,
//                     total: res.data.paginate_data.totalResults,
//                 }));
//             } catch (error) {
//                 console.error('Error fetching ESI tracker data:', error);
//             } finally {
//                 setIsLoading(false);
//             }
//         },
        // [filters.groupId, filters.companyId, filters.esiCode]
//     );

//     useEffect(() => {
//         fetchEsiTrackerData(pagination.pageIndex, pagination.pageSize);
//     }, [fetchEsiTrackerData, pagination.pageIndex, pagination.pageSize, filters.groupId, filters.companyId]);

//     const handleFilterChange = (newFilters) => {
//         setFilters(newFilters);
//         // Reset pagination to first page when filters change
//         setPagination((prev) => ({
//             ...prev,
//             pageIndex: 1,
//         }));
//     };

//     const handlePaginationChange = (page: number) => {
//         setPagination((prev) => ({ ...prev, pageIndex: page }));
//     };

//     const handlePageSizeChange = (newPageSize: number) => {
//         setPagination((prev) => ({
//             ...prev,
//             pageSize: newPageSize,
//             pageIndex: 1, // Reset to first page when changing page size
//         }));
//     };

// const refreshEsiTrackerData = useCallback(() => {
//     setIsLoading(true);
//     try {
//         const params: any = {
//             page: 1,
//             page_size: 10,
//             'group_id[]': filters.groupId,
//             'company_id[]': filters.companyId,
//         };

//         // Only add esi_code[] to params if it's selected
//         if (filters.esiCode) {
//             params['esi_code[]'] = filters.esiCode;
//         }
//         console.log(params)
//         httpClient.get(endpoints.esiTracker.getAll(), {
//             params
//         }).then(res => {
//             console.log(res.data.data);
//             setData(res.data.data);
//             setPagination((prev) => ({
//                 ...prev,
//                 total: res.data.paginate_data.totalResults,
//                 pageIndex: 1,
//                 pageSize: 10
//             }));
//         }).catch(error => {
//             console.error('Error fetching ESI tracker data:', error);
//         }).finally(() => {
//             setIsLoading(false);
//         });
//     } catch (error) {
//         console.error('Error in refreshEsiTrackerData:', error);
//         setIsLoading(false);
//     }
// }, [filters.groupId, filters.companyId, filters.esiCode]);

//     return (
//         <AdaptableCard className="h-full" bodyClass="h-full">
//             <div className="flex flex-wrap gap-6 items-center justify-between mb-6">
//                 <div className="">
//                     <h3 className="text-2xl font-bold">ESI Tracker</h3>
//                 </div>
//                 <ESITrackerTool onFilterChange={handleFilterChange} />
//             </div>
//             <ESITrackerTable
//                 loading={isLoading}
//                 dataSent={data}
//                 // onRefresh={() => fetchEsiTrackerData(pagination.pageIndex, pagination.pageSize)}
//                 onRefresh={refreshEsiTrackerData}
//                 pagination={pagination}
//                 onPaginationChange={handlePaginationChange}
//                 onPageSizeChange={handlePageSizeChange}
//             />
//         </AdaptableCard>
//     );
// }

// export default ESITracker;


import React, { useCallback, useEffect, useState, useRef } from 'react';
import AdaptableCard from '@/components/shared/AdaptableCard';
import ESITrackerTable from './components/ESITrackerTable';
import ESITrackerTool from './components/ESITrackerTool';
import { esiChallanData } from '@/@types/esiTracker';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

const ESITracker: React.FC = () => {
    const [filters, setFilters] = useState({
        groupName: '',
        groupId: '',
        companyName: '',
        companyId: '',
        esiCode: '',
    });

    // Use a ref to store the latest filters
    const filtersRef = useRef(filters);

    const [data, setData] = useState<esiChallanData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
    });

    // Update the ref whenever filters change
    useEffect(() => {
        filtersRef.current = filters;
    }, [filters]);

    const fetchEsiTrackerData = useCallback(
        async (page: number, pageSize: number) => {
            setIsLoading(true);
            try {
                // Use the ref to get the most recent filters
                const currentFilters = filtersRef.current;

                const params: any = {
                    page,
                    page_size: pageSize,
                    'group_id[]': currentFilters.groupId || '',
                    'company_id[]': currentFilters.companyId || '',
                };

                // Only add esi_code[] to params if it's selected
                if (currentFilters.esiCode) {
                    params['esi_code[]'] = currentFilters.esiCode;
                }

                const res = await httpClient.get(endpoints.esiTracker.getAll(), {
                    params
                });
                
                console.log('Fetched Data:', res.data.data);
                console.log('Current Filters:', currentFilters);

                setData(res.data.data);
                setPagination((prev) => ({
                    ...prev,
                    total: res.data.paginate_data.totalResults,
                }));
            } catch (error) {
                console.error('Error fetching ESI tracker data:', error);
            } finally {
                setIsLoading(false);
            }
        },
         [filters.groupId, filters.companyId, filters.esiCode]// Remove dependencies to prevent unnecessary re-creations
    );

    useEffect(() => {
        fetchEsiTrackerData(pagination.pageIndex, pagination.pageSize);
    }, [fetchEsiTrackerData, pagination.pageIndex, pagination.pageSize]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Reset pagination to first page when filters change
        setPagination((prev) => ({
            ...prev,
            pageIndex: 1,
        }));
    };

    const refreshEsiTrackerData = useCallback(() => {
        // Use the ref to get the most recent filters
        const currentFilters = filtersRef.current;

        const params: any = {
            page: 1,
            page_size: 10,
            'group_id[]': currentFilters.groupId || '',
            'company_id[]': currentFilters.companyId || '',
        };

        // Only add esi_code[] to params if it's selected
        if (currentFilters.esiCode) {
            params['esi_code[]'] = currentFilters.esiCode;
        }

        setIsLoading(true);
        httpClient.get(endpoints.esiTracker.getAll(), {
            params
        }).then(res => {
            console.log('Refresh Data:', res.data.data);
            console.log('Refresh Filters:', currentFilters);

            setData(res.data.data);
            setPagination((prev) => ({
                ...prev,
                total: res.data.paginate_data.totalResults,
                pageIndex: 1,
                pageSize: 10
            }));
        }).catch(error => {
            console.error('Error refreshing ESI tracker data:', error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, []); // No dependencies needed

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
                    <h3 className="text-2xl font-bold">ESI Tracker</h3>
                </div>
                <ESITrackerTool onFilterChange={handleFilterChange} />
            </div>
            <ESITrackerTable
                loading={isLoading}
                dataSent={data}
                companyName={filters.companyName} 
                onRefresh={refreshEsiTrackerData}
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </AdaptableCard>
    );
}

export default ESITracker;