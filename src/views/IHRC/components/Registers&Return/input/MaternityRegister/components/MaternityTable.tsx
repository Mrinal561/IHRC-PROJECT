import React, { useMemo, useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import cloneDeep from 'lodash/cloneDeep';
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable';
import { MaternityBenefitRecord, maternityRecords } from '@/views/IHRC/store/dummyMaternity';

const MaternityTable = () => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const formatDate = (date: string | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('en-IN');
    };

    const columns: ColumnDef<MaternityBenefitRecord>[] = useMemo(
        () => [
            // {
            //     header: 'Sl No',
            //     accessorKey: 'srNo',
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
                header: 'Emp ID',
                accessorKey: 'empID',
                cell: (props) => (
                    <div className="w-24 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Name',
                accessorKey: 'nameOfWoman',
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
                header: 'Father/Husband',
                accessorKey: 'fatherOrHusbandName',
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
                header: 'Department',
                accessorKey: 'department',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Nature of Work',
                accessorKey: 'natureOfWork',
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
                header: 'Date of Birth',
                accessorKey: 'dateOfBirth',
                cell: (props) => (
                    <div className="w-28 truncate">{formatDate(props.getValue() as string)}</div>
                ),
            },
            {
                header: 'Join Date',
                accessorKey: 'dateOfJoining',
                cell: (props) => (
                    <div className="w-28 truncate">{formatDate(props.getValue() as string)}</div>
                ),
            },
            {
                header: 'Laid Off Dates',
                accessorKey: 'laidOffDates',
                cell: (props) => {
                    const dates = props.getValue() as string[];
                    const value = dates.length ? dates.join(', ') : '-';
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
                header: 'Days Employed',
                accessorKey: 'totalDaysEmployed',
                cell: (props) => (
                    <div className="w-28 truncate">{props.getValue()}</div>
                ),
            },
            {
                header: 'Notice Date',
                accessorKey: 'noticeDate',
                cell: (props) => (
                    <div className="w-28 truncate">{formatDate(props.getValue() as string)}</div>
                ),
            },
            {
                header: 'Child Birth',
                accessorKey: 'childBirthDate',
                cell: (props) => (
                    <div className="w-28 truncate">{formatDate(props.getValue() as string)}</div>
                ),
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
            {
                header: 'Mat. Benefit Advance',
                accessorKey: 'maternityBenefitAdvance',
                cell: (props) => {
                    const value = props.getValue() as { date: string; amount: number } | null;
                    return (
                        <div className="w-36 truncate">
                            {value ? formatCurrency(value.amount) : '-'}
                        </div>
                    );
                },
            },
            {
                header: 'Medical Bonus',
                accessorKey: 'medicalBonus',
                cell: (props) => {
                    const value = props.getValue() as { date: string; amount: number } | null;
                    return (
                        <div className="w-32 truncate">
                            {value ? formatCurrency(value.amount) : '-'}
                        </div>
                    );
                },
            },
            {
                header: 'Leave Wages',
                accessorKey: 'leaveWages',
                cell: (props) => {
                    const value = props.getValue() as { date: string; amount: number } | null;
                    return (
                        <div className="w-32 truncate">
                            {value ? formatCurrency(value.amount) : '-'}
                        </div>
                    );
                },
            },
            {
                header: 'Nominee',
                accessorKey: 'nomineeName',
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
                header: 'Death Details',
                accessorKey: 'deathDetails',
                cell: (props) => {
                    const value = props.getValue() as {
                        womanDeathDate: string | null;
                        beneficiaryName: string;
                        amount: number;
                        paymentDate: string;
                    } | null;
                    if (!value) return <div className="w-40 truncate">-</div>;
                    const details = `Death: ${formatDate(value.womanDeathDate)}, Beneficiary: ${value.beneficiaryName}`;
                    return (
                        <Tooltip title={details} placement="top">
                            <div className="w-36 truncate">
                                {details.length > 20 ? details.substring(0, 20) + '...' : details}
                            </div>
                        </Tooltip>
                    );
                },
            },
        ],
        []
    );

    const [tableData, setTableData] = useState({
        total: maternityRecords.length,
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
                data={maternityRecords}
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

export default MaternityTable;