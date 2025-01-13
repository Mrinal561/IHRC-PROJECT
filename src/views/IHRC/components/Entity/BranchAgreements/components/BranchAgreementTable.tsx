import React, { useEffect, useState, useMemo } from 'react';
import useAuth from '@/utils/hooks/useAuth';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip, Input, Select, DatePicker } from '@/components/ui';
import { MdEdit, MdFilterList } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import { Search } from 'lucide-react';
import dayjs from 'dayjs';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { useNavigate } from 'react-router-dom';

const BranchAgreementTable = () => {
    const { user } = useAuth(); // Get authenticated user
    const navigate = useNavigate();
    
    // Data states
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [branches, setBranches] = useState([]);
    const [groups, setGroups] = useState([]);
    
    // Filter states
    const [filters, setFilters] = useState({
        search: '',
        branch_id: '',
        group_id: [],
        sub_category: '',
        company_id: user?.company_id // Set company_id from auth user
    });
    
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        sort: { order: 'desc', key: 'id' },
    });

    // Fetch branch options for filter
    const fetchBranches = async () => {
        try {
            const response = await httpClient.get(endpoints.branch.getAll(), {
                params: { company_id: user?.company_id }
            });
            setBranches(response.data?.data || []);
        } catch (error) {
            console.error('Failed to fetch branches', error);
        }
    };

    // Fetch group options for filter
    const fetchGroups = async () => {
        try {
            const response = await httpClient.get(endpoints.companyGroup.getAll(), {
                params: { company_id: user?.company_id }
            });
            setGroups(response.data?.data || []);
        } catch (error) {
            console.error('Failed to fetch groups', error);
        }
    };

    const fetchBranchAgreementData = async () => {
        setIsLoading(true);
        console.log("Fetching branch agreement data...");
        console.log("Current user:", user);
        console.log("Endpoint:", endpoints.branchAgreement.list());
        
        try {
            const params = {
                // page: tableData.pageIndex,
                // page_size: tableData.pageSize,
                // company_id: user?.company_id,
                // sort: tableData.sort.order,
                // sort_by: tableData.sort.key,
                // ...(filters.search && { search: filters.search }),
                // ...(filters.branch_id && { branch_id: filters.branch_id }),
                // ...(filters.group_id?.length > 0 && { group_id: filters.group_id }),
                // ...(filters.sub_category && { sub_category: filters.sub_category }),
                ignorePlatform: true
            };
    
            console.log("Request params:", params);
    
            const response = await httpClient.get(endpoints.branchAgreement.list(), {
                // params
            });
            console.log("API Response:", response);
    
            setData(response.data?.data || []);
            setTableData(prev => ({
                ...prev,
                total: response.data?.pagination?.total || 0
            }));
        } catch (error) {
            console.error('Failed to fetch branch agreement data', error);
            console.error('Error details:', error.response?.data);
            console.error('Error status:', error.response?.status);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Make sure useEffect is triggered
    useEffect(() => {
        console.log("useEffect triggered");
        console.log("User:", user);
        console.log("Company ID:", user?.company_id);
        
        fetchBranchAgreementData();
    }, [tableData.pageIndex, tableData.pageSize]); // Removed filters dependency for now to test basic fetching

    useEffect(() => {
        fetchBranches();
        fetchGroups();
    }, []);

    
    // useEffect(() => {
    //     fetchBranchAgreementData();
    // }, [tableData.pageIndex, tableData.pageSize, filters]);

    const columns = useMemo(() => [
        {
            header: 'Company',
            accessorKey: 'Branch.Company.name',
            enableSorting: false,
            Cell: ({ value }) => <div className="w-52 truncate">{value}</div>,
        },
        {
            header: 'Branch',
            enableSorting: false,
            accessorKey: 'Branch.name',
            Cell: ({ value }) => <div className="w-52 truncate">{value}</div>,
        },
        {
            header: 'Agreement Type',
            enableSorting: false,
            accessorKey: 'agreement_type',
            Cell: ({ value }) => <div className="w-52 truncate">{value}</div>,
        },
        {
            header: 'Sub Category',
            enableSorting: false,
            accessorKey: 'sub_category',
            Cell: ({ value }) => <div className="w-40 truncate">{value}</div>,
        },
        {
            header: 'Owner',
            enableSorting: false,
            accessorKey: 'owner_name',
            Cell: ({ value }) => <div className="w-40 truncate">{value}</div>,
        },
        {
            header: 'Partner',
            enableSorting: false,
            accessorKey: 'partner_name',
            Cell: ({ value }) => <div className="w-40 truncate">{value}</div>,
        },
        {
            header: 'Start Date',
            enableSorting: false,
            accessorKey: 'start_date',
            cell: ({ value }) => (
                <div className="w-44">{dayjs(value).format('DD-MM-YYYY')}</div>
            ),
        },
        {
            header: 'End Date',
            accessorKey: 'end_date',
            enableSorting: false,
            cell: ({ value }) => (
                <div className="w-44">{dayjs(value).format('DD-MM-YYYY')}</div>
            ),
        },
        {
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Tooltip title="Edit">
                        <Button
                            size="sm"
                            onClick={() => navigate('/edit-branch-agreement', { 
                                state: { agreementId: row.original.id } 
                            })}
                            icon={<MdEdit />}
                            className="text-blue-500"
                        />
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button
                            size="sm"
                            icon={<FiTrash />}
                            className="text-red-500"
                        />
                    </Tooltip>
                </div>
            ),
        },
    ], []);

    return (
        <div className="space-y-4">
            {/* Filters Section */}
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow">
                <div className="relative">
                    <Input
                        prefix={<Search className="text-gray-400" />}
                        placeholder="Search..."
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ 
                            ...prev, 
                            search: e.target.value 
                        }))}
                    />
                </div>
                
                <Select
                    placeholder="Select Branch"
                    value={filters.branch_id}
                    onChange={(value) => setFilters(prev => ({ 
                        ...prev, 
                        branch_id: value 
                    }))}
                >
                    {branches.map((branch) => (
                        <Select.Option key={branch.id} value={branch.id}>
                            {branch.name}
                        </Select.Option>
                    ))}
                </Select>

                <Select
                    placeholder="Select Groups"
                    mode="multiple"
                    value={filters.group_id}
                    onChange={(value) => setFilters(prev => ({ 
                        ...prev, 
                        group_id: value 
                    }))}
                >
                    {groups.map((group) => (
                        <Select.Option key={group.id} value={group.id}>
                            {group.name}
                        </Select.Option>
                    ))}
                </Select>

                <Input
                    placeholder="Sub Category"
                    value={filters.sub_category}
                    onChange={(e) => setFilters(prev => ({ 
                        ...prev, 
                        sub_category: e.target.value 
                    }))}
                />
            </div> */}

            {/* Table Section */}
            <DataTable
                columns={columns}
                data={data}
                loading={isLoading}
                pagingData={{
                    total: tableData.total,
                    pageIndex: tableData.pageIndex,
                    pageSize: tableData.pageSize,
                }}
                onPaginationChange={(page) => setTableData(prev => ({ 
                    ...prev, 
                    pageIndex: page 
                }))}
                onSelectChange={(value) => setTableData(prev => ({
                    ...prev,
                    pageSize: Number(value),
                    pageIndex: 1,
                }))}
                onSort={(sortKey) => setTableData(prev => ({
                    ...prev,
                    sort: {
                        key: sortKey,
                        order: prev.sort.order === 'desc' ? 'asc' : 'desc'
                    }
                }))}
            />
        </div>
    );
};

export default BranchAgreementTable;