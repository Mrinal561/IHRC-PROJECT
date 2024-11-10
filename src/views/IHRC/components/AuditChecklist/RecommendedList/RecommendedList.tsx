
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


interface SelectOption {
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
    const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
    const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null);

    // const fetchComplianceData = async (page = 1, pageSize = 10) => {
    //     setIsLoading(true);
    //     try {
    //         const response = await httpClient.get(endpoints.complianceSuperadmin.getAll(), {
    //             params: {
    //                 page,
    //                 pageSize
    //             }
    //         });

    //         if (response?.data?.data) {
    //             setComplianceData(response.data.data);
    //         } else {
    //             console.log('No data in API response or unexpected response structure');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching compliance data:', error);
    //         toast.push(
    //             <Notification type="danger" title="Error">
    //                 Failed to fetch compliance data
    //             </Notification>
    //         );
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

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
                // Filter the data to only include items where assign is false
                const filteredData = response.data.data.filter(
                    (item: ComplianceData) => item.assign === false
                );
                setComplianceData(filteredData);
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

    interface SelectOption {
    label: string;
    value: string;
}
    useEffect(() => {
        console.log({
            companyGroup: selectedCompanyGroup,
            company: selectedCompany,
            state: selectedState,
            district: selectedDistrict,
            branch: selectedBranch,
            location: selectedLocation,
        });
        
        // Fetch data with updated filters
        fetchComplianceData();
    }, [selectedCompanyGroup, selectedCompany, selectedState, selectedLocation,  selectedDistrict, selectedBranch]);



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
                    onCompanyGroupChange={setSelectedCompanyGroup}
                    onCompanyChange={setSelectedCompany}
                    onStateChange={setSelectedState}
                    onDistrictChange={setSelectedDistrict}
                    onLocationChange={setSelectedLocation}
                />
            </div>
            <RecommendedTable
                data={complianceData}
                loading={isLoading}
                tableKey={tableKey}
                branchValue={selectedBranch?.value || ''}
                companyGroupValue={selectedCompanyGroup?.value || ''}
                companyValue={selectedCompany?.value || ''}
                stateValue={selectedState?.value || ''}
                districtValue={selectedDistrict?.value || ''} 
                locationValue={selectedLocation?.value || ''} 
                onSelectedCompliancesChange={handleSelectedCompliancesChange}
            />
        </AdaptableCard>
    );
}

export default RecommendedList;