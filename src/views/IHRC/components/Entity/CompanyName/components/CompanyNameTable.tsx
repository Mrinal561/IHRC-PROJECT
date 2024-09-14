import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Tooltip, Notification, toast } from '@/components/ui'; // Import Notification and toast
import { FiSettings, FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import { APP_PREFIX_PATH } from '@/constants/route.constant';
import { RiEyeLine } from 'react-icons/ri';
import cloneDeep from 'lodash/cloneDeep';

import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

const CompanyNameTable: React.FC = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [editedName, setEditedName] = useState('');
    const navigate = useNavigate();

    const [tableData, setTableData] = useState({
        total: entityDataSet.length,
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
                    <div className="w-96 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Company Name',
                accessorKey: 'Company_Name',
                cell: (props) => (
                    <div className="w-96 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Tooltip title="PF Config">
                            <Button
                                size="xs"
                                onClick={() => handleSetupClick(
                                    'PF', 
                                    row.original.Company_Name || '',
                                    row.original.Company_Group_Name || ''
                                )}
                                icon={<FiSettings />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                         <Tooltip title="PT Config">
                            <Button
                                size="xs"
                                onClick={() => handleSetupClick(
                                    'PT', 
                                    row.original.Company_Name || '',
                                    row.original.Company_Group_Name || ''
                                )}
                                icon={<FiSettings />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                         <Tooltip title="ESI Config">
                            <Button
                                size="xs"
                                onClick={() => handleSetupClick(
                                    'ESI', 
                                    row.original.Company_Name || '',
                                    row.original.Company_Group_Name || ''
                                )}
                                icon={<FiSettings />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="LWF Config">
                            <Button
                                size="xs"
                                onClick={() => handleSetupClick(
                                    'LWF', 
                                    row.original.Company_Name || '',
                                    row.original.Company_Group_Name || ''
                                )}
                                icon={<FiSettings />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="View Details">
                            <Button
                                size="xs"
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
                                size="xs"
                                onClick={() => openEditDialog(row.index)}
                                icon={<MdEdit />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button
                                size="xs"
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
        setEditedName(entityDataSet[index].Company_Name || '');
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
            // Implement delete functionality here
            handleDialogClose();
        }
    };

    const handleEditConfirm = () => {
        if (itemToEdit !== null && editedName.trim()) {
            // Implement edit functionality here
            // Show success notification
            toast.push(
                <Notification
                    title="Success"
                    type="success"
                >
                    The company name has been updated successfully.
                </Notification>
            );
            setEditDialogIsOpen(false);
            setItemToEdit(null);
            setEditedName('');
        } else {
            // Show error notification if no name provided
            toast.push(
                <Notification
                    title="Error"
                    type="danger"
                >
                    Please enter a valid company name.
                </Notification>
            );
        }
    };

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

    const getSortedData = () => {
        if (tableData.sort.order && tableData.sort.key) {
            return [...entityDataSet].sort((a, b) => {
                if (a[tableData.sort.key] < b[tableData.sort.key]) return tableData.sort.order === 'asc' ? -1 : 1;
                if (a[tableData.sort.key] > b[tableData.sort.key]) return tableData.sort.order === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return entityDataSet;
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
            {entityDataSet.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No data available
                </div>
            ) : (
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
            )}

            <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deletion</h5>
                <p>
                    Are you sure you want to delete this company? This action cannot be undone.
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
