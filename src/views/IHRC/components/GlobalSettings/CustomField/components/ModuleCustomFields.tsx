import React, { useState } from 'react';
import { Button, Dialog, Input, toast, Tooltip, Notification } from '@/components/ui';
import { AdaptableCard } from '@/components/shared';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { DataTable } from '@/components/shared';
import { HiPlusCircle, HiX } from 'react-icons/hi';
import { MdEdit } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import OutlinedInput from '@/components/ui/OutlinedInput';

const dummyData = [
  { id: 1, name: 'Remark', type: 'Text' },
  { id: 2, name: 'Mobile', type: 'Number' },
  { id: 3, name: 'Email', type: 'Text' },
  { id: 4, name: 'Status', type: 'Select', options: ['Active', 'Inactive'] },

];

const ModuleCustomFields = () => {
  const [isFieldDialogOpen, setIsFieldDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState(null);
  const [selectOptions, setSelectOptions] = useState([]);
  const [newOption, setNewOption] = useState('');
  const [fields, setFields] = useState(dummyData);
  const [editingField, setEditingField] = useState(null);

  const fieldTypeOptions = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'date', label: 'Date' },
    { value: 'select', label: 'Select' }
  ];

  const columns = [
    { header: 'Field Name', accessorKey: 'name' },
    { header: 'Field Type', accessorKey: 'type' },
    {
      header: 'Options',
      accessorKey: 'options',
      cell: ({ row }) => row.original.type === 'Select' ? (row.original.options || []).join(', ') : ''
    },
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Edit">
            <Button size="sm" onClick={() => handleEdit(row.original)} icon={<MdEdit />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button size="sm" onClick={() => handleDelete(row.original.id)} icon={<FiTrash />} className="text-red-500" />
          </Tooltip>
        </div>
      ),
    },
  ];

  const handleAddField = () => {
    setIsEditMode(false);
    setIsFieldDialogOpen(true);
    setFieldName('');
    setFieldType(null);
    setSelectOptions([]);
  };

  const handleFieldConfirm = () => {
    if (fieldName && fieldType) {
      const newField = { 
        id: isEditMode ? editingField.id : Date.now(),
        name: fieldName, 
        type: fieldType.label,
        options: fieldType.value === 'select' ? selectOptions : []
      };
      
      if (isEditMode) {
        setFields(fields.map(field => field.id === editingField.id ? newField : field));
        openNotification('success', 'Custom field updated successfully');
      } else {
        setFields([...fields, newField]);
        openNotification('success', 'Custom field added successfully');
      }
      
      setIsFieldDialogOpen(false);
      setFieldName('');
      setFieldType(null);
      setSelectOptions([]);
      setEditingField(null);
    }
  };

  const handleAddOption = () => {
    if (newOption && !selectOptions.includes(newOption)) {
      setSelectOptions([...selectOptions, newOption]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (option) => {
    setSelectOptions(selectOptions.filter(opt => opt !== option));
  };

  const handleEdit = (field) => {
    setIsEditMode(true);
    setEditingField(field);
    setFieldName(field.name);
    setFieldType(fieldTypeOptions.find(option => option.label === field.type));
    setSelectOptions(field.options || []);
    setIsFieldDialogOpen(true);
  };

  const handleDelete = (id) => {
    setFields(fields.filter(field => field.id !== id));
    openNotification('success', 'Custom field deleted successfully');
  };

  const openNotification = (type, message) => {
    toast.push(
      <Notification title={type.charAt(0).toUpperCase() + type.slice(1)} type={type}>
        {message}
      </Notification>
    );
  };

  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold">Custom Fields</h3>
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
          <div className='flex flex-col gap-3'>
            <label>Enter Field Name</label>
          <OutlinedInput
            label="Field name"
            value={fieldName}
            onChange={(e) => setFieldName(e)}
            />
            </div>

            <div className='flex flex-col gap-3'>
              <label>Select Field Type</label>
          <OutlinedSelect
            label="Field Type"
            options={fieldTypeOptions}
            value={fieldType}
            onChange={setFieldType}
            />
            </div>
          {fieldType && fieldType.value === 'select' && (
            <div className="mt-2 flex flex-col gap-2">
              <label className="mb-2">Add Options</label>
              <div className="flex gap-2">
                <div className='w-96'>
                <OutlinedInput
                  value={newOption}
                  onChange={(e) => setNewOption(e)}
                  label="Enter option"
                  />
                  </div>
                  <div className=''>
                <Button onClick={handleAddOption} size='sm' icon={<HiPlusCircle />} className='w-24'>Add</Button>
                  </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectOptions.map((option, index) => (
                  <div key={index} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                    {option}
                    <Button
                      size="xs"
                      variant="plain"
                      icon={<HiX />}
                      onClick={() => handleRemoveOption(option)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
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
    </AdaptableCard>
  );
};

export default ModuleCustomFields;