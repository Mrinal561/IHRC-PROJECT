// import React from 'react';

// const StatisticCard = ({ icon, bgColor, title, value }) => {
//     return (
//       <div className={`${bgColor} p-4 flex items-center rounded-lg text-white`}>
//         <div className="p-2 rounded-lg h-14 w-14 flex items-center justify-center mr-4 bg-white/20">
//           {React.cloneElement(icon, {
//             fill: "white"
//           })}
//         </div>
//         <div className="flex-1 min-w-0"> {/* Add flex-1 and min-w-0 to allow truncation */}
//           <h3 className="font-semibold text-base text-white whitespace-nowrap overflow-hidden text-ellipsis">
//             {title}
//           </h3>
//           <p className="font-medium opacity-90">{value}</p>
//         </div>
//       </div>
//     );
//   };
// const AgreementsDashboardCount = () => {
//     const agreementStatistics = [
//       {
//         title: 'Total Rent Agreements',
//         value: '100',
//         icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//             <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V19ZM5 19H19V5H5V19ZM8 11H16V13H8V11ZM8 7H16V9H8V7ZM8 15H13V17H8V15Z" />
//           </svg>
//         ),
//         bgColor: 'bg-blue-500',
//       },
//       {
//         title: 'Valid Rent Agreements',
//         value: '70',
//         icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//               <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z" />
//             </svg>
//           ),
//         bgColor: 'bg-green-500',
//       },
//       {
//         title: 'Expired Rent Agreements',
//         value: '30',
//         icon: (
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//             <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 8V14H11V8H13ZM13 16V18H11V16H13Z" />
//           </svg>
//         ),
//         bgColor: 'bg-red-500',
//       },
//     ];
  
//     return (
//       <div className="space-y-4">
//         <div className="flex flex-wrap gap-4">
//           {agreementStatistics.map((stat, index) => (
//             <div key={index} className="flex-1 min-w-[240px]">
//               <StatisticCard
//                 icon={stat.icon}
//                 bgColor={stat.bgColor}
//                 title={stat.title}
//                 value={stat.value}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

// export default AgreementsDashboardCount;

// import React from 'react';

// const StatisticCard = ({ icon, bgColor, title, value }) => {
//   return (
//     <div className={`${bgColor} p-4 flex items-center rounded-lg text-white h-full`}>
//       <div className="p-2 rounded-lg h-14 w-14 flex items-center justify-center mr-4 bg-white/20">
//         {React.cloneElement(icon, {
//           fill: "white"
//         })}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h3 className="font-semibold text-sm text-white">
//           {title}
//         </h3>
//         <p className="font-medium opacity-90">{value}</p>
//       </div>
//     </div>
//   );
// };

// const AgreementsDashboardCount = () => {
//   const agreementStatistics = [
//     {
//       title: 'Total Rent Agreements',
//       value: '100',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//           <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V19ZM5 19H19V5H5V19ZM8 11H16V13H8V11ZM8 7H16V9H8V7ZM8 15H13V17H8V15Z" />
//         </svg>
//       ),
//       bgColor: 'bg-blue-500',
//     },
//     {
//       title: 'Valid Rent Agreements',
//       value: '70',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//           <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11.0026 16L18.0737 8.92893L16.6595 7.51472L11.0026 13.1716L8.17421 10.3431L6.75999 11.7574L11.0026 16Z" />
//         </svg>
//       ),
//       bgColor: 'bg-green-500',
//     },
//     {
//       title: 'Expired Rent Agreements',
//       value: '30',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//           <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 8V14H11V8H13ZM13 16V18H11V16H13Z" />
//         </svg>
//       ),
//       bgColor: 'bg-red-500',
//     },
//   ];

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {agreementStatistics.map((stat, index) => (
//           <div 
//             key={index} 
//             className={`
//               ${agreementStatistics.length % 2 === 1 && index === agreementStatistics.length - 1 
//                 ? "md:col-span-2" 
//                 : ""}
//             `}
//           >
//             <StatisticCard
//               icon={stat.icon}
//               bgColor={stat.bgColor}
//               title={stat.title}
//               value={stat.value}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AgreementsDashboardCount;

import React, { useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';

const AgreementsDashboardCount = () => {
    const agreementData = [
        {
            name: 'Total Rent Agreements',
            value: '100',
        },
        {
            name: 'Valid Rent Agreements',
            value: '70',
        },
        {
            name: 'Expired Rent Agreements',
            value: '30',
        },
    ];

    const columns: ColumnDef<typeof agreementData[0]>[] = useMemo(
        () => [
            {
                header: 'Agreement Type',
                accessorKey: 'name',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-48 truncate">
                                {value.length > 30
                                    ? value.substring(0, 30) + '...'
                                    : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
            {
                header: 'Count',
                accessorKey: 'value',
                cell: (props) => {
                    const value = props.getValue() as string;
                    return (
                        <Tooltip title={value} placement="top">
                            <div className="w-32 truncate">
                                {value.length > 18
                                    ? value.substring(0, 18) + '...'
                                    : value}
                            </div>
                        </Tooltip>
                    );
                },
            },
        ],
        []
    );

    return (
        <div className="w-full overflow-x-auto">
            <DataTable
                columns={columns}
                data={agreementData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                stickyHeader={true}
                selectable={false}
            />
        </div>
    );
};

export default AgreementsDashboardCount;