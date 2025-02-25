// import React from 'react'
// import Chart from 'react-apexcharts'
// import { COLORS } from '@/constants/chart.constant'

// const RegistrationBreakup = () => {
//     const data = [
//         {
//             data: [1200, 800, 500, 300, 600], // Example values for each registration type
//         },
//     ]

//     const colors = {
//         pf: '#0000FF',     // Blue for PF
//         esi: '#FFA500',    // Orange for ESI
//         pt: '#008000',     // Green for PT
//         lwf: '#87CEEB',    // Sky blue for LWF
//         serc: '#8A2BE2'    // Violet for S&E RC
//     }

//     return (
//         <Chart 
//             options={{
//                 chart: {
//                     stacked: false,
//                     toolbar: {
//                         show: true,
//                     },
//                     zoom: {
//                         enabled: true,
//                     },
//                 },
//                 title: {
//                     text: 'Registrations Break Up',
//                     align: 'left',
//                     style: {
//                         fontSize: '16px',
//                     },
//                 },
//                 plotOptions: {
//                     bar: {
//                         horizontal: false,
//                         columnWidth: '70%',
//                     },
//                 },
//                 // colors: [colors.pf, colors.esi, colors.pt, colors.lwf, colors.serc],
//                 dataLabels: {
//                     enabled: true,
//                     style: {
//                         fontSize: '12px',
//                     },
//                 },
//                 responsive: [
//                     {
//                         breakpoint: 480,
//                         options: {
//                             legend: {
//                                 position: 'bottom',
//                                 offsetX: -10,
//                                 offsetY: 0,
//                             },
//                         },
//                     },
//                 ],
//                 xaxis: {
//                     categories: [
//                         'PF Codes',
//                         'ESI Codes',
//                         'Professional Tax',
//                         'Labour Welfare Fund',
//                         'S&E RC'
//                     ],
//                     labels: {
//                         rotate: -45,
//                         style: {
//                             fontSize: '12px',
//                         }
//                     }
//                 },
//                 yaxis: {
//                     title: {
//                         text: 'Count',
//                     },
//                 },
//                 legend: {
//                     position: 'right',
//                     offsetY: 40,
//                 },
//                 fill: {
//                     opacity: 1,
//                 },
//                 tooltip: {
//                     y: {
//                         formatter: (val) => `${val}`
//                     }
//                 },
//             }}
//             series={data}
//             type="bar"
//             height={300}
//         />
//     )
// }

// export default RegistrationBreakup

// import React from 'react';
// import Chart from 'react-apexcharts';
// import { COLORS } from '@/constants/chart.constant';

// const RegistrationsBreakup = () => {
//     const data = [
//         {
//             data: [2, 40, 20, 12, 20], // Example values for each registration type
//         },
//     ];

//     const colors = ['#002D62', '#ffc107', '#059669', '#0ea5e9', '#8A2BE2']; // Colors for each bar

//     const options = {
//         chart: {
//             type: 'bar',
//             height: 350,
//         },
//         plotOptions: {
//             bar: {
//                 distributed: true, // This ensures each bar gets a different color
//             },
//         },
//         colors: colors, // Pass the colors array here
//         xaxis: {
//             categories: ['PF', 'ESI', 'PT', 'LWF', 'S&E RC'], // Labels for each bar
//         },
//         title: {
//             text: 'Registrations Breakup', // Add your title here
//             align: 'center', // Align the title
//             style: {
//                 fontSize: '16px', // Customize the title font size
//                 fontWeight: 'bold', // Customize the title font weight
//             },
//         },
//         tooltip: {
//             y: {
//                 formatter: (val) => `${val}`, // Tooltip formatting
//             },
//         },
//     };

//     return (
//         <Chart
//             options={options}
//             series={data}
//             type="bar"
//             height={300}
//         />
//     );
// };

// export default RegistrationsBreakup;



import React from 'react';
import Chart from 'react-apexcharts';
import { COLORS } from '@/constants/chart.constant';

const RegistrationsBreakup = () => {
    const categories = ['PF', 'ESI', 'PT', 'LWF', 'S&E RC']; // Define categories in a variable for reuse
    
    const data = [
        {
            name: 'Registrations', // Changed from series-1 to a descriptive name
            data: [2, 40, 20, 12, 20], // Example values for each registration type
        },
    ];

    const colors = ['#002D62', '#ffc107', '#059669', '#0ea5e9', '#8A2BE2']; // Colors for each bar

    const options = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                distributed: true, // This ensures each bar gets a different color
                dataLabels: {
                    position: 'center', // Places the value in the middle of the bar
                },
            },
        },
        colors: colors, // Pass the colors array here
        dataLabels: {
            enabled: true,
            style: {
                colors: ['#fff'], // White text for better visibility
                fontWeight: 'bold',
            },
        },
        xaxis: {
            categories: categories, // Labels for each bar
        },
        title: {
            text: 'Registrations Breakup', // Add your title here
            align: 'center', // Align the title
            style: {
                fontSize: '16px', // Customize the title font size
                fontWeight: 'bold', // Customize the title font weight
            },
        },
        tooltip: {
            y: {
                title: {
                    formatter: function(seriesName, opts) {
                        // Return the category name instead of the series name
                        return categories[opts.dataPointIndex];
                    }
                },
                formatter: (val) => `${val}`, // Tooltip formatting
            },
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: categories,
            markers: {
                fillColors: colors
            }
        }
    };

    return (
        <Chart
            options={options}
            series={data}
            type="bar"
            height={300}
        />
    );
};

export default RegistrationsBreakup;