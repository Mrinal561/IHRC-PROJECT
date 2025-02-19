// import React from 'react';

// const StatisticCard = ({ icon, bgColor, title, value }) => {
//   return (
//     <div className="bg-white p-4 flex items-center border rounded-lg">
//       <div className={`${bgColor} p-2 rounded-lg h-14 w-14 flex items-center justify-center mr-4`}>
//         {icon}
//       </div>
//       <div>
//         <h3 className='font-semibold text-lg'>{title}</h3>
//         <p className='font-medium text-[#7583a2]'>{value}</p>
//       </div>
//     </div>
//   );
// };

// const BranchesDashboardCount = () => {
//   const branchStatistics = [
//     {
//       title: 'Total Branches',
//       value: '57',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(79,70,229,1)" width="28" height="28">
//           <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V19ZM5 19H19V5H5V19ZM8 11H16V13H8V11ZM8 7H16V9H8V7ZM8 15H13V17H8V15Z"></path>
//         </svg>
//       ),
//       bgColor: 'bg-[#e0e7ff]',
//     },
//     {
//       title: 'Physical Branches',
//       value: '7',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(220,38,38,1)" width="28" height="28">
//           <path d="M21 12.5V9.34141C21 8.2084 20.4077 7.17147 19.4447 6.55334L14.7474 3.54218C13.1679 2.55751 11.1369 2.62144 9.62892 3.70268L4.5 7.5C2.89 8.712 2 10.42 2 12.5V20H4V17H14V20H22V12.5H21ZM4 15V12.5C4 11.097 4.59 9.98648 5.65 9.21248L10.4 5.87248C11.2 5.30348 12.2 5.17844 13.1 5.57844L15.79 7.14744L4.81 14H4ZM18.5 10.82L20 9.9V12.5V15H15.5V10L18.5 10.82Z"></path>
//         </svg>
//       ),
//       bgColor: 'bg-[#fee2e2]',
//     },
//     {
//       title: 'Virtual Branches',
//       value: '50',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(37,99,235,1)" width="28" height="28">
//           <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM8 10H16V12H8V10ZM8 14H16V16H8V14Z"></path>
//         </svg>
//       ),
//       bgColor: 'bg-[#dbeafe]',
//     },
//   ];

//   return (
//     <div className="flex flex-wrap gap-4">
//       {branchStatistics.map((stat, index) => (
//         <div key={index} className="flex-1 min-w-[240px]">
//           <StatisticCard
//             icon={stat.icon}
//             bgColor={stat.bgColor}
//             title={stat.title}
//             value={stat.value}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BranchesDashboardCount;

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

// const BranchesDashboardCount = () => {
//   const branchStatistics = [
//     {
//       title: 'Total Branches',
//       value: '57',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//           <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V19ZM5 19H19V5H5V19ZM8 11H16V13H8V11ZM8 7H16V9H8V7ZM8 15H13V17H8V15Z" />
//         </svg>
//       ),
//       bgColor: 'bg-blue-500',
//     },
//     {
//       title: 'Physical Branches',
//       value: '7',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//           <path d="M21 12.5V9.34141C21 8.2084 20.4077 7.17147 19.4447 6.55334L14.7474 3.54218C13.1679 2.55751 11.1369 2.62144 9.62892 3.70268L4.5 7.5C2.89 8.712 2 10.42 2 12.5V20H4V17H14V20H22V12.5H21ZM4 15V12.5C4 11.097 4.59 9.98648 5.65 9.21248L10.4 5.87248C11.2 5.30348 12.2 5.17844 13.1 5.57844L15.79 7.14744L4.81 14H4ZM18.5 10.82L20 9.9V12.5V15H15.5V10L18.5 10.82Z" />
//         </svg>
//       ),
//       bgColor: 'bg-cyan-500',
//     },
//     {
//       title: 'Virtual Branches',
//       value: '50',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//           <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM8 10H16V12H8V10ZM8 14H16V16H8V14Z" />
//         </svg>
//       ),
//       bgColor: 'bg-emerald-500',
//     },
//   ];

//   return (
//     <div className="space-y-4">
//       <div className="flex flex-wrap gap-4">
//         {branchStatistics.map((stat, index) => (
//           <div key={index} className="flex-1 min-w-[240px]">
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

// export default BranchesDashboardCount;

// import { Tooltip } from '@/components/ui';
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

// const BranchesDashboardCount = () => {
//   const branchStatistics = [
//     {
//       title: 'Total Branches',
//       value: '57',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//           <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H20C20.5523 3 21 3.44772 21 4V19ZM5 19H19V5H5V19ZM8 11H16V13H8V11ZM8 7H16V9H8V7ZM8 15H13V17H8V15Z" />
//         </svg>
//       ),
//       bgColor: 'bg-blue-500',
//     },
//     {
//       title: 'Physical Branches',
//       value: '7',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//           <path d="M21 12.5V9.34141C21 8.2084 20.4077 7.17147 19.4447 6.55334L14.7474 3.54218C13.1679 2.55751 11.1369 2.62144 9.62892 3.70268L4.5 7.5C2.89 8.712 2 10.42 2 12.5V20H4V17H14V20H22V12.5H21ZM4 15V12.5C4 11.097 4.59 9.98648 5.65 9.21248L10.4 5.87248C11.2 5.30348 12.2 5.17844 13.1 5.57844L15.79 7.14744L4.81 14H4ZM18.5 10.82L20 9.9V12.5V15H15.5V10L18.5 10.82Z" />
//         </svg>
//       ),
//       bgColor: 'bg-cyan-500',
//     },
//     {
//       title: 'Virtual Branches',
//       value: '50',
//       icon: (
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
//           <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM4 5V19H20V5H4ZM8 10H16V12H8V10ZM8 14H16V16H8V14Z" />
//         </svg>
//       ),
//       bgColor: 'bg-emerald-500',
//     },
//   ];

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {branchStatistics.map((stat, index) => (
//           <div 
//             key={index} 
//             className={`
//               ${branchStatistics.length % 2 === 1 && index === branchStatistics.length - 1 
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

// export default BranchesDashboardCount;

import React, { useMemo } from 'react';
import DataTable from '@/components/shared/DataTable';
import { Tooltip } from '@/components/ui';
import type { ColumnDef } from '@/components/shared/DataTable';

const BranchesDashboardCount = () => {
    const branchData = [
        {
            name: 'Total Branches',
            value: '57 ',
        },
        {
            name: 'Physical Branches',
            value: '7',
        },
        {
            name: 'Virtual Branches',
            value: '50',
        },
    ];

    const columns: ColumnDef<typeof branchData[0]>[] = useMemo(
        () => [
            {
                header: 'Branch Type',
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
                data={branchData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={false}
                stickyHeader={true}
                selectable={false}
                showPageSizeSelector={false} 
            />
        </div>
    );
};

export default BranchesDashboardCount;