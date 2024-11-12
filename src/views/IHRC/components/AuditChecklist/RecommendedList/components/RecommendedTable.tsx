import React, { useMemo, useState, useEffect } from 'react'
import DataTable from '@/components/shared/DataTable'
import { Checkbox, Tooltip, Button, Notification, toast } from '@/components/ui'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import { useNavigate } from 'react-router-dom'
import { HiOutlineEye } from 'react-icons/hi'
import { RiCheckLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import {
    assignCompliancesToBranch,
} from '@/store/slices/compliance/ComplianceApiSlice'
import { Loading } from '@/components/shared'
 
interface ComplianceData {
    id: number
    uuid: string
    legislation: string
    category: string
    penalty_type: string
    default_due_date: {
        first_date: string
        last_date: string
    }
    scheduled_frequency: string
    proof_mandatory: boolean
    header: string
    description: string
    penalty_description: string
    applicablility: string
    bare_act_text: string
    type: string
    caluse: string
    frequency: string
    statutory_auth: string
    approval_required: boolean
    criticality: string
    created_type: string
    created_at: string
    updated_at: string
}
 
interface RecommendedTableContentProps {
    data: ComplianceData[]
    loading: boolean
    tableKey: number
    branchValue?: string
    companyGroupValue?: string
    companyValue?: string
    stateValue?: string
    districtValue?: string
    locationValue?: string
    onSelectedCompliancesChange: (selectedIds: number[]) => void
}
 
const ViewDetailsButton = ({
    compliance,
    branchValue,
    companyGroupValue,
    companyValue,
    stateValue,
    locationValue,
    districtValue,
    onAssignSuccess,
    // onTableRerender,
    setIstableLoading
}: {
    compliance: ComplianceData;
    branchValue?: string;
    companyGroupValue?: string;
    companyValue?: string;
    stateValue?: string;
    locationValue?: string;
    districtValue?: string;
    onAssignSuccess: (complianceId: number) => void;
    // onTableRerender: () => void;
    setIstableLoading: () => void
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
 
    const handleViewDetails = () => {
        navigate(`/app/IHRC/compliance-list-detail/${compliance.uuid}`, {
            state: compliance,
        });
    };
 
    const handleAssignCompliance = async () => {
 
        if (!companyGroupValue && !companyValue && !stateValue && !districtValue && !locationValue && !branchValue) {
            toast.push(
                <Notification title="Missing Information" type="danger">
                    Please select at least one field
                </Notification>
            );
            return;
        }
   
        // Check hierarchy only if fields are selected
        if (companyValue && !companyGroupValue) {
            toast.push(
                <Notification title="Missing Information" type="danger">
                    Please select Company Group before selecting Company
                </Notification>
            );
            return;
        }
   
        if (stateValue && (!companyGroupValue || !companyValue)) {
            toast.push(
                <Notification title="Missing Information" type="danger">
                    Please select Company Group and Company before selecting State
                </Notification>
            );
            return;
        }
   
        if (districtValue && (!companyGroupValue || !companyValue || !stateValue)) {
            toast.push(
                <Notification title="Missing Information" type="danger">
                    Please select Company Group, Company, and State before selecting District
                </Notification>
            );
            return;
        }
   
        if (locationValue && (!companyGroupValue || !companyValue || !stateValue || !districtValue)) {
            toast.push(
                <Notification title="Missing Information" type="danger">
                    Please select Company Group, Company, State, and District before selecting Location
                </Notification>
            );
            return;
        }
   
        if (branchValue && (!companyGroupValue || !companyValue || !stateValue || !districtValue || !locationValue)) {
            toast.push(
                <Notification title="Missing Information" type="danger">
                    Please select Company Group, Company, State, District, and Location before selecting Branch
                </Notification>
            );
            return;
        }
 
        const assignData = {
            group_id: parseInt(companyGroupValue),
            company_id: parseInt(companyValue),
            state_id: parseInt(stateValue),
            location_id: parseInt(locationValue),
            branch_id: parseInt(branchValue),
            compliance_id: [compliance.id]
        };
        console.log(assignData);
 
        try {
            await dispatch(assignCompliancesToBranch(assignData));
            onAssignSuccess(compliance.id);
            toast.push(
                <Notification title="Success" type="success">
                    Assigned Successfully
                </Notification>
            );
            setIstableLoading(true)
        } catch (error) {
            console.error('Failed to assign compliance:', error);
            toast.push(
                <Notification title="Failed" type="danger">
                    Not Assigned
                </Notification>
            );
        }
    };
 
    return (
        <div className="flex gap-2 items-center">
            <Tooltip title="View Compliance Detail" placement="top">
                <Button
                    size="sm"
                    className="text-[#737171]"
                    icon={<HiOutlineEye />}
                    onClick={handleViewDetails}
                />
            </Tooltip>
            <Tooltip title="Assign Compliance">
                <Button
                    size="sm"
                    onClick={handleAssignCompliance}
                    icon={<RiCheckLine />}
                />
            </Tooltip>
        </div>
    );
};
 
const RecommendedTable = ({
    data,
    loading,
    tableKey,
    branchValue,
    companyGroupValue,
    companyValue,
    stateValue,
    locationValue,
    districtValue,
    setIstableLoading,
    onSelectedCompliancesChange
}: RecommendedTableContentProps)  => {
    const dispatch = useDispatch()
    const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set())
    const [assignedItems, setAssignedItems] = useState<Set<number>>(new Set())
    const [initialLoadComplete, setInitialLoadComplete] = useState(false)
    const [checkboxState, setCheckboxState] = useState<{ [key: number]: boolean }>({})
    const [rerenderKey, setRerenderKey] = useState(0)
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    })
 
    useEffect(() => {
        setInitialLoadComplete(true)
        setTableData(prev => ({
            ...prev,
            total: data.length
        }))
    }, [data])
 
    const isAllSelected = useMemo(() => {
        if (data.length === 0) return false;
        return selectedItems.size === data.length;
    }, [selectedItems.size, data.length]);
 
    const isIndeterminate = useMemo(() => {
        return selectedItems.size > 0 && selectedItems.size < data.length;
    }, [selectedItems.size, data.length]);
 
    const handleCheckboxChange = (id: number) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            onSelectedCompliancesChange(Array.from(newSet));
            return newSet;
        });
    };
 
    const handleSelectAllChange = () => {
        if (selectedItems.size === data.length) {
            setSelectedItems(new Set());
            onSelectedCompliancesChange([]);
        } else {
            const newSelectedItems = new Set(data.map(item => item.id));
            setSelectedItems(newSelectedItems);
            onSelectedCompliancesChange(Array.from(newSelectedItems));
        }
    };
 
    const handleAssignSuccess = async (complianceIdAssigned: number) => {
        setSelectedItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(complianceIdAssigned);
            onSelectedCompliancesChange(Array.from(newSet));
            return newSet;
        });
    };
 
    const handleTableRerender = () => {
        setRerenderKey(prev => prev + 1);
    };
 
    const columns = useMemo(
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
                            checked={selectedItems.has(row.original.id)}
                            onChange={() => handleCheckboxChange(row.original.id)}
                        />
                    </div>
                ),
            },
            {
                header: 'ID',
                accessorKey: 'record_id',
                cell: (props) => (
                    <Tooltip title={`ID: ${props.getValue()}`} placement="top">
                        <div className="w-24 truncate">{props.getValue()}</div>
                    </Tooltip>
                ),
            },
            {
                header: 'Legislation',
                accessorKey: 'legislation',
                cell: (props) => {
                    const value = props.getValue() as string
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-42 truncate">{value.length > 22 ? value.substring(0, 22) + '...' : value}</div>
                        </Tooltip>
                    )
                },
            },
            {
                header: 'Criticality',
                accessorKey: 'criticality',
                cell: (props) => {
                    const criticality = props.getValue() as string
                    return (
                        <div className="w-24 font-semibold truncate">
                            {criticality === 'high' ? (
                                <span className="text-red-500">High</span>
                            ) : criticality === 'medium' ? (
                                <span className="text-yellow-500">Medium</span>
                            ) : (
                                <span className="text-green-500">Low</span>
                            )}
                        </div>
                    )
                }
            },
            {
                header: 'Category',
                accessorKey: 'category',
                cell: (props) => {
                    const value = props.getValue() as string
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-36 truncate">{value.length > 20 ? value.substring(0, 20) + '...' : value}</div>
                        </Tooltip>
                    )
                },
            },
            {
                header: 'Header',
                accessorKey: 'header',
                cell: (props) => {
                    const value = props.getValue() as string
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-36 truncate">{value.length > 18 ? value.substring(0, 18) + '...' : value}</div>
                        </Tooltip>
                    )
                },
            },
            {
                header: 'Description',
                accessorKey: 'description',
                cell: (props) => {
                    const value = props.getValue() as string
                    return (
                        <Tooltip title={value} placement="left">
                            <div className="w-48 truncate">{value.length > 30 ? value.substring(0, 30) + '...' : value}</div>
                        </Tooltip>
                    )
                },
            },
            {
                header: 'Due Date',
                accessorKey: 'default_due_date',
                cell: (props) => {
                    const dueDate = props.getValue() as { first_date: string; last_date: string }
                    const displayDate = `${new Date(dueDate.first_date).toLocaleDateString()} - ${new Date(dueDate.last_date).toLocaleDateString()}`
                    return (
                        <Tooltip title={displayDate} placement="top">
                            <div className="w-40 truncate">{displayDate}</div>
                        </Tooltip>
                    )
                },
            },
            {
                header: 'Action',
                id: 'viewDetails',
                cell: (props) => (
                    <div className="w-16 flex justify-center">
                        <ViewDetailsButton
                            compliance={props.row.original}
                            branchValue={branchValue}
                            companyGroupValue={companyGroupValue}
                            companyValue={companyValue}
                            stateValue={stateValue}
                            districtValue={districtValue}
                            locationValue={locationValue}
                            onAssignSuccess={handleAssignSuccess}
                            // onTableRerender={IstableLoading}
                            setIstableLoading={setIstableLoading}
                        />
                    </div>
                ),
            }
        ],
        [selectedItems, data, isAllSelected, isIndeterminate, branchValue, companyGroupValue, companyValue, stateValue, districtValue, locationValue, setIstableLoading]
    );
 
    const onPaginationChange = (page: number) => {
        setTableData(prev => ({
            ...prev,
            pageIndex: page
        }))
    }
 
    const onSelectChange = (value: number) => {
        setTableData(prev => ({
            ...prev,
            pageSize: Number(value),
            pageIndex: 1
        }))
    }
 
    return (
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={{
                    total: tableData.total,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true}
                selectable={true}
            />
        </div>
    )
}
 
export default RecommendedTable