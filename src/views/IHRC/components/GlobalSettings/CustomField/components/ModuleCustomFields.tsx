import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button, Dialog } from '@/components/ui';
import { AdaptableCard } from '@/components/shared';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { DataTable } from '@/components/shared';
import { HiArrowLeft, HiPlusCircle } from 'react-icons/hi';

const ModuleCustomFields = () => {
    const { moduleValue } = useParams();
    const location = useLocation();
    const { moduleLabel } = location.state || {};
    const navigate = useNavigate();

  const [isFieldDialogOpen, setIsFieldDialogOpen] = useState(false);
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState(null);
  const [fields, setFields] = useState([]);


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
  ];

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
        <input
          type="text"
          className="w-full border rounded p-2 mb-4"
          placeholder="Enter field name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
        <OutlinedSelect
          label="Field Type"
          options={fieldTypeOptions}
          value={fieldType}
          onChange={setFieldType}
        />
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