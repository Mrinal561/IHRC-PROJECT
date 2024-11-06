import React, { useState } from 'react';
import { Button, Card, Dialog } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import { AdaptableCard } from '@/components/shared';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@/constants/route.constant';

const CustomField = () => {

    const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [modules, setModules] = useState([{ value: 'branch', label: 'Branch' }]);
  const navigate = useNavigate();

  const moduleOptions = [
    { value: 'branch', label: 'Branch' },
  ];

  const handleAddModule = () => {
    setIsModuleDialogOpen(true);
  };

  const handleModuleSelect = (value) => {
    setSelectedModule(value);
  };

  const handleModuleConfirm = () => {
    if (selectedModule && !modules.some(module => module.value === selectedModule.value)) {
        setModules([...modules, selectedModule]);
        setIsModuleDialogOpen(false);
        setSelectedModule(null);
    }
};

  const handleOpenModule = (module) => {
    const fullPath = `${APP_PREFIX_PATH}/custom-fields/${module.value}`
    console.log('Navigating to:', fullPath)
    navigate(fullPath, { state: { moduleLabel: module.label } })
}


  return (
    <div className="">
        <div className='mb-6 flex justify-between items-center'>

     <h3 className="text-2xl font-bold">Custom Fields</h3>
        
    <Button
      size="sm"
      icon={<HiPlusCircle />}
      onClick={handleAddModule}
      variant="solid"
      >
      Add Module
    </Button>
        </div>

    <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {modules.map((module) => (
        <Card bordered className='shadow-lg' key={module.value}>   
              <div className='flex flex-col gap-4 py-6 px-2'>
                  <h4 className='text-center'>{module.label} Module</h4>

                  <div className="flex space-x-4 justify-center">
                  <Button
                    size="sm"
                    variant="solid"
                    onClick={() => handleOpenModule(module)}
                  >
                    Open
                  </Button>
                  </div>
              </div>
          </Card>
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
  </div>
  )
}

export default CustomField