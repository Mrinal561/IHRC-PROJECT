import React, { useState } from 'react';
import { Button, Input, Dialog, toast, Notification } from '@/components/ui';
import OutlinedInput from '@/components/ui/OutlinedInput';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';
import { Select, DatePicker } from '@/components/ui';
import { MultiValue, ActionMeta } from 'react-select';
import style from 'react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark';
import { HiArrowLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { PTSetupData } from '@/@types/PtSetup';


interface PTSetupPageProps {
  // addPFSetup: (newPFSetup: PTSetupData) => void;
  onClose: () => void;
  companyGroupName: string;
  companyName: string;
}

interface Signatory {
  name: string;
  designation: string;
  mobile: string;
  email: string;
}

interface SelectOption {
    value: string
    label: string
}

interface Location {
    id: number
    name: string
    district_id: number
}

const PTSetupPage = () => {



  const [existingSignatories, setExistingSignatories] = useState<Signatory[]>([
    { name: 'Amit', designation: 'Manager', mobile: '1234567890', email: 'amit@example.com'},
    { name: 'Krishna Kumar Singh', designation: 'Director', mobile: '9876543210', email: 'krishna@example.com'},
    { name: 'Ajay Thakur', designation: 'CFO', mobile: '5555555555', email: 'ajay@example.com'},
  ]);

  const [showAddSignatoryDialog, setShowAddSignatoryDialog] = useState(false);
  const [newSignatory, setNewSignatory] = useState<Signatory>({
    name: '',
    designation: '',
    mobile: '',
    email: '',
  });

  const navigate = useNavigate()
  const [fileBase64, setFileBase64] = useState<string>('');
  const [states, setStates] = useState<SelectOption[]>([])
  const [selectedStates, setSelectedStates] = useState<SelectOption | null>(
      null,
  )
  const [selectedLocation, setSelectedLocation] = useState<SelectOption | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [companyGroups, setCompanyGroups] = useState<SelectOption[]>([])
  const [selectedCompanyGroup, setSelectedCompanyGroup] =
      useState<SelectOption | null>(null)
  const [companies, setCompanies] = useState<SelectOption[]>([])
  const [selectedCompany, setSelectedCompany] = useState<SelectOption | null>(
      null,
  )
  const [districts, setDistricts] = useState<SelectOption[]>([])
  const [selectedDistrict, setSelectedDistrict] =
      useState<SelectOption | null>(null)
      const [locations, setLocations] = useState<SelectOption[]>([])

      
    // const [ptSetupData, setPTSetupData] = useState<PTSetupData>({
    //     group_id: 0,
    //     company_id: 0,
    //     state: 0,
    //     location: 0, 
    //     registration_number: 0,
    //     enrollment_number: 0,
    //     registration_date: '',
    //     remittance_mode: '',
    //     pt_user: '',
    //     password: '',
    //     email: '',
    //     mobile_no: 0,
    //     ec_frequency: '',
    //     rc_frequency: '',
    //     rc_certificate: '',
    //     ec_certificate: '',
    // })


  const handleInputChange = (field: keyof PTSetupData, value: string | Date | null | File | string[]) => {
    // setPTSetupData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignatoryChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    const selectedSignatories = newValue.map(option => option.value);
    // handleInputChange('authorizedSignatories', selectedSignatories);

    if (actionMeta.action === 'select-option' && actionMeta.option?.value === 'add_new') {
      setShowAddSignatoryDialog(true);
    //   handleInputChange('authorizedSignatories', selectedSignatories.filter(name => name !== 'add_new'));
    }
  };

  const handleSubmit = () => {
    // if (PTSetupData.ptState && PTSetupData.ptLocation && PTSetupData.authorizedSignatories.length > 0) {
      // addPFSetup(PTSetupData);
      navigate(-1);
      toast.push(
        <Notification title="Success" type="success">
          <div className="flex items-center">
            <span>PT Setup successfully created</span>
          </div>
        </Notification>
      );
    //   onClose();
    // } else {
    //   toast.push(
    //     <Notification title="Error" type="danger">
    //       <div className="flex items-center">
    //         <span>Please fill in all required fields</span>
    //       </div>
    //     </Notification>
    //   );
    // }
  };

  const handleAddSignatory = () => {
    setExistingSignatories(prev => [...prev, newSignatory]);
    setShowAddSignatoryDialog(false);
    setNewSignatory({
      name: '',
      designation: '',
      mobile: '',
      email: '',
    });
  };

  const handleNewSignatoryInputChange = (field: keyof Signatory, value: string) => {
    setNewSignatory(prev => ({ ...prev, [field]: value }));
  };

return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="plain"
          size="sm"
          className="p-2"
          onClick={() => navigate(-1)}
        >
          <HiArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold text-gray-800">Add PT Setup</h1>
      </div>

      <div className="space-y-6">
        {/* Row 1: Company Group and Company Name */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            {/* <label className="text-sm font-medium text-gray-600">Enter Company Group</label> */}
            <OutlinedInput
                        label="Company Group" value={''} onChange={function (value: string): void {
                            throw new Error('Function not implemented.');
                        } }                // value={PTSetupData.Company_Group_Name}
                // onChange={(value: string) => handleInputChange('Company_Group_Name', value)}
                />
          </div>
          <div className="space-y-2">
            {/* <label className="text-sm font-medium text-gray-600">Enter Company Name</label> */}
             <OutlinedInput
                        label="Company" value={''} onChange={function (value: string): void {
                            throw new Error('Function not implemented.');
                        } }                // value={PTSetupData.Company_Name}
                // onChange={(value: string) => handleInputChange('Company_Name', value)}
              /> 
          </div>
        </div>

        {/* Row 2: State, District, Location */}
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Enter State</label>
            <OutlinedInput
              label="State"
              value=""
              onChange={(value) => {}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Enter District</label>
            <OutlinedInput
              label="District"
              value=""
              onChange={(value) => {}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Enter Location</label>
            <OutlinedInput
              label="Location"
              value=""
              onChange={(value) => {}}
            />
          </div>
        </div>

        {/* Row 3: Registration Number, Enrollment Number, Registration Date */}
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">PT Registration Number</label>
            <OutlinedInput
              label="Registration Number"
              value=""
              onChange={(value) => {}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">PT Enrollment Number</label>
            <OutlinedInput
              label="Enrollment Number"
              value=""
              onChange={(value) => {}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">PT Registration Date</label>
            <DatePicker
              placeholder="Select Date"
              className="w-full"
              size="sm"
            />
          </div>
        </div>

        {/* Row 4: User ID, Email, Password */}
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Enter User ID</label>
            <OutlinedInput
              label="User ID (Optional)"
              value=""
              onChange={(value) => {}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Enter Email</label>
            <OutlinedInput
              label="Email"
              value=""
              onChange={(value) => {}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Enter Password</label>
            <OutlinedInput
              label="Password (Optional)"
              value=""
              onChange={(value) => {}}
            />
          </div>
        </div>

        {/* Row 5: Mobile Number and Remittance Mode */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Enter Mobile Number</label>
            <OutlinedInput
              label="Mobile"
              value=""
              onChange={(value) => {}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Select Remittance Mode</label>
            <OutlinedSelect
                        label="Mode"
                        options={[
                            { value: 'online', label: 'Online' },
                            { value: 'offline', label: 'Offline' },
                        ]} value={undefined} onChange={undefined}            />
          </div>
        </div>

        {/* Row 6: PT RC and EC Frequency */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">PT RC Frequency</label>
            <OutlinedInput
              label="PT RC Frequency"
              value=""
              onChange={(value) => {}}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">PT EC Frequency</label>
            <OutlinedInput
              label="PT EC Frequency"
              value=""
              onChange={(value) => {}}
            />
          </div>
        </div>

        {/* Row 7: Document Uploads */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Upload PT EC Certificate</label>
            <Input
              type="file"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Upload PT RC Certificate</label>
            <Input
              type="file"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-4">
      <Button onClick={() => navigate(-1)}>Cancel</Button>

        <Button
          variant="solid"
          className="px-6 bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default PTSetupPage;