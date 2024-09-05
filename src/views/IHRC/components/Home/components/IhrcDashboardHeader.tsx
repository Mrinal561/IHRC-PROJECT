// import React, { useState } from 'react'
// import Select from '@/components/ui/Select'
// import { ActionMeta, components, SingleValue } from 'react-select'
// import CustomDateRangePicker from './CustomDateRangePicker'
// import { FaChevronDown } from 'react-icons/fa';
// import { Button, Drawer } from '@/components/ui';
// import { HiOutlineFilter } from 'react-icons/hi';
// import { setPanelExpand, useAppDispatch, useAppSelector } from '@/store';
// import SidePanelContent, { SidePanelContentProps } from '@/components/template/SidePanel/SidePanelContent';
// import { CommonProps } from '@/@types/common';
// import classNames from 'classnames';
// import DashboardFilter from './DashboardFilter';

// interface OptionType {
//     value: string;
//     label: string;
// }

// type SidePanelProps = SidePanelContentProps & CommonProps


// const customStyles = {
//     control: (provided: any) => ({
//         ...provided,
//         borderRadius: 0,
//         border: 'none',
//         borderBottom: '1px solid #e2e8f0',
//         boxShadow: 'none',
//         '&:hover': {
//             borderBottom: '1px solid #718096',
//         },
//     }),
//     indicatorSeparator: () => ({
//         display: 'none',
//     }),
//     dropdownIndicator: (provided: any) => ({
//         ...provided,
//         color: '#718096',
//     }),
//     placeholder: (provided: any) => ({
//         ...provided,
//         color: '#718096',
//     }),
// }
// const DropdownIndicator = (props: any) => {
//     return (
//         <components.DropdownIndicator {...props}>
//             <FaChevronDown size={12} />
//         </components.DropdownIndicator>
//     );
// };

// const IhrcDashboardHeader = (props: SidePanelProps) => {
//     const [companyGroup, setCompanyGroup] = useState<OptionType | null>(null)
//     const [company, setCompany] = useState<OptionType | null>(null)
//     const [state, setState] = useState<OptionType | null>(null)
//     const [branch, setBranch] = useState<OptionType | null>(null)
//     const [startDate, setStartDate] = useState<Date | null>(null)
//     const [endDate, setEndDate] = useState<Date | null>(null)

//     const handleSelectChange = (
//         setValue: React.Dispatch<React.SetStateAction<OptionType | null>>
//     ) => (
//         newValue: SingleValue<OptionType>,
//         actionMeta: ActionMeta<OptionType>
//     ) => {
//         setValue(newValue)
//     }

//     const handleDateRangeApply = (start: Date, end: Date) => {
//         setStartDate(start)
//         setEndDate(end)
//     }

//     const dispatch = useAppDispatch()

//     const { className, ...rest } = props

//     const panelExpand = useAppSelector((state) => state.theme.panelExpand)

//     const direction = useAppSelector((state) => state.theme.direction)

//     const openPanel = () => {
//         dispatch(setPanelExpand(true))
//     }

//     const closePanel = () => {
//         dispatch(setPanelExpand(false))
//         const bodyClassList = document.body.classList
//         if (bodyClassList.contains('drawer-lock-scroll')) {
//             bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
//         }
//     }

//     return (
//         <div className="">
//              {/* <div className='flex items-center justify-center mb-6 space-x-10'>
//                     <Select<OptionType>
//                         value={companyGroup}
//                         onChange={handleSelectChange(setCompanyGroup)}
//                         options={[{ value: 'Company Group', label: 'Company Group' }]}
//                         placeholder="Company Group"
//                         className="w-[220px]"
//                         styles={customStyles}
//                         components={{ DropdownIndicator }}
//                     />
//                     <Select<OptionType>
//                         value={company}
//                         onChange={handleSelectChange(setCompany)}
//                         options={[{ value: 'Company', label: 'Company' }]}
//                         placeholder="Company"
//                         className="w-[180px]"
//                         styles={customStyles}
//                         components={{ DropdownIndicator }}
//                     />
//                     <Select<OptionType>
//                         value={state}
//                         onChange={handleSelectChange(setState)}
//                         options={[{ value: 'State', label: 'State' }]}
//                         placeholder="State"
//                         className="w-[180px]"
//                         styles={customStyles}
//                         components={{ DropdownIndicator }}
//                     />
//                     <Select<OptionType>
//                         value={branch}
//                         onChange={handleSelectChange(setBranch)}
//                         options={[{ value: 'Branch', label: 'Branch' }]}
//                         placeholder="Branch"
//                         className="w-[180px]"
//                         styles={customStyles}
//                         components={{ DropdownIndicator }}
//                     />
//                 </div> */}
//             <div className='flex flex-col lg:flex-row lg:items-center gap-3 justify-between'>
//                 <div className="mb-4 lg:mb-0">
//                     <h3 className="text-2xl font-bold">DASHBOARD</h3>
//                     <p className="text-gray-600">View your company's compliance statistics</p>
//                 </div>
//                 <div className='flex flex-col lg:flex-row lg:items-center gap-3 justify-center'>
//                     <CustomDateRangePicker onApply={handleDateRangeApply} />
//                     {/* <Button size="sm" icon={<HiOutlineFilter />}>
//                     Filter
//                 </Button> */}
//                 {/* <div
//                 className={classNames('text-2xl', className)}
//                 onClick={openPanel}
//                 {...rest}
//             >
//                 <Button size="sm" icon={<HiOutlineFilter />}>
//                     Filter
//                 </Button>
//             </div>
//             <Drawer
//                 title="Theme Config"
//                 isOpen={panelExpand}
//                 placement={direction === 'rtl' ? 'left' : 'right'}
//                 width={375}
//                 onClose={closePanel}
//                 onRequestClose={closePanel}
//             >
//                 <SidePanelContent callBackClose={closePanel} />
//             </Drawer> */}
//             <DashboardFilter />
//                 </div>
//             </div>
           
//         </div>
//     )
// }

// export default IhrcDashboardHeader




// import React, { useState } from 'react';
// import Select from '@/components/ui/Select';
// import { ActionMeta, components, SingleValue } from 'react-select';
// import CustomDateRangePicker from './CustomDateRangePicker';
// import { FaChevronDown } from 'react-icons/fa';
// import { FaFilter } from 'react-icons/fa';
// import DashboardFilter from './DashboardFilter';

// interface OptionType {
//     value: string;
//     label: string;
// }

// const customStyles = {
//     control: (provided: any) => ({
//         ...provided,
//         borderRadius: 0,
//         // border: '1px solid #e2e8f0',
//         // borderBottom: '1px solid #e2e8f0',
//         boxShadow: 'none',
//         '&:hover': {
//             // borderBottom: '1px solid #718096',
//         },
//     }),
//     indicatorSeparator: () => ({
//         display: 'none',
//     }),
//     dropdownIndicator: (provided: any) => ({
//         ...provided,
//         color: '#718096',
//     }),
//     placeholder: (provided: any) => ({
//         ...provided,
//         color: '#718096',
//     }),
// };

// const DropdownIndicator = (props: any) => {
//     return (
//         <components.DropdownIndicator {...props}>
//             <FaChevronDown size={12} />
//         </components.DropdownIndicator>
//     );
// };

// const IhrcDashboardHeader = () => {
//     const [companyGroup, setCompanyGroup] = useState<OptionType | null>(null);
//     const [company, setCompany] = useState<OptionType | null>(null);
//     const [state, setState] = useState<OptionType | null>(null);
//     const [branch, setBranch] = useState<OptionType | null>(null);
//     const [startDate, setStartDate] = useState<Date | null>(null);
//     const [endDate, setEndDate] = useState<Date | null>(null);
//     const [isAccordionOpen, setIsAccordionOpen] = useState(false);

//     const handleSelectChange = (
//         setValue: React.Dispatch<React.SetStateAction<OptionType | null>>
//     ) => (
//         newValue: SingleValue<OptionType>,
//         actionMeta: ActionMeta<OptionType>
//     ) => {
//         setValue(newValue);
//     };

//     const handleDateRangeApply = (start: Date, end: Date) => {
//         setStartDate(start);
//         setEndDate(end);
//     };

//     const toggleAccordion = () => {
//         setIsAccordionOpen(!isAccordionOpen);
//     };

//     return (
//         <div className="">
//             <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
//                 <div className="mb-4 lg:mb-0">
//                     <h3 className="text-2xl font-bold">DASHBOARD</h3>
//                     <p className="text-gray-600">View your company's compliance statistics</p>
//                 </div>
//                 <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-center">                  
//                     <CustomDateRangePicker onApply={handleDateRangeApply}/>
//                     <div>
//                         <DashboardFilter />
//                     </div>
//                 </div>
//             </div>
        
//         </div>
//     );
// };

// export default IhrcDashboardHeader;

import React, { useState } from 'react';
import Select from '@/components/ui/Select';
import { ActionMeta, components, SingleValue } from 'react-select';
import CustomDateRangePicker from './CustomDateRangePicker';
import { FaChevronDown } from 'react-icons/fa';
import DashboardFilter from './DashboardFilter';

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

const IhrcDashboardHeader = () => {
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
        <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-bold">DASHBOARD</h3>
                    <p className="text-gray-600">View your company's compliance statistics</p>
                </div>
                <div className="flex items-center gap-3">
                    <Select<OptionType>
                        value={companyGroup}
                        onChange={handleCompanyGroupChange}
                        options={companyGroupOptions}
                        className="w-[160px]"
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
        </div>
    );
};

export default IhrcDashboardHeader;



// import React, { useState } from 'react';
// import Select from '@/components/ui/Select';
// import { ActionMeta, components, SingleValue } from 'react-select';
// import CustomDateRangePicker from './CustomDateRangePicker';
// import { FaChevronDown } from 'react-icons/fa';
// import { FaFilter } from 'react-icons/fa';

// interface OptionType {
//     value: string;
//     label: string;
// }

// const DropdownIndicator = (props: any) => {
//     return (
//         <components.DropdownIndicator {...props}>
//             <FaChevronDown size={12} />
//         </components.DropdownIndicator>
//     );
// };

// const IhrcDashboardHeader = () => {
//     const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
//     const [companyGroup, setCompanyGroup] = useState<OptionType | null>(null);
//     const [company, setCompany] = useState<OptionType | null>(null);
//     const [state, setState] = useState<OptionType | null>(null);
//     const [branch, setBranch] = useState<OptionType | null>(null);
//     const [startDate, setStartDate] = useState<Date | null>(null);
//     const [endDate, setEndDate] = useState<Date | null>(null);
//     const [isAccordionOpen, setIsAccordionOpen] = useState(false);

//     const handleSelectChange = (
//         newValue: SingleValue<OptionType>,
//         actionMeta: ActionMeta<OptionType>
//     ) => {
//         switch (actionMeta.name) {
//             case 'companyGroup':
//                 setCompanyGroup(newValue);
//                 setIsAccordionOpen(true);
//                 break;
//             case 'company':
//                 setCompany(newValue);
//                 setIsAccordionOpen(true);
//                 break;
//             case 'state':
//                 setState(newValue);
//                 setIsAccordionOpen(true);
//                 break;
//             case 'branch':
//                 setBranch(newValue);
//                 setIsAccordionOpen(!isAccordionOpen);
//                 break;
//             default:
//                 break;
//         }
//     };

//     const handleDateRangeApply = (start: Date, end: Date) => {
//         setStartDate(start);
//         setEndDate(end);
//     };

//     return (
//         <div className="">
//             <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
//                 <div className="mb-4 lg:mb-0">
//                     <h3 className="text-2xl font-bold">DASHBOARD</h3>
//                     <p className="text-gray-600">View your company's compliance statistics</p>
//                 </div>
//                 <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-end">
//                     {isAccordionOpen && (
//                         <div className="flex flex-col lg:flex-row lg:items-center gap-3">
//                             <Select<OptionType>
//                                 value={companyGroup}
//                                 onChange={(newValue) => handleSelectChange(newValue, { name: 'companyGroup' })}
//                                 options={[{ value: 'Company Group', label: 'Company Group' }]}
//                                 placeholder={'Company Group'}
//                                 className="w-[120px] truncate"
//                                 components={{ DropdownIndicator }}
//                             />
//                             <Select<OptionType>
//                                 value={company}
//                                 onChange={(newValue) => handleSelectChange(newValue, { name: 'company' })}
//                                 options={[{ value: 'Company', label: 'Company' }]}
//                                 placeholder={'Company'}
//                                 className="w-[120px]"
//                                 components={{ DropdownIndicator }}
//                             />
//                             <Select<OptionType>
//                                 value={state}
//                                 onChange={(newValue) => handleSelectChange(newValue, { name: 'state' })}
//                                 options={[{ value: 'State', label: 'State' }]}
//                                 placeholder={'State'}
//                                 className="w-[100px]"
//                                 components={{ DropdownIndicator }}
//                             />
//                         </div>
//                     )}
//                     <div className="flex flex-col lg:flex-row lg:items-center gap-3">
//                         <Select<OptionType>
//                             value={branch}
//                             onChange={(newValue) => handleSelectChange(newValue, { name: 'branch' })}
//                             options={[{ value: 'Branch', label: 'Branch' }]}
//                             placeholder={'Branch'}
//                             className="w-[100px]"
//                             components={{ DropdownIndicator }}
//                         />
//                         <CustomDateRangePicker onApply={handleDateRangeApply} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default IhrcDashboardHeader;



// import React, { useState } from 'react';
// import CustomDateRangePicker from './CustomDateRangePicker';
// import { Input } from '@/components/ui';

// interface OptionType {
//     value: string;
//     label: string;
// }

// const IhrcDashboardHeader = () => {
//     const [companyGroup, setCompanyGroup] = useState<string>('');
//     const [company, setCompany] = useState<string>('');
//     const [state, setState] = useState<string>('');
//     const [branch, setBranch] = useState<string>('');
//     const [startDate, setStartDate] = useState<Date | null>(null);
//     const [endDate, setEndDate] = useState<Date | null>(null);

//     const handleDateRangeApply = (start: Date, end: Date) => {
//         setStartDate(start);
//         setEndDate(end);
//     };

//     return (
//         <div className="">
//             <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
//                 <div className="mb-4 lg:mb-0">
//                     <h3 className="text-2xl font-bold">DASHBOARD</h3>
//                     <p className="text-gray-600">View your company's compliance statistics</p>
//                 </div>
//                 <div className="flex flex-col lg:flex-row lg:items-center gap-2 justify-center">
//                     <div>
//                         <Input 
//                             list="companyGroupOptions" 
//                             value={companyGroup} 
//                             onChange={(e) => setCompanyGroup(e.target.value)} 
//                             placeholder="Company Group"
//                             className="w-[150px] border-b border-gray-300 focus:outline-none"
//                         />
//                         <datalist id="companyGroupOptions">
//                             <option value="Company Group 1" />
//                             <option value="Company Group 2" />
//                             <option value="Company Group 3" />
//                         </datalist>
//                     </div>
//                     <div>
//                         <Input 
//                             list="companyOptions" 
//                             value={company} 
//                             onChange={(e) => setCompany(e.target.value)} 
//                             placeholder="Company"
//                             className="w-[120px] border-b border-gray-300 focus:outline-none"
//                         />
//                         <datalist id="companyOptions">
//                             <option value="Company 1" />
//                             <option value="Company 2" />
//                             <option value="Company 3" />
//                         </datalist>
//                     </div>
//                     <div>
//                         <Input 
//                             list="stateOptions" 
//                             value={state} 
//                             onChange={(e) => setState(e.target.value)} 
//                             placeholder="State"
//                             className="w-[100px] border-b border-gray-300 focus:outline-none"
//                         />
//                         <datalist id="stateOptions">
//                             <option value="State 1" />
//                             <option value="State 2" />
//                             <option value="State 3" />
//                         </datalist>
//                     </div>
//                     <div>
//                         <Input 
//                             list="branchOptions" 
//                             value={branch} 
//                             onChange={(e) => setBranch(e.target.value)} 
//                             placeholder="Branch"
//                             className="w-[110px] border-b border-gray-300 focus:outline-none"
//                         />
//                         <datalist id="branchOptions">
//                             <option value="Branch 1" />
//                             <option value="Branch 2" />
//                             <option value="Branch 3" />
//                         </datalist>
//                     </div>
//                     <CustomDateRangePicker onApply={handleDateRangeApply}/>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default IhrcDashboardHeader;

