import React, { useEffect, useState, useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Button, Tooltip } from '@/components/ui';
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import dayjs from 'dayjs';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { useNavigate } from 'react-router-dom';

const BranchAgreementTable = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const fetchBranchAgreementData = async (page = 1, size = 10) => {
        setIsLoading(true);
        try {
            const response = await httpClient.get(endpoints.branchAgreement.list(), {
                params: { page, size },
            });
            setData(response.data);
        } catch (error) {
            console.error('Failed to fetch branch agreement data', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBranchAgreementData();
    }, []);

    const columns = useMemo(() => [
        {
            Header: 'Company',
            enableSorting: false,
            accessorKey: 'Company.name',
            Cell: ({ value }) => <div className="w-52 truncate">{value}</div>,
        },
        {
            Header: 'Branch',
            enableSorting: false,
            accessorKey: 'Branch.name',
            Cell: ({ value }) => <div className="w-52 truncate">{value}</div>,
        },
        {
            Header: 'Agreement Type',
            enableSorting: false,
            accessorKey: 'agreement_type',
            Cell: ({ value }) => <div className="w-52 truncate">{value}</div>,
        },
        {
            Header: 'Sub Category',
            enableSorting: false,
            accessorKey: 'sub_category',
            Cell: ({ value }) => <div className="w-40 truncate">{value}</div>,
        },
        {
            Header: 'Owner',
            enableSorting: false,
            accessorKey: 'owner_name',
            Cell: ({ value }) => <div className="w-40 truncate">{value}</div>,
        },
        {
            Header: 'Partner',
            enableSorting: false,
            accessorKey: 'partner_name',
            Cell: ({ value }) => <div className="w-40 truncate">{value}</div>,
        },
        {
            Header: 'Start Date',
            enableSorting: false,
            accessorKey: 'start_date',
            Cell: ({ value }) => (
                <div className="w-44">{dayjs(value).format('DD-MM-YYYY')}</div>
            ),
        },
        {
            Header: 'End Date',
            accessorKey: 'end_date',
            enableSorting: false,
            Cell: ({ value }) => (
                <div className="w-44">{dayjs(value).format('DD-MM-YYYY')}</div>
            ),
        },
        {
            Header: 'Actions',
            id: 'action',
            Cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Tooltip title="Edit">
                        <Button
                            size="sm"
                            onClick={() => navigate('/edit-branch', { state: { branchId: row.original.id } })}
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


        const [tableData, setTableData] = useState({
            total: 0,
            pageIndex: 1,
            pageSize: 10,
            query: '',
            sort: { order: '', key: '' },
        })
    
        const onPaginationChange = (page: number) => {
            setTableData((prev) => ({ ...prev, pageIndex: page }))
            // fetchBranchData(page, tableData.pageSize)
        }
    
        const onSelectChange = (value: number) => {
            setTableData((prev) => ({
                ...prev,
                pageSize: Number(value),
                pageIndex: 1,
            }))
            // fetchBranchData(1, value)
        }

    return (
        <DataTable
            columns={columns}
            data={data}
            loading={isLoading}
            pagingData={{
                total: tableData.total,
                pageIndex: tableData.pageIndex,
                pageSize: tableData.pageSize,
            }}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            // onPageChange={(page) => fetchBranchAgreementData(page + 1)}
        />
    );
};

export default BranchAgreementTable;
