import { useState, useRef, forwardRef } from 'react'
import { HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { Field, Form, Formik, FormikProps, FieldProps } from 'formik'
import type { MouseEvent } from 'react'
import { Select } from '@/components/ui'
import { ActionMeta, components, SingleValue } from 'react-select'
import { FaChevronDown } from 'react-icons/fa'

type FormModel = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}
interface OptionType {
    value: string;
    label: string;
}
type FilterFormProps = {
    onSubmitComplete?: () => void
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

const FilterForm = forwardRef<FormikProps<FormModel>, FilterFormProps>(
    ({ onSubmitComplete }, ref) => {
        const [companyGroup, setCompanyGroup] = useState<OptionType | null>(null);
            const [company, setCompany] = useState<OptionType | null>(null);
            const [state, setState] = useState<OptionType | null>(null);
            const [branch, setBranch] = useState<OptionType | null>(null);
        const handleSelectChange = (
            setValue: React.Dispatch<React.SetStateAction<OptionType | null>>
        ) => (
            newValue: SingleValue<OptionType>,
            actionMeta: ActionMeta<OptionType>
        ) => {
            setValue(newValue)
        }
    
        return (
              <div className='flex flex-col w-full items-center justify-center mb-6 gap-10'>
                <div className='w-full flex flex-col gap-4'>
                    <p>Select Company Group</p>
                    <Select<OptionType>
                        value={companyGroup}
                        onChange={handleSelectChange(setCompanyGroup)}
                        options={[{ value: 'Company Group', label: 'Company Group' }]}
                        placeholder="Company Group"
                        className="w-full"
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                        />
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <p>Select Company Name</p>
                <Select<OptionType>
                        value={company}
                        onChange={handleSelectChange(setCompany)}
                        options={[{ value: 'Company', label: 'Company' }]}
                        placeholder="Company"
                        className="w-full"
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                    />
                </div>
                   <div className='w-full flex flex-col gap-4'>
                    <p>Select State</p>
                    <Select<OptionType>
                        value={state}
                        onChange={handleSelectChange(setState)}
                        options={[{ value: 'State', label: 'State' }]}
                        placeholder="State"
                        className="w-full"
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                        />
                        </div>

                        <div className='w-full flex flex-col gap-4'>
                            <p>Select Branch</p>
                    <Select<OptionType>
                        value={branch}
                        onChange={handleSelectChange(setBranch)}
                        options={[{ value: 'Branch', label: 'Branch' }]}
                        placeholder="Branch"
                        className="w-full"
                        styles={customStyles}
                        components={{ DropdownIndicator }}
                        />
                    </div>
                </div>
                
        )
    }
)
type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Cancel
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Confirm
            </Button>
        </div>
    )
}

const DashboardFilter = () => {
    const formikRef = useRef<FormikProps<FormModel>>(null)

    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => {
        setIsOpen(true)
    }

    const onDrawerClose = () => {
        setIsOpen(false)
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <>
            <Button
                size="sm"
                className="h-[36px]"
                icon={<HiOutlineFilter />}
            >
                Filter
            </Button>
            <Drawer
                title="Filter"
                isOpen={isOpen}
                footer={
                    <DrawerFooter
                        onCancel={onDrawerClose}
                        onSaveClick={formSubmit}
                    />
                }
                onClose={onDrawerClose}
                onRequestClose={onDrawerClose}
            >
                <FilterForm ref={formikRef} onSubmitComplete={onDrawerClose} />
            </Drawer>
        </>
    )
}

FilterForm.displayName = 'FilterForm'

export default DashboardFilter
