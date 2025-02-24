import React, { useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';


 const BranchOwnership = () => {
    const ownershipData = [
        { name: 'Rented', ph: '50', vr: '100', value: '150' },
        { name: 'Owned', ph: '50', vr: '100', value: '150', },
        { name: 'Total',ph: '50', vr: '100', value: '150'  },
    ];

    const columns = useMemo(
        () => [
            {
                header: 'Ownership Type',
                accessorKey: 'name',
                enableSorting: false,
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-xs">
                                {value.length > 30 ? value.substring(0, 30) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'PH',
                accessorKey: 'ph',
                enableSorting: false,
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-xs">
                                {value.length > 30 ? value.substring(0, 30) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'VR',
                accessorKey: 'vr',
                enableSorting: false,
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-xs">
                                {value.length > 30 ? value.substring(0, 30) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Count',
                accessorKey: 'value',
                enableSorting: false,
                cell: (props) => {
                   const row = props.row.original;
                                       const value = props.getValue() as string;
                                       return (
                                           <Tooltip title={value} placement="top">
                                               <div
                                                   className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${row.badgeColor}`}>
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
        <div className="w-full overflow-x-auto py-2 p-1 bg-white rounded-lg shadow-lg border">
           <h2 className="text-base text-center font-semibold mb-4 mt-2">Branch Status</h2>
            <DataTable
                columns={columns}
                data={ownershipData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                stickyHeader={true}
                selectable={false}
                showPageSizeSelector={false} 
            />
        </div>
    );
};

export default BranchOwnership;