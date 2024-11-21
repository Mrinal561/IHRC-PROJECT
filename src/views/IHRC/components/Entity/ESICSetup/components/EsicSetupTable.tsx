
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, Tooltip, toast, Notification } from '@/components/ui';
import { FiTrash } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';
import DataTable, { ColumnDef } from '@/components/shared/DataTable';
import ESIEditedData from './ESIEditedData';
import { EsiSetupData } from '@/@types/esiSetup';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { fetchEsiSetup } from '@/store/slices/esiSetup/esiSetupSlice';

interface ESISetupTableProps {
  // Add any props if needed
  data: EsiSetupData[];
  refreshData: () => Promise<void>;

  
}

const ESISetupTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<EsiSetupData | null>(null);
  const [esiSetupData, setEsiSetupData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [esiTableData, setEsiTableData] = useState([]);

  useEffect(() => {
    fetchEsiSetupData(1, 10);
  }, []);
  
  const fetchEsiSetupData = async (page: number, size: number) => {
    const {payload: data} = await dispatch(fetchEsiSetup({page: page, page_size: size}));
    setEsiTableData(data.data)
    console.log(esiTableData);
    
    setTableData((prev) => ({
      ...prev,
      total: data?.paginate_data.totalResult,
      pageIndex: data?.paginate_data.page,
    }))
    // refreshData();
  }
  
  const columns = useMemo(
    () => [
      {
        header: 'Company Group',
        accessorKey: 'CompanyGroup.name',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'Company',
        accessorKey: 'Company.name',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI Code Type',
        accessorKey: 'code_Type',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI Code',
        accessorKey: 'code',
        cell: (props) => (
          <div className="w-36 text-start">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI Code Location',
        accessorKey: 'Location.name',
        cell: (props) => (
          <div className="w-36 truncate">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI User ID',
        accessorKey: 'esi_user',
        cell: (props) => (
          <div className="w-32 flex items-center justify-center">{props.getValue() as string}</div>
        ),
      },
      {
        header: 'ESI User Password',
        accessorKey: 'password',
        cell: (props) => (
          <div className="w-40 flex items-center justify-center">{props.getValue() as string}</div>
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
                // onClick={() => openEditDialog(row.original)}
                icon={<MdEdit />}
                className="text-blue-500"
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                size="sm"
                onClick={() => openDialog(row.index)}
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

  const openDialog = (index: number) => {
    setItemToDelete(index);
    setDialogIsOpen(true);
  };

  // const openEditDialog = (item: ESISetupData) => {
  //   setItemToEdit(item);
  //   setEditDialogIsOpen(true);
  // };

  const handleDialogClose = () => {
    setDialogIsOpen(false);
    setEditDialogIsOpen(false);
    setItemToDelete(null);
    setItemToEdit(null);
  };

  // const handleDialogOk = () => {
  //   if (itemToDelete !== null) {
  //     const newData = [...data];
  //     newData.splice(itemToDelete, 1);
  //     setData(newData);
  //     setDialogIsOpen(false);
  //     setItemToDelete(null);
  //     openNotification('danger', 'ESI Setup deleted successfully');
  //   }
  // };

  // const handleEditConfirm = () => {
  //   const newData = [...data];
  //   const index = newData.findIndex(item => item === itemToEdit);
  //   if (index !== -1) {
  //     setEditDialogIsOpen(false);
  //     setItemToEdit(null);
  //     openNotification('success', 'ESI Setup updated successfully');
  //   }
  // };

  const [tableData, setTableData] = useState({
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: { order: '', key: '' },
  });

  const onPaginationChange = (page: number) => {
    setTableData(prev => ({ ...prev, pageIndex: page }));
    fetchEsiSetupData(page, tableData.pageSize)
  };

  const onSelectChange = (value: number) => {
    setTableData((prev) => ({
      ...prev,
      pageSize: Number(value),
      pageIndex: 1,
  }))
  fetchEsiSetupData(1, value)
  };

  return (
    <div className="w-full">
 
        <DataTable
          columns={columns}
          data={esiTableData}
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
          stickyHeader={true}
          stickyFirstColumn={true}
          stickyLastColumn={true}
        />

      {/* <Dialog
        isOpen={dialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
      >
        <h5 className="mb-4">Confirm Deletion</h5>
        <p>
          Are you sure you want to delete this ESI Setup?
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
      </Dialog> */}

      {/* <Dialog
        isOpen={editDialogIsOpen}
        onClose={handleDialogClose}
        onRequestClose={handleDialogClose}
        width={800}
        height={570}
      >
        <h5 className="mb-4">Edit ESI Setup</h5>
        {itemToEdit && (
          <ESIEditedData
            initialData={itemToEdit}
            onClose={handleDialogClose}
            onSubmit={handleEditConfirm}
          />
        )}
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
  );
};

export default ESISetupTable;