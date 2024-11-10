
// // import React, { useState, useEffect } from 'react';
// // import { useAppDispatch } from '@/store';
// // import reducer from './store';
// // import { Notification, toast } from '@/components/ui';
// // import AdaptableCard from '@/components/shared/AdaptableCard';
// // import RecommendedTableTool from './components/RecommendedTableTool';
// // import RecommendedTableContent from './components/RecommendedTable';
// // import Company from '../../Home/components/Company';
// // import { endpoints } from '@/api/endpoint';
// // import httpClient from '@/api/http-client';
// // import { ComplianceData } from '@/@types/compliance';

// // interface BranchOption {
// //     label: string;
// //     value: string;
// // }

// // const RecommendedList = () => {
// //     const dispatch = useAppDispatch();
// //     const [isLoading, setIsLoading] = useState(false);
// //     const [complianceData, setComplianceData] = useState([]);
// //     const [tableKey, setTableKey] = useState(0);
// //     const [selectedBranch, setSelectedBranch] = useState<BranchOption | null>(null);
// //     const [selectedComplianceIds, setSelectedComplianceIds] = useState<number[]>([]);

// //     const fetchComplianceData = async (page = 1, pageSize = 10) => {
// //         console.log('Fetching compliance data...');
// //         console.log('Current selectedBranch:', selectedBranch);
        
// //         setIsLoading(true);
// //         try {
// //             const response = await httpClient.get(endpoints.compliance.getAll(), {
// //                 // Add any params if needed
// //             });

// //             if (response?.data?.data) {
// //                 console.log('API Response:', response.data);
// //                 console.log('Compliance data received:', response.data.data);
// //                 setComplianceData(response.data.data);
// //             } else {
// //                 console.log('No data in API response or unexpected response structure');
// //             }
// //         } catch (error) {
// //             console.error('Error fetching compliance data:', error);
// //             console.error('Error details:', {
// //                 message: error.message,
// //                 stack: error.stack
// //             });
// //             toast.push(
// //                 <Notification type="danger" title="Error">
// //                     Failed to fetch compliance data
// //                 </Notification>
// //             );
// //         } finally {
// //             setIsLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         console.log('Initial component mount - Fetching data...');
// //         fetchComplianceData();
// //     }, []); // Initial fetch

// //     useEffect(() => {
// //         console.log('selectedBranch changed - Current value:', selectedBranch);
// //         if (selectedBranch) {
// //             console.log('Fetching data for branch:', {
// //                 label: selectedBranch.label,
// //                 value: selectedBranch.value
// //             });
// //             fetchComplianceData();
// //         }
// //     }, [selectedBranch]); // Refetch when branch changes

// //     useEffect(() => {
// //         console.log('complianceData updated:', {
// //             dataLength: complianceData.length,
// //             firstItem: complianceData[0],
// //             lastItem: complianceData[complianceData.length - 1]
// //         });
// //     }, [complianceData]);

// //     const handleBranchChange = (branch: BranchOption | null) => {
// //         console.log('Branch value received:', branch?.value);
// //         setSelectedBranch(branch);
// //         setTableKey(prevKey => prevKey + 1);
// //     };

// //     console.log('Rendering RecommendedList component', {
// //         isLoading,
// //         tableKey,
// //         dataLength: complianceData.length
// //     });
// //       // Add this function to handle selected compliances
// //       const handleSelectedCompliancesChange = (selectedIds: number[]) => {
// //         console.log('Selected compliance IDs:', selectedIds);
// //         setSelectedComplianceIds(selectedIds);
// //     };

// //     return (
// //         <AdaptableCard className="h-full" bodyClass="h-full">
// //             <div className="flex flex-row items-center justify-between mb-10">
// //                 <div className="">
// //                     <h3 className="text-2xl font-bold">Recommended Checklist</h3>
// //                     <p className="text-gray-600">View your company's recommended compliance</p>
// //                 </div>
// //                 <RecommendedTableTool
// //                  selectedComplianceIds={selectedComplianceIds} 
// //                  branchValue={selectedBranch?.value || ''}
// //                 />
// //             </div>
// //             <div className='mb-8'>
// //                 <Company 
// //                     onBranchChange={(branch) => {
// //                         console.log('Company component callback triggered with branch:', branch);
// //                         handleBranchChange(branch);
// //                     }} 
// //                 />
// //             </div>
// //             <RecommendedTableContent 
// //                 data={complianceData}
// //                 loading={isLoading}
// //                 tableKey={tableKey}
// //                 branchValue={selectedBranch?.value || ''} 
// //                 onSelectedCompliancesChange={handleSelectedCompliancesChange}
// //             />
// //         </AdaptableCard>
// //     );
// // }

// // export default RecommendedList;

// import React, { useState, useEffect } from 'react';
// import { useAppDispatch } from '@/store';
// import reducer from './store';
// import { Notification, toast } from '@/components/ui';
// import AdaptableCard from '@/components/shared/AdaptableCard';
// import RecommendedTableTool from './components/RecommendedTableTool';
// import RecommendedTableContent from './components/RecommendedTable';
// import Company from '../../Home/components/Company';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';
// import { ComplianceData } from '@/@types/compliance';

// interface BranchOption {
//     label: string;
//     value: string;
// }

// const RecommendedList = () => {
//     const dispatch = useAppDispatch();
//     const [isLoading, setIsLoading] = useState(false);
//     const [complianceData, setComplianceData] = useState([]);
//     const [tableKey, setTableKey] = useState(0);
//     const [selectedBranch, setSelectedBranch] = useState<BranchOption | null>(null);
//     const [selectedComplianceIds, setSelectedComplianceIds] = useState<number[]>([]);

//     const fetchComplianceData = async (page = 1, pageSize = 10) => {
//         console.log('Fetching compliance data...');
//         console.log('Current selectedBranch:', selectedBranch);
        
//         setIsLoading(true);
//         try {
//             const response = await httpClient.get(endpoints.compliance.getAll(), {
//                 // Add any params if needed
//             });

//             if (response?.data?.data) {
//                 console.log('API Response:', response.data);
//                 console.log('Compliance data received:', response.data.data);
//                 setComplianceData(response.data.data);
//             } else {
//                 console.log('No data in API response or unexpected response structure');
//             }
//         } catch (error) {
//             console.error('Error fetching compliance data:', error);
//             toast.push(
//                 <Notification type="danger" title="Error">
//                     Failed to fetch compliance data
//                 </Notification>
//             );
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         console.log('Initial component mount - Fetching data...');
//         fetchComplianceData();
//     }, []); // Initial fetch

//     useEffect(() => {
//         console.log('selectedBranch changed - Current value:', selectedBranch);
//         if (selectedBranch) {
//             console.log('Fetching data for branch:', {
//                 label: selectedBranch.label,
//                 value: selectedBranch.value
//             });
//             fetchComplianceData();
//         }
//     }, [selectedBranch]); // Refetch when branch changes

//     const handleBranchChange = (branch: BranchOption | null) => {
//         console.log('Branch value received:', branch?.value);
//         setSelectedBranch(branch);
//         setTableKey(prevKey => prevKey + 1);
//     };

//     const handleSelectedCompliancesChange = (selectedIds: number[]) => {
//         console.log('Selected compliance IDs:', selectedIds);
//         setSelectedComplianceIds(selectedIds);
//     };

//     const handleAssignSuccess = () => {
//         console.log('Assignment successful, refreshing data...');
//         // Clear selected compliances
//         setSelectedComplianceIds([]);
//         // Increment table key to force a re-render
//         setTableKey(prevKey => prevKey + 1);
//         // Fetch fresh data
//         fetchComplianceData();
//     };

