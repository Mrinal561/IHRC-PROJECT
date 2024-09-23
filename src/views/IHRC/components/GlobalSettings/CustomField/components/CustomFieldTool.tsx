// import React, { useState } from 'react';
// import { Button, Dialog } from '@/components/ui';
// import { HiPlusCircle } from 'react-icons/hi';
// import { AdaptableCard } from '@/components/shared';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import {DataTable} from '@/components/shared';


// const CustomFieldTool = () => {

//   const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
//   const [selectedModule, setSelectedModule] = useState(null);
//   const [modules, setModules] = useState([]);
//   const [isFieldDialogOpen, setIsFieldDialogOpen] = useState(false);
//   const [currentModule, setCurrentModule] = useState(null);
//   const [fieldName, setFieldName] = useState('');
//   const [fieldType, setFieldType] = useState(null);
//   const [fields, setFields] = useState([]);

//   const moduleOptions = [
//     { value: 'branch', label: 'Branch' }
//   ];

//   const fieldTypeOptions = [
//     { value: 'text', label: 'Text' },
//     { value: 'number', label: 'Number' },
//     { value: 'date', label: 'Date' },
//     { value: 'select', label: 'Select' }
//   ];

//   const columns = [
//     {
//       header: 'Field Name',
//       accessorKey: 'name',
//     },
//     {
//       header: 'Field Type',
//       accessorKey: 'type',
//     },
//   ];

//   const handleAddModule = () => {
//     setIsModuleDialogOpen(true);
//   };

//   const handleModuleSelect = (value) => {
//     setSelectedModule(value);
//   };

//   const handleModuleConfirm = () => {
//     if (selectedModule) {
//       setModules([...modules, selectedModule]);
//       setIsModuleDialogOpen(false);
//       setSelectedModule(null);
//     }
//   };

//   const handleAddField = (module) => {
//     setCurrentModule(module);
//     setIsFieldDialogOpen(true);
//   };

//   const handleFieldConfirm = () => {
//     if (fieldName && fieldType) {
//       const newField = { name: fieldName, type: fieldType.label };
//       setFields([...fields, newField]);
//       setIsFieldDialogOpen(false);
//       setFieldName('');
//       setFieldType(null);
//     }
//   };




//   return (
//     <AdaptableCard className="h-full" bodyClass="h-full">
    
//         <Button
//           size="sm"
//           icon={<HiPlusCircle />}
//           onClick={handleAddModule}
//           variant="solid"
//         >
//           Add Module
//         </Button>

//       {modules.map((module) => (
//         <AdaptableCard key={module.value} className="mb-4">
//           <div className="flex justify-between items-center mb-4">
//             <h4 className="text-lg font-semibold">{module.label}</h4>
//             <Button
//               size="sm"
//               variant="solid"
//               onClick={() => handleAddField(module)}
//             >
//               Add Field
//             </Button>
//           </div>
//           <DataTable columns={columns} data={fields} />
//         </AdaptableCard>
//       ))}

//       <Dialog
//         isOpen={isModuleDialogOpen}
//         onClose={() => setIsModuleDialogOpen(false)}
//       >
//         <h5 className="mb-4">Choose Module</h5>
//         <OutlinedSelect
//           label="Module"
//           options={moduleOptions}
//           value={selectedModule}
//           onChange={handleModuleSelect}
//         />
//         <div className="mt-4 text-right">
//           <Button
//             className="mr-2"
//             variant="plain"
//             onClick={() => setIsModuleDialogOpen(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleModuleConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </Dialog>

//       <Dialog
//         isOpen={isFieldDialogOpen}
//         onClose={() => setIsFieldDialogOpen(false)}
//       >
//         <h5 className="mb-4">Add Field to {currentModule?.label}</h5>
//         <input
//           type="text"
//           className="w-full border rounded p-2 mb-4"
//           placeholder="Enter field name"
//           value={fieldName}
//           onChange={(e) => setFieldName(e.target.value)}
//         />
//         <OutlinedSelect
//           label="Field Type"
//           options={fieldTypeOptions}
//           value={fieldType}
//           onChange={setFieldType}
//         />
//         <div className="mt-4 text-right">
//           <Button
//             className="mr-2"
//             variant="plain"
//             onClick={() => setIsFieldDialogOpen(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="solid" onClick={handleFieldConfirm}>
//             Confirm
//           </Button>
//         </div>
//       </Dialog>
//     </AdaptableCard>
//   )
// }

// export default CustomFieldTool

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