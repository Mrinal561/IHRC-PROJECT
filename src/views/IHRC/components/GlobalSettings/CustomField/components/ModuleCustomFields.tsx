import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dialog, Input, toast, Tooltip, Notification } from '@/components/ui';
import { AdaptableCard } from '@/components/shared';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { DataTable } from '@/components/shared';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import OutlinedInput from '@/components/ui/OutlinedInput';



const dummyData = [
    { id: 1, name: 'Remark', type: 'Text' },
    { id: 2, name: 'Mobile', type: 'Number' },
    { id: 3, name: 'Email', type: 'Text' },
  ];



const ModuleCustomFields = () => {
    const { moduleValue } = useParams();
    const location = useLocation();
    const { moduleLabel } = location.state || {};
    const navigate = useNavigate();

  const [isFieldDialogOpen, setIsFieldDialogOpen] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState(null);
  const [fields, setFields] = useState(dummyData);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingField, setEditingField] = useState(null);


  useEffect(() => {
    console.log('ModuleCustomFields rendered')
    console.log('moduleValue:', moduleValue)
    console.log('moduleLabel:', moduleLabel)
}, [moduleValue, moduleLabel])

  const fieldTypeOptions = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'select', label: 'Select' }
  ];

  const columns = [
    {
      header: 'Field Name',
      accessorKey: 'name',
    },
    {
      header: 'Field Type',
      accessorKey: 'type',
    },
    {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Tooltip title="Edit">
                    <Button
                        size="sm"
                        onClick={() => handleEdit(row.original)}
                        icon={<MdEdit />}
                    />
                </Tooltip>
                <Tooltip title="Delete">
                    <Button
                        size="sm"
                        onClick={() => handleDelete(row.original.id)}
                        icon={<FiTrash />}
                        className="text-red-500"
                    />
                </Tooltip>
            </div>
        ),
    },
  ];

  const handleEdit = (field) => {
    setEditingField(field);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    setFields(fields.filter(field => field.id !== id));
    openNotification('success', 'Custom Brach field deleted successfully');

  };

  const handleEditConfirm = () => {
    setFields(fields.map(field => 
      field.id === editingField.id ? editingField : field
    ));
    setIsEditDialogOpen(false);
    setEditingField(null);
    openNotification('success', 'Custom Brach field edited successfully');

  };


  const handleAddField = () => {
    setIsFieldDialogOpen(true);
  };

  const handleFieldConfirm = () => {
    if (fieldName && fieldType) {
      const newField = { name: fieldName, type: fieldType.label };
      setFields([...fields, newField]);
      setIsFieldDialogOpen(false);
      setFieldName('');
      setFieldType(null);
    }
  };


  
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

const handleFieldNameChange = (value: string) => {
    setFieldName(value);
};

const handleEditFieldNameChange = (value: string) => {
    if (editingField) {
        setEditingField({...editingField, name: value});
    }
};


  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex justify-between items-center mb-4">
        <div className='flex gap-3'>
      <Button
          variant="plain"
          size="sm"
          icon={<HiArrowLeft />}
          onClick={() => navigate(-1)}
          className="mb-4"
          >
        </Button>
      <h3 className="text-2xl font-bold">{moduleLabel || moduleValue} Custom Fields</h3>
              </div>
      <Button
          size="sm"
          variant="solid"
          icon={<HiPlusCircle />}
          onClick={handleAddField}
        >
          Add Custom Field
        </Button>
      </div>

      <DataTable columns={columns} data={fields} />

      <Dialog
        isOpen={isFieldDialogOpen}
        onClose={() => setIsFieldDialogOpen(false)}
      >
        <h5 className="mb-4">Add Custom Field</h5>
        <div className='flex flex-col gap-4'>

        <div className='flex flex-col gap-4'>
            <label>Enter the Field Name</label>
        <OutlinedInput
          label="Enter field name"
          value={fieldName}
          onChange={handleFieldNameChange}
          />
          </div>
          <div className='flex flex-col gap-4'>
            <label>Select Field Type</label>
        <OutlinedSelect
          label="Field Type"
          options={fieldTypeOptions}
          value={fieldType}
          onChange={setFieldType}
          />
          </div>
          </div>
        <div className="mt-4 text-right">
          <Button
            className="mr-2"
            variant="plain"
            onClick={() => setIsFieldDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleFieldConfirm}>
            Confirm
          </Button>
        </div>
      </Dialog>

      <Dialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
        <div className='flex flex-col gap-2'>

        <h5 className="mb-4">Edit Custom Field</h5>
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
                <label>Enter Field Name</label>
        <OutlinedInput
          label="Field name"
          value={editingField?.name || ''}
          onChange={handleEditFieldNameChange}
          />
          </div>
          <div className='flex flex-col gap-4'>
            <label>Select Field Type</label>
        <OutlinedSelect
          label="Field Type"
          options={fieldTypeOptions}
          value={fieldType}
          onChange={setFieldType}
          />
          </div>
          </div>
          </div>


        <div className="mt-6 text-right">
          <Button
            className="mr-2"
            variant="plain"
            onClick={() => setIsEditDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleEditConfirm}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </AdaptableCard>
  );
};

export default ModuleCustomFields;