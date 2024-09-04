import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isAfter, isBefore, isEqual, addDays, startOfWeek, endOfWeek, startOfQuarter, endOfQuarter, differenceInDays } from 'date-fns';
import { Input } from '@/components/ui';

const CustomDateRangePicker = ({ onApply }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [leftMonth, setLeftMonth] = useState(new Date());
  const [rightMonth, setRightMonth] = useState(addMonths(new Date(), 1));
  const [activeTab, setActiveTab] = useState('Current');
  const [activePeriod, setActivePeriod] = useState('Month');
  const [dayCount, setDayCount] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const days = differenceInDays(endDate, startDate) + 1;
      setDayCount(days);
    }
  }, [startDate, endDate]);

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (isAfter(date, startDate)) {
      setEndDate(date);
    } else {
      setEndDate(startDate);
      setStartDate(date);
    }
  };

  const handleApply = () => {
    onApply(startDate, endDate);
    setIsOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    updateDates(tab, activePeriod);
  };

  const handlePeriodClick = (period) => {
    setActivePeriod(period);
    updateDates(activeTab, period);
  };

  const updateDates = (tab, period) => {
    const today = new Date();
    let start, end;

    switch (period) {
      case 'Week':
        start = startOfWeek(today);
        end = endOfWeek(today);
        break;
      case 'Month':
        start = startOfMonth(today);
        end = endOfMonth(today);
        break;
      case 'Quarter':
        start = startOfQuarter(today);
        end = endOfQuarter(today);
        break;
      case 'Period':
        // Assuming 'Period' is the same as 'Month' for this example
        start = startOfMonth(today);
        end = endOfMonth(today);
        break;
      default:
        start = startOfMonth(today);
        end = endOfMonth(today);
    }

    switch (tab) {
      case 'Last':
        setStartDate(subMonths(start, 1));
        setEndDate(subMonths(end, 1));
        break;
      case 'Current':
        setStartDate(start);
        setEndDate(end);
        break;
      case 'Next':
        setStartDate(addMonths(start, 1));
        setEndDate(addMonths(end, 1));
        break;
      default:
        break;
    }
  };

  const renderCalendar = (month) => {
         const days = [];
         const startDay = startOfMonth(month);
         const endDay = endOfMonth(month);
  
         for (let day = startDay; day <= endDay; day = addDays(day, 1)) {
           const isSelected = 
             (startDate && isEqual(day, startDate)) || 
             (endDate && isEqual(day, endDate)) ||
             (startDate && endDate && isAfter(day, startDate) && isBefore(day, endDate));
    
           days.push(
             <button
               key={day.toString()}
               onClick={() => handleDateClick(day)}
               className={`p-2 m-1 w-8 h-8 flex items-center justify-center ${
                 isSelected ? 'bg-blue-500 text-white rounded-full' : 'hover:bg-gray-200 rounded-full'
               }`}
             >
               {format(day, 'd')}
             </button>
           );
         }
         return (
           <div className="grid grid-cols-7 gap-1">
             {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
               <div key={day} className="text-center font-bold text-sm p-2">{day}</div>
             ))}
             {days}
           </div>
         );
      };


      const formatDateDisplay = (date) => {
        return date? format(date, 'dd/MM/yyyy') : '';
      }
    

      return (
        <div className="relative">
          <div className="flex space-x-2">
            <div className="relative">
              <Input
                type="text"
                value={`From: ${formatDateDisplay(startDate)}`}
                onClick={() => setIsOpen(true)}
                readOnly
                className="border p-2 w-40 cursor-pointer"
              />
              {/* {!startDate && <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500">From:</span>} */}
            </div>
            <div className="relative">
              <Input
                type="text"
                value={`To: ${formatDateDisplay(endDate)}`}
                onClick={() => setIsOpen(true)}
                readOnly
                className="border p-2 w-40 cursor-pointer"
              />
              {/* {!endDate && <span className="absolute inset-y-0 left-0 pl-2 flex items-center text-gray-500">To:</span>} */}
            </div>
          </div>
          {isOpen && (
            <div className="absolute w-[120vh] top-full right-8 mt-2 bg-white border shadow-lg rounded-lg overflow-hidden z-10">
              <div className="flex p-4 space-x-8">
                <div className="flex items-center">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <button onClick={() => setLeftMonth(subMonths(leftMonth, 1))} className="p-1 hover:bg-gray-200 rounded">
                        &lt;
                      </button>
                      <span className="font-semibold">{format(leftMonth, 'MMMM yyyy')}</span>
                      <button onClick={() => setLeftMonth(addMonths(leftMonth, 1))} className="p-1 hover:bg-gray-200 rounded">
                        &gt;
                      </button>
                    </div>
                    {renderCalendar(leftMonth)}
                  </div>
                  <div className="w-px bg-gray-300 mx-4 h-56 self-center"></div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <button onClick={() => setRightMonth(subMonths(rightMonth, 1))} className="p-1 hover:bg-gray-200 rounded">
                        &lt;
                      </button>
                      <span className="font-semibold">{format(rightMonth, 'MMMM yyyy')}</span>
                      <button onClick={() => setRightMonth(addMonths(rightMonth, 1))} className="p-1 hover:bg-gray-200 rounded">
                        &gt;
                      </button>
                    </div>
                    {renderCalendar(rightMonth)}
                  </div>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleTabClick('Last')}
                      className={`p-2 rounded ${activeTab === 'Last' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    >
                      Last
                    </button>
                    <button
                      onClick={() => handleTabClick('Current')}
                      className={`p-2 rounded ${activeTab === 'Current' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    >
                      Current
                    </button>
                    <button
                      onClick={() => handleTabClick('Next')}
                      className={`p-2 rounded ${activeTab === 'Next' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                    >
                      Next
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {['Week', 'Month', 'Period', 'Quarter'].map((period) => (
                      <button
                        key={period}
                        onClick={() => handlePeriodClick(period)}
                        className={`p-2 rounded text-left ${activePeriod === period ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 text-center">
                    <span className="font-bold border w-24 h-14 py-2 px-6 text-base rounded-md">{dayCount}</span> Days
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 px-4 py-3 flex justify-end space-x-2">
                <button
                  onClick={handleApply}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Apply
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };
    
    export default CustomDateRangePicker;