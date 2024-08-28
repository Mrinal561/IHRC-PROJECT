import React from "react";
import ReactApexChart from "react-apexcharts";

const AbstractPieChart = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'pie',
      height: 350,
      toolbar: {
        show: true,
      },
    },
    title: {
      text: 'Click on graph to view details',
      align: 'center',
      style: {
        fontSize: '14px',
        fontWeight: '200',
      },
    },
    labels: ['Displayed', 'Not Displayed'], // Labels are still required for proper data binding
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: '#000', // Text color for legend
      },
      markers: {
        fillColors: ['#0000FF', '#f57600'],
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        dataLabels: {
          offset: 0,
          minAngleToShowLabel: 0, // Show labels for very small slices
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#fff'], // Color for the data labels
      },
      formatter: (val: string | number | number[], opts?: any): string | number => {
        // Handle case where val is a number
        if (typeof val === 'number') {
          return Math.floor(val); // Show only the integer part of the value
        }
        // Handle case where val is an array or string
        return typeof val === 'string' ? val : ''; // Default return empty string if not handled
      },
    },
    series: [10, 100],
    colors: ['#0000FF', '#f57600'],
  }

  return (
    <div className='w-full h-[350px] px-8 py-6'>
      <ReactApexChart options={options} series={[10, 100]} type="pie" height={350} />
    </div>
  )
}
const AbstractCard = () => {
  return (
    <div className='border rounded-lg'>
        <div className='p-4'>
            <h1 className='font-semibold text-lg'>Abstract Summary</h1>
        </div>
        <div className='flex-grow flex items-center justify-center'>
          <AbstractPieChart />
        </div>
    </div>
  )
}

export default AbstractCard;