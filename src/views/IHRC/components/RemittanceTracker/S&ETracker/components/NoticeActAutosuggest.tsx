import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import OutlinedInput from '@/components/ui/OutlinedInput';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

interface NoticeAct {
  id?: number;
  notice_act: string;
  created_at?: string;
  updated_at?: string;
}

const NoticeActAutosuggest = ({ 
  value, 
  onChange,
  onNoticeActSelect,
  label = "Notice Act",
  placeholder = "Enter Notice Act",
  isDisabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [noticeActs, setNoticeActs] = useState<NoticeAct[]>([]);
  const [filteredNoticeActs, setFilteredNoticeActs] = useState<NoticeAct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchAllNoticeActs = async () => {
    setIsLoading(true);
    try {
      const { data } = await httpClient.get(endpoints.common.noticeActSuggestions());
      const noticeActsData = Array.isArray(data) ? data : [data];
      setNoticeActs(noticeActsData);
      setFilteredNoticeActs(noticeActsData);
    } catch (error) {
      console.error('Error fetching notice acts:', error);
      setNoticeActs([]);
      setFilteredNoticeActs([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNoticeActs();
  }, []);

  useEffect(() => {
    const searchNoticeActs = async () => {
      if (!value) {
        setFilteredNoticeActs(noticeActs);
        return;
      }

      setIsLoading(true);
      try {
        const { data } = await httpClient.get(endpoints.common.noticeActSuggestions(), {
          params: { search: value }
        });
        const noticeActsData = Array.isArray(data) ? data : [data];
        setFilteredNoticeActs(noticeActsData);
      } catch (error) {
        console.error('Error fetching notice acts:', error);
        setFilteredNoticeActs([]);
      } finally {
        setIsLoading(false);
      }
    };

    searchNoticeActs();
  }, [value]);

  const handleCreateNoticeAct = async (noticeActName: string) => {
    if (isCreating) return;

    setIsCreating(true);
    try {
      const { data } = await httpClient.post(endpoints.common.createNoticeActType(), {
        notice_act: noticeActName
      });
      
      const newNoticeAct = data;
      setNoticeActs(prev => [...prev, newNoticeAct]);
      onChange(noticeActName);
      onNoticeActSelect(newNoticeAct.id || noticeActName);
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating notice act:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleSelect = (noticeAct: NoticeAct) => {
    onChange(noticeAct.notice_act);
    onNoticeActSelect(noticeAct.id || noticeAct.notice_act);
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
      handleCreateNoticeAct(value);
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
              Loading notice acts...
            </div>
          ) : filteredNoticeActs.length > 0 ? (
            <ul className="max-h-60 overflow-auto">
              {filteredNoticeActs.map((noticeAct) => (
                <li
                  key={noticeAct.id || noticeAct.notice_act}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(noticeAct)}
                >
                  {noticeAct.notice_act}
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
              onClick={() => !isCreating && handleCreateNoticeAct(value)}
            >
              {isCreating ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin mr-2" />
                  Creating notice act "{value}"...
                </>
              ) : (
                <>Press Enter to create notice act "{value}"</>
              )}
            </div>
          ) : (
            <div className="p-2 text-gray-500">No notice acts found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default NoticeActAutosuggest;