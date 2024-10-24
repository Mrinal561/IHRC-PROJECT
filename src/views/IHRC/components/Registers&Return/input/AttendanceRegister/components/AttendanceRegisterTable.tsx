
import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
import { attendanceData } from '@/views/IHRC/store/dummyAttendanceData';

const AttendanceRegisterTable = () => {
    const getStatusColor = (status: string) => {
        const colors: { [key: string]: string } = {
            'P': 'text-green-600',
            'A': 'text-red-600',
            'WFH': 'text-blue-600',
            'OD': 'text-purple-600',
            'WO': 'text-gray-600',
            'H': 'text-orange-600',
            'MS': 'text-yellow-600',
            'PL': 'text-indigo-600',
            'UL': 'text-pink-600',
            'PPL': 'text-rose-600'
        };
        return colors[status] || 'text-gray-900';
    };

    // Calculate summary counts for each status type
    const calculateStatusCount = (record: typeof attendanceData[0], status: string) => {
        return Object.values(record.dailyStatus).filter(s => s === status).length;
    };

    const columns: ColumnDef<typeof attendanceData[0]>[] = useMemo(
        () => [
            // {
            //     header: 'Sl No',
            //     accessorKey: 'sl_no',
            //     cell: (props) => (
            //         <div className="w-16 truncate">{props.getValue()}</div>
            //     ),
            // },
            {
                header: 'Company',
                accessorKey: 'company_name',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-42 truncate">{value.length > 22 ? value.substring(0, 22) + '...' : value}</div>
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
                            <div className="w-32 truncate">
                                {value.length > 18 ? value.substring(0, 18) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Location',
                accessorKey: 'location',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Manager',
                accessorKey: 'reportingManager',
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
            // Daily Status columns for July 2024
            ...Array.from({ length: 31 }, (_, i) => {
                const day = (i + 1).toString().padStart(2, '0');
                const dateKey = `${day}-Jul-2024`;
                return {
                    header: day,
                    accessorFn: (row: typeof attendanceData[0]) => row.dailyStatus[dateKey],
                    cell: (props: any) => {
                        const status = props.getValue();
                        return (
                            <Tooltip title={getStatusFullName(status)} placement="top">
                                <div className={`w-12 truncate text-center ${getStatusColor(status)}`}>
                                    {status}
                                </div>
                            </Tooltip>
                        );
                    },
                };
            }),
            // Summary columns with correct accessors and color coding
            {
                header: 'Present',
                accessorKey: 'summary.presentDays',
                cell: (props) => (
                    <div className="w-20 truncate text-center text-green-600 font-medium">
                        {props.row.original.summary.presentDays}
                    </div>
                ),
            },
            {
                header: 'WFH',
                accessorKey: 'summary.wfh',
                cell: (props) => (
                    <div className="w-16 truncate text-center text-blue-600 font-medium">
                        {props.row.original.summary.wfh}
                    </div>
                ),
            },
            {
                header: 'OD',
                accessorKey: 'summary.onDuty',
                cell: (props) => (
                    <div className="w-16 truncate text-center text-purple-600 font-medium">
                        {props.row.original.summary.onDuty}
                    </div>
                ),
            },
            {
                header: 'PL',
                accessorKey: 'summary.totalPaidLeave',
                cell: (props) => (
                    <div className="w-16 truncate text-center text-indigo-600 font-medium">
                        {props.row.original.summary.totalPaidLeave}
                    </div>
                ),
            },
            {
                header: 'UL',
                accessorKey: 'summary.totalUnpaidLeave',
                cell: (props) => (
                    <div className="w-16 truncate text-center text-pink-600 font-medium">
                        {props.row.original.summary.totalUnpaidLeave}
                    </div>
                ),
            },
            {
                header: 'MS',
                accessorKey: 'summary.missingSwipeDays',
                cell: (props) => (
                    <div className="w-16 truncate text-center text-yellow-600 font-medium">
                        {props.row.original.summary.missingSwipeDays}
                    </div>
                ),
            },
            {
                header: 'WO',
                accessorKey: 'summary.weeklyOffs',
                cell: (props) => (
                    <div className="w-16 truncate text-center text-gray-600 font-medium">
                        {props.row.original.summary.weeklyOffs}
                    </div>
                ),
            },
            {
                header: 'H',
                accessorKey: 'summary.holidays',
                cell: (props) => (
                    <div className="w-16 truncate text-center text-orange-600 font-medium">
                        {props.row.original.summary.holidays}
                    </div>
                ),
            },
        ],
        []
    );

    const getStatusFullName = (status: string) => {
        const statusMap: { [key: string]: string } = {
            'P': 'Present',
            'A': 'Absent',
            'WFH': 'Work From Home',
            'OD': 'On Duty',
            'WO': 'Weekly Off',
            'H': 'Holiday',
            'MS': 'Missing Swipe',
            'PL': 'Paid Leave',
            'UL': 'Unpaid Leave',
            'PPL': 'Penalized Paid Leave'
        };
        return statusMap[status] || status;
    };

    const [tableData, setTableData] = useState({
        total: attendanceData.length,
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
                data={attendanceData}
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

export default AttendanceRegisterTable;