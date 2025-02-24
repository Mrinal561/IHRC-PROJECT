// import Chart from 'react-apexcharts'

// const ComplianceStatusPie = () => {
//     return (
//         <Chart
//             options={{
//                 colors: ['#056608', '#ffbf00', '#FF0000'],
//                 labels: ['Updated', 'Not Yet Due', 'Overdue'],
//                 legend: {
//                     position: 'top',  // Move legend to the top
//                 },
//                 responsive: [
//                     {
//                         breakpoint: 480,
//                         options: {
//                             chart: {
//                                 width: 300,
//                             },
//                             legend: {
//                                 position: 'bottom',
//                             },
//                         },
//                     },
//                 ],
//                 chart: {
//                     width: '100%',  // Makes the chart responsive
//                 },
//                 title: {
//                     text: 'Compliance Updation Status',
//                     align: 'center',
//                     style: {
//                         fontSize: '20px',
//                         fontWeight: 'bold',
//                     }
//                 }
//             }}
//             series={[35, 40, 15]}  // Updated, Not Yet Due, Closer Due, Overdue
//             height={350}
//             type="pie"
//         />
//     )
// }

// export default ComplianceStatusPie




import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { Card } from '@/components/ui';
import { ApexOptions } from 'apexcharts';
import OutlinedSelect from '@/components/ui/Outlined/Outlined';


const ComplianceStatusPie = () => {

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
    series: [30, 20, 16],  // Updated, Not Yet Due, Overdue
    labels: ['Updated', 'Not Yet Due', 'Overdue']
  };

  const options: ApexOptions = {
    chart: {
      type: 'pie',
      background: 'transparent'
    },
    colors: ['#059669', '#ffc107', '#DC143C'],
    labels: data.labels,
    legend: {
      position: 'top',
      horizontalAlign: 'center',
      fontSize: '14px',
      markers: {
        // radius: 12,
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
    //   <h4 className="text-xl text-center font-bold">Compliance Update Status</h4>
    // </div>
    <div className="w-full">
    <div className="flex justify-between items-center">
      <h4 className="text-base font-bold">
      Compliance Update Status
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
    <div className="grid grid-cols-3 gap-4">
      {data.labels.map((label, index) => (
        <div key={label} className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-xs font-medium text-gray-600">{label}</div>
          <div 
            className="text-base font-bold mt-1" 
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
      <div className="p-4">
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

export default ComplianceStatusPie;