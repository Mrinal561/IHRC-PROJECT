
// import React from 'react';
// import Chart from 'react-apexcharts';
// import { Card } from '@/components/ui/card';
// import { ApexOptions } from 'apexcharts';



// const ComplianceStatus = () => {
//     return (
//         <Chart
//             options={{
//                 colors: ['#00c853', '#ff3d00', '#ffc107', '#808080'],
//                 labels: ['Complied', 'Not Complied', 'Complied with Delay', 'Not Applicable'],
//                 legend: {
//                     position: 'top',  // Move legend to the top
//                 },
//                 responsive: [
//                     {
//                         breakpoint: 480,
//                         options: {
//                             chart: {
//                                 width: 300,  // Adjusted width for smaller screens
//                             },
//                             legend: {
//                                 position: 'top',  // Ensure legend stays at the top on smaller screens
//                             },
//                         },
//                     },
//                 ],
//                 chart: {
//                     width: '100%',  // Makes the chart responsive
//                 },
//                 title: {
//                     text: 'Compliance Status',
//                     align: 'center',
//                     style: {
//                         fontSize: '20px',
//                         fontWeight: 'bold'
//                     },
//                     offsetY:-5,
//                 }
//             }}
//             series={[45, 20, 15, 10]}  // Complied, Not Complied, Complied with Delay, Not Applicable
//             height={300}  // Increased height
//             type="pie"
//         />
//     );
// };


// export default ComplianceStatus;








import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Card } from '@/components/ui';
import { ApexOptions } from 'apexcharts';

import OutlinedSelect from '@/components/ui/Outlined/Outlined';


const ComplianceStatus = () => {

  const groupOptions = [
          { value: 'jan', label: 'January' },
          { value: 'feb', label: 'February' },
          { value: 'mar', label: 'March' },
          { value: 'apr', label: 'April' },
          { value: 'may', label: 'May' },
          { value: 'jun', label: 'June' },
          { value: 'jul', label: 'July' },
          { value: 'aug', label: 'August' },
          { value: 'sep', label: 'September' },
          { value: 'oct', label: 'October' },
          { value: 'nov', label: 'November' },
          { value: 'dec', label: 'December' }
        ];
      
        // State for selected month
        const [currentGroup, setCurrentGroup] = useState(groupOptions[1].value);
      
        // Handler for dropdown changes
        const handleChange = (setter: Function, field: string) => (option: any) => {
          setter(option.value);
        };
  
        
  const data = {
    series: [12, 8, 6, 4],  // Complied, Not Complied, Complied with Delay, Not Applicable
    labels: ['Complied', 'Not Complied', 'Complied with Delay', 'Not Applicable']
  };

  const options: ApexOptions = {
    chart: {
      type: 'pie',
      background: 'transparent'
    },
    colors: ['#059669', '#DC143C', '#ffc107', '#808080'],
    labels: data.labels,
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        offsetX: 0,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5
      }
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        expandOnClick: true,
        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        dataLabels: {
          offset: 0
        },
        donut: {
          size: '0%'
        }
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['#fff']
    },
    dataLabels: {
      enabled: false,
      formatter: function(val: number) {
        if (typeof val === 'number') {
          return val.toFixed(1) + '%';
        }
        return '';
      },
      style: {
        fontSize: '16px',
        fontWeight: '600',
        colors: ['#fff']
      },
      background: {
        enabled: false
      },
      dropShadow: {
        enabled: false
      }
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val: number) {
          return val.toString();
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%'
        },
        legend: {
          position: 'top'
        }
      }
    }]
  };

  const header = (
    // <div className="w-full">
    //   <h4 className="text-xl text-center font-bold">Compliance Status</h4>
    // </div>
    <div className="w-full">
    <div className="flex justify-between items-center">
      <h4 className="text-base font-bold">
      Compliance Status
      </h4>
      <div className="w-40">
        <OutlinedSelect
          label="Month"
          options={groupOptions}
          value={groupOptions.find(
            (option) => option.value === currentGroup
          )}
          onChange={handleChange(
            setCurrentGroup,
            'groupName'
          )}
        />
      </div>
    </div>
  </div>
  );

  const footer = (
    <div className="grid grid-cols-4 gap-3">
      {data.labels.map((label, index) => (
        <div key={label} className="bg-gray-50 p-2 rounded-lg text-center">
          <div className="text-sm font-medium text-gray-600">{label}</div>
          <div 
            className="text-xl font-bold mt-1" 
            style={{ color: options.colors?.[index] }}
          >
            {data.series[index]}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card 
      className="w-full max-w-2xl mx-auto border-none"
      header={header}
      footer={footer}
      headerBorder={true}
      footerBorder={true}
      bordered={true}
    >
      <div className="p-2">
        <Chart
          options={options}
          series={data.series}
          type="pie"
          height={350}
        />
      </div>
    </Card>
  );
};

export default ComplianceStatus;