import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
import { EmployeeLeave, employeeLeaves } from '@/views/IHRC/store/dummyLeaveData';

const LeaveRegisterTable = () => {
    const columns: ColumnDef<EmployeeLeave>[] = useMemo(
        () => [
            {
                header: 'Sl No',
                accessorKey: 'sl_no',
                cell: (props) => (
                    <div className="w-16 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Company',
                accessorKey: 'company_name',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-42 truncate">
                                {value.length > 22 ? value.substring(0, 22) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Emp No',
                accessorKey: 'employeeNumber',
                cell: (props) => (
                    <div className="w-24 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Name',
                accessorKey: 'employeeName',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-36 truncate">
                                {value.length > 20 ? value.substring(0, 20) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Job Title',
                accessorKey: 'jobTitle',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-40 truncate">
                                {value.length > 24 ? value.substring(0, 24) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Business Unit',
                accessorKey: 'businessUnit',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-36 truncate">
                                {value.length > 20 ? value.substring(0, 20) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Location',
                accessorKey: 'location',
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
                header: 'Reporting Manager',
                accessorKey: 'reportingManager',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-40 truncate">
                                {value.length > 24 ? value.substring(0, 24) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Leave Type',
                accessorKey: 'leaveType',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'From Date',
                accessorKey: 'fromDate',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'From Session',
                accessorKey: 'fromSession',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'To Date',
                accessorKey: 'toDate',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'To Session',
                accessorKey: 'toSession',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Duration',
                accessorKey: 'totalDuration',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
        ],
        []
    );

    const [tableData, setTableData] = useState({
        total: employeeLeaves.length,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    });

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageIndex = page;
        setTableData(newTableData);
    };

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageSize = Number(value);
        newTableData.pageIndex = 1;
        setTableData(newTableData);
    };

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData);
        newTableData.sort = sort;
        setTableData(newTableData);
    };

    return (
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                data={employeeLeaves}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                pagingData={{
                    total: tableData.total,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
                stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true}
                selectable={true}
            />
        </div>
    );
};

export default LeaveRegisterTable;