

// import Chart from 'react-apexcharts'
// import { COLORS } from '@/constants/chart.constant'

// const RemittanceBreakup = () => {
//     const data = [
//         {
//             name: '₹',  // Changed from series-1 to rupee symbol
//             data: [120000, 80000, 50000, 30000], // Values increased to show in lakhs
//         },
//     ]

//     const colors = {
//         pf: '#002D62',     // Pure blue for PF
//         esi: '#ffc107',    // Orange for ESI
//         pt: '#059669',     // Green for PT
//         lwf: '#0ea5e9'     // Sky blue for LWF
//     }

//     return (
//         <Chart 
//             options={{
//                 title: {
//                     text: 'Remittance Breakup',
//                     align: 'center',
//                     style: {
//                         fontSize: '20px',
//                         fontWeight: 'bold',
//                     },
//                 },
//                 plotOptions: {
//                     bar: {
//                         horizontal: true,
//                         distributed: true, // This ensures each bar gets its own color
//                     },
//                 },
//                 colors: [colors.pf, colors.esi, colors.pt, colors.lwf],
//                 dataLabels: {
//                     enabled: false,
//                 },
//                 xaxis: {
//                     categories: ['PF', 'ESI', 'PT', 'LWF'],
//                     labels: {
//                         formatter: function(value) {
//                             return (value/100000).toFixed(2) + 'L';  // Format to show in lakhs
//                         }
//                     },
//                     max: 150000,  // Set maximum value for x-axis
//                 },
//                 tooltip: {
//                     y: {
//                         formatter: function(value) {
//                             return value.toLocaleString('en-IN');  // Indian number format with rupee symbol
//                         }
//                     }
//                 },
//                 legend: {
//                     show: true,
//                     position: 'right',
//                 },
//             }}
//             series={data}
//             type="bar"
//             height={300}
//         />
//     )
// }

// export default RemittanceBreakup










import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { Card } from '@/components/ui';

interface RemittanceBreakupProps {
  companyId?: string | number;
  stateId?: string | number;
  districtId?: string | number;
  locationId?: string | number;
  branchId?: string | number;
}

interface RemittanceData {
  pf: number;
  esi: number;
  pt: number;
  lwf: number;
}

const RemittanceBreakup: React.FC<RemittanceBreakupProps> = ({
  companyId,
  stateId,
  districtId,
  locationId,
  branchId
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [remittanceData, setRemittanceData] = useState<RemittanceData>({
    pf: 0,
    esi: 0,
    pt: 0,
    lwf: 0
  });

  useEffect(() => {
    const fetchRemittanceData = async () => {
      setLoading(true);
      try {
        const params: any = {};
                if (companyId) params.companyId = companyId;
                if (stateId) params.stateId = stateId;
                if (districtId) params.districtId = districtId;
                if (locationId) params.locationId = locationId;
                if (branchId) params.branchId = branchId;
        const response = await httpClient.get(endpoints.graph.remittanceBreakup(), {
          params
        });
        
        setRemittanceData(response.data);
      } catch (error) {
        console.error('Error fetching remittance breakup data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if at least one filter parameter is provided
    // if (companyId || stateId || districtId || locationId || branchId) {
      fetchRemittanceData();
    // }
  }, [companyId, stateId, districtId, locationId, branchId]);

  // Transform API data to chart format
  const data = [
    {
      name: '₹',
      data: [
        remittanceData.pf, 
        remittanceData.esi, 
        remittanceData.pt, 
        remittanceData.lwf
      ]
    }
  ];

  const colors = {
    pf: '#002D62',     // Pure blue for PF
    esi: '#ffc107',    // Orange for ESI
    pt: '#00a249',     // Green for PT
    lwf: '#0ea5e9'     // Sky blue for LWF
  };

  // Find maximum value for x-axis with some buffer
  const maxValue = Math.max(
    remittanceData.pf, 
    remittanceData.esi, 
    remittanceData.pt, 
    remittanceData.lwf
  );
  const xAxisMax = maxValue > 0 ? maxValue * 1.2 : 150000; // 20% buffer or default

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center p-10">
          <div className="text-gray-500">Loading remittance data...</div>
        </div>
      ) : (
        <Chart 
          options={{
            title: {
              text: 'Remittance Breakup',
              align: 'center',
              style: {
                fontSize: '16px',
                fontWeight: 'bold',
              },
            },
            plotOptions: {
              bar: {
                horizontal: true,
                distributed: true,
              },
            },
            colors: [colors.pf, colors.esi, colors.pt, colors.lwf],
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: ['PF', 'ESI', 'PT', 'LWF'],
              labels: {
                formatter: function(value) {
                  const num = Number(value);
                  if (num >= 100000) {
                    return (num/100000).toFixed(1) + 'L';
                  } else if (num >= 1000) {
                    return (num/1000).toFixed(1) + 'K';
                  } else {
                    return '₹' + num;
                  }
                }
              },
              max: xAxisMax
            },
            tooltip: {
              y: {
                formatter: function(value) {
                  return value.toLocaleString('en-IN');
                }
              }
            },
            legend: {
              show: true,
              position: 'right'
            },
          }}
          series={data}
          type="bar"
          height={300}
        />
      )}
    </div>
  );
};

export default RemittanceBreakup;