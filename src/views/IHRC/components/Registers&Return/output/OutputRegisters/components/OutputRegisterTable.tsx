import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip } from '@/components/ui';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
import { HiDownload } from 'react-icons/hi';
import { Register, registers } from '@/views/IHRC/store/registerData';



const OutputRegisterTable = () => {
    const columns: ColumnDef<Register>[] = useMemo(
        () => [
            {
                header: 'Act Name',
                accessorKey: 'act_name',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-72 truncate">
                                {value.length > 50 ? value.substring(0, 50) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Name of the Register',
                accessorKey: 'register_name',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-72 truncate">
                                {value.length > 30 ? value.substring(0, 30) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Forms',
                accessorKey: 'forms',
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
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => {
                    const register = row.original;
                    return (
                        <div className="flex gap-2">
                            <Tooltip title="Download Output" placement="top">
                                <Button
                                    size="sm"
                                    onClick={() => console.log('Download clicked for:', register)}
                                >
                                    <HiDownload />
                                </Button>
                            </Tooltip>
                        </div>
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
                data={registers}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true}
                selectable={true}
                // showPagination={false}
                // showPageSize={false}  
            />
        </div>
    );
};

export default OutputRegisterTable;