import classNames from 'classnames'
import { HEADER_HEIGHT_CLASS } from '@/constants/theme.constant'
import { useState, type ReactNode } from 'react'
import type { CommonProps } from '@/@types/common'
import Select, { ActionMeta, SingleValue, components } from 'react-select'
import { FaChevronDown } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

interface OptionType {
    value: string;
    label: string;
}

interface HeaderProps extends CommonProps {
    headerStart?: ReactNode
    headerEnd?: ReactNode
    headerMiddle?: ReactNode
    container?: boolean
}

const customStyles = {
    control: (provided: any) => ({
        ...provided,
        borderRadius: 0,
        border: 'none',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: 'none',
        '&:hover': {
            borderBottom: '1px solid #718096',
        },
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        color: '#718096',
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: '#718096',
    }),
}
const DropdownIndicator = (props: any) => {
    return (
        <components.DropdownIndicator {...props}>
            <FaChevronDown size={12} />
        </components.DropdownIndicator>
    );
};

const Header = (props: HeaderProps) => {
    const { headerStart, headerEnd, headerMiddle, className, container } = props
    const [companyGroup, setCompanyGroup] = useState<OptionType | null>(null)
    const [company, setCompany] = useState<OptionType | null>(null)
    const [state, setState] = useState<OptionType | null>(null)
    const [branch, setBranch] = useState<OptionType | null>(null)

    const location = useLocation();

    const handleSelectChange = (
        setValue: React.Dispatch<React.SetStateAction<OptionType | null>>
    ) => (
        newValue: SingleValue<OptionType>,
        actionMeta: ActionMeta<OptionType>
    ) => {
        setValue(newValue)
    }

    // const renderMiddleSection = () => {
    //     if (location.pathname === '/home') {
    //         return (
    //             <div className='flex items-center space-x-10'>
    //                 <Select<OptionType>
    //                     value={companyGroup}
    //                     onChange={handleSelectChange(setCompanyGroup)}
    //                     options={[{ value: 'Company Group', label: 'Company Group' }]}
    //                     placeholder="Company Group"
    //                     className="w-[220px]"
    //                     styles={customStyles}
    //                     components={{ DropdownIndicator }}
    //                 />
    //                 <Select<OptionType>
    //                     value={company}
    //                     onChange={handleSelectChange(setCompany)}
    //                     options={[{ value: 'Company', label: 'Company' }]}
    //                     placeholder="Company"
    //                     className="w-[180px]"
    //                     styles={customStyles}
    //                     components={{ DropdownIndicator }}
    //                 />
    //                 <Select<OptionType>
    //                     value={state}
    //                     onChange={handleSelectChange(setState)}
    //                     options={[{ value: 'State', label: 'State' }]}
    //                     placeholder="State"
    //                     className="w-[180px]"
    //                     styles={customStyles}
    //                     components={{ DropdownIndicator }}
    //                 />
    //                 <Select<OptionType>
    //                     value={branch}
    //                     onChange={handleSelectChange(setBranch)}
    //                     options={[{ value: 'Branch', label: 'Branch' }]}
    //                     placeholder="Branch"
    //                     className="w-[180px]"
    //                     styles={customStyles}
    //                     components={{ DropdownIndicator }}
    //                 />
    //             </div>
    //         )
    //     }
    //     return null;
    // }

    return (
        <header className={classNames('header', className)}>
            <div
                className={classNames(
                    'header-wrapper',
                    HEADER_HEIGHT_CLASS,
                    container && 'container mx-auto',
                    'flex items-center justify-between'
                )}
            >
                <div className="header-action header-action-start flex items-center">
                    {headerStart}
                </div>
                {/* {renderMiddleSection()} */}
                <div className="header-action header-action-end flex items-center">
                    {headerEnd}
                </div>
            </div>
        </header>
    )
}

export default Header