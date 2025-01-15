// // import classNames from 'classnames'
// // import Drawer from '@/components/ui/Drawer'
// // import { HiOutlineCog } from 'react-icons/hi'
// // import SidePanelContent, { SidePanelContentProps } from './SidePanelContent'
// // import withHeaderItem from '@/utils/hoc/withHeaderItem'
// // import { setPanelExpand, useAppSelector, useAppDispatch } from '@/store'
// // import type { CommonProps } from '@/@types/common'
// // import Notification from '../Notification'
// // import { Select } from '@/components/ui'
// // import { useEffect, useState } from 'react'
// // import OutlinedSelect from '@/components/ui/Outlined'
// // import {Badge} from '@/components/ui'
// // import OutlinedBadgeSelect from '@/components/ui/OutlinedBadgeSelect'

// // type SidePanelProps = SidePanelContentProps & CommonProps






// // interface Option {
// //     value: string;
// //     label: React.ReactNode;
// //   }
  
// //   interface FinancialYearFilterProps {
// //     onChange: (year: string) => void;
// //   }
  
// //   const FinancialYearFilter: React.FC<FinancialYearFilterProps> = ({ onChange }) => {
// //       const currentYear = new Date().getFullYear();
// //       const years = Array.from({ length: 5 }, (_, i) => `${currentYear - i}-${currentYear - i + 1}`);
      
// //       const [selectedYear, setSelectedYear] = useState<string>(years[0]);
  
// //       useEffect(() => {
// //           onChange(selectedYear);
// //       }, []);
  
// //       const options: Option[] = years.map(year => ({
// //           value: year,
// //           label: year
// //       }));
  
// //       const handleChange = (selectedOption: Option | null) => {
// //           if (selectedOption) {
// //               setSelectedYear(selectedOption.value);
// //               onChange(selectedOption.value);
// //           }
// //       };
// //       useEffect(()=>{
// //         console.log(selectedYear)
// //       },[selectedYear])
  
// //       return (
// //           <div className='w-52'>
// //               <OutlinedBadgeSelect
// //                   label="Financial Year"
// //                   value={options.find(option => option.value === selectedYear)}
// //                   options={options}
// //                   onChange={handleChange}
// //                   optionRenderer={(option, isSelected) => (
// //                       <div className="flex items-center justify-between w-full">
// //                           <span>{option.label}</span>
// //                           {isSelected && (
// //                               <Badge className="w-2 h-2 rounded-full bg-emerald-500" />
// //                           )}
// //                       </div>
// //                   )}
// //               />
// //           </div>
// //       );
// //   };

// // const _SidePanel = (props: SidePanelProps) => {
// //     const dispatch = useAppDispatch()

// //     const { className, ...rest } = props

// //     const panelExpand = useAppSelector((state) => state.theme.panelExpand)

// //     const direction = useAppSelector((state) => state.theme.direction)

// //     const [selectedFinancialYear, setSelectedFinancialYear] = useState(null)


// //     const openPanel = () => {
// //         dispatch(setPanelExpand(true))
// //     }

// //     const closePanel = () => {
// //         dispatch(setPanelExpand(false))
// //         const bodyClassList = document.body.classList
// //         if (bodyClassList.contains('drawer-lock-scroll')) {
// //             bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
// //         }
// //     }

// //     const handleFinancialYearChange = (year) => {
// //         setSelectedFinancialYear(year)
// //         // You can add any additional logic here, such as fetching data for the selected year
// //       }

// //     return (
// //         <div className='flex items-center'>
// //             <div className='flex items-center gap-6'>
// //             <FinancialYearFilter onChange={handleFinancialYearChange} />
// //                 <Notification />
// //             </div>
// //             <Drawer
// //                 title="Side Panel"
// //                 isOpen={panelExpand}
// //                 placement={direction === 'rtl' ? 'left' : 'right'}
// //                 width={375}
// //                 onClose={closePanel}
// //                 onRequestClose={closePanel}
// //             >
// //                 <SidePanelContent callBackClose={closePanel} />
// //             </Drawer>
// //         </div>
// //     )
// // }

// // const SidePanel = withHeaderItem(_SidePanel)

// // export default SidePanel



// // import Drawer from '@/components/ui/Drawer'
// // import { HiOutlineCog } from 'react-icons/hi'
// // import SidePanelContent, { SidePanelContentProps } from './SidePanelContent'
// // import withHeaderItem from '@/utils/hoc/withHeaderItem'
// // import { setPanelExpand, useAppSelector, useAppDispatch } from '@/store'
// // import type { CommonProps } from '@/@types/common'
// // import Notification from '../Notification'
// // import { Select } from '@/components/ui'
// // import { useEffect, useState } from 'react'
// // import OutlinedSelect from '@/components/ui/Outlined'
// // import {Badge} from '@/components/ui'
// // import OutlinedBadgeSelect from '@/components/ui/OutlinedBadgeSelect'

// // type SidePanelProps = SidePanelContentProps & CommonProps

// // interface Option {
// //     value: string;
// //     label: React.ReactNode;
// // }
  
// // interface FinancialYearFilterProps {
// //     onChange: (year: string) => void;
// // }
  
// // const FinancialYearFilter: React.FC<FinancialYearFilterProps> = ({ onChange }) => {
// //     const currentYear = new Date().getFullYear();
    
// //     // Create years array with different formats for value and label
// //     const years = Array.from({ length: 5 }, (_, i) => ({
// //         value: `${currentYear - i}-${(currentYear - i + 1).toString().slice(-2)}`,
// //         display: `${currentYear - i}-${currentYear - i + 1}`
// //     }));
    
// //     const [selectedYear, setSelectedYear] = useState<string>(years[0].value);

// //     useEffect(() => {
// //         onChange(selectedYear);
// //     }, []);

// //     const options: Option[] = years.map(year => ({
// //         value: year.value,
// //         label: year.display
// //     }));

// //     const handleChange = (selectedOption: Option | null) => {
// //         if (selectedOption) {
// //             setSelectedYear(selectedOption.value);
// //             onChange(selectedOption.value);
// //         }
// //     };

// //     useEffect(() => {
// //         console.log(selectedYear); // This will now log in format "2024-25"
// //     }, [selectedYear]);

// //     return (
// //         <div className='w-52'>
// //             <OutlinedBadgeSelect
// //                 label="Financial Year"
// //                 value={options.find(option => option.value === selectedYear)}
// //                 options={options}
// //                 onChange={handleChange}
// //                 optionRenderer={(option, isSelected) => (
// //                     <div className="flex items-center justify-between w-full">
// //                         <span>{option.label}</span>
// //                         {isSelected && (
// //                             <Badge className="w-2 h-2 rounded-full bg-emerald-500" />
// //                         )}
// //                     </div>
// //                 )}
// //             />
// //         </div>
// //     );
// // };

// // const _SidePanel = (props: SidePanelProps) => {
// //     const dispatch = useAppDispatch()

// //     const { className, ...rest } = props

// //     const panelExpand = useAppSelector((state) => state.theme.panelExpand)

// //     const direction = useAppSelector((state) => state.theme.direction)

// //     const [selectedFinancialYear, setSelectedFinancialYear] = useState(null)

// //     const openPanel = () => {
// //         dispatch(setPanelExpand(true))
// //     }

// //     const closePanel = () => {
// //         dispatch(setPanelExpand(false))
// //         const bodyClassList = document.body.classList
// //         if (bodyClassList.contains('drawer-lock-scroll')) {
// //             bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
// //         }
// //     }

// //     const handleFinancialYearChange = (year) => {
// //         setSelectedFinancialYear(year)
// //         // You can add any additional logic here, such as fetching data for the selected year
// //     }

// //     return (
// //         <div className='flex items-center'>
// //             <div className='flex items-center gap-6'>
// //                 <FinancialYearFilter onChange={handleFinancialYearChange} />
// //                 <Notification />
// //             </div>
// //             <Drawer
// //                 title="Side Panel"
// //                 isOpen={panelExpand}
// //                 placement={direction === 'rtl' ? 'left' : 'right'}
// //                 width={375}
// //                 onClose={closePanel}
// //                 onRequestClose={closePanel}
// //             >
// //                 <SidePanelContent callBackClose={closePanel} />
// //             </Drawer>
// //         </div>
// //     )
// // }

// // const SidePanel = withHeaderItem(_SidePanel)

// // export default SidePanel

// import Drawer from '@/components/ui/Drawer'
// import { HiOutlineCog } from 'react-icons/hi'
// import SidePanelContent, { SidePanelContentProps } from './SidePanelContent'
// import withHeaderItem from '@/utils/hoc/withHeaderItem'
// import { setPanelExpand, useAppSelector, useAppDispatch } from '@/store'
// import type { CommonProps } from '@/@types/common'
// import Notification from '../Notification'
// import { Select } from '@/components/ui'
// import { useEffect, useState } from 'react'
// import OutlinedSelect from '@/components/ui/Outlined'
// import {Badge} from '@/components/ui'
// import OutlinedBadgeSelect from '@/components/ui/OutlinedBadgeSelect'

// type SidePanelProps = SidePanelContentProps & CommonProps

// interface Option {
//     value: string;
//     label: React.ReactNode;
// }
  
// interface FinancialYearFilterProps {
//     onChange: (year: string) => void;
// }

// const FINANCIAL_YEAR_KEY = 'selectedFinancialYear';

// // Custom event name
// const FINANCIAL_YEAR_CHANGE_EVENT = 'financialYearChanged';

// const FinancialYearFilter: React.FC<FinancialYearFilterProps> = ({ onChange }) => {
//     const currentYear = new Date().getFullYear();
    
//     const years = Array.from({ length: 5 }, (_, i) => ({
//         value: `${currentYear - i}-${(currentYear - i + 1).toString().slice(-2)}`,
//         display: `${currentYear - i}-${currentYear - i + 1}`
//     }));
    
//     const [selectedYear, setSelectedYear] = useState<string>(() => {
//         const savedYear = sessionStorage.getItem(FINANCIAL_YEAR_KEY);
//         return savedYear || years[0].value;
//     });

//     useEffect(() => {
//         onChange(selectedYear);
//     }, []);

//     const options: Option[] = years.map(year => ({
//         value: year.value,
//         label: year.display
//     }));

//     const handleChange = (selectedOption: Option | null) => {
//         if (selectedOption) {
//             setSelectedYear(selectedOption.value);
//             // Store in session storage
//             sessionStorage.setItem(FINANCIAL_YEAR_KEY, selectedOption.value);
//             onChange(selectedOption.value);
//             // window.location.reload()
//             // Dispatch custom event
//             window.dispatchEvent(new CustomEvent(FINANCIAL_YEAR_CHANGE_EVENT, {
//                 detail: selectedOption.value
//             }));
//         }
//     };

//     return (
//         <div className='w-52'>
//             <OutlinedBadgeSelect
//                 label="Financial Year"
//                 value={options.find(option => option.value === selectedYear)}
//                 options={options}
//                 onChange={handleChange}
//                 optionRenderer={(option, isSelected) => (
//                     <div className="flex items-center justify-between w-full">
//                         <span>{option.label}</span>
//                         {isSelected && (
//                             <Badge className="w-2 h-2 rounded-full bg-emerald-500" />
//                         )}
//                     </div>
//                 )}
//             />
//         </div>
//     );
// };

// const _SidePanel = (props: SidePanelProps) => {
//     const dispatch = useAppDispatch()
//     const { className, ...rest } = props
//     const panelExpand = useAppSelector((state) => state.theme.panelExpand)
//     const direction = useAppSelector((state) => state.theme.direction)
    
//     // Update to use session storage for initial state
//     const [selectedFinancialYear, setSelectedFinancialYear] = useState(() => 
//         sessionStorage.getItem(FINANCIAL_YEAR_KEY)
//     );

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

//     const handleFinancialYearChange = (year: string) => {
//         setSelectedFinancialYear(year);
//         // You can add any additional logic here, such as fetching data for the selected year
//     }

//     return (
//         <div className='flex items-center'>
//             <div className='flex items-center gap-6'>
//                 <FinancialYearFilter onChange={handleFinancialYearChange} />
//                 <Notification />
//             </div>
//             <Drawer
//                 title="Side Panel"
//                 isOpen={panelExpand}
//                 placement={direction === 'rtl' ? 'left' : 'right'}
//                 width={375}
//                 onClose={closePanel}
//                 onRequestClose={closePanel}
//             >
//                 <SidePanelContent callBackClose={closePanel} />
//             </Drawer>
//         </div>
//     )
// }

// const SidePanel = withHeaderItem(_SidePanel)

// export default SidePanel

import Drawer from '@/components/ui/Drawer'
import { HiOutlineCog } from 'react-icons/hi'
import SidePanelContent, { SidePanelContentProps } from './SidePanelContent'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import { setPanelExpand, useAppSelector, useAppDispatch } from '@/store'
import type { CommonProps } from '@/@types/common'
import Notification from '../Notification'
import { Select } from '@/components/ui'
import { useEffect, useState } from 'react'
import OutlinedSelect from '@/components/ui/Outlined'
import {Badge} from '@/components/ui'
import OutlinedBadgeSelect from '@/components/ui/OutlinedBadgeSelect'

type SidePanelProps = SidePanelContentProps & CommonProps

interface Option {
    value: string;
    label: React.ReactNode;
}
  
interface FinancialYearFilterProps {
    onChange: (year: string) => void;
}

const FINANCIAL_YEAR_KEY = 'selectedFinancialYear';
const FINANCIAL_YEAR_CHANGE_EVENT = 'financialYearChanged';
const DEFAULT_YEAR = '2025-26';
const DEFAULT_YEAR_DISPLAY = '2025-2026';

const FinancialYearFilter: React.FC<FinancialYearFilterProps> = ({ onChange }) => {
    const currentYear = new Date().getFullYear();
    
    const years = Array.from({ length: 5 }, (_, i) => ({
        value: `${currentYear - i}-${(currentYear - i + 1).toString().slice(-2)}`,
        display: `${currentYear - i}-${currentYear - i + 1}`
    }));
    
    const [selectedYear, setSelectedYear] = useState<string>(() => {
        const savedYear = sessionStorage.getItem(FINANCIAL_YEAR_KEY);
        if (!savedYear) {
            // Set the default year in session storage on first load
            sessionStorage.setItem(FINANCIAL_YEAR_KEY, DEFAULT_YEAR);
            return DEFAULT_YEAR;
        }
        return savedYear;
    });

    useEffect(() => {
        onChange(selectedYear);
    }, []);

    const options: Option[] = [
        { value: DEFAULT_YEAR, label: DEFAULT_YEAR_DISPLAY },
        ...years.map(year => ({
            value: year.value,
            label: year.display
        }))
    ].filter((option, index, self) => 
        // Remove duplicates if DEFAULT_YEAR happens to be in the generated years
        index === self.findIndex(o => o.value === option.value)
    );

    const handleChange = (selectedOption: Option | null) => {
        if (selectedOption) {
            setSelectedYear(selectedOption.value);
            sessionStorage.setItem(FINANCIAL_YEAR_KEY, selectedOption.value);
            onChange(selectedOption.value);
            window.dispatchEvent(new CustomEvent(FINANCIAL_YEAR_CHANGE_EVENT, {
                detail: selectedOption.value
            }));
        }
    };

    return (
        <div className='w-52'>
            <OutlinedBadgeSelect
                label="Financial Year"
                value={options.find(option => option.value === selectedYear)}
                options={options}
                onChange={handleChange}
                optionRenderer={(option, isSelected) => (
                    <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        {isSelected && (
                            <Badge className="w-2 h-2 rounded-full bg-emerald-500" />
                        )}
                    </div>
                )}
            />
        </div>
    );
};

const _SidePanel = (props: SidePanelProps) => {
    const dispatch = useAppDispatch()
    const { className, ...rest } = props
    const panelExpand = useAppSelector((state) => state.theme.panelExpand)
    const direction = useAppSelector((state) => state.theme.direction)
    
    const [selectedFinancialYear, setSelectedFinancialYear] = useState(() => 
        sessionStorage.getItem(FINANCIAL_YEAR_KEY) || DEFAULT_YEAR
    );

    const openPanel = () => {
        dispatch(setPanelExpand(true))
    }

    const closePanel = () => {
        dispatch(setPanelExpand(false))
        const bodyClassList = document.body.classList
        if (bodyClassList.contains('drawer-lock-scroll')) {
            bodyClassList.remove('drawer-lock-scroll', 'drawer-open')
        }
    }

    const handleFinancialYearChange = (year: string) => {
        setSelectedFinancialYear(year);
    }

    return (
        <div className='flex items-center'>
            <div className='flex items-center gap-6'>
                <FinancialYearFilter onChange={handleFinancialYearChange} />
                <Notification />
            </div>
            <Drawer
                title="Side Panel"
                isOpen={panelExpand}
                placement={direction === 'rtl' ? 'left' : 'right'}
                width={375}
                onClose={closePanel}
                onRequestClose={closePanel}
            >
                <SidePanelContent callBackClose={closePanel} />
            </Drawer>
        </div>
    )
}

const SidePanel = withHeaderItem(_SidePanel)

export default SidePanel