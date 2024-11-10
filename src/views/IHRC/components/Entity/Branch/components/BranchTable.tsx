
import React, { useMemo, useState, useEffect } from 'react';
import { Table, Button, Dialog, Tooltip, Notification, toast } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
import { AppDispatch } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { BranchData } from '@/@types/branch';
import { fetchBranches } from '@/store/slices/branch/branchSlice';

interface SelectOption {
    value: string;
    label: string;
}

const BranchTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<EntityData[]>(entityDataSet);
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    const [editedBranch, setEditedBranch] = useState('');
    const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
    const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
    const [selectedState, setSelectedState] = useState<SelectOption | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<SelectOption | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null);
    const [companyGroupOptions, setCompanyGroupOptions] = useState<SelectOption[]>([]);
    const [companyOptions, setCompanyOptions] = useState<SelectOption[]>([]);
    const [stateOptions, setStateOptions] = useState<SelectOption[]>([]);
    const [districtOptions, setDistrictOptions] = useState<SelectOption[]>([]);
    const [locationOptions, setLocationOptions] = useState<SelectOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);



    const [branchTableData, setBranchTableData] = useState([]);

    

    useEffect(() => {
        // Generate unique options for all fields
        const uniqueCompanyGroups = Array.from(new Set(data.map(item => item.Company_Group_Name).filter(Boolean)));
        const uniqueStates = Array.from(new Set(data.map(item => item.State).filter(Boolean)));

        setCompanyGroupOptions(uniqueCompanyGroups.map(group => ({ value: group!, label: group! })));
        setStateOptions(uniqueStates.map(state => ({ value: state!, label: state! })));
    }, [data]);

    const columns = useMemo(
        () => [
            {
                header: 'Company Group',
                accessorKey: 'CompanyGroup.name',
                cell: (props) => (
                    <div className="w-52 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Company',
                accessorKey: 'Company.name',
                cell: (props) => (
                    <div className="w-52 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'State',
                accessorKey: 'State.name',
                cell: (props) => (
                    <div className="w-52 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'District',
                accessorKey: 'District.name',
                cell: (props) => (
                    <div className="w-52 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Location',
                accessorKey: 'Location.name',
                cell: (props) => (
                    <div className="w-40 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Branch',
                accessorKey: 'name',
                cell: (props) => (
                  <div className="w-40 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Branch Address',
                accessorKey: 'address',
                cell: (props) => (
                  <div className="w-40 truncate">{props.getValue() as string}</div>
                ),
            },
            {
                header: 'Branch Opening Date',
                accessorKey: 'opening_date',
                cell: (props) => (
                  <div className="w-44 ">{props.getValue() as string}</div>
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
                                // onClick={() => openEditDialog(row.index)}
                                icon={<MdEdit />}
                                className="text-blue-500"
                            />
                        </Tooltip>
                        <Tooltip title="Delete">
                            <Button
                                size="sm"
                                // onClick={() => openDeleteDialog(row.index)}
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

    const openNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
        toast.push(
            <Notification
                title={type.charAt(0).toUpperCase() + type.slice(1)}
                type={type}
            >
                {message}
            </Notification>
        )
    }

    // const openDeleteDialog = (index: number) => {
    //     setItemToDelete(index);
    //     setDialogIsOpen(true);
    // };

    // const openEditDialog = (index: number) => {
    //     setItemToEdit(index);
    //     const item = data[index];
    //     setEditedBranch(item.Branch || '');
    //     setSelectedCompanyGroup(item.Company_Group_Name ? { value: item.Company_Group_Name, label: item.Company_Group_Name } : null);
    //     setSelectedCompany(item.Company_Name ? { value: item.Company_Name, label: item.Company_Name } : null);
    //     setSelectedState(item.State ? { value: item.State, label: item.State } : null);
    //     setSelectedDistrict(item.District ? { value: item.District, label: item.District } : null);
    //     setSelectedLocation(item.Location ? { value: item.Location, label: item.Location } : null);
    //     updateCompanyOptions(item.Company_Group_Name);
    //     updateDistrictOptions(item.State);
    //     updateLocationOptions(item.District);
    //     setEditDialogIsOpen(true);
    // };

    // const handleDialogClose = () => {
    //     setDialogIsOpen(false);
    //     setEditDialogIsOpen(false);
    //     setItemToDelete(null);
    //     setItemToEdit(null);
    //     setEditedBranch('');
    //     setSelectedCompanyGroup(null);
    //     setSelectedCompany(null);
    //     setSelectedState(null);
    //     setSelectedDistrict(null);
    //     setSelectedLocation(null);
    // };

    // const handleDialogOk = () => {
    //     if (itemToDelete !== null) {
    //         const newData = [...data];
    //         newData.splice(itemToDelete, 1);
    //         setData(newData);
    //         setDialogIsOpen(false);
    //         setItemToDelete(null);
    //         openNotification('danger', 'Branch deleted successfully');
    //     }
    // };

    // const handleEditConfirm = () => {
    //     if (itemToEdit !== null && editedBranch.trim() && selectedCompanyGroup && selectedCompany && selectedState && selectedDistrict && selectedLocation) {
    //         const newData = [...data];
    //         newData[itemToEdit] = {
    //             ...newData[itemToEdit],
    //             Company_Group_Name: selectedCompanyGroup.value,
    //             Company_Name: selectedCompany.value,
    //             State: selectedState.value,
    //             District: selectedDistrict.value,
    //             Location: selectedLocation.value,
    //             Branch: editedBranch.trim()
    //         };
    //         setData(newData);
    //         setEditDialogIsOpen(false);
    //         setItemToEdit(null);
    //         setEditedBranch('');
    //         setSelectedCompanyGroup(null);
    //         setSelectedCompany(null);
    //         setSelectedState(null);
    //         setSelectedDistrict(null);
    //         setSelectedLocation(null);
    //         openNotification('success', 'Branch updated successfully');
    //     } else {
    //         openNotification('danger', 'Please fill in all fields before confirming.');
    //     }
    // };

    // const updateCompanyOptions = (companyGroup: string | undefined) => {
    //     if (companyGroup) {
    //         const companiesForGroup = data
    //             .filter(item => item.Company_Group_Name === companyGroup)
    //             .map(item => item.Company_Name)
    //             .filter((value, index, self) => value && self.indexOf(value) === index);
    //         setCompanyOptions(companiesForGroup.map(company => ({ value: company!, label: company! })));
    //     } else {
    //         setCompanyOptions([]);
    //     }
    // };

    // const updateDistrictOptions = (state: string | undefined) => {
    //     if (state) {
    //         const districtsForState = data
    //             .filter(item => item.State === state)
    //             .map(item => item.District)
    //             .filter((value, index, self) => value && self.indexOf(value) === index);
    //         setDistrictOptions(districtsForState.map(district => ({ value: district!, label: district! })));
    //     } else {
    //         setDistrictOptions([]);
    //     }
    // };

    // const updateLocationOptions = (district: string | undefined) => {
    //     if (district) {
    //         const locationsForDistrict = data
    //             .filter(item => item.District === district)
    //             .map(item => item.Location)
    //             .filter((value, index, self) => value && self.indexOf(value) === index);
    //         setLocationOptions(locationsForDistrict.map(location => ({ value: location!, label: location! })));
    //     } else {
    //         setLocationOptions([]);
    //     }
    // };

    // const handleCompanyGroupChange = (option: SelectOption | null) => {
    //     setSelectedCompanyGroup(option);
    //     setSelectedCompany(null);
    //     updateCompanyOptions(option?.value);
    // };

    // const handleStateChange = (option: SelectOption | null) => {
    //     setSelectedState(option);
    //     setSelectedDistrict(null);
    //     setSelectedLocation(null);
    //     updateDistrictOptions(option?.value);
    // };

    // const handleDistrictChange = (option: SelectOption | null) => {
    //     setSelectedDistrict(option);
    //     setSelectedLocation(null);
    //     updateLocationOptions(option?.value);
    // };

 
    const fetchBranchData = async (page: number, size: number) => {
        setIsLoading(true);
        try{
        const { payload: data } = await dispatch(fetchBranches({page: page, page_size: size}))
        setBranchTableData(data?.data);
        setTableData((prev) => ({
            ...prev,
            total: data?.paginate_data.totalResult,
            pageIndex: data?.paginate_data.page,
        }))
    }
    catch(error) {
        console.error('Failed to fetch branch:', error);
        toast.push(
          <Notification title="Error" type="danger">
            Failed to fetch Branch
          </Notification>
        );
      } finally {
        setIsLoading(false);
      }
    }

    useEffect(() => {
        fetchBranchData(1, 10)
    }, [])


    const [tableData, setTableData] = useState({
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: { order: '', key: '' },
    });
    
    const onPaginationChange = (page: number) => {
        setTableData(prev => ({ ...prev, pageIndex: page }));
        fetchBranchData(page, tableData.pageSize)

        };
    
    const onSelectChange = (value: number) => {
        setTableData(prev => ({ ...prev, pageSize: Number(value), pageIndex: 1 }));
        fetchBranchData(1, value)

    };

    return (
        <div className="relative">
            {data.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    No data available
                </div>
            ) : (
                <DataTable
                    columns={columns}
                    data={branchTableData}
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
                    stickyFirstColumn={true}
                    stickyLastColumn={true}
                />
            )}

            {/* <Dialog
                isOpen={dialogIsOpen}
                onClose={handleDialogClose}
                onRequestClose={handleDialogClose}
            >
                <h5 className="mb-4">Confirm Deleting Branch</h5>
                <p>
                    Are you sure you want to delete this branch? This action
                    cannot be undone.
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
                <h5 className="mb-4">Edit Branch</h5>
                <div className="mb-4">
                    <OutlinedSelect
                        label="Company Group"
                        options={companyGroupOptions}
                        value={selectedCompanyGroup}
                        onChange={handleCompanyGroupChange}
                    />
                </div>
                <div className="mb-4">
                    <OutlinedSelect
                        label="Company"
                        options={companyOptions}
                        value={selectedCompany}
                        onChange={(option: SelectOption | null) =>
                            setSelectedCompany(option)
                        }
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
                        onChange={handleDistrictChange}
                    />
                </div>
                <div className="mb-4">
                    <OutlinedInput
                        label="Location"
                        value={selectedLocation ? selectedLocation.value : ''}
                        onChange={(value: string) =>
                            setSelectedLocation({ value, label: value })
                        }
                    />
                </div>
                <div className="mb-4">
                    <OutlinedInput
                        label="Branch"
                        value={editedBranch}
                        onChange={(value: string) => setEditedBranch(value)}
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
            </Dialog> */}
        </div>
    )
};

export default BranchTable;