//     return (
//         <AdaptableCard className="h-full" bodyClass="h-full">
//             <div className="flex flex-row items-center justify-between mb-10">
//                 <div className="">
//                     <h3 className="text-2xl font-bold">Recommended Checklist</h3>
//                     <p className="text-gray-600">View your company's recommended compliance</p>
//                 </div>
//                 <RecommendedTableTool
//                     selectedComplianceIds={selectedComplianceIds} 
//                     branchValue={selectedBranch?.value || ''}
//                     onAssignSuccess={handleAssignSuccess}
//                 />
//             </div>
//             <div className='mb-8'>
//                 <Company 
//                     onBranchChange={(branch) => {
//                         console.log('Company component callback triggered with branch:', branch);
//                         handleBranchChange(branch);
//                     }} 
//                 />
//             </div>
//             <RecommendedTableContent 
//                 data={complianceData}
//                 loading={isLoading}
//                 tableKey={tableKey}
//                 branchValue={selectedBranch?.value || ''} 
//                 onSelectedCompliancesChange={handleSelectedCompliancesChange}
//             />
//         </AdaptableCard>
//     );
// }

// export default RecommendedList;

import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/store';
import reducer from './store';
import { Notification, toast } from '@/components/ui';
import AdaptableCard from '@/components/shared/AdaptableCard';
import RecommendedTableTool from './components/RecommendedTableTool';
import RecommendedTable from './components/RecommendedTable';

import Company from '../../Home/components/Company';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { ComplianceData } from '@/@types/compliance';

interface BranchOption {
    label: string;
    value: string;
}

const RecommendedList = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [complianceData, setComplianceData] = useState<ComplianceData[]>([]);
    const [tableKey, setTableKey] = useState(0);
    const [selectedBranch, setSelectedBranch] = useState<BranchOption | null>(null);
    const [selectedComplianceIds, setSelectedComplianceIds] = useState<number[]>([]);

    const fetchComplianceData = async (page = 1, pageSize = 10) => {
        setIsLoading(true);
        try {
            const response = await httpClient.get(endpoints.complianceSuperadmin.getAll(), {
                params: {
                    page,
                    pageSize
                }
            });

            if (response?.data?.data) {
                setComplianceData(response.data.data);
            } else {
                console.log('No data in API response or unexpected response structure');
            }
        } catch (error) {
            console.error('Error fetching compliance data:', error);
            toast.push(
                <Notification type="danger" title="Error">
                    Failed to fetch compliance data
                </Notification>
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchComplianceData();
    }, []); // Initial fetch

    useEffect(() => {
        if (selectedBranch) {
            fetchComplianceData();
        }
    }, [selectedBranch]); // Refetch when branch changes

    const handleBranchChange = (branch: BranchOption | null) => {
        setSelectedBranch(branch);
        setTableKey(prevKey => prevKey + 1);
    };

    const handleSelectedCompliancesChange = (selectedIds: number[]) => {
        setSelectedComplianceIds(selectedIds);
    };

    const handleAssignSuccess = () => {
        setSelectedComplianceIds([]);
        setTableKey(prevKey => prevKey + 1);
        fetchComplianceData();
    };

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-row items-center justify-between mb-10">
                <div className="">
                    <h3 className="text-2xl font-bold">Recommended Checklist</h3>
                    <p className="text-gray-600">View your company's recommended compliance</p>
                </div>
                <RecommendedTableTool
                    selectedComplianceIds={selectedComplianceIds} 
                    branchValue={selectedBranch?.value || ''}
                    onAssignSuccess={handleAssignSuccess}
                />
            </div>
            <div className='mb-8'>
                <Company 
                    onBranchChange={(branch) => handleBranchChange(branch)}
                />
            </div>
            <RecommendedTable
                data={complianceData}
                loading={isLoading}
                tableKey={tableKey}
                branchValue={selectedBranch?.value || ''} 
                onSelectedCompliancesChange={handleSelectedCompliancesChange}
            />
        </AdaptableCard>
    );
}

export default RecommendedList;