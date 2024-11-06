import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
import { EmployeeBonusRecord, employeeBonusRecords } from '@/views/IHRC/store/dummyBonus';

const BonusRegisterTable = () => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-IN');
    };

    const columns: ColumnDef<EmployeeBonusRecord>[] = useMemo(
        () => [
            // {
            //     header: 'Sl No',
            //     accessorKey: 'slNo',
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
                            <div className="w-42 truncate">
                                {value.length > 22 ? value.substring(0, 22) + '...' : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Emp Code',
                accessorKey: 'empCode',
                cell: (props) => (
                    <div className="w-24 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Employee Name',
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
                header: 'Father Name',
                accessorKey: 'fatherName',
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
                header: 'Join Date',
                accessorKey: 'dateOfJoining',
                cell: (props) => (
                    <div className="w-28 truncate">{formatDate(props.getValue() as string)}</div>
                ),
            },
            {
                header: 'Above 15 Years',
                accessorKey: 'isAbove15Years',
                cell: (props) => (
                    <div className="w-32 truncate">{props.getValue() ? 'Yes' : 'No'}</div>
                ),
            },
            {
                header: 'Designation',
                accessorKey: 'designation',
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
                header: 'Days Worked',
                accessorKey: 'daysWorkedInYear',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Total Salary',
                accessorKey: 'totalSalaryOrWage',
                cell: (props) => (
                    <div className="w-32 truncate">{formatCurrency(props.getValue() as number)}</div>
                ),
            },
            {
                header: 'Bonus Payable',
                accessorKey: 'bonusPayable',
                cell: (props) => (
                    <div className="w-32 truncate">{formatCurrency(props.getValue() as number)}</div>
                ),
            },
            {
                header: 'Puja/Custom Bonus',
                accessorKey: 'pujaOrCustomBonus',
                cell: (props) => (
                    <div className="w-40 truncate">{formatCurrency(props.getValue() as number)}</div>
                ),
            },
            {
                header: 'Interim Bonus',
                accessorKey: 'interimBonus',
                cell: (props) => (
                    <div className="w-32 truncate">{formatCurrency(props.getValue() as number)}</div>
                ),
            },
            {
                header: 'Income Tax',
                accessorKey: 'incomeTaxDeducted',
                cell: (props) => (
                    <div className="w-32 truncate">{formatCurrency(props.getValue() as number)}</div>
                ),
            },
            {
                header: 'Misconduct Deduction',
                accessorKey: 'misconductLossDeduction',
                cell: (props) => (
                    <div className="w-32 truncate">{formatCurrency(props.getValue() as number)}</div>
                ),
            },
            {
                header: 'Total Deductions',
                accessorKey: 'totalDeductions',
                cell: (props) => (
                    <div className="w-32 truncate">{formatCurrency(props.getValue() as number)}</div>
                ),
            },
            {
                header: 'State',
                accessorKey: 'state',
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
                header: 'District',
                accessorKey: 'district',
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
                header: 'Branch',
                accessorKey: 'branch',
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

    const [tableData, setTableData] = useState({
        total: employeeBonusRecords.length,
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
                data={employeeBonusRecords}
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

export default BonusRegisterTable;