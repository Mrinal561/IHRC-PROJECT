import React, { useState } from 'react';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';

const dummyData = {
  indianStates: [
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
  ],
  branches: [
    // Delhi branches
    { value: 'DEL001', label: 'Connaught Place Main Branch' },
    { value: 'DEL002', label: 'Nehru Place Branch' },
    { value: 'DEL003', label: 'Dwarka Sector 10 Branch' },
    { value: 'DEL004', label: 'Lajpat Nagar Branch' },
    { value: 'DEL005', label: 'Rajouri Garden Branch' },
    // Mumbai branches
    { value: 'MUM001', label: 'Nariman Point Branch' },
    { value: 'MUM002', label: 'Bandra West Branch' },
    { value: 'MUM003', label: 'Andheri East Branch' },
    { value: 'MUM004', label: 'Worli Branch' },
    { value: 'MUM005', label: 'Thane West Branch' },
    // Bangalore branches
    { value: 'BLR001', label: 'MG Road Branch' },
    { value: 'BLR002', label: 'Electronic City Branch' },
    { value: 'BLR003', label: 'Whitefield Branch' },
    { value: 'BLR004', label: 'Koramangala Branch' },
    { value: 'BLR005', label: 'Indiranagar Branch' },
    // Chennai branches
    { value: 'CHE001', label: 'Anna Nagar Branch' },
    { value: 'CHE002', label: 'T Nagar Branch' },
    { value: 'CHE003', label: 'Adyar Branch' },
    { value: 'CHE004', label: 'Velachery Branch' },
    { value: 'CHE005', label: 'OMR Branch' },
    // Kolkata branches
    { value: 'KOL001', label: 'Park Street Branch' },
    { value: 'KOL002', label: 'Salt Lake Branch' },
    { value: 'KOL003', label: 'Howrah Branch' },
    { value: 'KOL004', label: 'New Town Branch' },
    { value: 'KOL005', label: 'Gariahat Branch' }
  ],
  registerStatus: [
    { value: 'january', label: 'January' },
    { value: 'february', label: 'February' },
    { value: 'march', label: 'March' },
    { value: 'april', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'June' },
    { value: 'july', label: 'July' },
    { value: 'august', label: 'August' },
    { value: 'september', label: 'September' },
    { value: 'october', label: 'October' },
    { value: 'november', label: 'November' },
    { value: 'december', label: 'December' },
  ],
  types:[
    { value: 'Uploaded', label: 'Uploaded' },
    { value: 'Not Uploaded', label: 'Not Uploaded' }
  ]
};

const BonusFilter = () => {
  const [selectedState, setSelectedState] = useState(dummyData.indianStates[0]);
  const [selectedBranches, setSelectedBranches] = useState(dummyData.branches[0]);
  const [selectedRegisterStatus, setSelectedRegisterStatus] = useState(dummyData.registerStatus[0]);
  const [selectedTypes, setSelectedTypes] = useState(dummyData.types[0]);

  return (
    <div className="flex gap-3 items-center">
      <div className="w-54 z-auto">
        <OutlinedSelect
          label="State"
          value={selectedState}
          onChange={setSelectedState}
          options={dummyData.indianStates}
        />
      </div>

      <div className="w-54 z-auto">
        <OutlinedSelect
          label="Branch"
          value={selectedBranches}
          onChange={setSelectedBranches}
          options={dummyData.branches}
        />
      </div>

      <div className="w-44 z-auto">
        <OutlinedSelect
          label="Month"
          value={selectedRegisterStatus}
          onChange={setSelectedRegisterStatus}
          options={dummyData.registerStatus}
        />
      </div>

      <div className="w-44 z-auto">
        <OutlinedSelect
          label="Types"
          value={selectedTypes}
          onChange={setSelectedTypes}
          options={dummyData.types}
        />
      </div>
    </div>
  );
};

export default BonusFilter;