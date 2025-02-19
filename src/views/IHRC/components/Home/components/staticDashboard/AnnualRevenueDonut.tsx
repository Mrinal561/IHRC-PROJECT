// // import React from 'react'
// // import Chart from 'react-apexcharts'
// // import { COLORS } from '@/constants/chart.constant'

// // const AnnualRevenueDonut = ({ year = '2024', mainTotal = 500000, arrearTotal = 180000, damageTotal = 90000 }) => {
// //     const totalAmount = mainTotal + arrearTotal + damageTotal
    
// //     // Data series and labels
// //     const series = [mainTotal, arrearTotal, damageTotal]
// //     const labels = ['Main', 'Arrear', 'Damage']
    
// //     return (
// //         <div className="flex flex-col items-center">
// //             <h2 className="text-lg font-semibold mb-2">Revenue Breakdown for {year}</h2>
// //             <Chart
// //                 options={{
// //                     colors: COLORS,
// //                     labels: labels,
// //                     legend: {
// //                         position: 'bottom',
// //                         formatter: function(val, opts) {
// //                             const percent = opts.w.globals.series[opts.seriesIndex] / totalAmount * 100
// //                             return `${val}: ${percent.toFixed(1)}%`
// //                         }
// //                     },
// //                     plotOptions: {
// //                         pie: {
// //                             donut: {
// //                                 labels: {
// //                                     show: true,
// //                                 }
// //                             }
// //                         }
// //                     },
// //                     dataLabels: {
// //                         enabled: true,
// //                         formatter: function(val) {
// //                             return val.toFixed(1) + "%"
// //                         }
// //                     },
// //                     tooltip: {
// //                         y: {
// //                             formatter: function(val) {
// //                                 return val.toLocaleString()
// //                             }
// //                         }
// //                     },
// //                     responsive: [
// //                         {
// //                             breakpoint: 480,
// //                             options: {
// //                                 chart: {
// //                                     width: 380,
// //                                 },
// //                                 legend: {
// //                                     position: 'bottom',
// //                                 },
// //                             },
// //                         },
// //                     ],
// //                 }}
// //                 series={series}
// //                 height={350}
// //                 type="donut"
// //             />
// //             <div className="grid grid-cols-3 gap-6 mt-4 text-center">
// //                 {labels.map((label, index) => (
// //                     <div key={index} className="flex flex-col">
// //                         <span className="text-sm text-gray-600">{label}</span>
// //                         <span className="font-semibold text-lg">
// //                             {series[index].toLocaleString()}
// //                         </span>
// //                     </div>
// //                 ))}
// //             </div>
// //         </div>
// //     )
// // }

// // export default AnnualRevenueDonut


// import React, { useState } from 'react';
// import Chart from 'react-apexcharts';
// import { COLORS } from '@/constants/chart.constant';
// import OutlinedSelect from '@/components/ui/Outlined/Outlined'

// const AnnualRevenueDonut = ({ year = '2024', mainTotal = 500000, arrearTotal = 180000, damageTotal = 90000 }) => {
//     const totalAmount = mainTotal + arrearTotal + damageTotal;

//     // Data series and labels
//     const series = [mainTotal, arrearTotal, damageTotal];
//     const labels = ['Main', 'Arrear', 'Damage'];

//     // State for filters
//     const [selectedCodeType, setSelectedCodeType] = useState('');
//     const [selectedMonth, setSelectedMonth] = useState('');

//     // Options for the filters
//     const codeTypeOptions = [
//         { value: 'esi', label: 'ESI' },
//         { value: 'pf', label: 'PF' },
//         { value: 'pt', label: 'PT' },
//         { value: 'lwf', label: 'LWF' },
//     ];

//     const monthOptions = [
//         { value: 'january', label: 'January' },
//         { value: 'february', label: 'February' },
//         { value: 'march', label: 'March' },
//         { value: 'april', label: 'April' },
//         { value: 'may', label: 'May' },
//         { value: 'june', label: 'June' },
//         { value: 'july', label: 'July' },
//         { value: 'august', label: 'August' },
//         { value: 'september', label: 'September' },
//         { value: 'october', label: 'October' },
//         { value: 'november', label: 'November' },
//         { value: 'december', label: 'December' },
//     ];

//     // Handlers for filter changes
//     const handleCodeTypeChange = (value) => {
//         setSelectedCodeType(value);
//         // Add logic to filter data based on code type
//     };

//     const handleMonthChange = (value) => {
//         setSelectedMonth(value);
//         // Add logic to filter data based on month
//     };

