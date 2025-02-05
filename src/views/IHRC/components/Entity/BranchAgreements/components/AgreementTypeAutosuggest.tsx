import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import OutlinedInput from '@/components/ui/OutlinedInput';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface AgreementType {
  id?: number;
  agreement_type: string;
  created_at?: string;
  updated_at?: string;
}

const AgreementTypeAutosuggest = ({ 
  value, 
  onChange,
  onAgreementTypeSelect,
  label = "Agreement Type",
  placeholder = "Enter Agreement Type",
  isDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [agreementTypes, setAgreementTypes] = useState<AgreementType[]>([]);
  const [filteredAgreementTypes, setFilteredAgreementTypes] = useState<AgreementType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchAgreementTypes = async () => {
      if (!value) {
        setFilteredAgreementTypes([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await httpClient.get(endpoints.common.agreementTypeSuggestions(), {
          params: { search: value }
        });
        const agreementTypesData = Array.isArray(data) ? data : [data];
        setAgreementTypes(agreementTypesData);
        setFilteredAgreementTypes(agreementTypesData);
      } catch (error) {
        console.error('Error fetching agreement types:', error);
        setAgreementTypes([]);
        setFilteredAgreementTypes([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchAgreementTypes();
  }, [value]);

  const handleCreateAgreementType = async (agreementTypeName: string) => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      const { data } = await httpClient.post(endpoints.common.createAgreementType(), {
        agreement_type: agreementTypeName
      });
      
      const newAgreementType = data;
      setAgreementTypes(prev => [...prev, newAgreementType]);
      onChange(agreementTypeName);
      onAgreementTypeSelect(newAgreementType.id || agreementTypeName);
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating agreement type:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelect = (agreementType: AgreementType) => {
    onChange(agreementType.agreement_type);
    onAgreementTypeSelect(agreementType.id || agreementType.agreement_type);
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
      handleCreateAgreementType(value);
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
              Loading agreement types...
            </div>
          ) : filteredAgreementTypes.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredAgreementTypes.map((agreementType) => (
                <li
                  key={agreementType.id || agreementType.agreement_type}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(agreementType)}
                >
                  {agreementType.agreement_type}
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
              onClick={() => !isCreating && handleCreateAgreementType(value)}
            >
              {isCreating ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                  Creating agreement type "{value}"...
                </>
              ) : (
                <>Press Enter to create agreement type "{value}"</>
              )}
            </div>
          ) : (
            <div className="p-2 text-gray-500">No agreement types found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgreementTypeAutosuggest;