import React, { useMemo, useState } from 'react'
import DataTable from '@/components/shared/DataTable'
import { Checkbox, Tooltip, Button } from '@/components/ui'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import { useNavigate } from 'react-router-dom'
import { HiOutlineEye } from 'react-icons/hi'
import { RiCheckLine } from 'react-icons/ri'
import { dummyData, ComplianceData } from '@/views/IHRC/store/dummyData'

const ViewDetailsButton = ({ compliance }: { compliance: ComplianceData }) => {
    const navigate = useNavigate()

    const handleViewDetails = () => {
        navigate(`/app/IHRC/compliance-list-detail/${compliance.Compliance_ID}`, {
            state: compliance,
        })
    }

    return (
        <div className='flex gap-2 items-center'>
            <Tooltip title="View Compliance Detail" placement="top">
                <Button
                    size="sm"
                    className='text-[#737171]'
                    icon={<HiOutlineEye />}
                    onClick={handleViewDetails}
                />
            </Tooltip>
            <Tooltip title="Assign Compliance">
                <Button
                    size="sm"
                    onClick={() => console.log('Assign')}
                    icon={<RiCheckLine />}
                />
            </Tooltip>
        </div>
    )
}

const RecommendedTableContent = () => {
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());

    const isAllSelected = useMemo(
        () => selectedItems.size === dummyData.length,
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
            setSelectedItems(new Set(dummyData.map((item) => item.Compliance_ID)));
        }
    };

    const columns: ColumnDef<ComplianceData>[] = useMemo(
        () => [
            {
                header: ({ table }) => (
                    <div className="w-2">
                        <Checkbox
                            checked={isAllSelected}
                            onChange={handleSelectAllChange}
                        />
                    </div>
                ),
                id: 'select',
                cell: ({ row }) => (
                    <div className="w-2">
                        <Checkbox
                            checked={selectedItems.has(row.original.Compliance_ID)}
                            onChange={() => handleCheckboxChange(row.original.Compliance_ID)}
                        />
                    </div>
                ),
            },
            {
                header: 'Compliance ID',
                accessorKey: 'Compliance_ID',
                cell: (props) => (
                    <Tooltip title={`Compliance ID: ${props.getValue()}`} placement="top">
                        <div className="w-32 truncate">{props.getValue()}</div>
                    </Tooltip>
                ),
            },
            {
                header: 'Legislation',
                accessorKey: 'Legislation',
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
                header: 'Criticality',
                accessorKey: 'Criticality',
                cell: (props) => {
                    const criticality = props.getValue();
                    return (
                        <div className="w-24 font-semibold truncate">
                            {criticality === 'High' ? (
                                <span className="text-red-500">{criticality}</span>
                            ) : criticality === 'Medium' ? (
                                <span className="text-yellow-500">{criticality}</span>
                            ) : (
                                <span className="text-green-500">{criticality}</span>
                            )}
                        </div>
                    );
                }
            },
            {
                header: 'Location',
                accessorKey: 'Location',
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
                header: 'Header',
                accessorKey: 'Compliance_Header',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-36 truncate">{value.length > 18 ? value.substring(0, 18) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Description',
                accessorKey: 'Compliance_Description',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="left">
                            <div className="w-48 truncate">{value.length > 30 ? value.substring(0, 30) + '...' : value}</div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Action',
                id: 'viewDetails',
                cell: (props) => (
                    <div className="w-16 flex justify-center">
                        <ViewDetailsButton compliance={props.row.original} />
                    </div>
                ),
            }
        ],
        [selectedItems, isAllSelected]
    )

    const [tableData, setTableData] = useState({
        total: dummyData.length,
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
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                data={dummyData}
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