//     return (
//         <div className="flex flex-col items-center">
//             <div className="w-full flex justify-between items-center mb-4">
//                 <div className="flex space-x-4">
//                     <OutlinedSelect
//                         label="Code Type"
//                         options={codeTypeOptions}
//                         value={selectedCodeType}
//                         onChange={handleCodeTypeChange}
//                     />
//                     <OutlinedSelect
//                         label="Month"
//                         options={monthOptions}
//                         value={selectedMonth}
//                         onChange={handleMonthChange}
//                     />
//                 </div>
//             </div>
//             <h2 className="text-lg font-semibold mb-2">Revenue Breakdown for {year}</h2>
//             <Chart
//                 options={{
//                     colors: COLORS,
//                     labels: labels,
//                     legend: {
//                         position: 'bottom',
//                         formatter: function(val, opts) {
//                             const percent = opts.w.globals.series[opts.seriesIndex] / totalAmount * 100;
//                             return `${val}: ${percent.toFixed(1)}%`;
//                         }
//                     },
//                     plotOptions: {
//                         pie: {
//                             donut: {
//                                 labels: {
//                                     show: true,
//                                 }
//                             }
//                         }
//                     },
//                     dataLabels: {
//                         enabled: true,
//                         formatter: function(val) {
//                             return val.toFixed(1) + "%";
//                         }
//                     },
//                     tooltip: {
//                         y: {
//                             formatter: function(val) {
//                                 return val.toLocaleString();
//                             }
//                         }
//                     },
//                     responsive: [
//                         {
//                             breakpoint: 480,
//                             options: {
//                                 chart: {
//                                     width: 380,
//                                 },
//                                 legend: {
//                                     position: 'bottom',
//                                 },
//                             },
//                         },
//                     ],
//                 }}
//                 series={series}
//                 height={350}
//                 type="donut"
//             />
//             <div className="grid grid-cols-3 gap-6 mt-4 text-center">
//                 {labels.map((label, index) => (
//                     <div key={index} className="flex flex-col">
//                         <span className="text-sm text-gray-600">{label}</span>
//                         <span className="font-semibold text-lg">
//                             {series[index].toLocaleString()}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AnnualRevenueDonut;
import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { COLORS } from '@/constants/chart.constant';
import OutlinedSelect from '@/components/ui/Outlined/Outlined'

const AnnualRevenueDonut = ({ year = '2024', mainTotal = 500000, arrearTotal = 180000, damageTotal = 90000 }) => {
    const totalAmount = mainTotal + arrearTotal + damageTotal;

    // Data series and labels
    const series = [mainTotal, arrearTotal, damageTotal];
    const labels = ['Main', 'Arrear', 'Damage'];

    // State for filters
    const [selectedCodeType, setSelectedCodeType] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    // Options for the filters
    const codeTypeOptions = [
        { value: 'esi', label: 'ESI' },
        { value: 'pf', label: 'PF' },
        { value: 'pt', label: 'PT' },
        { value: 'lwf', label: 'LWF' },
    ];

    const monthOptions = [
        { value: 'january', label: 'January' },
        { value: 'february', label: 'February' },
        { value: 'march', label: 'March' },
        { value: 'april', label: 'April' },
        { value: 'may', label: 'May' },
        { value: 'june', label: 'June' },
        { value: 'july', label: 'July' },
        { value: 'august', label: 'August' },
        { value: 'september', label: 'September' },
        { value: 'october', label: 'October' },
        { value: 'november', label: 'November' },
        { value: 'december', label: 'December' },
    ];

    // Handlers for filter changes
    const handleCodeTypeChange = (value) => {
        setSelectedCodeType(value);
        // Add logic to filter data based on code type
    };

    const handleMonthChange = (value) => {
        setSelectedMonth(value);
        // Add logic to filter data based on month
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex items-center mb-4 gap-2">
                {/* Wrapper div for filters with increased width */}
                <div className='w-[120px]'>
                    <OutlinedSelect
                        label="Code Type"
                        options={codeTypeOptions}
                        value={selectedCodeType}
                        onChange={handleCodeTypeChange}
                    />
                    </div>
                    <div className='w-[120px]'>
                    <OutlinedSelect
                        label="Month"
                        options={monthOptions}
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    />
                </div>
            </div>
            <h2 className="text-lg font-semibold mb-2">Revenue Breakdown for {year}</h2>
            <Chart
                options={{
                    colors: COLORS,
                    labels: labels,
                    legend: {
                        position: 'bottom',
                        formatter: function(val, opts) {
                            const percent = opts.w.globals.series[opts.seriesIndex] / totalAmount * 100;
                            return `${val}: ${percent.toFixed(1)}%`;
                        }
                    },
                    plotOptions: {
                        pie: {
                            donut: {
                                labels: {
                                    show: true,
                                }
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function(val) {
                            return val.toFixed(1) + "%";
                        }
                    },
                    tooltip: {
                        y: {
                            formatter: function(val) {
                                return val.toLocaleString();
                            }
                        }
                    },
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 380,
                                },
                                legend: {
                                    position: 'bottom',
                                },
                            },
                        },
                    ],
                }}
                series={series}
                height={350}
                type="donut"
            />
            <div className="grid grid-cols-3 gap-6 mt-4 text-center">
                {labels.map((label, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-sm text-gray-600">{label}</span>
                        <span className="font-semibold text-lg">
                            {series[index].toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnnualRevenueDonut;