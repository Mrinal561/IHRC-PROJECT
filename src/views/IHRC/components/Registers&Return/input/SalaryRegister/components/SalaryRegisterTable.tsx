
import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Checkbox, Tooltip } from '@/components/ui';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
// import { salaryDummyData, SalaryData } from './dummyData';
import { SalaryData, salaryDummyData } from '@/views/IHRC/store/dummyRegisterData';

const SalaryRegisterTable = () => {
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const isAllSelected = useMemo(
        () => selectedItems.size === salaryDummyData.length,
        [selectedItems]
    );

    const handleCheckboxChange = (id: number) => {
        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleSelectAllChange = () => {
        if (isAllSelected) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(salaryDummyData.map((item) => item.sl_no)));
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const columns: ColumnDef<SalaryData>[] = useMemo(
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
                header: 'State',
                accessorKey: 'state',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-32 truncate">{value.length > 18 ? value.substring(0, 18) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            
            {
                header: 'Emp No',
                accessorKey: 'employee_no',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-28 truncate">{value.length > 16 ? value.substring(0, 16) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-36 truncate">{value.length > 20 ? value.substring(0, 20) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Join Date',
                accessorKey: 'join_date',
                cell: (props) => (
                    <div className="w-24 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Gender',
                accessorKey: 'gender',
                cell: (props) => (
                    <div className="w-20 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Department',
                accessorKey: 'department',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-36 truncate">{value.length > 20 ? value.substring(0, 20) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Designation',
                accessorKey: 'designation',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-40 truncate">{value.length > 24 ? value.substring(0, 24) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Left Org',
                accessorKey: 'has_left',  
                cell: (props) => (
                    <div className="w-20 truncate">{props.getValue() ? 'Yes' : 'No'}</div>
                ),
            },
            {
                header: 'Email',
                accessorKey: 'email',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-48 truncate">{value.length > 28 ? value.substring(0, 28) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            // Financial columns with currency formatting
            {
                header: 'Basic',
                accessorKey: 'basic',
                cell: (props) => formatCurrency(props.getValue() as number),
            },
            {
                header: 'HRA',
                accessorKey: 'hra',
                cell: (props) => formatCurrency(props.getValue() as number),
            },
            {
                header: 'Transport',
                accessorKey: 'transport_allowance',
                cell: (props) => (
                    <div className="w-24 truncate">
                       { formatCurrency(props.getValue() as number)}
                    </div>
                ),
            },
            {
                header: 'Medical',
                accessorKey: 'medical',
                cell: (props) => (
                    <div className="w-24 truncate">
                       { formatCurrency(props.getValue() as number)}
                    </div>
                ),
            },
            {
                header: 'Special Allow.',
                accessorKey: 'special_allowance',
                cell: (props) => (
                    <div className="w-36 truncate">{formatCurrency(props.getValue() as number)}</div>
                ),
            },
            {
                header: 'Gross',
                accessorKey: 'gross',
                cell: (props) => formatCurrency(props.getValue() as number),
            },
            {
                header: 'PF',
                accessorKey: 'pf',
                cell: (props) => formatCurrency(props.getValue() as number),
            },
            {
                header: 'ESI',
                accessorKey: 'esi',
                cell: (props) => formatCurrency(props.getValue() as number),
            },
            {
                header: 'TDS',
                accessorKey: 'income_tax',
                cell: (props) => formatCurrency(props.getValue() as number),
            },
            {
                header: 'Total Deductions',
                accessorKey: 'total_deductions',
                cell: (props) => (
                    <div className="w-36 truncate">{formatCurrency(props.getValue() as number)}</div>
                ),
            },
            {
                header: 'Net Pay',
                accessorKey: 'net_pay',
                cell: (props) => formatCurrency(props.getValue() as number),
            },
        ],
        [selectedItems, isAllSelected]
    );

    const [tableData, setTableData] = useState({
        total: salaryDummyData.length,
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
                data={salaryDummyData}
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

export default SalaryRegisterTable;