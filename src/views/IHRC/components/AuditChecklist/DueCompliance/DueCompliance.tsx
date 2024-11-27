

import React, { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui';
import { Notification } from '@/components/ui';
import AdaptableCard from '@/components/shared/AdaptableCard';
import DueComplianceTableTool from './components/DueComplianceTableTool';
import DueComplianceTable from './components/DueComplianceTable';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';

const DueCompliance = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
      const [pagination, setPagination] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
  });
    const fetchDueComplianceData = useCallback(async (page: number = 1, pageSize: number = 10) => {
        console.log('Fetching due compliance data...');
        
        setIsLoading(true);
        try {
            const response = await httpClient.get(endpoints.due.getAll(), {
                params: {
                    page,
                    pageSize:pageSize,
                    'data_status[]': ['due']
                }
            });

            if (response?.data?.data) {
                console.log('API Response:', response.data);
                console.log('Due compliance data received:', response.data.data);
                setData(response.data.data);
                 setPagination((prev) => ({...prev, total: response.data.paginate_data.totalResults }));
            } else {
                console.log('No data in API response or unexpected response structure');
            }
        } catch (error: any) {
            console.error('Error fetching due compliance data:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });
            toast.push(
                <Notification type="danger" title="Error">
                    Failed to fetch due compliance data
                </Notification>
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        console.log('Initial component mount - Fetching data...');
        fetchDueComplianceData(pagination.pageIndex, pagination.pageSize);
    }, [fetchDueComplianceData, pagination.pageIndex, pagination.pageSize]);

    const handleUploadAll = (selectedComplianceIds, remark) => {
        console.log(`Uploading ${selectedComplianceIds.length} compliances with remark: ${remark}`);
        // Implement API call for bulk upload
    };

    const handleUploadSingle = (complianceId, isProofMandatory, file, remark) => {
        console.log(`Uploading compliance ${complianceId}. Proof mandatory: ${isProofMandatory}. File: ${file?.name}. Remark: ${remark}`);
        // Implement API call for single upload
    };

    const handleUpdateStatus = (complianceId, newStatus) => {
        console.log(`Updating status for compliance ${complianceId} to ${newStatus}`);
        // Implement API call for status update
    };
      const handlePaginationChange = (page: number) => {
    setPagination((prev) => ({...prev, pageIndex: page }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({...prev, pageSize: newPageSize, pageIndex: 1 }));
  };

    return (
        <AdaptableCard className="h-full" bodyClass="h-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">Due Compliance</h3>
                    <p className="text-gray-600">View your company's due compliance</p>
                </div>
                <div className="flex items-center gap-4">
                    <DueComplianceTableTool data={data} onUploadAll={handleUploadAll} />
                </div>
            </div>
            <DueComplianceTable 
                data={data} 
                loading={isLoading}
                onUploadSingle={handleUploadSingle} 
                onUpdateStatus={handleUpdateStatus} 
                onDataUpdate={fetchDueComplianceData}
                 pagination={pagination}
        onPaginationChange={handlePaginationChange}
        onPageSizeChange={handlePageSizeChange}
            />
        </AdaptableCard>
    );
};

export default DueCompliance;