import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
import { FiSettings, FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import { APP_PREFIX_PATH } from '@/constants/route.constant';
import { RiEyeLine } from 'react-icons/ri';
import cloneDeep from 'lodash/cloneDeep';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

const CompanyNameTable: React.FC = () => {
    const [data, setData] = useState<EntityData[]>(entityDataSet);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [editedName, setEditedName] = useState('');
    const navigate = useNavigate();

    const [tableData, setTableData] = useState({
        total: data.length,
        pageIndex: 1,
        pageSize: 5,
        query: '',
        sort: { order: '', key: '' },
    });

    const handleSetupClick = (setupType: string, companyName: string, companyGroupName: string) => {
        const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
        navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, { state: { companyName, companyGroupName } });
    };

    const handleViewDetails = (companyName: string, companyGroupName: string) => {
        const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
        navigate(`${APP_PREFIX_PATH}/IHRC/company-details/${urlSafeCompanyName}`, {
            state: { companyName, companyGroupName }
        });
    };

    const columns: ColumnDef<EntityData>[] = useMemo(
        () => [
            {
                header: 'Company Group Name',
                accessorKey: 'Company_Group_Name',
                cell: (props) => (
                    <div className="w-52 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Company Name',
                accessorKey: 'Company_Name',
                cell: (props) => (
                    <div className="w-52 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Tooltip title="View Details">
                            <Button
                                size="sm"
                                onClick={() => handleViewDetails(
                                    row.original.Company_Name || '',
                                    row.original.Company_Group_Name || ''
                                )}
                                icon={<RiEyeLine />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Edit">
                            <Button
                                size="sm"
                                onClick={() => openEditDialog(row.index)}
                                icon={<MdEdit />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button
                                size="sm"
                                onClick={() => openDeleteDialog(row.index)}
                                icon={<FiTrash />}
                                className="text-red-500"
                            />
                        </Tooltip>
                    </div>
                ),
            },
        ],
        []
    );

    const openDeleteDialog = (index: number) => {
        setItemToDelete(index);
        setDialogIsOpen(true);
    };

    const openEditDialog = (index: number) => {
        setItemToEdit(index);
        setEditedName(data[index].Company_Name || '');
        setEditDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setEditDialogIsOpen(false);
        setItemToDelete(null);
        setItemToEdit(null);
        setEditedName('');
    };

    const handleDeleteConfirm = () => {
        if (itemToDelete !== null) {
            setData(prev => prev.filter((_, index) => index !== itemToDelete));
            handleDialogClose();
        }
    };

    const handleEditConfirm = () => {
        if (itemToEdit !== null && editedName.trim()) {
            setData(prev => prev.map((item, index) => 
                index === itemToEdit ? { ...item, Company_Name: editedName.trim() } : item
            ));
            handleDialogClose();
            showSuccessNotification();
        }
    };

    const showSuccessNotification = () => {
        toast.push(
            <Notification title="Success" type="success">
                Company Name changed successfully.
            </Notification>
        );
    };

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageIndex = page;
        setTableData(newTableData);
    };

    const getSortedData = () => {
        if (tableData.sort.order && tableData.sort.key) {
            return [...data].sort((a, b) => {
                if (a[tableData.sort.key] < b[tableData.sort.key]) return tableData.sort.order === 'asc' ? -1 : 1;
                if (a[tableData.sort.key] > b[tableData.sort.key]) return tableData.sort.order === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return data;
    };

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData);
        newTableData.pageSize = Number(value);
        newTableData.pageIndex = 1;
        setTableData(newTableData);
    };

    const getPaginatedData = () => {
        const sortedData = getSortedData();
        const startIndex = (tableData.pageIndex - 1) * tableData.pageSize;
        const endIndex = startIndex + tableData.pageSize;
        return sortedData.slice(startIndex, endIndex);
    };

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData);
        newTableData.sort = sort;
        setTableData(newTableData);
    };

    return (
        <div className='relative'>
            <DataTable
                columns={columns}
                data={getPaginatedData()}
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

            <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deletion</h5>
                <p>
                    Are you sure you want to delete this company name? This action cannot be undone.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleDeleteConfirm}>
                        Delete
                    </Button>
                </div>
            </Dialog>

            <Dialog
                isOpen={editDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Edit Company Name</h5>
                <div className="mb-4">
                    <OutlinedInput 
                        label="Company Name"
                        value={editedName}
                        onChange={(value: string) => setEditedName(value)}
                    />
                </div>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleEditConfirm}>
                        Confirm
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default CompanyNameTable;