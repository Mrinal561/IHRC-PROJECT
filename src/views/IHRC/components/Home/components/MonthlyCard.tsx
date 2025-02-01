import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import { Card } from '@/components/ui';
import { COLORS } from '@/constants/chart.constant'

const MonthlyCard = () => {
    const [timeRange, setTimeRange] = useState(['monthly'])

    const data = {
        chart: {
            monthly: {
                onGoing: 280,
                finished: 300,
                total: 580,
                series: [
                    {
                        name: 'Complied',
                        data: [80, 70, 55, 60, 33, 82, 65],
                    },
                    {
                        name: 'Not Complied',
                        data: [30, 12, 30, 18, 28, 16, 19],
                    },
                    {
                        name: 'NA',
                        data: [2, 6, 8, 12, 5, 10, 13],
                    },
                    {
                        name: 'Complied with delay',
                        data: [15, 20, 13, 28, 25, 22, 34],
                    },
                ],
                range: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
            },
        },
    }

    // Define custom colors for the series
    const customColors = ['#2F855A', '#F56565', '#F6E05E', '#676bc5']; // Customize as needed

    return (
        <Card>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="flex gap-2">
                        <div>
                            <h5 className="font-bold">Monthly Wise Summary</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Chart
                    series={data.chart[timeRange[0]].series}
                    type="bar"
                    height={280}
                    options={{
                        chart: {
                            toolbar: {
                                show: false,
                            },
                        },
                        colors: customColors, // Use custom colors here
                        xaxis: {
                            categories: data.chart[timeRange[0]].range,
                        },
                        yaxis: {
                            min: 0, // Set the minimum value for y-axis
                            max: 100, // Set the maximum value for y-axis to 100
                            tickAmount: 4, // Number of ticks (0, 50, 100)
                            labels: {
                                formatter: (value) => value.toFixed(0), // Optional: format the labels
                            },
                        },
                        legend: {
                            show: false, // Ensure the legend is visible
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '45%',
                            },
                        },
                    }}
                />
            </div>
            <div className="flex gap-x-6 justify-center">
                <div className="flex gap-2 items-center">
                    <div className="bg-[#2F855A] h-2.5 w-2.5 rounded-full" />
                    <div className="flex items-center">
                        <p className='font-semibold'>{data.chart[timeRange[0]].series[0].name}</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="bg-[#F56565] h-2.5 w-2.5 rounded-full" />
                    <div>
                        <p className='font-semibold'>{data.chart[timeRange[0]].series[1].name}</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="bg-[#F6E05E] h-2.5 w-2.5 rounded-full" />
                    <div>
                        <p className='font-semibold'>{data.chart[timeRange[0]].series[2].name}</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="bg-[#676bc5] h-2.5 w-2.5 rounded-full" />
                    <div>
                        <p className='font-semibold'>{data.chart[timeRange[0]].series[3].name}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default MonthlyCard
