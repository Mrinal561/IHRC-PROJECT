

import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '@/store';
import reducer from './store';
import { Notification, toast } from '@/components/ui';
import AdaptableCard from '@/components/shared/AdaptableCard';
import AssignChecklistTableTool from './components/AssignChecklistTableTool';
import AssignChecklistTable from './components/AssignChecklistTable';
import Company from '../../Home/components/Company';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';


const AssignChecklist = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [assignedData, setAssignedData] = useState([]);
    const [tableKey, setTableKey] = useState(0);
    const [selectedBranch, setSelectedBranch] = useState<BranchOption | null>(null);
    const [selectedIds, setSelectedIds] = useState<number[]>([]); // New state for selected IDs

    // Add handler for selected IDs
    const handleSelectedIdsChange = (ids: number[]) => {
        console.log('Selected IDs:', ids);
        setSelectedIds(ids);
        // You can now use these IDs in any way needed, for example:
        console.log('selectedIdsForApiCall are:', { selectedIds: ids });
    };



    const fetchAssignedData = async (page = 1, pageSize = 10) => {
        console.log('Fetching assigned checklist data...');
        console.log('Current selectedBranch:', selectedBranch);
        
        setIsLoading(true);
        try {
            const response = await httpClient.get(endpoints.assign.getAll(), {
                params: {
                    page,
                    pageSize,
                    branchId: selectedBranch?.value
                }
            });

            if (response?.data?.data) {
                console.log('API Response:', response.data);
                console.log('Assigned data received:', response.data.data);
                setAssignedData(response.data.data);
            } else {
                console.log('No data in API response or unexpected response structure');
            }
        } catch (error) {
            console.error('Error fetching assigned data:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });
            toast.push(
                <Notification type="danger" title="Error">
                    Failed to fetch assigned checklist data
                </Notification>
            );
        } finally {
            setIsLoading(false);
        }
    };

    const refreshTableAndReset = () => {
        fetchAssignedData();
        setSelectedIds([]); // Reset selected IDs
        setTableKey(prevKey => prevKey + 1); // Force table refresh
    };

    useEffect(() => {
        console.log('Initial component mount - Fetching data...');
        fetchAssignedData();
    }, []); // Initial fetch

    useEffect(() => {
        console.log('selectedBranch changed - Current value:', selectedBranch);
        if (selectedBranch) {
            console.log('Fetching data for branch:', {
                label: selectedBranch.label,
                value: selectedBranch.value
            });
            fetchAssignedData();
        }
    }, [selectedBranch]); // Refetch when branch changes

    useEffect(() => {
        console.log('assignedData updated:', {
            dataLength: assignedData.length,
            firstItem: assignedData[0],
            lastItem: assignedData[assignedData.length - 1]
        });
    }, [assignedData]);

    const handleBranchChange = (branch: BranchOption | null) => {
        console.log('Branch value received:', branch?.value);
        setSelectedBranch(branch);
        setTableKey(prevKey => prevKey + 1);
    };
    const refreshTable = () => {
        console.log('Refreshing table data...');
        fetchAssignedData();
        setSelectedIds([])
    };

    console.log('Rendering AssignChecklist component', {
        isLoading,
        tableKey,
        dataLength: assignedData.length
    });

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-row items-center justify-between mb-10">
                <div className="">
                    <h3 className="text-2xl font-bold">Assigned Checklist</h3>
                    <p className="text-gray-600">View your company's assigned compliance</p>
                </div>
                <AssignChecklistTableTool selectedIds={selectedIds} 
                    refreshTable={refreshTableAndReset}/>
            </div>
            <div className="mb-8">
                <Company 
                    onBranchChange={(branch) => {
                        console.log('Company component callback triggered with branch:', branch);
                        handleBranchChange(branch);
                    }} 
                />
            </div>
            <AssignChecklistTable 
                data={assignedData}
                loading={isLoading}
                tableKey={tableKey}
                refreshTable={refreshTable}
                onSelectedIdsChange={handleSelectedIdsChange}
                // selectedId = {selectedIds}
            />
        </AdaptableCard>
    );
};

export default AssignChecklist;
