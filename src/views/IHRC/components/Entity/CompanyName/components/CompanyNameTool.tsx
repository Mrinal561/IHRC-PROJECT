// import React, { useState, useMemo, useEffect } from 'react'
// import { Button, Dialog, toast, Notification } from '@/components/ui'
// import { HiPlusCircle } from 'react-icons/hi'
// import OutlinedInput from '@/components/ui/OutlinedInput'
// import OutlinedSelect from '@/components/ui/Outlined/Outlined'
// import { entityDataSet, EntityData } from '../../../../store/dummyEntityData'
// import Filter from './Filter'
// import { endpoints } from '@/api/endpoint'
// import httpClient from '@/api/http-client'
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/store';
// import { createCompany } from '@/store/slices/company/companySlice'

// interface CompanyToolProps{
//     onDataChange: () => void;
// }


// interface SelectOption {
//     value: string
//     label: string
// }
// interface NewCompany {
//   name: string
//   group_id: number
// }

// const CompanyNameTool: React.FC<CompanyToolProps> = ({onDataChange}) => {
//   const dispatch = useDispatch<AppDispatch>();
//     const [dialogIsOpen, setIsOpen] = useState(false)
//     const [companyName, setCompanyName] = useState('')
//     const [selectedCompanyGroup, setSelectedCompanyGroup] =
//         useState<SelectOption | null>(null)
//     const [isSubmitting, setIsSubmitting] = useState(false)
//     const [companyGroups, setCompanyGroups] = useState([])
//     const [newCompany, setNewCompany] = useState<NewCompany>({
//       name:"",
//     group_id: 0
//     })

//     useEffect(() => {
//       setNewCompany(prev => ({
//           ...prev,
//           name: companyName
//       }))
//   }, [companyName])

//   // Update newCompany whenever selected group changes

//   useEffect(() => {
//     loadCompanyGroup()
// }, [])


// useEffect(() => {
//   setNewCompany(prev => ({
//       ...prev,
//       // Convert string to number using parseInt
//       group_id: selectedCompanyGroup?.value ? parseInt(selectedCompanyGroup.value) : 0
//   }))
// }, [selectedCompanyGroup])




    // const loadCompanyGroup = async () => {
    //     try {
    //         const { data } = await httpClient.get(
    //             endpoints.companyGroup.getAll(),
    //             {
    //                 params: { ignorePlatform: true },
    //             },
    //         )
    //         console.log(data)
    //         setCompanyGroups(
    //             data.data.map((v: any) => ({
    //                 label: v.name,
    //                 value: String(v.id),
    //             })),
    //         )
    //     } catch (error) {}
    // }

//     const openDialog = () => {
//         console.log('Opening dialog')
//         setIsOpen(true)
//     }

//     const onDialogClose = () => {
//         console.log('Closing dialog')
//         setIsOpen(false)
//         setCompanyName('')
//         setSelectedCompanyGroup(null)
//         setIsSubmitting(false)
//     }

//     const showNotification = (
//         type: 'success' | 'info' | 'danger' | 'warning',
//         message: string,
//     ) => {
//         toast.push(
//             <Notification
//                 title={type.charAt(0).toUpperCase() + type.slice(1)}
//                 type={type}
//             >
//                 {message}
//             </Notification>,
//         )
//     }

//     const onDialogOk = async () => {
//       try{
//         await dispatch(createCompany(newCompany));
//         toast.push(
//           <Notification title="Success" type="success">
//               Company added successfully
//           </Notification>
//       );
//       onDialogClose();
//       console.log("triggering")
//       onDataChange();
//       } catch(error){
//         toast.push(
//           <Notification title="Failed" type="danger">
//               Failed to add company 
//           </Notification>);
//       }

//     }

