import React, { useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';


 const BranchOwnership = () => {
    const ownershipData = [
        { name: 'Rented', ph: '50', vr: '100', value: '150' },
        { name: 'Owned', ph: '50', vr: '100', value: '150', },
        { name: 'Total',ph: '100', vr: '200', value: '300'  },
    ];

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
                            <div className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-xs w-11">
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
                            <div className="inline-flex items-center rounded-full text-xs font-semibold">
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
        <div className="w-full overflow-x-auto py-2 bg-white rounded-lg shadow-lg border table-home">
           <h2 className="text-base text-center font-semibold mb-2 mt-0">Branch Status</h2>
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