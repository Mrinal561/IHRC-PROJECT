
// import React, { useMemo, useState } from 'react';
// import { Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
// import { FiTrash } from 'react-icons/fi';
// import { MdEdit } from 'react-icons/md';
// import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
// import DataTable, { ColumnDef } from '@/components/shared/DataTable';
// import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

// const LocationTable: React.FC = () => {
//     const [dialogIsOpen, setDialogIsOpen] = useState(false);
//     const [itemToDelete, setItemToDelete] = useState<number | null>(null);
//     const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
//     const [itemToEdit, setItemToEdit] = useState<number | null>(null);
//     const [editedName, setEditedName] = useState('');
//     const [data, setData] = useState(entityDataSet);

//     const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
//         toast.push(
//             <Notification
//                 title={type.charAt(0).toUpperCase() + type.slice(1)}
//                 type={type}
//             >
//                 {message}
//             </Notification>
//         );
//     };

//     const columns: ColumnDef<EntityData>[] = useMemo(
//         () => [
//             {
//                 header: 'Company Group Name',
//                 accessorKey: 'Company_Group_Name',
//                 cell: (props) => (
//                     <div className="w-48 truncate">{props.getValue() as string}</div>
//                 ),
//             },
//             {
//                 header: 'Company Name',
//                 accessorKey: 'Company_Name',
//                 cell: (props) => (
//                     <div className="w-48 truncate">{props.getValue() as string}</div>
//                 ),
//             },
//             {
//                 header: 'State',
//                 accessorKey: 'State',
//                 cell: (props) => (
//                     <div className="w-36 truncate">{props.getValue() as string}</div>
//                 ),
//             },
//             {
//                 header: 'District',
//                 accessorKey: 'District',
//                 cell: (props) => (
//                     <div className="w-36 truncate">{props.getValue() as string}</div>
//                 ),
//             },
//             {
//                 header: 'Location',
//                 accessorKey: 'Location',
//                 cell: (props) => (
//                     <div className="w-36 truncate">{props.getValue() as string}</div>
//                 ),
//             },
//             {
//                 header: 'Actions',
//                 id: 'actions',
//                 cell: ({ row }) => (
//                     <div className="flex items-center gap-2">
//                         <Tooltip title="Edit">
//                             <Button
//                                 size="sm"
//                                 onClick={() => openEditDialog(row.index)}
//                                 icon={<MdEdit />}
//                                 className="text-blue-500"
//                             />
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                             <Button
//                                 size="sm"
//                                 onClick={() => openDeleteDialog(row.index)}
//                                 icon={<FiTrash />}
//                                 className="text-red-500"
//                             />
//                         </Tooltip>
//                     </div>
//                 ),
//             },
//         ],
//         []
//     );

//     const openDeleteDialog = (index: number) => {
//         setItemToDelete(index);
//         setDialogIsOpen(true);
//     };

//     const openEditDialog = (index: number) => {
//         setItemToEdit(index);
//         setEditedName(data[index].Location || '');
//         setEditDialogIsOpen(true);
//     };

//     const handleDialogClose = () => {
//         setDialogIsOpen(false);
//         setEditDialogIsOpen(false);
//         setItemToDelete(null);
//         setItemToEdit(null);
//         setEditedName('');
//     };

//     const handleDialogOk = () => {
//         if (itemToDelete !== null) {
//             const newData = [...data];
//             newData.splice(itemToDelete, 1);
//             setData(newData);
//             setDialogIsOpen(false);
//             setItemToDelete(null);
//             openNotification('danger', 'Location deleted successfully');
//         }
//     };

//     const handleEditConfirm = () => {
//         if (itemToEdit !== null && editedName.trim()) {
//             const newData = [...data];
//             newData[itemToEdit].Location = editedName.trim();
//             setData(newData);
//             setEditDialogIsOpen(false);
//             setItemToEdit(null);
//             setEditedName('');
//             openNotification('success', 'Location updated successfully');
//         }
//     };

//     const [tableData, setTableData] = useState({
//         total: data.length,
//         pageIndex: 1,
//         pageSize: 5,
//         query: '',
//         sort: { order: '', key: '' },
//     });

//     const onPaginationChange = (page: number) => {
//         setTableData(prev => ({ ...prev, pageIndex: page }));
//     };

//     const onSelectChange = (value: number) => {
//         setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
//     };

