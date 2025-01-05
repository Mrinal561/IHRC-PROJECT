import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DataTable from '@/components/shared/DataTable';
import { Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
import { MdEdit, MdDelete } from 'react-icons/md';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { RiShieldKeyholeLine } from 'react-icons/ri';
import { FiTrash } from 'react-icons/fi';
import Lottie from 'lottie-react';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { deleteRole, fetchRoleById, updateRole } from '@/store/slices/role/roleSlice';
import { useNavigate } from 'react-router-dom';

const colorPalette = [
    { bg: 'bg-blue-100', text: 'text-blue-700' },
    { bg: 'bg-green-100', text: 'text-green-700' },
    { bg: 'bg-purple-100', text: 'text-purple-700' },
    { bg: 'bg-rose-100', text: 'text-rose-700' },
    { bg: 'bg-amber-100', text: 'text-amber-700' },
    { bg: 'bg-teal-100', text: 'text-teal-700' },
    { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    { bg: 'bg-pink-100', text: 'text-pink-700' }
];

const getModuleColor = (moduleName, colorMap) => {
    if (!colorMap.has(moduleName)) {
        const colorIndex = colorMap.size % colorPalette.length;
        colorMap.set(moduleName, colorPalette[colorIndex]);
    }
    return colorMap.get(moduleName);
};

const ModuleBox = ({ module, colors }) => {
    return (
        <div className="inline-block mb-2 last:mb-0">
            <div className={`rounded-md px-3 py-1 ${colors.bg}`}>
                <span className={`font-medium whitespace-nowrap ${colors.text}`}>
                    {module.name}
                </span>
            </div>
        </div>
    );
};

const getChildColors = (parentBg, parentText) => {
    const colorMap = {
        'bg-blue-100': { bg: 'bg-blue-50', text: 'text-blue-600' },
        'bg-green-100': { bg: 'bg-green-50', text: 'text-green-600' },
        'bg-purple-100': { bg: 'bg-purple-50', text: 'text-purple-600' },
        'bg-rose-100': { bg: 'bg-rose-50', text: 'text-rose-600' },
        'bg-amber-100': { bg: 'bg-amber-50', text: 'text-amber-600' },
        'bg-teal-100': { bg: 'bg-teal-50', text: 'text-teal-600' },
        'bg-indigo-100': { bg: 'bg-indigo-50', text: 'text-indigo-600' },
        'bg-pink-100': { bg: 'bg-pink-50', text: 'text-pink-600' }
    };
    return colorMap[parentBg] || { bg: 'bg-gray-50', text: 'text-gray-600' };
};

const MenuItemBox = ({ menu, parentColors }) => {
    return (
        <div className="flex items-center gap-2">
            <div className={`inline-flex items-center rounded-md px-3 py-1 ${parentColors.bg}`}>
                <span className={`font-medium whitespace-nowrap ${parentColors.text}`}>
                    {menu.name}
                </span>
            </div>
            
            {menu.children && menu.children.length > 0 && (
                <div className="flex items-center gap-2">
                    <div className="text-black text-lg font-medium">→</div>
                    {menu.children.map((childMenu, idx) => (
                        <MenuItemBox 
                            key={idx} 
                            menu={childMenu} 
                            parentColors={getChildColors(parentColors.bg, parentColors.text)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const ModuleMenuGroup = ({ module, colors }) => {
    return (
        <div className="flex flex-wrap gap-4 mb-4 last:mb-0">
            {module.menus.map((menu, idx) => (
                <MenuItemBox 
                    key={idx} 
                    menu={menu} 
                    parentColors={colors}
                />
            ))}
        </div>
    );
};

const RoleTable = ({ roleData, isLoading, onDataChange }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [roleTableData, setRoleTableData] = useState([]);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [editedRoleName, setEditedRoleName] = useState('');
    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    });


    

    const moduleColorMap = new Map();

    useEffect(() => {
        const transformedData = roleData.map(item => ({
            id: item.role_details.id,
            name: item.role_details.name,
            moduleAccess: item.modules
        }));
        setRoleTableData(transformedData);
    }, [roleData]);

    const handleEditConfirm = async () => {
        if (itemToEdit?.id && editedRoleName.trim()) {
            try {
                const result = await dispatch(updateRole({
                    id: itemToEdit.id,
                    name: editedRoleName.trim() 
                })).unwrap();
                console.log(result)
                if (result) {
                    onDataChange();
                    showSuccessNotification('Role updated successfully');
                }
            } catch (error) {
                console.error(error);
                showErrorNotification('Failed to update role');
            } finally {
                handleDialogClose();
            }
        } else {
            showErrorNotification('Please enter a valid role name');
        }
    };

    const handleDialogClose = () => {
        setEditDialogIsOpen(false);
        setItemToEdit(null);
        setEditedRoleName('');
    };

    const openEditDialog = async (role) => {
        try {
            console.log(role)
            const response = await dispatch(fetchRoleById(role.id)).unwrap();
            if (response) {
                setItemToEdit(response);
                setEditedRoleName(response.name);
                setEditDialogIsOpen(true);
            }
        } catch (error) {
            // showErrorNotification('Failed to fetch role details');
            console.log(error)
        }
    };

    const showSuccessNotification = (message) => {
        toast.push(
            <Notification title="Success" type="success">
                {message}
            </Notification>
        );
    };

    const openDeleteDialog = (role) => {
        setItemToDelete(role);
        setDeleteDialogIsOpen(true);
    };

    const handleDeleteDialogClose = () => {
        setDeleteDialogIsOpen(false);
        setItemToDelete(null);
    };

    const handleDeleteConfirm = async () => {
        // console.log(itemToDelete)
        if (itemToDelete?.id) {
            try {
                const result = await dispatch(deleteRole(itemToDelete.id))
                
                if (result) {
                    onDataChange();
                    showSuccessNotification('Role deleted successfully');
                }
            } catch (error) {
                console.error(error);
                // showErrorNotification('Failed to delete role');
            } finally {
                handleDeleteDialogClose();
            }
        }
    };

    const columns = useMemo(
        () => [
            {
                header: 'Role Name',
                accessorKey: 'name',
                cell: (props) => (
                    <div className="w-36 font-semibold text-gray-700">
                        {props.getValue()}
                    </div>
                ),
            },
            {
                header: 'Module Access',
                id: 'moduleAccess',
                cell: ({ row }) => (
                    <div className="flex flex-wrap gap-2">
                        {row.original.moduleAccess.map((module, idx) => {
                            const colors = getModuleColor(module.name, moduleColorMap);
                            return (
                                <ModuleBox 
                                    key={idx} 
                                    module={module} 
                                    colors={colors}
                                />
                            );
                        })}
                    </div>
                ),
            },
            {
                header: 'Menu Access',
                id: 'menuAccess',
                cell: ({ row }) => (
                    <div className="flex flex-col">
                        {row.original.moduleAccess.map((module, idx) => {
                            const colors = getModuleColor(module.name, moduleColorMap);
                            return (
                                <ModuleMenuGroup 
                                    key={idx} 
                                    module={module} 
                                    colors={colors}
                                />
                            );
                        })}
                    </div>
                ),
            },
            {
                header: 'Actions',
                id: 'actions',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2">
                        <Tooltip title="Edit Role">
                            <Button
                                size="sm"
                                onClick={() => openEditDialog(row.original)}
                                icon={<MdEdit className="h-5 w-5" />}
                                className="text-blue-600"
                            />
                        </Tooltip>
                        <Tooltip title="Modify Access">
                            <Button
                                size="sm"
                                onClick={() => handleModifyAccess(row.original)}
                                icon={<RiShieldKeyholeLine className="h-5 w-5" />}
                                className="text-purple-600 "
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button
                                size="sm"
                                onClick={() => openDeleteDialog(row.original)}
                                icon={<FiTrash className="h-5 w-5" />}
                                className="text-red-600 "
                            />
                        </Tooltip>
                    </div>
                ),
            },
        ],
        []
    );

    const handleModifyAccess = async (role) => {
        try {
            const response = await dispatch(fetchRoleById(role.id)).unwrap();
            if (response) {
                navigate('/role-permission', { state: { roleData: response } });
            }
        } catch (error) {
            showErrorNotification('Failed to fetch role details');
        }
    };

    const onPaginationChange = (page) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
        onDataChange(page, tableData.pageSize);
    };

    const onSelectChange = (value) => {
        const newPageSize = Number(value);
        setTableData(prev => ({
            ...prev,
            pageSize: newPageSize,
            pageIndex: 1,
        }));
        onDataChange(1, newPageSize);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-gray-500 rounded-xl">
                <div className="w-28 h-28">
                    <Lottie 
                        animationData={loadingAnimation} 
                        loop 
                        className="w-24 h-24"
                    />
                </div>
                <p className="text-lg font-semibold">Loading Data...</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {roleTableData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
                    <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="text-center">No Roles Available</p>
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={roleTableData}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ className: 'rounded-md' }}
                    loading={isLoading}
                    pagingData={{
                        total: tableData.total,
                        pageIndex: tableData.pageIndex,
                        pageSize: tableData.pageSize,
                    }}
                    onPaginationChange={onPaginationChange}
                    onSelectChange={onSelectChange}
                    stickyHeader={true}
                />
            )}

            <Dialog
                isOpen={editDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Edit Role Name</h5>
                <div className="mb-4">
                    <OutlinedInput
                        label="Role Name"
                        value={editedRoleName}
                        onChange={(value) => setEditedRoleName(value)}
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
                    <Button 
                        variant="solid" 
                        onClick={handleEditConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </Dialog>
            <Dialog
                isOpen={deleteDialogIsOpen}
                onClose={handleDeleteDialogClose}
                onRequestClose={handleDeleteDialogClose}
            >
                <h5 className="mb-4">Delete Role</h5>
                <div className="mb-4">
                    <p>Are you sure you want to delete the role "{itemToDelete?.name}"?</p>
                    {/* <p className="text-red-500 mt-2">This action cannot be undone.</p> */}
                </div>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDeleteDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="solid"
                        // color="red"
                        onClick={handleDeleteConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </Dialog>
        </div>
    );
};

export default RoleTable;