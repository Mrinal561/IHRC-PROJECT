
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui';
// import { IoArrowBack } from 'react-icons/io5';
// import { EntityData } from '@/views/IHRC/store/dummyEntityData';
// import OutlinedSelect from '@/components/ui/Outlined';
// import OutlinedInput from '@/components/ui/OutlinedInput';

// interface AddBranchFormProps {
//   addBranch: (newBranch: BranchData) => void;
//   locationData?: EntityData[];
// }

// interface BranchData extends EntityData {
//   Branch: string;
//   BranchAddress: string;
//   BranchOpeningDate: string;
//   BranchHeadCount: string;
//   AuthorityName: string;
//   AuthorityAddress: string;
// }

// interface SelectOption {
//   value: string;
//   label: string;
// }

// const AddBranchForm: React.FC<AddBranchFormProps> = ({ addBranch, locationData: propLocationData }) => {
//   const navigate = useNavigate();
//   const [locationData, setLocationData] = useState<EntityData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [formData, setFormData] = useState<BranchData>({
//     Company_Group_Name: '',
//     Company_Name: '',
//     State: '',
//     District: '',
//     Location: '',
//     Branch: '',
//     BranchAddress: '',
//     BranchOpeningDate: '',
//     BranchHeadCount: '',
//     AuthorityName: '',
//     AuthorityAddress: '',
//   });

//   useEffect(() => {
//     const fetchLocationData = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         if (propLocationData && propLocationData.length > 0) {
//           setLocationData(propLocationData);
//         } else {
//           const storedLocationData = localStorage.getItem('locationData');
//           if (storedLocationData) {
//             const parsedData = JSON.parse(storedLocationData);
//             setLocationData(parsedData);
//           } else {
//             throw new Error('No location data found');
//           }
//         }
//       } catch (err) {
//         console.error('Error loading location data:', err);
//         setError('Failed to load location data. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchLocationData();
//   }, [propLocationData]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     addBranch(formData);
//     navigate('/');
//   };

//   if (isLoading) return <div>Loading location data...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!locationData || locationData.length === 0) {
//     return <div>No location data available. Please check your data source.</div>;
//   }

//   const companyGroupOptions = [...new Set(locationData.map(item => item.Company_Group_Name))].map(group => ({ value: group, label: group }));
//   const filteredCompanyNameOptions = [...new Set(locationData
//     .filter(item => item.Company_Group_Name === formData.Company_Group_Name)
//     .map(item => item.Company_Name))]
//     .map(name => ({ value: name, label: name }));
//   const filteredStateOptions = [...new Set(locationData
//     .filter(item => 
//       item.Company_Group_Name === formData.Company_Group_Name && 
//       item.Company_Name === formData.Company_Name
//     )
//     .map(item => item.State))]
//     .map(state => ({ value: state, label: state }));
//   const filteredDistrictOptions = [...new Set(locationData
//     .filter(item => 
//       item.Company_Group_Name === formData.Company_Group_Name && 
//       item.Company_Name === formData.Company_Name &&
//       item.State === formData.State
//     )
//     .map(item => item.District))]
//     .map(district => ({ value: district, label: district }));
//   const filteredLocationOptions = [...new Set(locationData
//     .filter(item => 
//       item.Company_Group_Name === formData.Company_Group_Name && 
//       item.Company_Name === formData.Company_Name &&
//       item.State === formData.State &&
//       item.District === formData.District
//     )
//     .map(item => item.Location))]
//     .map(location => ({ value: location, label: location }));

//   return (
//     <div className="p-2 bg-white rounded-lg shadow-md">
//       <div className='flex gap-2 items-center mb-3'>
//         <Button
//           size="sm"
//           variant="plain"
//           icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
//           onClick={() => navigate(-1)}
//         />
//         <h3 className="text-2xl font-semibold">Add New Branch</h3>
//       </div>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//           <div>
//             <p className="mb-1">Company Group</p>
//             <OutlinedSelect
//               label="Select Company Group"
//               options={companyGroupOptions}
//               value={companyGroupOptions.find(option => option.value === formData.Company_Group_Name)}
//               onChange={(selectedOption: SelectOption | null) => {
//                 setFormData(prev => ({
//                   ...prev,
//                   Company_Group_Name: selectedOption?.value || '',
//                   Company_Name: '',
//                   State: '',
//                   District: '',
//                   Location: ''
//                 }));
//               }}
//             />
//           </div>
//           <div>
//             <p className="mb-1">Company Name</p>
//             <OutlinedSelect
//               label="Select Company Name"
//               options={filteredCompanyNameOptions}
//               value={filteredCompanyNameOptions.find(option => option.value === formData.Company_Name)}
//               onChange={(selectedOption: SelectOption | null) => {
//                 setFormData(prev => ({
//                   ...prev,
//                   Company_Name: selectedOption?.value || '',
//                   State: '',
//                   District: '',
//                   Location: ''
//                 }));
//               }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//           <div>
//             <p className="mb-1">State</p>
//             <OutlinedSelect
//               label="Select State"
//               options={filteredStateOptions}
//               value={filteredStateOptions.find(option => option.value === formData.State)}
//               onChange={(selectedOption: SelectOption | null) => {
//                 setFormData(prev => ({
//                   ...prev,
//                   State: selectedOption?.value || '',
//                   District: '',
//                   Location: ''
//                 }));
//               }}
//             />
//           </div>
//           <div>
//             <p className="mb-1">District</p>
//             <OutlinedSelect
//               label="Select District"
//               options={filteredDistrictOptions}
//               value={filteredDistrictOptions.find(option => option.value === formData.District)}
//               onChange={(selectedOption: SelectOption | null) => {
//                 setFormData(prev => ({
//                   ...prev,
//                   District: selectedOption?.value || '',
//                   Location: ''
//                 }));
//               }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//           <div>
//             <p className="mb-1">Location</p>
//             <OutlinedSelect
//               label="Select Location"
//               options={filteredLocationOptions}
//               value={filteredLocationOptions.find(option => option.value === formData.Location)}
//               onChange={(selectedOption: SelectOption | null) => {
//                 setFormData(prev => ({
//                   ...prev,
//                   Location: selectedOption?.value || ''
//                 }));
//               }}
//             />
//           </div>
//           <div>
//             <p className="mb-1">Branch Name</p>
//             <OutlinedInput
//               label="Branch Name"
//               value={formData.Branch}
//               onChange={(value: string) => {
//                 setFormData(prev => ({ ...prev, Branch: value }));
//               }}
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
//           <div>
//             <p className="mb-1">Branch Address</p>
//             <OutlinedInput
//               label="Branch Address"
//               value={formData.BranchAddress}
//               onChange={(value: string) => {
//                 setFormData(prev => ({ ...prev, BranchAddress: value }));
//               }}
//             />
//           </div>
          
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
//         <div>
//             <p className="mb-1">Branch Opening Date</p>
//             <OutlinedInput
//               label="Branch Opening Date"
//               value={formData.BranchOpeningDate}
//               onChange={(value: string) => {
//                 setFormData(prev => ({ ...prev, BranchOpeningDate: value }));
//               }}
//             />
//           </div>
//           <div>
//             <p className="mb-1">Branch Head Count</p>
//             <OutlinedInput
//               label="Branch Head Count"
//               value={formData.BranchHeadCount}
//               onChange={(value: string) => {
//                 setFormData(prev => ({ ...prev, BranchHeadCount: value }));
//               }}
//             />
//           </div>
//           <div>
//             <p className="mb-1">Authority Name</p>
//             <OutlinedInput
//               label="Authority Name"
//               value={formData.AuthorityName}
//               onChange={(value: string) => {
//                 setFormData(prev => ({ ...prev, AuthorityName: value }));
//               }}
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
//         <div>
//             <p className="mb-1">Authority Address</p>
//             <OutlinedInput
//               label="Authority Address"
//               value={formData.AuthorityAddress}
//               onChange={(value: string) => {
//                 setFormData(prev => ({ ...prev, AuthorityAddress: value }));
//               }}
//             />
//           </div>
          
//         </div>

//         <div className="flex justify-end gap-2">
//           <Button type="submit" variant="solid" size="sm">
//             Add Branch
//           </Button>
//           <Button type="button" variant="plain" size="sm" onClick={() => navigate('/')}>
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBranchForm;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import { EntityData } from '@/views/IHRC/store/dummyEntityData';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';

interface AddBranchFormProps {
  addBranch: (newBranch: BranchData) => void;
  locationData?: EntityData[];
}

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

const AddBranchForm: React.FC<AddBranchFormProps> = ({ addBranch, locationData: propLocationData }) => {
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
    const fetchLocationData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (propLocationData && propLocationData.length > 0) {
          setLocationData(propLocationData);
        } else {
          const storedLocationData = localStorage.getItem('locationData');
          if (storedLocationData) {
            const parsedData = JSON.parse(storedLocationData);
            setLocationData(parsedData);
          } else {
            throw new Error('No location data found');
          }
        }
      } catch (err) {
        console.error('Error loading location data:', err);
        setError('Failed to load location data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocationData();
  }, [propLocationData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
    addBranch(formData);
    navigate('/branch/*');
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
    <div className="p-2 bg-white rounded-lg shadow-md">
      <div className='flex gap-2 items-center mb-3'>
        <Button
          size="sm"
          variant="plain"
          icon={<IoArrowBack className="text-[#72828e] hover:text-[#5d6169]" />}
          onClick={() => navigate('/branch')}
        />
        <h3 className="text-2xl font-semibold">Add New Branch</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <p className="mb-1">Company Group</p>
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
            <p className="mb-1">Company Name</p>
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
            <p className="mb-1">State</p>
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
            <p className="mb-1">District</p>
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
            <p className="mb-1">Location</p>
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
            <p className="mb-1">Branch Name</p>
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
            <p className="mb-1">Branch Address</p>
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
            <p className="mb-1">Branch Opening Date</p>
            <OutlinedInput
              label="Branch Opening Date"
              value={formData.BranchOpeningDate}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, BranchOpeningDate: value }));
              }}
            />
          </div>
          <div>
            <p className="mb-1">Branch Head Count</p>
            <OutlinedInput
              label="Branch Head Count"
              value={formData.BranchHeadCount}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, BranchHeadCount: value }));
              }}
            />
          </div>
          <div>
            <p className="mb-1">Authority Name</p>
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
            <p className="mb-1">Authority Address</p>
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
          <Button type="submit" variant="solid" size="sm" onClick={handleSubmit}>
            Add Branch
          </Button>
          <Button type="button" variant="plain" size="sm" onClick={() => navigate('/branch/*')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddBranchForm;