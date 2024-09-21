import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Input, Notification, toast } from '@/components/ui';
import { IoArrowBack } from 'react-icons/io5';
import { EntityData, entityDataSet } from '../../../../store/dummyEntityData';
import OutlinedSelect from '@/components/ui/Outlined';
import OutlinedInput from '@/components/ui/OutlinedInput';

interface BranchData extends EntityData {
  Branch: string;
  Location: string;
  BranchAddress: string;
  BranchOpeningDate: string;
  BranchHeadCount: string;
  AuthorityName: string;
  AuthorityAddress: string;
  BranchType: string;
  SERegistrationNumber: string;
  SEValidity: String;
  sandeRegistrationCertificate?: File | null;

}

interface SelectOption {
  value: string;
  label: string;
}

const indianStates: SelectOption[] = [
  { value: 'AN', label: 'Andaman and Nicobar Islands' },
  { value: 'AP', label: 'Andhra Pradesh' },
  { value: 'AR', label: 'Arunachal Pradesh' },
  { value: 'AS', label: 'Assam' },
  { value: 'BR', label: 'Bihar' },
  { value: 'CH', label: 'Chandigarh' },
  { value: 'CT', label: 'Chhattisgarh' },
  { value: 'DN', label: 'Dadra and Nagar Haveli' },
  { value: 'DD', label: 'Daman and Diu' },
  { value: 'DL', label: 'Delhi' },
  { value: 'GA', label: 'Goa' },
  { value: 'GJ', label: 'Gujarat' },
  { value: 'HR', label: 'Haryana' },
  { value: 'HP', label: 'Himachal Pradesh' },
  { value: 'JK', label: 'Jammu and Kashmir' },
  { value: 'JH', label: 'Jharkhand' },
  { value: 'KA', label: 'Karnataka' },
  { value: 'KL', label: 'Kerala' },
  { value: 'LA', label: 'Ladakh' },
  { value: 'LD', label: 'Lakshadweep' },
  { value: 'MP', label: 'Madhya Pradesh' },
  { value: 'MH', label: 'Maharashtra' },
  { value: 'MN', label: 'Manipur' },
  { value: 'ML', label: 'Meghalaya' },
  { value: 'MZ', label: 'Mizoram' },
  { value: 'NL', label: 'Nagaland' },
  { value: 'OR', label: 'Odisha' },
  { value: 'PY', label: 'Puducherry' },
  { value: 'PB', label: 'Punjab' },
  { value: 'RJ', label: 'Rajasthan' },
  { value: 'SK', label: 'Sikkim' },
  { value: 'TN', label: 'Tamil Nadu' },
  { value: 'TG', label: 'Telangana' },
  { value: 'TR', label: 'Tripura' },
  { value: 'UP', label: 'Uttar Pradesh' },
  { value: 'UT', label: 'Uttarakhand' },
  { value: 'WB', label: 'West Bengal' }
];

const districtsByState: { [key: string]: SelectOption[] } = {
  'Andhra Pradesh': [
    { value: 'anantapur', label: 'Anantapur' },
    { value: 'chittoor', label: 'Chittoor' },
    { value: 'east_godavari', label: 'East Godavari' },
    { value: 'guntur', label: 'Guntur' },
    { value: 'krishna', label: 'Krishna' }
  ],
  'Arunachal Pradesh': [
    { value: 'anjaw', label: 'Anjaw' },
    { value: 'changlang', label: 'Changlang' },
    { value: 'east_kameng', label: 'East Kameng' },
    { value: 'east_siang', label: 'East Siang' },
    { value: 'lohit', label: 'Lohit' }
  ],
  'Assam': [
    { value: 'baksa', label: 'Baksa' },
    { value: 'barpeta', label: 'Barpeta' },
    { value: 'biswanath', label: 'Biswanath' },
    { value: 'cachar', label: 'Cachar' },
    { value: 'dhemaji', label: 'Dhemaji' }
  ],
  'Bihar': [
    { value: 'araria', label: 'Araria' },
    { value: 'aurangabad', label: 'Aurangabad' },
    { value: 'banka', label: 'Banka' },
    { value: 'begusarai', label: 'Begusarai' },
    { value: 'bhagalpur', label: 'Bhagalpur' }
  ],
  'Chhattisgarh': [
    { value: 'balod', label: 'Balod' },
    { value: 'baloda_bazar', label: 'Baloda Bazar' },
    { value: 'balrampur', label: 'Balrampur' },
    { value: 'bastar', label: 'Bastar' },
    { value: 'bemetara', label: 'Bemetara' }
  ],
  'Goa': [
    { value: 'north_goa', label: 'North Goa' },
    { value: 'south_goa', label: 'South Goa' }
  ],
  'Gujarat': [
    { value: 'ahmedabad', label: 'Ahmedabad' },
    { value: 'amreli', label: 'Amreli' },
    { value: 'anand', label: 'Anand' },
    { value: 'aravalli', label: 'Aravalli' },
    { value: 'banaskantha', label: 'Banaskantha' }
  ],
  'Haryana': [
    { value: 'ambala', label: 'Ambala' },
    { value: 'bhiwani', label: 'Bhiwani' },
    { value: 'charkhi_dadri', label: 'Charkhi Dadri' },
    { value: 'faridabad', label: 'Faridabad' },
    { value: 'fatehabad', label: 'Fatehabad' }
  ],
  'Himachal Pradesh': [
    { value: 'bilaspur', label: 'Bilaspur' },
    { value: 'chamba', label: 'Chamba' },
    { value: 'hamirpur', label: 'Hamirpur' },
    { value: 'kangra', label: 'Kangra' },
    { value: 'kinnaur', label: 'Kinnaur' }
  ],
  'Jharkhand': [
    { value: 'bokaro', label: 'Bokaro' },
    { value: 'chatra', label: 'Chatra' },
    { value: 'deoghar', label: 'Deoghar' },
    { value: 'dhanbad', label: 'Dhanbad' },
    { value: 'dumka', label: 'Dumka' }
  ],
  'Karnataka': [
    { value: 'bagalkot', label: 'Bagalkot' },
    { value: 'ballari', label: 'Ballari' },
    { value: 'belagavi', label: 'Belagavi' },
    { value: 'bengaluru_rural', label: 'Bengaluru Rural' },
    { value: 'bengaluru_urban', label: 'Bengaluru Urban' }
  ],
  'Kerala': [
    { value: 'alappuzha', label: 'Alappuzha' },
    { value: 'ernakulam', label: 'Ernakulam' },
    { value: 'idukki', label: 'Idukki' },
    { value: 'kannur', label: 'Kannur' },
    { value: 'kasaragod', label: 'Kasaragod' }
  ],
  'Madhya Pradesh': [
    { value: 'agar_malwa', label: 'Agar Malwa' },
    { value: 'alirajpur', label: 'Alirajpur' },
    { value: 'anuppur', label: 'Anuppur' },
    { value: 'ashoknagar', label: 'Ashoknagar' },
    { value: 'balaghat', label: 'Balaghat' }
  ],
  'Maharashtra': [
    { value: 'ahmednagar', label: 'Ahmednagar' },
    { value: 'akola', label: 'Akola' },
    { value: 'amravati', label: 'Amravati' },
    { value: 'aurangabad', label: 'Aurangabad' },
    { value: 'beed', label: 'Beed' }
  ],
  'Manipur': [
    { value: 'bishnupur', label: 'Bishnupur' },
    { value: 'chandel', label: 'Chandel' },
    { value: 'churachandpur', label: 'Churachandpur' },
    { value: 'imphal_east', label: 'Imphal East' },
    { value: 'imphal_west', label: 'Imphal West' }
  ],
  'Meghalaya': [
    { value: 'east_garo_hills', label: 'East Garo Hills' },
    { value: 'east_jaintia_hills', label: 'East Jaintia Hills' },
    { value: 'east_khasi_hills', label: 'East Khasi Hills' },
    { value: 'north_garo_hills', label: 'North Garo Hills' },
    { value: 'ri_bhoi', label: 'Ri Bhoi' }
  ],
  'Mizoram': [
    { value: 'aizawl', label: 'Aizawl' },
    { value: 'champhai', label: 'Champhai' },
    { value: 'kolasib', label: 'Kolasib' },
    { value: 'lawngtlai', label: 'Lawngtlai' },
    { value: 'lunglei', label: 'Lunglei' }
  ],
  'Nagaland': [
    { value: 'dimapur', label: 'Dimapur' },
    { value: 'kiphire', label: 'Kiphire' },
    { value: 'kohima', label: 'Kohima' },
    { value: 'longleng', label: 'Longleng' },
    { value: 'mokokchung', label: 'Mokokchung' }
  ],
  'Odisha': [
    { value: 'angul', label: 'Angul' },
    { value: 'balangir', label: 'Balangir' },
    { value: 'balasore', label: 'Balasore' },
    { value: 'bargarh', label: 'Bargarh' },
    { value: 'bhadrak', label: 'Bhadrak' }
  ],
  'Punjab': [
    { value: 'amritsar', label: 'Amritsar' },
    { value: 'barnala', label: 'Barnala' },
    { value: 'bathinda', label: 'Bathinda' },
    { value: 'faridkot', label: 'Faridkot' },
    { value: 'fatehgarh_sahib', label: 'Fatehgarh Sahib' }
  ],
  'Rajasthan': [
    { value: 'ajmer', label: 'Ajmer' },
    { value: 'alwar', label: 'Alwar' },
    { value: 'banswara', label: 'Banswara' },
    { value: 'baran', label: 'Baran' },
    { value: 'barmer', label: 'Barmer' }
  ],
  'Sikkim': [
    { value: 'east_sikkim', label: 'East Sikkim' },
    { value: 'north_sikkim', label: 'North Sikkim' },
    { value: 'south_sikkim', label: 'South Sikkim' },
    { value: 'west_sikkim', label: 'West Sikkim' }
  ],
  'Tamil Nadu': [
    { value: 'ariyalur', label: 'Ariyalur' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'coimbatore', label: 'Coimbatore' },
    { value: 'cuddalore', label: 'Cuddalore' },
    { value: 'dharmapuri', label: 'Dharmapuri' }
  ],
  'Telangana': [
    { value: 'adilabad', label: 'Adilabad' },
    { value: 'bhadradri_kothagudem', label: 'Bhadradri Kothagudem' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'jagtial', label: 'Jagtial' },
    { value: 'jangaon', label: 'Jangaon' }
  ],
  'Tripura': [
    { value: 'dhalai', label: 'Dhalai' },
    { value: 'gomati', label: 'Gomati' },
    { value: 'khowai', label: 'Khowai' },
    { value: 'north_tripura', label: 'North Tripura' },
    { value: 'sepahijala', label: 'Sepahijala' }
  ],
  'Uttar Pradesh': [
    { value: 'agra', label: 'Agra' },
    { value: 'aligarh', label: 'Aligarh' },
    { value: 'allahabad', label: 'Allahabad' },
    { value: 'ambedkar_nagar', label: 'Ambedkar Nagar' },
    { value: 'amethi', label: 'Amethi' }
  ],
  'Uttarakhand': [
    { value: 'almora', label: 'Almora' },
    { value: 'bageshwar', label: 'Bageshwar' },
    { value: 'chamoli', label: 'Chamoli' },
    { value: 'champawat', label: 'Champawat' },
    { value: 'dehradun', label: 'Dehradun' }
  ],
  'West Bengal': [
    { value: 'alipurduar', label: 'Alipurduar' },
    { value: 'bankura', label: 'Bankura' },
    { value: 'birbhum', label: 'Birbhum' },
    { value: 'cooch_behar', label: 'Cooch Behar' },
    { value: 'dakshin_dinajpur', label: 'Dakshin Dinajpur' }
  ],
  'Andaman and Nicobar Islands': [
    { value: 'nicobar', label: 'Nicobar' },
    { value: 'north_and_middle_andaman', label: 'North and Middle Andaman' },
    { value: 'south_andaman', label: 'South Andaman' }
  ],
  'Chandigarh': [
    { value: 'chandigarh', label: 'Chandigarh' }
  ],
  'Dadra and Nagar Haveli and Daman and Diu': [
    { value: 'dadra_and_nagar_haveli', label: 'Dadra and Nagar Haveli' },
    { value: 'daman', label: 'Daman' },
    { value: 'diu', label: 'Diu' }
  ],
  'Delhi': [
    { value: 'central_delhi', label: 'Central Delhi' },
    { value: 'east_delhi', label: 'East Delhi' },
    { value: 'new_delhi', label: 'New Delhi' },
    { value: 'north_delhi', label: 'North Delhi' },
    { value: 'north_east_delhi', label: 'North East Delhi' }
  ],
  'Jammu and Kashmir': [
    { value: 'anantnag', label: 'Anantnag' },
    { value: 'bandipore', label: 'Bandipore' },
    { value: 'baramulla', label: 'Baramulla' },
    { value: 'budgam', label: 'Budgam' },
    { value: 'doda', label: 'Doda' }
  ],
  'Ladakh': [
    { value: 'kargil', label: 'Kargil' },
    { value: 'leh', label: 'Leh' }
  ],
  'Lakshadweep': [
    { value: 'lakshadweep', label: 'Lakshadweep' }
  ],
  'Puducherry': [
    { value: 'karaikal', label: 'Karaikal' },
    { value: 'mahe', label: 'Mahe' },
    { value: 'puducherry', label: 'Puducherry' },
    { value: 'yanam', label: 'Yanam' }
  ]
};

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
    BranchType: '',
    SERegistrationNumber: '',
    SEValidity: '',
  });

  const branchTypeOptions = [
    { value: 'rented', label: 'Rented' },
    { value: 'owned', label: 'Owned' },
  ];

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

  const districtOptions = formData.State ? (districtsByState[formData.State] || []) : [];

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
              options={indianStates}
              value={indianStates.find(option => option.label === formData.State)}
              onChange={(selectedOption: SelectOption | null) => {
                setFormData(prev => ({
                  ...prev,
                  State: selectedOption?.label || '',
                  District: '',
                }));
              }}
            />
          </div>
          <div>
            <p className="mb-2">District</p>
            <OutlinedSelect
              label="Select District"
              options={districtOptions}
              value={districtOptions.find(option => option.label === formData.District)}
              onChange={(selectedOption: SelectOption | null) => {
                setFormData(prev => ({
                  ...prev,
                  District: selectedOption?.label || '',
                }));
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
            <p className="mb-2">Branch Location</p>
            <OutlinedInput
              label="Branch Location"
              value={formData.Location}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, Branch: value }));
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

        <div>
            <p className="mb-2">Branch Address</p>
            <OutlinedInput
              label="Branch Address"
              value={formData.BranchAddress}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, BranchAddress: value }));
              }}
              textarea={true}
            />
          </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <p className="mb-2">Branch Opening Date</p>
            <DatePicker 
              size='sm' 
              placeholder="Pick a Date"
              onChange={(date) => {
                setFormData(prev => ({ ...prev, BranchOpeningDate: date ? date.toString() : '' }));
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
          <p className="mb-2">Branch Type</p>
          <OutlinedSelect
            label="Select Branch Type"
            options={branchTypeOptions}
            value={branchTypeOptions.find(option => option.value === formData.BranchType)}
            onChange={(selectedOption: SelectOption | null) => {
              setFormData(prev => ({
                ...prev,
                BranchType: selectedOption?.value || '',
              }));
            }}
          />
        </div>
    
        </div>
      



        {formData.BranchType === 'owned' && (
        <div className='border rounded-md py-4 p-2 mt-4'>
          <div className='flex flex-col gap-8'>
            <h4>S&E Setup</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
              <div>
                <p className="mb-2">S&E Registration Number</p>
                <OutlinedInput
                label="S&E Registration Number"
                value={formData.SERegistrationNumber}
                onChange={(value: string) => {
                  setFormData(prev => ({ ...prev, SERegistrationNumber: value }));
                  }}
                  />
              </div>
              <div>
              <p className="mb-2">S&E Validity</p>
            <DatePicker 
              size='sm' 
              placeholder="Pick a Date"
              onChange={(date) => {
                setFormData(prev => ({ ...prev, SEValidity: date ? date.toString() : '' }));
              }}
            />
              </div>
              <div>
              <div className='flex flex-col gap-4'>
             <label>Please upload the S&E Registration certificate</label>
             <Input
               id="file-upload"
               type="file"
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                 const file = e.target.files?.[0] || null;
               }}
             />
          </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {formData.BranchType === 'rented' && (
        <div className='border rounded-md py-4 p-2 mt-4'>
        <div className='flex flex-col gap-8'>
          <h4>Lease / Rent Setup</h4>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div>
              <p className="mb-2">Lease / Rent Agreement Status 
              </p>
              <OutlinedInput
              label="Status"
              value={formData.SERegistrationNumber}
              onChange={(value: string) => {
                setFormData(prev => ({ ...prev, SERegistrationNumber: value }));
                }}
                />
            </div>
            <div>
            <p className="mb-2">Lease deed / Rent Agreement  valid up to</p>
          <DatePicker 
            size='sm' 
            placeholder="Pick a Date"
            onChange={(date) => {
              setFormData(prev => ({ ...prev, SEValidity: date ? date.toString() : '' }));
            }}
          />
            </div>
            <div>
            <div className='flex flex-col gap-4'>
           <label>Please upload Leaase deed copy</label>
           <Input
             id="file-upload"
             type="file"
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
               const file = e.target.files?.[0] || null;
             }}
           />
        </div>
            </div>
          </div>
        </div>
      </div>
      )}

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