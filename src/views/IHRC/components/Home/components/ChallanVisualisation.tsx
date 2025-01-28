// import { Card } from '@/components/ui';
import React from 'react';
import Chart from 'react-apexcharts';
import Card from '@/components/ui/Card';

const ChallanVisualization = () => {
  const months = [
    'Apr-24', 'May-24', 'Jun-24', 'Jul-24', 'Aug-24',
    'Sep-24', 'Oct-24', 'Nov-24', 'Dec-24', 'Jan-25'
  ];

  const series = [
    // Main Challan Amount Series
    {
      name: 'Apr-24',
      data: [1000000, 0, 0, 0, 0]
    },
    {
      name: 'May-24',
      data: [1020000, 0, 0, 0, 0]
    },
    {
      name: 'Jun-24',
      data: [1040000, 0, 0, 0, 0]
    },
    {
      name: 'Jul-24',
      data: [1060000, 0, 0, 0, 0]
    },
    {
      name: 'Aug-24',
      data: [1080000, 0, 0, 0, 0]
    },
    {
      name: 'Sep-24',
      data: [1030000, 0, 0, 0, 0]
    },
    {
      name: 'Oct-24',
      data: [1120000, 0, 0, 0, 0]
    },
    {
      name: 'Nov-24',
      data: [1140000, 0, 0, 0, 0]
    },
    {
      name: 'Dec-24',
      data: [1160000, 0, 0, 0, 0]
    },
    {
      name: 'Jan-25',
      data: [1180000, 0, 0, 0, 0]
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        
        borderRadius: 1,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Main Challan Amount',
        'Head Count',
        'Arear Challan Amount',
        'Head Count',
        'Damage Challan Amount'
      ],
    },
    yaxis: {
      labels: {
        formatter: (value) => value.toLocaleString()
      }
    },
    title: {
      text: 'Challan Upload',
      align: 'center',
      style: {
        fontSize: '20px'
      }
    },
    legend: {
      position: 'bottom'
    },
    colors: [
      '#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0',
      '#3F51B5', '#546E7A', '#D4526E', '#8D5B4C', '#F86624'
    ],
    tooltip: {
      y: {
        formatter: (value) => value.toLocaleString()
      }
    }
  };

  // Add data for each category
  months.forEach((month, index) => {
    series[index].data = [
      // Main Challan Amount
      [1000000, 1020000, 1040000, 1060000, 1080000, 1030000, 1120000, 1140000, 1160000, 1180000][index],
      // Head Count
      [4000, 4200, 4400, 4600, 4800, 5000, 5200, 5400, 5600, 5800][index],
      // Arear Challan
      [200000, 203000, 206000, 209000, 212000, 201000, 218000, 221000, 224000, 227000][index],
      // Head Count.1
      [52, 49, 46, 43, 40, 37, 34, 31, 28, 25][index],
      // Damage Challan Amount
      [27000, 0, 0, 12000, 0, 0, 0, 0, 0, 0][index]
    ];
  });

  return (
    <Card>
    <div className="w-full max-w-6xl mx-auto p-4">
      <Chart
        options={options}
        series={series}
        type="bar"
        height={500}
      />
    </div>
    </Card>
  );
};

export default ChallanVisualization;