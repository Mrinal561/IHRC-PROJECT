
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
  value: string;
  onChange: (value: string) => void;
  onDistrictSelect: (id: number) => void;
  stateId?: number;
  label?: string;
  placeholder?: string;
}

const DistrictAutosuggest: React.FC<DistrictAutosuggestProps> = ({ 
  value, 
  onChange,
  onDistrictSelect,
  stateId,
  label = "District",
  placeholder = "Enter District"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [districts, setDistricts] = useState<District[]>([]);
  const [filteredDistricts, setFilteredDistricts] = useState<District[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);


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
        setDistricts(response.data);
      } catch (error) {
        console.error('Error fetching districts:', error);
        setDistricts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistricts();
  }, [stateId]);

  useEffect(() => {
    const filtered = districts.filter(district =>
      district.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDistricts(filtered);
  }, [value, districts]);

  const handleCreateDistrict = async (districtName: string) => {
    if (!stateId) return;

    try {
      const response = await httpClient.post(endpoints.common.district(), {
        name: districtName,
        state_id: stateId
      });
      
      const newDistrict = response.data;
      setDistricts(prev => [...prev, newDistrict]);
      onChange(districtName);
      onDistrictSelect(newDistrict.id);
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating district:', error);
    }
  };

  const handleSelect = (district: District) => {
    onChange(district.name);
    onDistrictSelect(district.id);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreateDistrict(value);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <p className="mb-2">{label} <span className="text-red-500">*</span></p>
      <div 
      className="relative"
      ref={inputWrapperRef}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      >
        <OutlinedInput
          value={value}
          onChange={(inputValue) => {
            onChange(inputValue);
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
                  onClick={() => handleSelect(district)}
                >
                  {district.name}
                </li>
              ))}
            </ul>
          ) : value && !isLoading ? (
            <div 
              className="p-2 text-gray-600 cursor-pointer hover:bg-gray-100"
              onClick={() => handleCreateDistrict(value)}
            >
            Press Enter to Create new district "{value}"
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