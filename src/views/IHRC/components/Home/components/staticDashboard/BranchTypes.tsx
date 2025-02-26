


import React, { useMemo, useEffect, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface BranchTypesProps {
    companyId?: string | number;
    stateId?: string | number;
    districtId?: string | number;
    locationId?: string | number;
    branchId?: string | number;
}

export const BranchTypes: React.FC<BranchTypesProps> = ({ 
    companyId, 
    stateId, 
    districtId, 
    locationId, 
    branchId 
}) => {
    console.log('BranchTypes props:', { companyId, stateId, districtId, locationId, branchId });
    const [typesData, setTypesData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch branch types data from the API
    useEffect(() => {
        if (!companyId && !stateId && !districtId && !locationId && !branchId) {
            // Reset data to default state
            setTypesData([]); // or fetch default data if available
            setLoading(false);
            return;
        }
    
        // Fetch data with filters
        const fetchBranchTypes = async () => {
            try {
                const params: any = {};
                if (companyId) params.companyId = companyId;
                if (stateId) params.stateId = stateId;
                if (districtId) params.districtId = districtId;
                if (locationId) params.locationId = locationId;
                if (branchId) params.branchId = branchId;
    
                const response = await httpClient.get(endpoints.graph.branchType(), {
                    params,
                });
                setTypesData(response.data);
            } catch (error) {
                console.error('Error fetching Branch types:', error);
                // Optionally, show a user-friendly error message here
            } finally {
                setLoading(false);
            }
        };
    
        fetchBranchTypes();
    }, [companyId, stateId, districtId, locationId, branchId]);

    // Define columns using useMemo
    const columns = useMemo(
        () => [
            {
                header: 'Type',
                accessorKey: 'name',
                enableSorting: false,
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-xs w-18">
                                {value.length > 30 ? value.substring(0, 30) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Total',
                accessorKey: 'value',
                enableSorting: false,
                cell: (props) => {
                    const row = props.row.original;
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div
                                className={`inline-flex items-center py-2 rounded-full text-xs font-semibold ${row.badgeColor}`}>
                                {value.length > 18 ? value.substring(0, 18) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
        ],
        []
    );

    return (
        <div className="w-full overflow-x-auto py-2 bg-white rounded-lg shadow-lg border custom table-home">
            <h2 className="text-base text-center mb-2 mt-0 font-semibold">Branch Types</h2>
            <DataTable
                columns={columns}
                data={typesData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                stickyHeader={true}
                selectable={false}
                showPageSizeSelector={false}
            />
        </div>
    );
};

export default BranchTypes;