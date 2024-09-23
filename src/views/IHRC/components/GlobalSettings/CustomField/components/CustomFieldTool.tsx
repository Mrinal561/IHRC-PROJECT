import React, { useState } from 'react';
import { Button, Dialog } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { AdaptableCard } from '@/components/shared';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { useNavigate } from 'react-router-dom';

const CustomFieldTool = () => {
  const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  const moduleOptions = [
    { value: 'branch', label: 'Branch' },
    { value: 'employee', label: 'Employee' },
    { value: 'customer', label: 'Customer' },
  ];

  const handleAddModule = () => {
    setIsModuleDialogOpen(true);
  };

  const handleModuleSelect = (value) => {
    setSelectedModule(value);
  };

  const handleModuleConfirm = () => {
    if (selectedModule) {
      setModules([...modules, selectedModule]);
      setIsModuleDialogOpen(false);
      setSelectedModule(null);
    }
  };

  const handleOpenModule = (module) => {
    navigate(`/custom-fields/${module.value}`, { state: { moduleLabel: module.label } });
  };

  return (
    <>
      <Button
        size="sm"
        icon={<HiPlusCircle />}
        onClick={handleAddModule}
        variant="solid"
      >
        Add Module
      </Button>

      <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <AdaptableCard key={module.value} className="p-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold">{module.label}</h4>
              <Button
                size="sm"
                variant="solid"
                onClick={() => handleOpenModule(module)}
              >
                Open
              </Button>
            </div>
          </AdaptableCard>
        ))}
      </div>

      <Dialog
        isOpen={isModuleDialogOpen}
        onClose={() => setIsModuleDialogOpen(false)}
      >
        <h5 className="mb-4">Choose Module</h5>
        <OutlinedSelect
          label="Module"
          options={moduleOptions}
          value={selectedModule}
          onChange={handleModuleSelect}
        />
        <div className="mt-4 text-right">
          <Button
            className="mr-2"
            variant="plain"
            onClick={() => setIsModuleDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleModuleConfirm}>
            Confirm
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default CustomFieldTool;