import React, { useState } from 'react'
import Button from '@/components/ui/Button'
import { HiDownload, HiPlusCircle } from 'react-icons/hi'
import RecommendedTableSearch from './RecommendedTableSearch'
import RecommendedFilter from './RecommendedFilter'
import { Link } from 'react-router-dom'
import { Dialog, toast, Notification, Select } from '../../../../../../components/ui'
import { ActionMeta, components, SingleValue } from 'react-select'
import { FaChevronDown } from 'react-icons/fa'
import CustomDateRangePicker from '../../../Home/components/CustomDateRangePicker'
import DashboardFilter from '../../../Home/components/DashboardFilter'




const AssignChecklistButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    

    const handleAssignClick = () => {
        setIsDialogOpen(true);
    };

    const handleConfirm = () => {
        setIsDialogOpen(false);
        toast.push(
          <Notification
            title="Success"
            type="success"
          >
            Compliance assigned successfully!
          </Notification>,
          {
            placement: 'top-end',
          }
        );
      };

    const handleCancel = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Button
                block
                variant="solid"
                size="sm"
                icon={<HiPlusCircle />}
                onClick={handleAssignClick}
            >
                Assign Checklist
            </Button>

            <Dialog
                isOpen={isDialogOpen}
                onClose={handleCancel}
                width={400}
            >
                <h5 className="mb-4">Confirm Assignment</h5>
                <p>Are you sure you want to assign the checked compliances?</p>
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
        </>
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



const RecommendedTableTool = () => {
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
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    
    const handleAssignClick = () => {
        setIsDialogOpen(true)
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    const handleConfirmAssign = () => {
        setIsDialogOpen(false)
        // Here you would typically call an API to assign the checklist
        // For this example, we'll just show a success toast
        toast.push(
            <div className="flex items-center gap-2">
                <span className="text-emerald-600">
                    <HiPlusCircle />
                </span>
                <span>Compliance assigned successfully!</span>
            </div>,
            { placement: 'top-center' }
        )
    }


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
        <>
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <RecommendedTableSearch />
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
            {/* <RecommendedFilter />
            <Link
                download
                className="block lg:inline-block md:mx-2 md:mb-0 mb-4"
                to="/data/product-list.csv"
                target="_blank"
            >
                <Button block size="sm" icon={<HiDownload />}>
                    Export
                </Button>
            </Link> */}
            <div className="block lg:inline-block md:mb-0 mb-4">
                <AssignChecklistButton />
            </div>
        </div>
        </>
    )
}

export default RecommendedTableTool