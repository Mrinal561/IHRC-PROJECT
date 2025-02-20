import React, { useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';

export const BranchTypes = () => {
    const typesData = [
        { name: 'Corporate Office', value: '200', badgeColor: 'bg-amber-400 text-white', },
        { name: 'Sales Office', value: '120', badgeColor: 'bg-blue-400 text-white', },
        { name: 'Regional Office', value: '80', badgeColor: 'bg-green-400 text-white', },
        { name: 'Total Office', value: '400', badgeColor: 'bg-blue-400 text-white', },
    ];

    const columns = useMemo(
        () => [
            {
                header: 'Office Type',
                accessorKey: 'name',
                enableSorting: false,
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                           <div className="font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm">
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
                                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${row.badgeColor}`}>
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
                                     <h2 className="text-base text-center font-semibold mb-6 mt-2">Branch Types</h2>

            <DataTable
                columns={columns}
                data={typesData}
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
export default BranchTypes;