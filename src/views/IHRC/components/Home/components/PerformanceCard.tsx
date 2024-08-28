import React from "react";
import ReactApexChart from 'react-apexcharts'
import ApexCharts from 'apexcharts'


const PerformancePieChart = () => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
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
    labels: ['Completed', 'Not Completed', 'Not Applicable'],
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: '#000',
      },
      markers: {
        fillColors: ['#0000FF', '#f57600', '#e5c354'],
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
          minAngleToShowLabel: 0,
        },
      },
      donut: {
        size: '65%', // Adjust this value to change the size of the donut hole
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
      },
    },
    series: [219, 627, 0], // Added 0 for 'Not Applicable' to match the number of labels
    colors: ['#0000FF', '#f57600', '#e5c354'],
  }

  return (
    <div className='w-full h-[350px] px-8 py-6'>
      <ReactApexChart 
        options={options} 
        series={options.series} 
        type="donut" 
        height={350} 
      />
    </div>
  )
}
const PerformanceCard = () => {

  return (
    <div className='border rounded-xl'>
      <div className='p-4'>
        <h1 className='font-semibold text-lg'>Performance Summary</h1>
      </div>
      <div className='flex-grow flex items-center justify-center'>
      {/* <PieChart containerID="performance-chart" /> */}
      <PerformancePieChart />
      </div>
    </div>
  );
};

export default PerformanceCard;