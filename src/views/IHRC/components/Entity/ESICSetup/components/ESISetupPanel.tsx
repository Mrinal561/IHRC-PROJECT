

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
    code_Type: '',
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

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="mb-2">Code Type</p>
          <OutlinedSelect
            label="Select Code Type"
            options={codeTypeOptions}
            value={codeTypeOptions.find(option => option.value === formData.code_Type)}
            onChange={(option: SelectOption | null) => {
              setFormData(prev => ({
                ...prev,
                code_Type: option?.value || ''
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
      <div className="grid grid-cols-1 gap-4 mb-4">
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
        <div>
          <p className="mb-2">District</p>
          <OutlinedInput
              label="District" value={''} onChange={function (value: string): void {
                throw new Error('Function not implemented.');
              } }            // value={formData.district_id}
            // onChange={(value: string) => {
            //   setFormData(prev => ({
            //     ...prev,
            //     code: value
            //   }));
            // }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
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
    </div>
  );
};

export default ESISetupPanel;
