

// import React from 'react';
// import Chart from 'react-apexcharts';
// import { COLORS } from '@/constants/chart.constant';

// const RegistrationsBreakup = () => {
//     const categories = ['PF', 'ESI', 'PT', 'LWF', 'S&E RC']; // Define categories in a variable for reuse
    
//     const data = [
//         {
//             name: 'Registrations', // Changed from series-1 to a descriptive name
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
//                 dataLabels: {
//                     position: 'center', // Places the value in the middle of the bar
//                 },
//             },
//         },
//         colors: colors, // Pass the colors array here
//         dataLabels: {
//             enabled: true,
//             style: {
//                 colors: ['#fff'], // White text for better visibility
//                 fontWeight: 'bold',
//             },
//         },
//         xaxis: {
//             categories: categories, // Labels for each bar
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
//                 title: {
//                     formatter: function(seriesName, opts) {
//                         // Return the category name instead of the series name
//                         return categories[opts.dataPointIndex];
//                     }
//                 },
//                 formatter: (val) => `${val}`, // Tooltip formatting
//             },
//         },
//         legend: {
//             show: true,
//             showForSingleSeries: true,
//             customLegendItems: categories,
//             markers: {
//                 fillColors: colors
//             }
//         }
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

import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';


interface RegistrationBreakupProps {
    companyId?: string | number;
    stateId?: string | number;
    districtId?: string | number;
    locationId?: string | number;
    branchId?: string | number;
  }

const RegistrationsBreakup: React.FC<RegistrationBreakupProps> = ({
  companyId,
  stateId,
  districtId,
  locationId,
  branchId
}) => {
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState({
        categories: ['PF', 'ESI', 'PT', 'LWF', 'S&E RC'],
        data: [
            {
                name: 'Registrations',
                data: [0, 0, 0, 0, 0], // Initialize with zeros
            },
        ]
    });

    const colors = ['#002D62', '#ffc107', '#00a249', '#0ea5e9', '#8A2BE2']; // Colors for each bar

    useEffect(() => {
        const fetchRegistrationData = async () => {
            setLoading(true);
            try {
                const params: any = {};
                if (companyId) params.companyId = companyId;
                if (stateId) params.stateId = stateId;
                if (districtId) params.districtId = districtId;
                if (locationId) params.locationId = locationId;
                if (branchId) params.branchId = branchId;
                const response = await httpClient.get(endpoints.graph.registerBreakup(), {
                    params
                });
                
                setChartData(response.data);
            } catch (error) {
                console.error('Error fetching registration breakup data:', error);
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if at least one filter parameter is provided
        // if (companyId || stateId || districtId || locationId || branchId) {
            fetchRegistrationData();
        // }
    }, [companyId, stateId, districtId, locationId, branchId]);

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
            categories: chartData.categories, // Labels from API
        },
        title: {
            text: 'Registrations Breakup',
            align: 'center',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
        tooltip: {
            y: {
                title: {
                    formatter: function(seriesName, opts) {
                        // Return the category name instead of the series name
                        return chartData.categories[opts.dataPointIndex];
                    }
                },
                formatter: (val) => `${val}`, // Tooltip formatting
            },
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: chartData.categories,
            markers: {
                fillColors: colors
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-10">
          <div className="text-gray-500">Loading remittance data...</div>
        </div>
        );
    }

    return (
        <Chart
            options={options}
            series={chartData.data}
            type="bar"
            height={300}
        />
    );
};

export default RegistrationsBreakup;