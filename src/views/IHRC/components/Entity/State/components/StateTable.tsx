

import React, { useMemo, useState } from 'react';
import { Button, Dialog, Tooltip, Pagination, Notification, toast } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
import OutlinedSelect from '@/components/ui/Outlined';

const StateTable: React.FC = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
    const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(5);

    const states = useMemo(() => {
        const uniqueStates = new Set(entityDataSet.map(item => item.State));
        return Array.from(uniqueStates).map(state => ({ label: state, value: state }));
    }, []);

    const companyGroups = useMemo(() => {
        const uniqueGroups = new Set(entityDataSet.map(item => item.Company_Group_Name));
        return Array.from(uniqueGroups).map(group => ({ label: group, value: group }));
    }, []);

    const companies = useMemo(() => {
        const uniqueCompanies = new Set(entityDataSet.map(item => item.Company_Name));
        return Array.from(uniqueCompanies).map(company => ({ label: company, value: company }));
    }, []);

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
                header: 'Location (State)',
                accessorKey: 'State',
                cell: (props) => (
                    <div className="w-52 truncate">{props.getValue() as string}</div>
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
        const item = entityDataSet[index];
        setSelectedState({ label: item.State || '', value: item.State || '' });
        setSelectedCompanyGroup({ label: item.Company_Group_Name || '', value: item.Company_Group_Name || '' });
        setSelectedCompany({ label: item.Company_Name || '', value: item.Company_Name || '' });
        setEditDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setEditDialogIsOpen(false);
        setItemToDelete(null);
        setItemToEdit(null);
        setSelectedState(null);
        setSelectedCompanyGroup(null);
        setSelectedCompany(null);
    };

    const handleDialogOk = () => {
        if (itemToDelete !== null) {
            entityDataSet.splice(itemToDelete, 1);
            toast.push(
                <Notification
                    title="Deleted"
                    type="danger"
                >
                    The item has been deleted successfully.
                </Notification>
            );
            setDialogIsOpen(false);
            setItemToDelete(null);
        }
    };

    const handleEditConfirm = () => {
        if (itemToEdit !== null && selectedState && selectedCompanyGroup && selectedCompany) {
            entityDataSet[itemToEdit].State = selectedState.value;
            entityDataSet[itemToEdit].Company_Group_Name = selectedCompanyGroup.value;
            entityDataSet[itemToEdit].Company_Name = selectedCompany.value;

            toast.push(
                <Notification
                    title="Success"
                    type="success"
                >
                    The item has been updated successfully.
                </Notification>
            );

            setEditDialogIsOpen(false);
            setItemToEdit(null);
            setSelectedState(null);
            setSelectedCompanyGroup(null);
            setSelectedCompany(null);
        }
    };

    const onPaginationChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="relative">
            <DataTable
                columns={columns}
                data={entityDataSet.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                loading={false}
                stickyHeader={true}
                stickyFirstColumn={true}
                stickyLastColumn={true}
            />

            <div className="mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(entityDataSet.length / pageSize)}
                    onChange={onPaginationChange}
                />
            </div>

            <Dialog isOpen={dialogIsOpen} onClose={handleDialogClose}  shouldCloseOnOverlayClick={false} >
                <h5 className="mb-4">Confirm Deleting Item</h5>
                <p>
                    Are you sure you want to delete this item? This action cannot be undone.
                </p>
                <div className="text-right mt-6">
                    <Button variant="plain" onClick={handleDialogClose}>
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleDialogOk}>
                        Delete
                    </Button>
                </div>
            </Dialog>

            <Dialog isOpen={editDialogIsOpen} onClose={handleDialogClose}>
                <h5 className="mb-4">Edit Item</h5>
                <div className='flex flex-col gap-5'>
                    <div >

                    
                <OutlinedSelect
                    label="Select Company Group"
                    options={companyGroups}
                    value={selectedCompanyGroup}
                    onChange={(option: SelectOption | null) => {
                        setSelectedCompanyGroup(option);
                    }}
                
                />
                </div>
                <div>
                <OutlinedSelect
                    label="Select Company"
                    options={companies}
                    value={selectedCompany}
                    onChange={(option: SelectOption | null) => {
                        setSelectedCompany(option);
                    }}
                />
                </div>
                <div>
                <OutlinedSelect
                    label="Select State"
                    options={states}
                    value={selectedState}
                    onChange={(option: SelectOption | null) => {
                        setSelectedState(option);
                    }}
                />
                </div>
                </div>
                <div className="text-right mt-6">
                    <Button variant="plain" onClick={handleDialogClose}>
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

export default StateTable;