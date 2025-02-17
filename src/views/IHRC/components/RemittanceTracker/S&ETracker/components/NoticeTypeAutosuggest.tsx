import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import OutlinedInput from '@/components/ui/OutlinedInput';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface NoticeType {
  id?: number;
  notice_type: string;
  created_at?: string;
  updated_at?: string;
}

const NoticeTypeAutosuggest = ({ 
  value, 
  onChange,
  onNoticeTypeSelect,
  label = "Notice Type",
  placeholder = "Enter Notice Type",
  isDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noticeTypes, setNoticeTypes] = useState<NoticeType[]>([]);
  const [filteredNoticeTypes, setFilteredNoticeTypes] = useState<NoticeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchAllNoticeTypes = async () => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.get(endpoints.common.noticeTypeSuggestions());
      const noticeTypesData = Array.isArray(data) ? data : [data];
      setNoticeTypes(noticeTypesData);
      setFilteredNoticeTypes(noticeTypesData);
    } catch (error) {
      console.error('Error fetching notice types:', error);
      setNoticeTypes([]);
      setFilteredNoticeTypes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNoticeTypes();
  }, []);

  useEffect(() => {
    const searchNoticeTypes = async () => {
      if (!value) {
        setFilteredNoticeTypes(noticeTypes);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await httpClient.get(endpoints.common.noticeTypeSuggestions(), {
          params: { search: value }
        });
        const noticeTypesData = Array.isArray(data) ? data : [data];
        setFilteredNoticeTypes(noticeTypesData);
      } catch (error) {
        console.error('Error fetching notice types:', error);
        setFilteredNoticeTypes([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchNoticeTypes();
  }, [value]);

  const handleCreateNoticeType = async (noticeTypeName: string) => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      const { data } = await httpClient.post(endpoints.common.createNoticeType(), {
        notice_type: noticeTypeName
      });
      
      const newNoticeType = data;
      setNoticeTypes(prev => [...prev, newNoticeType]);
      onChange(noticeTypeName);
      onNoticeTypeSelect(newNoticeType.id || noticeTypeName);
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating notice type:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelect = (noticeType: NoticeType) => {
    onChange(noticeType.notice_type);
    onNoticeTypeSelect(noticeType.id || noticeType.notice_type);
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
      handleCreateNoticeType(value);
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
              Loading notice types...
            </div>
          ) : filteredNoticeTypes.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredNoticeTypes.map((noticeType) => (
                <li
                  key={noticeType.id || noticeType.notice_type}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(noticeType)}
                >
                  {noticeType.notice_type}
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
              onClick={() => !isCreating && handleCreateNoticeType(value)}
            >
              {isCreating ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                  Creating notice type "{value}"...
                </>
              ) : (
                <>Press Enter to create notice type "{value}"</>
              )}
            </div>
          ) : (
            <div className="p-2 text-gray-500">No notice types found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeTypeAutosuggest;