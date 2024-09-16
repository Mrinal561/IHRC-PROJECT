
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Notification, toast } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';

interface BranchData extends EntityData {
  Branch: string;
  BranchAddress: string;
  BranchOpeningDate: string;
  BranchHeadCount: string;
  AuthorityName: string;
  AuthorityAddress: string;
}

interface SelectOption {
  value: string;
  label: string;
}

const AddBranchForm: React.FC = () => {
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState<EntityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BranchData>({
    Company_Group_Name: '',
    Company_Name: '',
    State: '',
    District: '',
    Location: '',
    Branch: '',
    BranchAddress: '',
    BranchOpeningDate: '',
    BranchHeadCount: '',
    AuthorityName: '',
    AuthorityAddress: '',
  });

  useEffect(() => {
    const loadLocationData = () => {
      setIsLoading(true);
      setError(null);
      try {
        setLocationData(entityDataSet);
      } catch (err) {
        console.error('Error loading location data:', err);
        setError('Failed to load location data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadLocationData();
  }, []);

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
  const handleAddBranch = () => {
    console.log(formData);
    openNotification('success', 'Branch added successfully');
    navigate(-1);
  };

  if (isLoading) return <div>Loading location data...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!locationData || locationData.length === 0) {
    return <div>No location data available. Please check your data source.</div>;
  }

  const companyGroupOptions = [...new Set(locationData.map(item => item.Company_Group_Name))].map(group => ({ value: group, label: group }));
  const filteredCompanyNameOptions = [...new Set(locationData
    .filter(item => item.Company_Group_Name === formData.Company_Group_Name)
    .map(item => item.Company_Name))]
    .map(name => ({ value: name, label: name }));
  const filteredStateOptions = [...new Set(locationData
    .filter(item => 
      item.Company_Group_Name === formData.Company_Group_Name && 
      item.Company_Name === formData.Company_Name
    )
    .map(item => item.State))]
    .map(state => ({ value: state, label: state }));
  const filteredDistrictOptions = [...new Set(locationData
    .filter(item => 
      item.Company_Group_Name === formData.Company_Group_Name && 
      item.Company_Name === formData.Company_Name &&
      item.State === formData.State
    )
    .map(item => item.District))]
    .map(district => ({ value: district, label: district }));
  const filteredLocationOptions = [...new Set(locationData
    .filter(item => 
      item.Company_Group_Name === formData.Company_Group_Name && 
      item.Company_Name === formData.Company_Name &&
      item.State === formData.State &&
      item.District === formData.District
    )
    .map(item => item.Location))]
    .map(location => ({ value: location, label: location }));

  return (
    <div className="p-2 bg-white rounded-lg">
      <div className='flex gap-2 items-center mb-3'>
        <Button
          size="sm"
          variant="plain"
          icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
          onClick={() => navigate('/branch')}
        />
        <h3 className="text-2xl font-semibold mb-2">Add New Branch</h3>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-2">Company Group</p>
            <OutlinedSelect
              label="Select Company Group"
              options={companyGroupOptions}
              value={companyGroupOptions.find(option => option.value === formData.Company_Group_Name)}
              onChange={(selectedOption: SelectOption | null) => {
                setFormData(prev => ({
                  ...prev,
                  Company_Group_Name: selectedOption?.value || '',
                  Company_Name: '',
                  State: '',
                  District: '',
                  Location: ''
                }));
              }}
            />
          </div>
          <div>
            <p className="mb-2">Company Name</p>
            <OutlinedSelect
              label="Select Company Name"
              options={filteredCompanyNameOptions}
              value={filteredCompanyNameOptions.find(option => option.value === formData.Company_Name)}
              onChange={(selectedOption: SelectOption | null) => {
                setFormData(prev => ({
                  ...prev,
                  Company_Name: selectedOption?.value || '',
                  State: '',
                  District: '',
                  Location: ''
                }));
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-2">State</p>
            <OutlinedSelect
              label="Select State"
              options={filteredStateOptions}
              value={filteredStateOptions.find(option => option.value === formData.State)}
              onChange={(selectedOption: SelectOption | null) => {
                setFormData(prev => ({
                  ...prev,
                  State: selectedOption?.value || '',
                  District: '',
                  Location: ''
                }));
              }}
            />
          </div>
          <div>
            <p className="mb-2">District</p>
            <OutlinedSelect
              label="Select District"
              options={filteredDistrictOptions}
              value={filteredDistrictOptions.find(option => option.value === formData.District)}
              onChange={(selectedOption: SelectOption | null) => {
                setFormData(prev => ({
                  ...prev,
                  District: selectedOption?.value || '',
                  Location: ''
                }));
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-2">Location</p>
            <OutlinedSelect
              label="Select Location"
              options={filteredLocationOptions}
              value={filteredLocationOptions.find(option => option.value === formData.Location)}
              onChange={(selectedOption: SelectOption | null) => {
                setFormData(prev => ({
                  ...prev,
                  Location: selectedOption?.value || ''
                }));
              }}
            />
          </div>
          <div>
            <p className="mb-2">Branch Name</p>
            <OutlinedInput
              label="Branch Name"
              value={formData.Branch}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, Branch: value }));
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <div>
            <p className="mb-2">Branch Address</p>
            <OutlinedInput
              label="Branch Address"
              value={formData.BranchAddress}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, BranchAddress: value }));
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <p className="mb-2">Branch Opening Date</p>
            <OutlinedInput
              label="Branch Opening Date"
              value={formData.BranchOpeningDate}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, BranchOpeningDate: value }));
              }}
            />
          </div>
          <div>
            <p className="mb-2">Branch Head Count</p>
            <OutlinedInput
              label="Branch Head Count"
              value={formData.BranchHeadCount}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, BranchHeadCount: value }));
              }}
            />
          </div>
          <div>
            <p className="mb-2">Authority Name</p>
            <OutlinedInput
              label="Authority Name"
              value={formData.AuthorityName}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, AuthorityName: value }));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <div>
            <p className="mb-2">Authority Address</p>
            <OutlinedInput
              label="Authority Address"
              value={formData.AuthorityAddress}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, AuthorityAddress: value }));
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="solid" size="sm" onClick={handleAddBranch}>
            Add Branch
          </Button>
          <Button type="button" variant="plain" size="sm" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBranchForm;