import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button, Tooltip } from '@/components/ui';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { APP_PREFIX_PATH } from '@/constants/route.constant';

interface ConfigDropdownProps {
  companyName: string;
  companyGroupName?: string;
  companyId: string;
  groupId:string;
}

const ConfigDropdown: React.FC<ConfigDropdownProps> = ({ 
  companyName, 
  companyGroupName, 
  companyId ,
  groupId
}) =>{
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();


  // console.log('ConfigDropdown Props:', { companyName, companyGroupName, companyId });
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target) &&
          dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSetupClick = (setupType) => {
    const urlSafeCompanyName = encodeURIComponent(companyName.replace(/\s+/g, '-').toLowerCase());
    navigate(`${APP_PREFIX_PATH}/IHRC/${setupType.toLowerCase()}-setup/${urlSafeCompanyName}`, { state: { companyName, companyGroupName,  companyId, groupId } });
    setIsOpen(false);
  };

  const options = [
    { key: 'PF', label: 'PF Setup' },
    { key: 'ESI', label: 'ESI Setup' },
    { key: 'PT', label: 'PT Setup' },
    { key: 'LWF', label: 'LWF Setup' },
  ];

  const updateDropdownPosition = () => {
    if (buttonRef.current && dropdownRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current.offsetWidth;
      dropdownRef.current.style.position = 'fixed';
      dropdownRef.current.style.top = `${rect.bottom + window.scrollY}px`;
      // Adjust the left position to move the dropdown more to the left
      dropdownRef.current.style.left = `${rect.left + window.scrollX - dropdownWidth + rect.width}px`;
    }
  };


  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      window.addEventListener('scroll', updateDropdownPosition);
      window.addEventListener('resize', updateDropdownPosition);
    }
    return () => {
      window.removeEventListener('scroll', updateDropdownPosition);
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [isOpen]);

  return (
    <>
      <Tooltip title="Click to Configure">
        <Button
          ref={buttonRef}
          size="sm"
          icon={<FiSettings />}
          onClick={() => setIsOpen(!isOpen)}
        />
      </Tooltip>
      {isOpen && ReactDOM.createPortal(
        <div 
          ref={dropdownRef}
          className="py-2 w-40 h-40 bg-white rounded-md shadow-xl mt-2 border border-gray-200 z-50"
        //   style={{ position: 'relative', }}
        >
          {options.map((option) => (
            <button
              key={option.key}
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => handleSetupClick(option.key)}
            >
              {option.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

export default ConfigDropdown;