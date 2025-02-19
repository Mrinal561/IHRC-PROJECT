import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import OutlinedInput from '@/components/ui/OutlinedInput';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface StatusType {
  id?: number;
  status: string;
  created_at?: string;
  updated_at?: string;
}

const StatusAutoSuggest = ({ 
  value, 
  onChange,
  onStatusSelect,
  label = "Status",
  placeholder = "Enter Status",
  isDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [statuses, setStatuses] = useState<StatusType[]>([]);
  const [filteredStatuses, setFilteredStatuses] = useState<StatusType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchAllStatuses = async () => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.get(endpoints.noticeTracker.noticeStatusSuggestions());
      const statusesData = Array.isArray(data) ? data : [data];
      setStatuses(statusesData);
      setFilteredStatuses(statusesData);
    } catch (error) {
      console.error('Error fetching statuses:', error);
      setStatuses([]);
      setFilteredStatuses([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStatuses();
  }, []);

  useEffect(() => {
    const searchStatuses = async () => {
      if (!value) {
        setFilteredStatuses(statuses);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await httpClient.get(endpoints.noticeTracker.noticeStatusSuggestions(), {
          params: { search: value }
        });
        const statusesData = Array.isArray(data) ? data : [data];
        setFilteredStatuses(statusesData);
      } catch (error) {
        console.error('Error fetching statuses:', error);
        setFilteredStatuses([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchStatuses();
  }, [value]);

  const handleCreateStatus = async (statusName: string) => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      const { data } = await httpClient.post(endpoints.noticeTracker.createNoticeStatusSuggestions(), {
        status: statusName
      });
      
      const newStatus = data;
      setStatuses(prev => [...prev, newStatus]);
      onChange(statusName);
      onStatusSelect(newStatus.id || statusName);
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating status:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelect = (status: StatusType) => {
    onChange(status.status);
    onStatusSelect(status.id || status.status);
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
      handleCreateStatus(value);
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
              Loading statuses...
            </div>
          ) : filteredStatuses.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredStatuses.map((status) => (
                <li
                  key={status.id || status.status}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(status)}
                >
                  {status.status}
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
              onClick={() => !isCreating && handleCreateStatus(value)}
            >
              {isCreating ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                  Creating status "{value}"...
                </>
              ) : (
                <>Press Enter to create status "{value}"</>
              )}
            </div>
          ) : (
            <div className="p-2 text-gray-500">No statuses found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatusAutoSuggest;