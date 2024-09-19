import classNames from 'classnames'
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

type SidePanelProps = SidePanelContentProps & CommonProps






interface Option {
    value: string;
    label: React.ReactNode;
  }
  
  interface FinancialYearFilterProps {
    onChange: (year: string) => void;
  }
  
  const FinancialYearFilter: React.FC<FinancialYearFilterProps> = ({ onChange }) => {
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: 5 }, (_, i) => `${currentYear - i}-${currentYear - i + 1}`);
      
      const [selectedYear, setSelectedYear] = useState<string>(years[0]);
  
      useEffect(() => {
          onChange(selectedYear);
      }, []);
  
      const options: Option[] = years.map(year => ({
          value: year,
          label: year
      }));
  
      const handleChange = (selectedOption: Option | null) => {
          if (selectedOption) {
              setSelectedYear(selectedOption.value);
              onChange(selectedOption.value);
          }
      };
  
      return (
          <div className='w-52'>
              <OutlinedSelect
                  label="Financial Year"
                  value={options.find(option => option.value === selectedYear)}
                  options={options}
                  onChange={handleChange}
                  selectedIndicator="★"
                  optionRenderer={(option, isSelected) => (
                      <div className="flex items-center justify-between w-full">
                          <span>{option.label}</span>
                          {isSelected && (
                              <div className="w-2 h-2 rounded-full bg-green-500" />
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

    const [selectedFinancialYear, setSelectedFinancialYear] = useState(null)


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

    const handleFinancialYearChange = (year) => {
        setSelectedFinancialYear(year)
        // You can add any additional logic here, such as fetching data for the selected year
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
