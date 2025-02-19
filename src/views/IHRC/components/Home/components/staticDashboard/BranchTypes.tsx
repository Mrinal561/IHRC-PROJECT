import React, { useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';

export const BranchTypes = () => {
    const typesData = [
        { name: 'Total Office', value: '400' },
        { name: 'Corporate Office', value: '200' },
        { name: 'Regional Office', value: '80' },
        { name: 'Sales Office', value: '120' },
    ];

    const columns = useMemo(
        () => [
            {
                header: 'Office Type',
                accessorKey: 'name',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-48 truncate">
                                {value.length > 30 ? value.substring(0, 30) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Count',
                accessorKey: 'value',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-32 truncate">
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
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                data={typesData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                stickyHeader={true}
                selectable={false}
            />
        </div>
    );
};
export default BranchTypes;