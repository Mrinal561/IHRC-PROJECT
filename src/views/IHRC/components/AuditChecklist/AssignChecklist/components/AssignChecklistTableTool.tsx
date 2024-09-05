import React, { useState } from 'react';
import { Button, Dialog, Tooltip, toast, Notification, Select } from '@/components/ui';
import { HiDownload, HiPlusCircle } from 'react-icons/hi';
import { FaDownload } from 'react-icons/fa';
import AssignChecklistTableFilter from './AssignChecklistTableFilter';
import AssignChecklistTableSearch from './AssignChecklistTableSearch';
import BulkAlertButton from './BulkAlertButton';
import { ActionMeta, components, SingleValue } from 'react-select'
import { FaChevronDown } from 'react-icons/fa'
import DashboardFilter from '../../../Home/components/DashboardFilter'
// Instead of importing the file directly, we'll use a string path
const documentPath = "../store/AllMappedCompliancesDetails.xls";

const BulkSetOwnerApproverButton = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleAssignClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    setIsDialogOpen(false);
    // Here you would typically handle the file upload and remark submission
    // For this example, we'll just show a success notification
    toast.push(
      <Notification
        title="Success"
        type="success"
      >
        Owner/Approver set successfully!
      </Notification>,
      {
        placement: 'top-end',
      }
    );
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setRemark('');
    setFile(null);
  };

  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    // Implement the download functionality here
    // For example, you could use the `fetch` API to download the file
    fetch(documentPath)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'AllMappedCompliancesDetails.xls';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() => console.error('Download failed'));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className='flex items-center justify-center gap-3'>
    <BulkAlertButton/>
      <Button 
        block 
        variant="solid" 
        size="sm" 
        icon={<HiPlusCircle />} 
        onClick={handleAssignClick}
      >
        Bulk Owner/Approver
      </Button>

      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCancel}
        width={450}
      >
        <h5 className="mb-4">Set Owner/Approver</h5>
        <div className="my-4 flex items-center gap-2">
        <p>Download Assigned Compliance</p>
          <a href={documentPath} onClick={handleDownload} className="text-blue-600 hover:underline">
            <Button size='xs' icon={<HiDownload />} variant='solid'>Download</Button>
          </a>
        </div>
        <div className='flex flex-col gap-2'>
        <p>Upload Assigned Compliance</p>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4"
          />
        </div>
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={3}
          placeholder="Enter remark"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
        <div className="mt-6 text-right">
          <Button
            size="sm"
            className="mr-2"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="solid"
            size="sm"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
interface OptionType {
  value: string;
  label: string;
}

const customStyles = {
  control: (provided: any) => ({
      ...provided,
      minHeight: '36px',
      height: '36px',
      borderRadius: '0.375rem',
      border: '1px solid #e2e8f0',
      boxShadow: 'none',
      '&:hover': {
          border: '1px solid #718096',
      },
  }),
  valueContainer: (provided: any) => ({
      ...provided,
      height: '36px',
      padding: '0 6px',
  }),
  input: (provided: any) => ({
      ...provided,
      margin: '0px',
  }),
  indicatorSeparator: () => ({
      display: 'none',
  }),
  indicatorsContainer: (provided: any) => ({
      ...provided,
      height: '36px',
  }),
  singleValue: (provided: any) => ({
      ...provided,
      maxWidth: 'calc(100% - 8px)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
  }),
  menu: (provided: any) => ({
      ...provided,
      width: 'auto',
      minWidth: '100%',
  }),
  menuList: (provided: any) => ({
      ...provided,
      width: '100%',
      minWidth: '100%',
  }),
  option: (provided: any) => ({
      ...provided,
      whiteSpace: 'nowrap',
  }),
}

const DropdownIndicator = (props: any) => {
  return (
      <components.DropdownIndicator {...props}>
          <FaChevronDown size={12} />
      </components.DropdownIndicator>
  );
};



const AssignChecklistTableTool = () => {
  const companyGroupOptions: OptionType[] = [
    { value: 'group1', label: 'Company Group 1' },
    { value: 'group2', label: 'Company Group 2' },
    { value: 'group3', label: 'Company Group 3' },
];

const companyOptions: OptionType[] = [
    { value: 'company1', label: 'CEAT' },
    // { value: 'company2', label: 'MRF' },
    // { value: 'company3', label: 'Globalsoft PVT. LTD.' },
];

const stateOptions: OptionType[] = [
    { value: 'state1', label: 'Bihar' },
    { value: 'state2', label: 'Jharkhand' },
    { value: 'state3', label: 'West Bengal' },
];

const branchOptions: OptionType[] = [
    { value: 'branch1', label: 'Muzaffarpur' },
    { value: 'branch2', label: 'Ranchi' },
    { value: 'branch3', label: 'Howrah' },
];


const [companyGroup, setCompanyGroup] = useState<OptionType>(companyGroupOptions[0]);
const [company, setCompany] = useState<OptionType>(companyOptions[0]);
const [state, setState] = useState<OptionType>(stateOptions[0]);
const [branch, setBranch] = useState<OptionType>(branchOptions[0]);

const handleCompanyGroupChange = (
  newValue: SingleValue<OptionType>,
  actionMeta: ActionMeta<OptionType>
) => {
  if (newValue) setCompanyGroup(newValue);
};

const handleCompanyChange = (
  newValue: SingleValue<OptionType>,
  actionMeta: ActionMeta<OptionType>
) => {
  if (newValue) setCompany(newValue);
};

const handleStateChange = (
  newValue: SingleValue<OptionType>,
  actionMeta: ActionMeta<OptionType>
) => {
  if (newValue) setState(newValue);
};

const handleBranchChange = (
  newValue: SingleValue<OptionType>,
  actionMeta: ActionMeta<OptionType>
) => {
  if (newValue) setBranch(newValue);
};
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div>
      {/* <AssignChecklistTableSearch /> */}
        </div>
        <div className="flex items-center gap-3">
                    <Select<OptionType>
                        value={companyGroup}
                        onChange={handleCompanyGroupChange}
                        options={companyGroupOptions}
                        className="w-[120px]"
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                    />
                    <Select<OptionType>
                        value={company}
                        onChange={handleCompanyChange}
                        options={companyOptions}
                        className="w-[120px]"
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                    />
                    <Select<OptionType>
                        value={state}
                        onChange={handleStateChange}
                        options={stateOptions}
                        className="w-[100px]"
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                    />
                    <Select<OptionType>
                        value={branch}
                        onChange={handleBranchChange}
                        options={branchOptions}
                        className="w-[100px]"
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                    />
                    {/* <CustomDateRangePicker onApply={handleDateRangeApply} /> */}
                    <DashboardFilter />
                </div>
      <div>
        <BulkSetOwnerApproverButton />
      </div>
    </div>
  );
};

export default AssignChecklistTableTool;