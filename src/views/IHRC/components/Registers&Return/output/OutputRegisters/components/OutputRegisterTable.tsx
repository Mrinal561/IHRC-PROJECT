import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip } from '@/components/ui';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
import { HiDownload } from 'react-icons/hi';
import { Register, registers } from '@/views/IHRC/store/registerData';
import ConfigDropdown from './ConfigDropdown';



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
                            <div className="w-full">
                                {value.length > 100 ? value.substring(0, 100) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Type',
                accessorKey: 'type_of_act',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-16 truncate">
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
                            <div className="w-60 truncate">
                                {value.length > 80 ? value.substring(0, 80) + '...' : value}
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
                            <div className="w-20 truncate">
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
                            <ConfigDropdown companyName={undefined} companyGroupName={undefined}            />
                        </div>
                    );
                },
            },
        ],
        []
    );

    const pagingData = {
        total: 0, // Set to actual total if needed
        pageIndex: 1,
        pageSize: 1000 // Large number to show all records
    };


    return (
        <div className="w-full overflow-x-auto custom-datatable-wrapper">
            <style>
                {`
                    .custom-datatable-wrapper > div > div:last-child {
                        display: none;
                    }
                `}
                </style>
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
                pagingData={pagingData}
                pageSizes={[]} 
                onPaginationChange={() => {}}
                onSelectChange={() => {}}
                // showPagination={false}
                // showPageSize={false}  
            />
        </div>
    );
};

export default OutputRegisterTable;