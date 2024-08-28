import React, { useMemo, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import { Checkbox, Tooltip } from '@/components/ui'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'

// Updated interface to include new fields
interface ComplianceRow {
    ComplianceId: number;
    ComplianceHeader: string;
    Legislation: string;
    ComplianceCategorization: string;
    ComplianceDescription: string;
}

const complianceData: ComplianceRow[] = [
    {
        ComplianceId: 3236,
        ComplianceHeader: "Renewal of Registration",
        Legislation: "Bihar Shops and Establishments Act, 1953 and Bihar Shops Establishments Rules, 1955",
        ComplianceCategorization: "LICENSE / REGISTRATION",
        ComplianceDescription: "Apply for renewal of certificate of registration in Form IA in duplicate, not less than thirty days before the date on which the certificate of registration expires to the Inspecting Officer, along with the prescribed fees."
    },
    {
        ComplianceId: 3237,
        ComplianceHeader: "Annual Financial Statements",
        Legislation: "Companies Act, 2013",
        ComplianceCategorization: "FINANCIAL REPORTING",
        ComplianceDescription: "Submit annual financial statements, including balance sheet, profit and loss account, and auditor’s report, to the Registrar of Companies within thirty days of holding the annual general meeting."
    },
    {
        ComplianceId: 3238,
        ComplianceHeader: "Employee Provident Fund Contribution",
        Legislation: "Employees' Provident Funds and Miscellaneous Provisions Act, 1952",
        ComplianceCategorization: "EMPLOYMENT / SOCIAL SECURITY",
        ComplianceDescription: "Contribute to the Employee Provident Fund on a monthly basis, as per the prescribed percentage of the employees’ wages, and file the monthly returns with the Employees' Provident Fund Organisation."
    },
    {
        ComplianceId: 3239,
        ComplianceHeader: "Fire Safety Inspection",
        Legislation: "The Fire Services Act, 1940",
        ComplianceCategorization: "SAFETY / HEALTH",
        ComplianceDescription: "Ensure that the premises are inspected by the local fire department at least once every year to verify compliance with fire safety norms and obtain a fire safety certificate."
    },
    {
        ComplianceId: 3240,
        ComplianceHeader: "Goods and Services Tax Filing",
        Legislation: "Goods and Services Tax Act, 2017",
        ComplianceCategorization: "TAXATION",
        ComplianceDescription: "File monthly GST returns and pay the applicable GST to the government. Maintain records of all transactions and invoices as per GST rules and regulations."
    }
];


const RecommendedTableContent = () => {
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const isAllSelected = useMemo(
        () => selectedItems.size > 0 && selectedItems.size === complianceData.length,
        [selectedItems]
    );

    const handleCheckboxChange = (id: number) => {
        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id); // Deselect if already selected
            } else {
                newSet.add(id); // Select if not already selected
            }
            return newSet;
        });
    };

    const handleSelectAllChange = () => {
        if (isAllSelected) {
            setSelectedItems(new Set()); // Deselect all
        } else {
            setSelectedItems(new Set(complianceData.map((item) => item.ComplianceId))); // Select all
        }
    };

    const columns: ColumnDef<ComplianceRow>[] = useMemo(
        () => [
            {
                header: ({ table }) => (
                    <Checkbox
                        checked={isAllSelected}
                        onChange={handleSelectAllChange}
                    />
                ),
                id: 'select',
                cell: ({ row }) => (
                    <div>
                        <Checkbox
                        checked={selectedItems.has(row.original.ComplianceId)}
                        onChange={() => handleCheckboxChange(row.original.ComplianceId)}
                        />
                        </div>
                ),
            },
            {
                header: 'Compliance ID',
                accessorKey: 'ComplianceId',
                cell: (props) => (
                    <Tooltip title={`Compliance ID: ${props.getValue()}`} placement="top">
                        <div className="w-20 truncate">{props.getValue()}</div>
                    </Tooltip>
                ),
            },
            {
                header: 'Header',
                accessorKey: 'ComplianceHeader',
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
                header: 'Legislation',
                accessorKey: 'Legislation',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-36 truncate">{value.length > 30 ? value.substring(0, 30) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Category',
                accessorKey: 'ComplianceCategorization',
                cell: (props) => (
                    <Tooltip title={props.getValue() as string} placement="top">
                        <div className="w-36 truncate">{props.getValue()}</div>
                    </Tooltip>
                ),
            },
            {
                header: 'Description',
                accessorKey: 'ComplianceDescription',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="left">
                            <div className="w-64 truncate">{value.length > 50 ? value.substring(0, 50) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
        ],
        [selectedItems, isAllSelected]
    )

    const [tableData, setTableData] = useState({
        total: complianceData.length,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    })

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        setTableData(newTableData)
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        setTableData(newTableData)
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        setTableData(newTableData)
    }

    return (
        <div className="w-full">
            <DataTable
                columns={columns}
                data={complianceData}
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
            />
        </div>
    )
}

export default RecommendedTableContent
