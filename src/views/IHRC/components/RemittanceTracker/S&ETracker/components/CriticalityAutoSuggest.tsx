import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import OutlinedInput from '@/components/ui/OutlinedInput';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface CriticalityType {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

const CriticalityAutoSuggest = ({ 
  value, 
  onChange,
  onCriticalitySelect,
  label = "Criticality",
  placeholder = "Enter Criticality",
  isDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [criticalities, setCriticalities] = useState<CriticalityType[]>([]);
  const [filteredCriticalities, setFilteredCriticalities] = useState<CriticalityType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchAllCriticalities = async () => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.get(endpoints.noticeTracker.noticeCriticalitySuggestion());
      const criticalitiesData = Array.isArray(data) ? data : [data];
      setCriticalities(criticalitiesData);
      setFilteredCriticalities(criticalitiesData);
    } catch (error) {
      console.error('Error fetching criticalities:', error);
      setCriticalities([]);
      setFilteredCriticalities([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCriticalities();
  }, []);

  useEffect(() => {
    const searchCriticalities = async () => {
      if (!value) {
        setFilteredCriticalities(criticalities);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await httpClient.get(endpoints.noticeTracker.noticeCriticalitySuggestion(), {
          params: { search: value }
        });
        const criticalitiesData = Array.isArray(data) ? data : [data];
        setFilteredCriticalities(criticalitiesData);
      } catch (error) {
        console.error('Error fetching criticalities:', error);
        setFilteredCriticalities([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchCriticalities();
  }, [value]);

  const handleCreateCriticality = async (criticalityName: string) => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      const { data } = await httpClient.post(endpoints.noticeTracker.createNoticeCriticalitySuggestion(), {
        name: criticalityName
      });
      
      const newCriticality = data;
      setCriticalities(prev => [...prev, newCriticality]);
      onChange(criticalityName);
      onCriticalitySelect(newCriticality.id || criticalityName);
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating criticality:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelect = (criticality: CriticalityType) => {
    onChange(criticality.name);
    onCriticalitySelect(criticality.id || criticality.name);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCreateCriticality(value);
    }
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <p className="mb-2">{label} <span className="text-red-500">*</span></p>
      <div 
        className="relative"
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
          isDisabled={isDisabled || isCreating}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
          disabled={isDisabled || isCreating}
        >
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {isLoading ? (
            <div className="p-2 text-gray-500 flex items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              Loading criticalities...
            </div>
          ) : filteredCriticalities.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredCriticalities.map((criticality) => (
                <li
                  key={criticality.id || criticality.name}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(criticality)}
                >
                  {criticality.name}
                </li>
              ))}
            </ul>
          ) : value && !isLoading ? (
            <div 
              className={`p-2 text-gray-600 ${
                isCreating 
                  ? 'cursor-wait bg-gray-50' 
                  : 'cursor-pointer hover:bg-gray-100'
              } flex items-center justify-center`}
              onClick={() => !isCreating && handleCreateCriticality(value)}
            >
              {isCreating ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                  Creating criticality "{value}"...
                </>
              ) : (
                <>Press Enter to create criticality "{value}"</>
              )}
            </div>
          ) : (
            <div className="p-2 text-gray-500">No criticalities found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CriticalityAutoSuggest;