import React, { useState, useEffect } from 'react';
import { Table, Card, Timeline, ScrollBar, Dialog} from '../../../../../components/ui';
import THead from '@/components/ui/Table/THead';
import TBody from '@/components/ui/Table/TBody';
import dayjs, { Dayjs } from 'dayjs';




const ComplianceCalendar = () => {
  const [currentMonthCompliance, setCurrentMonthCompliance] = useState<{ date: string; description: string }[]>([]);

  return (
    <div className='border rounded-lg'>
      <div className='p-4'>
        <h1 className='font-semibold text-lg'>My Compliance Calendar</h1>
      </div>
      <div className='h-[350px] flex-grow flex items-center gap-10 px-4'>
        <CalendarView onComplianceChange={setCurrentMonthCompliance} />
        <div className='w-[60%]'>
          <Holiday complianceDeadlines={currentMonthCompliance} />
        </div>
      </div>
    </div>
  );
}
export default ComplianceCalendar;

interface DateObject {
  currentMonth: boolean;
  date: Dayjs;
  today?: boolean;
}

const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
): DateObject[] => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf('month');
  const lastDateOfMonth = dayjs().year(year).month(month).endOf('month');

  const arrayOfDate: DateObject[] = [];

  // Create prefix dates
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.day(i);
    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // Generate current dates
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today: firstDateOfMonth.date(i).toDate().toDateString() === dayjs().toDate().toDateString(),
    });
  }

  // Fill remaining days
  const remaining = 42 - arrayOfDate.length;
  for (let i = lastDateOfMonth.date() + 1; i <= lastDateOfMonth.date() + remaining; i++) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.date(i),
    });
  }

  return arrayOfDate;
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

const CalendarView: React.FC<{ onComplianceChange: (deadlines: { date: string; description: string }[]) => void }> = ({ onComplianceChange }) => {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [dates, setDates] = useState<DateObject[]>([]);

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  useEffect(() => {
    setDates(generateDate(currentDate.month(), currentDate.year()));
  }, [currentDate]);

  // Mock compliance deadlines
  const complianceDeadlines = [
    { date: '2024-08-01', description: 'Monthly Financial Report Due' },
    { date: '2024-08-15', description: 'Quarterly Report Due' },
    { date: '2024-08-20', description: 'Annual Safety Review Submission' },
    { date: '2024-08-30', description: 'Tax Filing Deadline' },
    { date: '2024-09-01', description: 'Quarterly Tax Payments Due' },
    { date: '2024-09-15', description: 'Quarterly Report Due' },
    { date: '2024-09-30', description: 'Tax Filing Deadline' },
    { date: '2024-10-01', description: 'Annual Employee Benefits Enrollment' },
    { date: '2024-10-15', description: 'Quarterly Report Due' },
    { date: '2024-10-31', description: 'End of Fiscal Year Review' },
    { date: '2024-11-01', description: 'Monthly Financial Report Due' },
    { date: '2024-11-15', description: 'Quarterly Report Due' },
    { date: '2024-11-30', description: 'Annual Tax Planning Deadline' },
    { date: '2024-12-01', description: 'Year-End Compliance Review' },
    { date: '2024-12-15', description: 'Quarterly Report Due' },
    { date: '2024-12-31', description: 'End of Year Tax Filing Deadline' },
  ];

  const currentMonthDeadlines = complianceDeadlines.filter(
    deadline => dayjs(deadline.date).isSame(currentDate, 'month')
  );

  useEffect(() => {
    onComplianceChange(currentMonthDeadlines);
  }, [currentDate]);

  const hasCompliance = (date: Dayjs) => {
    return currentMonthDeadlines.some(
      (deadline) => dayjs(deadline.date).isSame(date, 'day')
    );
  };

  return (
    <div className="calendar-container border rounded-xl h-[290px] w-[40%] p-4 overflow-hidden">
      <div>
        <div className="calendar-header flex justify-between items-center mb-2">
          <button onClick={handlePrevMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(146,151,161,1)" width="22" height="22">
              <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
            </svg>
          </button>
          <div className="month-year text-lg font-semibold text-black">
            {months[currentDate.month()]} {currentDate.year()}
          </div>
          <button onClick={handleNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(146,151,161,1)" width="22" height="22">
              <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 max-h-[250px] text-[#737a88]">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
          {dates.map((dateObj, index) => (
            <div
              key={index}
              className={`text-center p-2 rounded-lg ${dateObj.today ? 'bg-blue-500 text-[#fff]' : ''} ${!dateObj.currentMonth ? 'text-gray-400' : 'text-[#5e5d6a]'} ${hasCompliance(dateObj.date) ? 'bg-red-500 text-[#fff]' : ''}`}
            >
              {dateObj.date.date()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface HolidayProps {
  complianceDeadlines: { date: string; description: string }[];
}

const Holiday: React.FC<HolidayProps> = ({ complianceDeadlines }) => {
  return (
    <div className="p-4 border w-full rounded-lg h-[290px]">
      <ScrollBar autoHide>
      <h2 className="font-semibold text-lg mb-2">Compliance Deadlines</h2>
        {complianceDeadlines.length === 0 ? (
          <div className='flex justify-center items-center mt-20 text-[#7583a2] font-bold'>
            <p>No compliance deadlines for this month.</p>
          </div>
        ) : (
          <Table className="w-full border-collapse mt-6">
            <THead>
              <tr className='bg-[#f9fafb] text-[#737a88]'>
                <th className="border-b p-2 text-left font-medium">S.NO</th>
                <th className="border-b p-2 text-left font-medium">DATE</th>
                <th className="border-b p-2 text-left font-medium">DESCRIPTION</th>
                <th className="border-b p-2 text-left font-medium">STATUS</th>
              </tr>
            </THead>
            <TBody>
              {complianceDeadlines.map((deadline, index) => (
                <tr key={index} className='text-[#7583a2] text-sm'>
                  <td className="border-b p-2 text-left">{index + 1}</td>
                  <td className="border-b p-2 text-left">{dayjs(deadline.date).format('DD MMM YYYY')}</td>
                  <td className="border-b p-2 text-left">{deadline.description}</td>
                  <td className="border-b p-2 text-left">Pending</td> {/* Update status based on your requirements */}
                </tr>
              ))}
            </TBody>
          </Table>
        )}
      </ScrollBar>
    </div>
  );
}

