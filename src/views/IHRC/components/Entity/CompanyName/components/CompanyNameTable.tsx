
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, Tooltip, Notification, toast, Dropdown } from '@/components/ui';
import { FiSettings, FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import { RiEyeLine } from 'react-icons/ri';
import OutlinedInput from '@/components/ui/OutlinedInput/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined';
import DataTable, { ColumnDef, OnSortParam } from '@/components/shared/DataTable';
import { APP_PREFIX_PATH } from '@/constants/route.constant';
import { useAppDispatch } from '@/store';
import { deleteCompany, fetchCompanies, updateCompany } from '@/store/slices/company/companySlice';
import ConfigDropdown from './ConfigDropdown';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { showErrorNotification } from '@/components/ui/ErrorMessage';
import loadingAnimation from '@/assets/lotties/system-regular-716-spinner-three-dots-loop-scale.json'
import Lottie from 'lottie-react';
import { HiOutlineViewGrid } from 'react-icons/hi'
import * as yup from 'yup';


interface ValidationErrors {
  name?: string;
}

const companySchema = yup.object().shape({
  name: yup
    .string()
    .required('Company name is required')
    .min(3, 'Company name must be at least 3 characters')
    .max(50, 'Company name must not exceed 50 characters')
    .matches(/^\S.*\S$|^\S$/,'The input must not have leading or trailing spaces')
    .matches(/^[a-zA-Z0-9\s_-]+$/, 'Role name can only contain letters, numbers, spaces, underscores, and hyphens')
});


interface CompanyData {
  id: number;
  name: string;
  company_group_name: string;
  group_id: number;
  CompanyGroup?: {
    name: string;
  };
}

interface CompanyNameTableProps {
  companyData: CompanyData[];
  isLoading: boolean;
  onDataChange: () => void;
}

interface SelectOption {
  value: string;
  label: string;
}

const CompanyNameTable: React.FC<CompanyNameTableProps> = ({
  companyData,
  isLoading,
  onDataChange
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [companyTableData, setCompanyTableData] = useState<CompanyData[]>([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<CompanyData | null>(null);
  const [itemToEdit, setItemToEdit] = useState<CompanyData | null>(null);
  const [editedName, setEditedName] = useState('');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [tableData, setTableData] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  useEffect(() => {
    loadCompanyGroups();
  }, []);

  useEffect(() => {
    fetchCompanyData(1, 10);
  }, []);

  const fetchCompanyData = async (page: number, size: number) => {
    try {
      const { payload: data } = await dispatch(
        fetchCompanies({ page: page, page_size: size })
      );
      
      // Map the data to include company_group_name from CompanyGroup
      const mappedData = data?.data?.map((company: CompanyData) => ({
        ...company,
        company_group_name: company.CompanyGroup?.name || company.company_group_name || 'N/A'
      })) || [];

      setCompanyTableData(mappedData);
      setTableData((prev) => ({
        ...prev,
        total: data?.paginate_data.totalResult,
        pageIndex: data?.paginate_data.page,
      }));
    } catch (error) {
      console.error('Failed to fetch company data:', error);
      showNotification('danger', 'Failed to fetch company data');
    }
  };

  const loadCompanyGroups = async () => {
    try {
      const { data } = await httpClient.get(endpoints.companyGroup.getAll(), {
        params: { ignorePlatform: true },
      });
      setCompanyGroups(
        data.data.map((v: any) => ({
          label: v.name,
          value: String(v.id),
        }))
      );
    } catch (error) {
      console.error('Failed to load company groups:', error);
      showNotification('danger', 'Failed to load company groups');
    }
  };

  const columns = useMemo<ColumnDef<CompanyData>[]>(
    () => [
      // {
      //   header: 'Company Group',
      //   accessorKey: 'company_group_name',
      //   cell: (props) => (
      //     <div className="w-96 truncate">{props.getValue() as string}</div>
      //   ),
      // },
      {
        header: 'Company',
        enableSorting: false,
        accessorKey: 'name',
        cell: (props) => (
          <div className="w-96 truncate">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {/* <Tooltip title="View Company Details">
              <Button
                size="sm"
                onClick={() => handleViewDetails(row.original)}
                icon={<RiEyeLine />}
                className="text-blue-500"
              />
            </Tooltip> */}
            <Tooltip title="Edit Company">
              <Button
                size="sm"
                onClick={() => openEditDialog(row.original)}
                icon={<MdEdit />}
                className="text-blue-500"
              />
            </Tooltip>
            <Tooltip title="Delete Company">
              <Button
                size="sm"
                onClick={() => openDeleteDialog(row.original)}
                icon={<FiTrash />}
                className="text-red-500"
              />
            </Tooltip>
            <ConfigDropdown
              companyName={row.original.name} 
              companyGroupName={row.original.company_group_name}
              companyId={row.original.id}
              groupId={row.original.group_id}
            />
          </div>
        ),
      },
    ],
    []
  );

  const handleViewDetails = (company: CompanyData) => {
    const urlSafeCompanyName = encodeURIComponent(company.name.replace(/\s+/g, '-').toLowerCase());
    navigate(`${APP_PREFIX_PATH}/IHRC/company-details/${urlSafeCompanyName}`, {
      state: { 
        companyName: company.name, 
        companyGroupName: company.company_group_name 
      }
    });
  };

  const handleSetupClick = (setupType: string, companyName: string, companyGroupName: string) => {
    const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
    navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, {
      state: { companyName, companyGroupName }
    });
  };

  const openDeleteDialog = (company: CompanyData) => {
    setItemToDelete(company);
    setDialogIsOpen(true);
  };

  const openEditDialog = (company: CompanyData) => {
    setItemToEdit(company);
    setEditedName(company.name);
    setSelectedCompanyGroup({
      label: company.company_group_name,
      value: String(company.group_id)
    });
    setEditDialogIsOpen(true);
  };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    setEditDialogIsOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);
    setEditedName('');
    setSelectedCompanyGroup(null);
    setErrors({}); 
  };

  const showNotification = (type: 'success' | 'danger', message: string) => {
    toast.push(
      <Notification title={type === 'success' ? 'Success' : 'Error'} type={type}>
        {message}
      </Notification>
    );
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete?.id) {
      try {
        const res = await dispatch(deleteCompany(itemToDelete.id))
        .unwrap()
        .catch((error: any) => {
          // Handle different error formats
          if (error.response?.data?.message) {
              // API error response
              console.log('inside error')
              showErrorNotification(error.response.data.message);
          } else if (error.message) {
              // Regular error object
              showErrorNotification(error.message);
          } else if (Array.isArray(error)) {
              // Array of error messages
              showErrorNotification(error);
          } else {
              // Fallback error message
              showErrorNotification(error);
          }
          throw error; // Re-throw to prevent navigation
      });
      handleDialogClose();
      if(res){
        showNotification('success', 'Company deleted successfully');
      }
        
        // Recalculate the current page after deletion
        const newTotal = tableData.total - 1;
        const lastPage = Math.ceil(newTotal / tableData.pageSize);
        const newPageIndex = tableData.pageIndex > lastPage ? lastPage : tableData.pageIndex;
        
        // Fetch data for the correct page
        await fetchCompanyData(newPageIndex, tableData.pageSize);
        onDataChange(); // Notify parent component
      } catch (error) {
        // showNotification('danger', 'Failed to delete company');
      }
      
    }
  };

  const validateForm = async () => {
    try {
        await companySchema.validate({ name: editedName }, { abortEarly: false });
        setErrors({});
        return true;
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            const validationErrors: ValidationErrors = {};
            err.inner.forEach((error) => {
                if (error.path) {
                    validationErrors[error.path as keyof ValidationErrors] = error.message;
                }
            });
            setErrors(validationErrors);
        }
        return false;
    }
};
  
  const handleEditConfirm = async () => {
    // if (itemToEdit?.id && editedName.trim()) {
      try {
        const isValid = await validateForm();
        if(!isValid) return;
        const groupId = selectedCompanyGroup 
          ? parseInt(selectedCompanyGroup.value)
          : itemToEdit.group_id;

        if (editedName.trim() !== itemToEdit.name || groupId !== itemToEdit.group_id) {
         const response= await dispatch(updateCompany({
            id: itemToEdit.id,
            data: {
              name: editedName.trim(),
              group_id: groupId
            }
          })).catch((error: any) => {
            // Handle different error formats
            if (error.response?.data?.message) {
                // API error response
                showErrorNotification(error.response.data.message);
            } else if (error.message) {
                // Regular error object
                showErrorNotification(error.message);
            } else if (Array.isArray(error)) {
                // Array of error messages
                showErrorNotification(error);
            } else {
                // Fallback error message
                showErrorNotification(error);
            }
            throw error; // Re-throw to prevent navigation
        });

        if(response){

          
          
          onDataChange(); // Notify parent component
          
          // Fetch data for the current page
          await fetchCompanyData(tableData.pageIndex, tableData.pageSize);
          console.log("re rendering the table")
          showNotification('success', 'Company updated successfully');
        }
        }
      } catch (error) {
        console.error(error);
        showNotification('danger', 'Failed to update company');
      }
      handleDialogClose();
    // } else {
    //   showNotification('danger', 'Please fill in all required fields');
    // }
  };

  const onPaginationChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
    fetchCompanyData(page, tableData.pageSize);
  };

  const onSelectChange = (value: number) => {
    setTableData((prev) => ({
      ...prev,
      pageSize: Number(value),
      pageIndex: 1,
    }));
    fetchCompanyData(1, value);
  };

  if (isLoading) {
    console.log("Loading....................");
    
    return (
        <div className="flex flex-col items-center justify-center h-96 text-gray-500  rounded-xl">
            <div className="w-28 h-28">
                <Lottie 
                    animationData={loadingAnimation} 
                    loop 
                    className="w-24 h-24"
                />
            </div>
            <p className="text-lg font-semibold">
                Loading Data...
            </p>

        </div>
    );
}

  return (
    <div className="relative">
       {companyTableData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-500 border rounded-xl">
                <HiOutlineViewGrid className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-center">
        No Data Available
                </p>
      </div>
            ) : (
      <DataTable
        columns={columns}
        data={companyTableData}
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
      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={dialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
        shouldCloseOnOverlayClick={false} 
      >
        <h5 className="mb-4">Confirm Deletion</h5>
        <p>
          Are you sure you want to delete company "{itemToDelete?.name}"? 
          This action cannot be undone.
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

      {/* Edit Dialog */}
      <Dialog
        isOpen={editDialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
      >
        <h5 className="mb-4">Edit Company</h5>
        <div className="flex flex-col gap-5">
          <div>
            <p className='mb-4'>Select Company Group <span className='text-red-500'>*</span></p>
            <OutlinedSelect
              label="Company Group"
              options={companyGroups}
              value={selectedCompanyGroup}
              onChange={(option: SelectOption | null) => setSelectedCompanyGroup(option)}
            />
          </div>
          <div>
          <p className='mb-4'>Enter Company Name <span className='text-red-500'>*</span></p>
            <OutlinedInput
              label="Company Name"
              value={editedName}
              onChange={(value: string) => setEditedName(value)}
            />
             {errors.name && (
              <div className="text-red-500 text-sm mt-1">{errors.name}</div>
            )}
          </div>
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