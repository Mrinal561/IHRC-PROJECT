import React from "react"
import Chart from 'react-apexcharts'



const MonthlyColumnchart = () => {
  const data = [
      {
          name: 'Not Completed',
          data: [40, 80, 70, 90, 60, 99],
      },
      {
          name: 'Completed',
          data: [100, 120, 40, 150, 100, 60],
      },
  ]

  return (
      <div className="w-full h-[350px] px-6">

      
      <Chart
          options={{
              chart: {
                  stacked: true,
                  toolbar: {
                      show: true,
                  },
              },
              colors: ['#f57600', '#10b981'],
              responsive: [
                  {
                      breakpoint: 480,
                      options: {
                          legend: {
                              position: 'bottom',
                              offsetX: -10,
                              offsetY: 0,
                          },
                          markers: {
                              shape: 'circle',
                            },
                      },
                  },
              ],
              plotOptions: {
                  bar: {
                      horizontal: false,
                  },
              },
              xaxis: {
                  type: 'category',
                  categories: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                  ],
              },
              legend: {
                  position: 'bottom',
                  offsetY: 0,
                  markers: {
                      shape: 'circle',
                      
                    },
                    itemMargin: {
                      horizontal: 20, 
                      vertical: 10, 
                    },
              },
              markers: {
                  shape: 'circle',
                  
                },
              fill: {
                  opacity: 1,
              },
          }}
          series={data}
          type="bar"
          height={340}
      />
      </div>
  )
}
const MonthlyCard = () => {
  return (
    <div className='border rounded-lg'>
        <div className='p-4'>
            <h1 className='font-semibold text-lg'>Month Wise Summary</h1>
        </div>
        <div className='flex-grow flex items-center justify-center'>
        <MonthlyColumnchart />
        </div>
    </div>
  )
}

export default MonthlyCard;