import React, { useState } from 'react'
import DashboardFilter from '../../../Home/components/DashboardFilter';
import { Select } from '@/components/ui';
import { ActionMeta, components, SingleValue } from 'react-select';
import { FaChevronDown } from 'react-icons/fa';
import CustomDateRangePicker from '../../../Home/components/CustomDateRangePicker';






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





const HistoryCompany = () => {

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
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

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
    const handleDateRangeApply = (start: Date, end: Date) => {
        setStartDate(start);
        setEndDate(end);
    };
  return (
    <div>
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
                    <CustomDateRangePicker onApply={handleDateRangeApply} />
                    <DashboardFilter />
                </div>
    </div>
  )
}

export default HistoryCompany