//     return (
//         <div className="relative">
//             {data.length === 0 ? (
//                 <div className="text-center py-8 text-gray-500">No data available</div>
//             ) : (
//                 <DataTable
//                     columns={columns}
//                     data={data}
//                     skeletonAvatarColumns={[0]}
//                     skeletonAvatarProps={{ className: 'rounded-md' }}
//                     loading={false}
//                     pagingData={{
//                         total: data.length,
//                         pageIndex: tableData.pageIndex,
//                         pageSize: tableData.pageSize,
//                     }}
//                     stickyHeader={true}
//                     stickyFirstColumn={true}
//                     stickyLastColumn={true}
//                 />
//             )}

//             <Dialog
//                 isOpen={dialogIsOpen}
//                 onClose={handleDialogClose}
//                 onRequestClose={handleDialogClose}
//             >
//                 <h5 className="mb-4">Confirm Deleting Location</h5>
//                 <p>
//                     Are you sure you want to delete this location? This action cannot be undone.
//                 </p>
//                 <div className="text-right mt-6">
//                     <Button
//                         className="ltr:mr-2 rtl:ml-2"
//                         variant="plain"
//                         onClick={handleDialogClose}
//                     >
//                         Cancel
//                     </Button>
//                     <Button variant="solid" onClick={handleDialogOk}>
//                         Delete
//                     </Button>
//                 </div>
//             </Dialog>

//             <Dialog
//                 isOpen={editDialogIsOpen}
//                 onClose={handleDialogClose}
//                 onRequestClose={handleDialogClose}
//             >
//                 <h5 className="mb-4">Edit Location</h5>
//                 <div className="mb-4">
//                     <OutlinedInput
//                         label="Location"
//                         value={editedName}
//                         onChange={(value: string) => setEditedName(value)}
//                     />
//                 </div>
//                 <div className="text-right mt-6">
//                     <Button
//                         className="ltr:mr-2 rtl:ml-2"
//                         variant="plain"
//                         onClick={handleDialogClose}
//                     >
//                         Cancel
//                     </Button>
//                     <Button variant="solid" onClick={handleEditConfirm}>
//                         Confirm
//                     </Button>
//                 </div>
//             </Dialog>
//         </div>
//     );
// };

// export default LocationTable;

