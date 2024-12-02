
import React, { useState, useRef, useEffect, KeyboardEvent  } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import OutlinedInput from '@/components/ui/OutlinedInput';
interface District {
  id: number;
  name: string;
}

interface DistrictAutosuggestProps {
  value: { id: number | null; name: string };
  onChange: (value: { id: number | null; name: string }) => void;
  stateId?: number;
  label?: string;
  placeholder?: string;
  onDistrictSelect?: (id: number) => void;
}

const DistrictAutosuggest: React.FC<DistrictAutosuggestProps> = ({ 
  value, 
  onChange,
  stateId,
  label = "District",
  placeholder = "Enter District",
  onDistrictSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [districts, setDistricts] = useState<District[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  // Fetch districts effect
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!stateId) {
        setDistricts([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await httpClient.get(endpoints.common.district(), {
          params: { state_id: stateId }
        });
        
        const districtsData = response.data.data || response.data;
        console.log('Districts Data:', districtsData);
        
        const formattedDistricts = Array.isArray(districtsData) 
          ? districtsData.map((district: any) => ({
              id: district.id,
              name: district.name
            }))
          : [];
        
        setDistricts(formattedDistricts);
        
        // Update filtered districts immediately
        const filtered = formattedDistricts.filter(district =>
          district.name.toLowerCase().includes((value.name || '').toLowerCase())
        );
        setFilteredDistricts(filtered);

      } catch (error) {
        console.error('Error fetching districts:', error);
        setDistricts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistricts();
  }, [stateId, value.name]);

  // Update filtered districts when districts or search value changes
  useEffect(() => {
    if (districts.length > 0) {
      const filtered = districts.filter(district =>
        district.name.toLowerCase().includes((value.name || '').toLowerCase())
      );
      setFilteredDistricts(filtered);
    }
  }, [districts, value.name]);

  const handleCreateDistrict = async (districtName: string) => {
    if (!stateId) return;

    try {
      const response = await httpClient.post(endpoints.common.district(), {
        name: districtName,
        state_id: stateId
      });
      
      const newDistrict = response.data;
      setDistricts(prevDistricts => [...prevDistricts, newDistrict]);
      
      onChange({ id: newDistrict.id, name: districtName });
      onDistrictSelect?.(newDistrict.id);
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating district:', error);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <p className="mb-2">{label}</p>
       {/* <span className="text-red-500">*</span> */}
      <div 
        className="relative"
        ref={inputWrapperRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleCreateDistrict(value.name);
          }
        }}
        tabIndex={-1}
      >
        <OutlinedInput
          value={value.name}
          onChange={(inputValue) => {
            onChange({ id: null, name: inputValue });
            setIsOpen(true);
          }}
          label={placeholder}
        />
        <button
          onClick={() => stateId && setIsOpen(!isOpen)}
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
          disabled={!stateId}
        >
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {isLoading ? (
            <div className="p-2 text-gray-500">Loading districts...</div>
          ) : filteredDistricts.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredDistricts.map((district) => (
                <li
                  key={district.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    onChange({ id: district.id, name: district.name });
                    onDistrictSelect?.(district.id);
                    setIsOpen(false);
                  }}
                >
                  {district.name}
                </li>
              ))}
            </ul>
          ) : value.name && !isLoading ? (
            <div 
              className="p-2 text-gray-600 cursor-pointer hover:bg-gray-100"
              onClick={() => handleCreateDistrict(value.name)}
            >
              Press Enter to Create new district "{value.name}"
            </div>
          ) : (
            <div className="p-2 text-gray-500">
              {stateId ? 'No districts found' : 'Please select a state first'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DistrictAutosuggest;