//     const handleSelectionChange = (selected: SelectOption | null) => {
//       console.log("Company Group selected:", selected);
//       setSelectedCompanyGroup(selected);
//     };
//     return (
//         <div className="flex gap-3 items-center">
//             <Filter></Filter>
//             <Button
//                 size="sm"
//                 icon={<HiPlusCircle />}
//                 onClick={openDialog}
//                 variant="solid"
//             >
//                 Add Company
//             </Button>
//             <Dialog
//                 isOpen={dialogIsOpen}
//                 onClose={onDialogClose}
//                 onRequestClose={onDialogClose}
//             >
//                 <h5 className="mb-4">Add Company </h5>
//                 <div className="mb-4 flex flex-col gap-3">
//                     <label>Select the company group</label>
//                     <OutlinedSelect
//                         label="Company Group"
//                         options={companyGroups}
//                         value={selectedCompanyGroup}
//                         onChange={handleSelectionChange}
//                     />
//                 </div>
//                 <div className="mb-4 flex flex-col gap-3">
//                     <label>Enter company name</label>
//                     <OutlinedInput
//                         label="Company"
//                         value={companyName}
//                         onChange={(value: string) => {
//                             console.log('Company Name changed:', value)
//                             setCompanyName(value)
//                         }}
//                     />
//                 </div>
//                 <div className="text-right mt-6">
//                     <Button
//                         className="ltr:mr-2 rtl:ml-2"
//                         variant="plain"
//                         onClick={onDialogClose}
//                         disabled={isSubmitting}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="solid"
//                         onClick={onDialogOk}
//                         loading={isSubmitting}
//                     >
//                         {isSubmitting ? 'Adding...' : 'Confirm'}
//                     </Button>
//                 </div>
//             </Dialog>
//         </div>
//     )
// }

// export default CompanyNameTool

import React, { useState, useEffect } from 'react';
import { Button, Dialog, toast, Notification } from '@/components/ui';
import { HiPlusCircle } from 'react-icons/hi';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import Filter from './Filter';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { createCompany } from '@/store/slices/company/companySlice';

interface CompanyToolProps {
  onDataChange: () => void;
}

interface SelectOption {
  value: string;
  label: string;
}

interface NewCompany {
  name: string;
  group_id: number;
}

const CompanyNameTool: React.FC<CompanyToolProps> = ({ onDataChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [companyGroups, setCompanyGroups] = useState([]);
  const [newCompany, setNewCompany] = useState<NewCompany>({
    name: '',
    group_id: 0
  });

  useEffect(() => {
    setNewCompany(prev => ({
      ...prev,
      name: companyName
    }));
  }, [companyName]);

  useEffect(() => {
    loadCompanyGroup();
  }, []);

  useEffect(() => {
    setNewCompany(prev => ({
      ...prev,
      group_id: selectedCompanyGroup?.value ? parseInt(selectedCompanyGroup.value) : 0
    }));
  }, [selectedCompanyGroup]);

  const loadCompanyGroup = async () => {
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
    }
  };

  const onDialogOk = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(createCompany(newCompany));
      toast.push(
        <Notification title="Success" type="success">
          Company added successfully
        </Notification>
      );
      onDialogClose();
      onDataChange(); // This will trigger the parent component to refresh the data
    } catch (error) {
      toast.push(
        <Notification title="Failed" type="danger">
          Failed to add company
        </Notification>
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDialogClose = () => {
    setIsOpen(false);
    setCompanyName('');
    setSelectedCompanyGroup(null);
  };

  return (
    <div className="flex gap-3 items-center">
      <Filter />
      <Button
        size="sm"
        icon={<HiPlusCircle />}
        onClick={() => setIsOpen(true)}
        variant="solid"
      >
        Add Company
      </Button>
      <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
      >
        <h5 className="mb-4">Add Company</h5>
        <div className="mb-4 flex flex-col gap-3">
          <label>Select the company group</label>
          <OutlinedSelect
            label="Company Group"
            options={companyGroups}
            value={selectedCompanyGroup}
            onChange={setSelectedCompanyGroup}
          />
        </div>
        <div className="mb-4 flex flex-col gap-3">
          <label>Enter company name</label>
          <OutlinedInput
            label="Company"
            value={companyName}
            onChange={(value: string) => setCompanyName(value)}
          />
        </div>
        <div className="text-right mt-6">
          <Button
            className="ltr:mr-2 rtl:ml-2"
            variant="plain"
            onClick={onDialogClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            onClick={onDialogOk}
            loading={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Confirm'}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default CompanyNameTool;