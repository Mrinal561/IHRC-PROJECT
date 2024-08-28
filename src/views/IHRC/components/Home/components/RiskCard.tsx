import React from "react"
import ReactApexChart from "react-apexcharts"

const RiskColumnChart = () => {
    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'bar', // Corrected type: must match one of the specific string literals
        height: 350,
        width: 500,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          borderRadius: 4,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ['High', 'Medium', 'Low'],
      },
      yaxis: {
        title: {
          text: 'Number of Compliances',
          style: {
              // fontWeight: '500',
              fontSize: '12px',
          }
        },
      },
      legend: {
        show: true,
        markers: {
          shape: 'circle' as 'circle',
          
        },
        itemMargin: {
          horizontal: 20, // Space between legend items horizontally
          vertical: 10, // Space between legend items vertically
        },
        
      },
      fill: {
        opacity: 1,
      },
      title: {
        text: 'Click on graph to view details',
        align: 'center',
        style: {
          fontSize: '14px',
          fontWeight: '200',
        },
      },
      colors: ['#f57600', '#0000FF', '#10b981'],
    }
  
    const series = [
      {
        name: 'Not Applicable',
        data: [0, 447, 61],
        color: '#0000FF',
      },
      {
          name: 'Not Completed',
          data: [173, 0, 0],
          color: '#f57600',
      },
      {
          name: 'Completed',
          data: [25, 139, 0],
          color: '#10b981'
      },
    ]
  
    return (
      <div className='w-[500px] h-[350px]'>
        <ReactApexChart options={options} series={series} type="bar" height={350} width={500} />
      </div>
    )
  }
  const RiskCard = () => {
    return (
      <div className='border rounded-xl'>
      <div className='p-4'>
          <h1 className='font-semibold text-lg'>Risk Summary</h1>
      </div>
      <div className='flex-grow flex items-center justify-center'>
      <RiskColumnChart />
      </div>
  </div>
    )
  }

export default RiskCard;