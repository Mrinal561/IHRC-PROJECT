// import React, { useState } from 'react';
// import { Button, Input, Dialog, toast, Notification, DatePicker, Select } from '@/components/ui';
// import OutlinedInput from '@/components/ui/OutlinedInput';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined';
// import { MultiValue, ActionMeta } from 'react-select';

// export interface ESISetupData {
//   Company_Group_Name: string;
//   Company_Name: string;
//   esiCode: string;
//   esiCodeType: string;
//   esiCodeLocation: string;
//   esiUserId?: string;
//   esiPassword?: string;
//   authorizedSignatory: string[];
//   signatoryDesignation?: string;
//   signatoryMobile?: string;
//   signatoryEmail?: string;
//   esiRegistrationCertificate?: File | null;
// }

// interface ESISetupSidePanelProps {
//   // addPFSetup: (newPFSetup: ESISetupData) => void;
//   onClose: () => void;
//   companyGroupName: string;
//   companyName: string;
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface Signatory {
//   name: string;
//   designation: string;
//   mobile: string;
//   email: string;
// }

// const ESISetupPanel: React.FC<ESISetupSidePanelProps> = ({
//   // addPFSetup,
//   onClose,
//   companyGroupName,
//   companyName,
// }) => {
//   const [esiSetupData, setESISetupData] = useState<ESISetupData>({
//     Company_Group_Name: companyGroupName,
//     Company_Name: companyName,
//     esiCodeType: '',
//     esiCode: '',
//     esiCodeLocation: '',
//     authorizedSignatory: [],
//   });

//   const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
//     { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
//     { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
//     { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
//   ]);

//   const [showAddSignatoryDialog, setShowAddSignatoryDialog] = useState(false);
//   const [newSignatory, setNewSignatory] = useState<Signatory>({
//     name: '',
//     designation: '',
//     mobile: '',
//     email: '',
//   });

//   const handleInputChange = (field: keyof ESISetupData, value: string | Date | null | File | string[]) => {
//     setESISetupData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSignatoryChange = (
//     newValue: MultiValue<{ value: string; label: string }>,
//     actionMeta: ActionMeta<{ value: string; label: string }>
//   ) => {
//     const selectedSignatories = newValue.map(option => option.value);
//     handleInputChange('authorizedSignatory', selectedSignatories);

//     if (actionMeta.action === 'select-option' && actionMeta.option?.value === 'add_new') {
//       setShowAddSignatoryDialog(true);
//       handleInputChange('authorizedSignatory', selectedSignatories.filter(name => name !== 'add_new'));
//     }
//   };


//   const handleSubmit = () => {
//     if (esiSetupData.esiCode && esiSetupData.esiCodeLocation && esiSetupData.authorizedSignatory) {
//       toast.push(
//         <Notification title="Success" type="success">
//           <div className="flex items-center">
//             <span>ESI Setup successfully created</span>
//           </div>
//         </Notification>
//       );
//       onClose();
//     } else {
//       toast.push(
//         <Notification title="Error" type="danger">
//           <div className="flex items-center">
//             <span>Please fill in all required fields</span>
//           </div>
//         </Notification>
//       );
//     }
//   };

//   const handleAddSignatory = () => {
//     setExistingSignatories(prev => [...prev, newSignatory]);
//     setShowAddSignatoryDialog(false);
//     setNewSignatory({
//       name: '',
//       designation: '',
//       mobile: '',
//       email: '',
//     });
//   };

//   const handleNewSignatoryInputChange = (field: keyof Signatory, value: string) => {
//     setNewSignatory(prev => ({ ...prev, [field]: value }));
//   };

//   const challanTypeOptions = [
//     { value: 'Main Challan', label: 'Main Challan' },
//     { value: 'Arrear Challan', label: 'Arrear Challan' },
//   ];

//   return (
//     <div className="p-4 space-y-4">
//        <div className='flex gap-4 items-center'>
//         <div className='w-full'>
//         <OutlinedInput
//           label="Company Group"
//           value={esiSetupData.Company_Group_Name}
//           onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
//           />
//           </div>
//           <div className='w-full'>
//         <OutlinedInput
//           label="Company"
//           value={esiSetupData.Company_Name}
//           onChange={(value: string) => handleInputChange('Company_Name', value)}
//           />
//           </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the ESI Code Type</label>
//           <div className='w-[352px]'>
//           <OutlinedSelect
//             label="ESI Code Type"
//             options={[
//               { value: 'main', label: 'Main' },
//               { value: 'subCode', label: 'Sub Code' },
//             ]}
//             value={esiSetupData.esiCodeType}
//             onChange={(value: string) => handleInputChange('esiCodeType', value)}
//             />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter the ESI Code</label>
//           <div className='w-[352px]'>
//           <OutlinedInput
//             label="ESI Code"
//             value={esiSetupData.esiCode}
//             onChange={(value: string) => handleInputChange('esiCode', value)}
//             />
//             </div>
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//       <div className='flex flex-col gap-2'>
//           <label>Enter the ESI Code Location</label>
//           <div className='w-[352px]'>
//           <OutlinedInput
//             label="ESI Code Location"
//             value={esiSetupData.esiCodeLocation || ''}
//             onChange={(value: string) => handleInputChange('esiCodeLocation', value)}
//             />
//             </div>
//         </div>
//         <div className='flex flex-col gap-2'>
//           <label>Enter ESI user ID</label>
//           <div className='w-[352px]'>
//           <OutlinedInput
//             label="ESI User ID (Optional)"
//             value={esiSetupData.esiUserId || ''}
//             onChange={(value: string) => handleInputChange('esiUserId', value)}
//             />
//             </div>
//         </div>
//       </div>

//       <div className='flex gap-4 items-center'>
//       <div className='flex flex-col gap-4'>
//           <label>Enter ESI User Password</label>
//           <div className='w-56'>
//           <OutlinedInput
//             label="ESI Password (Optional)"
//             value={esiSetupData.esiPassword || ''}
//             onChange={(value: string) => handleInputChange('esiPassword', value)}
//             />
//             </div>
//         </div>

//         <div className='flex flex-col gap-2 w-full'>
//           <label>Choose the Signatories</label>
//           <div>
//           <Select
//             isMulti
//             options={[
//               ...existingSignatories.map(s => ({ value: s.name, label: s.name })),
//               // { value: 'add_new'}
//             ]}
//             // value={esiSetupData.authorizedSignatory.map(name => ({ value: name, label: name }))}
//             // onChange={handleSignatoryChange}
//             />
//             </div>
//         </div>
//       </div>

//       <div className='flex flex-col gap-4'>
//         <label>Upload the ESI certificate</label>
//         <Input
//           id="file-upload"
//           type="file"
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//             const file = e.target.files?.[0] || null;
//             handleInputChange('esiRegistrationCertificate', file);
//           }}
//         />
//       </div>

//       <div className="flex justify-end space-x-2">
//         <Button onClick={onClose}>Cancel</Button>
//         <Button variant="solid" onClick={handleSubmit}>Confirm</Button>
//       </div>

//       <Dialog
//         isOpen={showAddSignatoryDialog}
//         onClose={() => setShowAddSignatoryDialog(false)}
//       >
//         <h5 className="mb-4">Add New Signatory</h5>
//         <div className="space-y-4">
//           <OutlinedInput
//             label="Name"
//             value={newSignatory.name}
//             onChange={(value) => handleNewSignatoryInputChange('name', value)}
//           />
//           <OutlinedInput
//             label="Designation"
//             value={newSignatory.designation}
//             onChange={(value) => handleNewSignatoryInputChange('designation', value)}
//           />
//           <OutlinedInput
//             label="Mobile"
//             value={newSignatory.mobile}
//             onChange={(value) => handleNewSignatoryInputChange('mobile', value)}
//           />
//           <OutlinedInput
//             label="Email"
//             value={newSignatory.email}
//             onChange={(value) => handleNewSignatoryInputChange('email', value)}
//           />
//         </div>
//         <div className="flex justify-end space-x-2 mt-4">
//           <Button onClick={() => setShowAddSignatoryDialog(false)}>Cancel</Button>
//           <Button variant="solid" onClick={handleAddSignatory}>Add Signatory</Button>
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default ESISetupPanel;

import React, { useState, useEffect } from 'react';
import { Button, Input, Notification, toast } from '@/components/ui';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface ESISetupPanelProps {
  onClose: () => void;
  addESISetup: (data: any) => void;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SignatoryOption {
  id: number;
  name: string;
}

const ESISetupPanel: React.FC<ESISetupPanelProps> = ({ onClose, addESISetup }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([]);
  const [selectedCompanyGroup, setSelectedCompanyGroup] = useState<SelectOption | null>(null);
  const [companies, setCompanies] = useState<SelectOption[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(null);
  const [signatories, setSignatories] = useState<SignatoryOption[]>([]);
  const [fileBase64, setFileBase64] = useState<string>('');

  const [formData, setFormData] = useState({
    group_id: 0,
    company_id: 0,
    code_type: '',
    code: '',
    district_id: 0,
    location: '',
    esi_user: '',
    password: '',
    signatory_data: [{
      signatory_id: 0
    }],
    certificate: ''
  });

  const codeTypeOptions = [
    { value: 'main', label: 'Main' },
    { value: 'subcode', label: 'SubCode' }
  ];

  const showNotification = (type: 'success' | 'info' | 'danger' | 'warning', message: string) => {
    toast.push(
      <Notification
        title={type.charAt(0).toUpperCase() + type.slice(1)}
        type={type}
      >
        {message}
      </Notification>
    );
  };

  // Load Company Groups
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

  useEffect(() => {
    loadCompanyGroups();
  }, []);

  // Load Companies based on selected group
  const loadCompanies = async (groupId: string[] | number[]) => {
    try {
      const groupIdParam = [`${groupId}`];
      const { data } = await httpClient.get(endpoints.company.getAll(), {
        params: {
          'group_id[]': groupIdParam
        }
      });

      if (data?.data) {
        const formattedCompanies = data.data.map((company: any) => ({
          label: company.name,
          value: String(company.id),
        }));

        setCompanies(formattedCompanies);
      } else {
        setCompanies([]);
        showNotification('info', 'No companies found for this group');
      }
    } catch (error: any) {
      console.error('Failed to load companies:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to load companies');
      setCompanies([]);
    }
  };

  // Load Signatories
  const loadSignatories = async () => {
    try {
      const { data } = await httpClient.get(endpoints.user.getAll());
      setSignatories(data?.data);
    } catch (error) {
      console.error('Failed to load signatories:', error);
      showNotification('danger', 'Failed to load signatories');
    }
  };

  useEffect(() => {
    loadSignatories();
  }, []);

  // Handle company group change
  useEffect(() => {
    if (selectedCompanyGroup?.value) {
      setFormData(prev => ({
        ...prev,
        group_id: parseInt(selectedCompanyGroup.value)
      }));
      setSelectedCompany(null);
      loadCompanies(selectedCompanyGroup.value);
    } else {
      setCompanies([]);
    }
  }, [selectedCompanyGroup]);

  // Handle company change
  useEffect(() => {
    if (selectedCompany?.value) {
      setFormData(prev => ({
        ...prev,
        company_id: parseInt(selectedCompany.value)
      }));
    }
  }, [selectedCompany]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        setFileBase64(base64String);
        setFormData(prev => ({
          ...prev,
          certificate: base64String
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const response = await httpClient.post(endpoints.esiSetup.create(), formData);
      addESISetup(response.data);
      onClose();
      showNotification('success', 'ESI Setup created successfully');
    } catch (error: any) {
      console.error('Failed to create ESI Setup:', error);
      showNotification('danger', error.response?.data?.message || 'Failed to create ESI Setup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2">Company Group</p>
          <OutlinedSelect
            label="Select Company Group"
            options={companyGroups}
            value={selectedCompanyGroup}
            onChange={setSelectedCompanyGroup}
          />
        </div>
        <div>
          <p className="mb-2">Company</p>
          <OutlinedSelect
            label="Select Company"
            options={companies}
            value={selectedCompany}
            onChange={setSelectedCompany}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="mb-2">Code Type</p>
          <OutlinedSelect
            label="Select Code Type"
            options={codeTypeOptions}
            value={codeTypeOptions.find(option => option.value === formData.code_type)}
            onChange={(option: SelectOption | null) => {
              setFormData(prev => ({
                ...prev,
                code_type: option?.value || ''
              }));
            }}
          />
        </div>
        <div>
          <p className="mb-2">ESI Code</p>
          <OutlinedInput
            label="ESI Code"
            value={formData.code}
            onChange={(value: string) => {
              setFormData(prev => ({
                ...prev,
                code: value
              }));
            }}
          />
        </div>


        <div>
          <p className="mb-2">Location</p>
          <OutlinedInput
            label="Location"
            value={formData.location}
            onChange={(value: string) => {
              setFormData(prev => ({
                ...prev,
                location: value
              }));
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2">ESI User</p>
          <OutlinedInput
            label="ESI User"
            value={formData.esi_user}
            onChange={(value: string) => {
              setFormData(prev => ({
                ...prev,
                esi_user: value
              }));
            }}
          />
        </div>
        <div>
          <p className="mb-2">Password</p>
          <OutlinedInput
            label="Password"
            value={formData.password}
            onChange={(value: string) => {
              setFormData(prev => ({
                ...prev,
                password: value
              }));
            }}
          />
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2">Authorized Signatory</p>
        <OutlinedSelect
          label="Select Signatory"
          options={signatories.map(sig => ({
            label: sig.name,
            value: String(sig.id)
          }))}
          onChange={(option: SelectOption | null) => {
            setFormData(prev => ({
              ...prev,
              signatory_data: [{
                signatory_id: option ? parseInt(option.value) : 0
              }]
            }));
          } } value={undefined}        />
      </div>

      <div className="mb-4">
        <p className="mb-2">Upload Certificate</p>
        <Input
          type="file"
          onChange={handleFileUpload}
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="solid"
          size="sm"
          onClick={handleSubmit}
          loading={isLoading}
        >
          Create ESI Setup
        </Button>
        <Button
          variant="plain"
          size="sm"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ESISetupPanel;