import React, { useMemo, useState, useEffect } from 'react';
import { Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';

interface SelectOption {
    value: string;
    label: string;
}

const LocationTable: React.FC = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [editedLocation, setEditedLocation] = useState('');
    const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
    const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(null);
    const [data, setData] = useState(entityDataSet);
    const [companyGroupOptions, setCompanyGroupOptions] = useState<SelectOption[]>([]);
    const [companyOptions, setCompanyOptions] = useState<SelectOption[]>([]);
    const [stateOptions, setStateOptions] = useState<SelectOption[]>([]);
    const [districtOptions, setDistrictOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        // Generate unique options for all fields
        const uniqueCompanyGroups = Array.from(new Set(data.map(item => item.Company_Group_Name).filter(Boolean)));
        const uniqueStates = Array.from(new Set(data.map(item => item.State).filter(Boolean)));

        setCompanyGroupOptions(uniqueCompanyGroups.map(group => ({ value: group!, label: group! })));
        setStateOptions(uniqueStates.map(state => ({ value: state!, label: state! })));
    }, [data]);

    const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                {message}
            </Notification>
        );
    };

    const columns: ColumnDef<EntityData>[] = useMemo(
        () => [
            {
                header: 'Company Group Name',
                accessorKey: 'Company_Group_Name',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Company Name',
                accessorKey: 'Company_Name',
                cell: (props) => (
                    <div className="w-48 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'State',
                accessorKey: 'State',
                cell: (props) => (
                    <div className="w-36 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'District',
                accessorKey: 'District',
                cell: (props) => (
                    <div className="w-36 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Location',
                accessorKey: 'Location',
                cell: (props) => (
                    <div className="w-36 truncate">{props.getValue() as string}</div>
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
        const item = data[index];
        setEditedLocation(item.Location || '');
        setSelectedCompanyGroup(item.Company_Group_Name ? { value: item.Company_Group_Name, label: item.Company_Group_Name } : null);
        setSelectedCompany(item.Company_Name ? { value: item.Company_Name, label: item.Company_Name } : null);
        setSelectedState(item.State ? { value: item.State, label: item.State } : null);
        setSelectedDistrict(item.District ? { value: item.District, label: item.District } : null);
        updateCompanyOptions(item.Company_Group_Name);
        updateDistrictOptions(item.State);
        setEditDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
        setEditDialogIsOpen(false);
        setItemToDelete(null);
        setItemToEdit(null);
        setEditedLocation('');
        setSelectedCompanyGroup(null);
        setSelectedCompany(null);
        setSelectedState(null);
        setSelectedDistrict(null);
    };

    const handleDialogOk = () => {
        if (itemToDelete !== null) {
            const newData = [...data];
            newData.splice(itemToDelete, 1);
            setData(newData);
            setDialogIsOpen(false);
            setItemToDelete(null);
            openNotification('danger', 'Location deleted successfully');
        }
    };

    const handleEditConfirm = () => {
        if (itemToEdit !== null && editedLocation.trim() && selectedCompanyGroup && selectedCompany && selectedState && selectedDistrict) {
            const newData = [...data];
            newData[itemToEdit] = {
                ...newData[itemToEdit],
                Company_Group_Name: selectedCompanyGroup.value,
                Company_Name: selectedCompany.value,
                State: selectedState.value,
                District: selectedDistrict.value,
                Location: editedLocation.trim()
            };
            setData(newData);
            setEditDialogIsOpen(false);
            setItemToEdit(null);
            setEditedLocation('');
            setSelectedCompanyGroup(null);
            setSelectedCompany(null);
            setSelectedState(null);
            setSelectedDistrict(null);
            openNotification('success', 'Location updated successfully');
        } else {
            openNotification('danger', 'Please fill in all fields before confirming.');
        }
    };

    const updateCompanyOptions = (companyGroup: string | undefined) => {
        if (companyGroup) {
            const companiesForGroup = data
                .filter(item => item.Company_Group_Name === companyGroup)
                .map(item => item.Company_Name)
                .filter((value, index, self) => value && self.indexOf(value) === index);
            setCompanyOptions(companiesForGroup.map(company => ({ value: company!, label: company! })));
        } else {
            setCompanyOptions([]);
        }
    };

    const updateDistrictOptions = (state: string | undefined) => {
        if (state) {
            const districtsForState = data
                .filter(item => item.State === state)
                .map(item => item.District)
                .filter((value, index, self) => value && self.indexOf(value) === index);
            setDistrictOptions(districtsForState.map(district => ({ value: district!, label: district! })));
        } else {
            setDistrictOptions([]);
        }
    };

    const handleCompanyGroupChange = (option: SelectOption | null) => {
        setSelectedCompanyGroup(option);
        setSelectedCompany(null);
        updateCompanyOptions(option?.value);
    };

    const handleStateChange = (option: SelectOption | null) => {
        setSelectedState(option);
        setSelectedDistrict(null);
        updateDistrictOptions(option?.value);
    };

    const [tableData, setTableData] = useState({
        total: data.length,
        pageIndex: 1,
        pageSize: 5,
        query: '',
        sort: { order: '', key: '' },
    });

    const onPaginationChange = (page: number) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
    };

    const onSelectChange = (value: number) => {
        setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
    };

    return (
        <div className="relative">
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No data available</div>
            ) : (
                <DataTable
                    columns={columns}
                    data={data}
                    skeletonAvatarColumns={[0]}
                    skeletonAvatarProps={{ className: 'rounded-md' }}
                    loading={false}
                    pagingData={{
                        total: data.length,
                        pageIndex: tableData.pageIndex,
                        pageSize: tableData.pageSize,
                    }}
                    stickyHeader={true}
                    stickyFirstColumn={true}
                    stickyLastColumn={true}
                />
            )}

            <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deleting Location</h5>
                <p>
                    Are you sure you want to delete this location? This action cannot be undone.
                </p>
                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={handleDialogClose}
                    >
                        Cancel
                    </Button>
                    <Button variant="solid" onClick={handleDialogOk}>
                        Delete
                    </Button>
                </div>
            </Dialog>

            <Dialog
                isOpen={editDialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Edit Location</h5>
                <div className="mb-4">
                    <OutlinedSelect
                        label="Company Group Name"
                        options={companyGroupOptions}
                        value={selectedCompanyGroup}
                        onChange={handleCompanyGroupChange}
                    />
                </div>
                <div className="mb-4">
                    <OutlinedSelect
                        label="Company Name"
                        options={companyOptions}
                        value={selectedCompany}
                        onChange={(option: SelectOption | null) => setSelectedCompany(option)}
                        
                    />
                </div>
                <div className="mb-4">
                    <OutlinedSelect
                        label="State"
                        options={stateOptions}
                        value={selectedState}
                        onChange={handleStateChange}
                    />
                </div>
                <div className="mb-4">
                    <OutlinedSelect
                        label="District"
                        options={districtOptions}
                        value={selectedDistrict}
                        onChange={(option: SelectOption | null) => setSelectedDistrict(option)}
                        
                    />
                </div>
                <div className="mb-4">
                    <OutlinedInput
                        label="Location"
                        value={editedLocation}
                        onChange={(value: string) => setEditedLocation(value)}
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

export default LocationTable;