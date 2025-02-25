// import React from 'react';
// import { useState } from 'react';
// import Calendar from '@/components/ui/Calendar';
// import Badge from '@/components/ui/Badge';

// const ComplianceCalendar: React.FC = () => {
//   const [value, setValue] = useState<Date | null>(null);

//   return (
//     <div className="flex flex-col">
//       <h2 className="text-xl font-semibold mb-4">Compliance Calendar</h2>
//       <div className="md:w-[300px] max-w-[300px] mx-auto">
//         <Calendar
//         className=''
//           value={value}
//           dayClassName={(date, { selected }) => {
//             if (date.getDate() === 12 && !selected) {
//               return 'text-red-600';
//             }
//             if (selected) {
//               return 'text-white';
//             }
//             return 'text-gray-700 dark:text-gray-200';
//           }}
//           dayStyle={(date, { selected, outOfMonth }) => {
//             if (date.getDate() === 18 && !selected) {
//               return { color: '#15c39a' };
//             }
//             if (outOfMonth) {
//               return {
//                 opacity: 0,
//                 pointerEvents: 'none',
//                 cursor: 'default',
//               };
//             }
//             return {};
//           }}
//           renderDay={(date) => {
//             const day = date.getDate();
//             if (day !== 12) {
//               return <span>{day}</span>;
//             }
//             return (
//               <span className="relative flex justify-center items-center w-full h-full">
//                 {day}
//                 <Badge
//                   className="absolute bottom-1"
//                   innerClass="h-1 w-1"
//                 />
//               </span>
//             );
//           }}
//           onChange={setValue}
//         />
//       </div>
//     </div>
//   );
// };

// export default ComplianceCalendar;


import React from 'react';
import { useState } from 'react';
import Calendar from '@/components/ui/Calendar';
import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ComplianceCalendar: React.FC = () => {
  const [value, setValue] = useState<Date | null>(null);

  const upcomingDates = [
    {
      date: '12 Feb',
      event: 'ESI Payment Due',
      type: 'danger'
    },
    {
      date: '18 Feb',
      event: 'PF Filing',
      type: 'success'
    },
    {
      date: '24 Feb',
      event: 'PT Payment',
      type: 'info'
    }
  ];

  return (
    <Card className="p-0 border-none custom-card-body">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Section */}
        <div className="flex-1 md:w-[50%] max-w-[50%] ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Compliance Calendar
            </h2>
          </div>
          <div className="md:w-[100%] max-w-[100%] mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <Calendar
              className="border-none"
              value={value}
              dayClassName={(date, { selected }) => {
                if (date.getDate() === 12 && !selected) {
                  return 'text-red-600 font-medium';
                }
                if (selected) {
                  return 'text-white font-medium';
                }
                return 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors';
              }}
              dayStyle={(date, { selected, outOfMonth }) => {
                if (date.getDate() === 18 && !selected) {
                  return { color: '#15c39a', fontWeight: 500 };
                }
                if (outOfMonth) {
                  return {
                    opacity: 0,
                    pointerEvents: 'none',
                    cursor: 'default',
                  };
                }
                return {};
              }}
              renderDay={(date) => {
                const day = date.getDate();
                if (day !== 12) {
                  return <span>{day}</span>;
                }
                return (
                  <span className="relative flex justify-center items-center w-full h-full">
                    {day}
                    <Badge
                      className="absolute bottom-1"
                      innerClass="h-1 w-1 bg-red-500"
                    />
                  </span>
                );
              }}
              onChange={setValue}
            />
          </div>
        </div>

        {/* Upcoming Dates Section */}
        <div className="flex-1 lg:border-l lg:pl-6 md:w-[50%] max-w-[50%] ">
          <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
            Upcoming Dates
          </h3>
          <div className="space-y-4">
            {upcomingDates.map((item, index) => (
              <div
                key={index}
                className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.event}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.date}
                  </p>
                </div>
                <Badge
                  className={`${
                    item.type === 'danger'
                      ? 'bg-red-100 text-red-800'
                      : item.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  } px-2 py-1 text-xs rounded-full`}
                >
                  {item.type === 'danger' ? 'Due' : item.type === 'success' ? 'Coming Up' : 'Scheduled'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ComplianceCalendar;