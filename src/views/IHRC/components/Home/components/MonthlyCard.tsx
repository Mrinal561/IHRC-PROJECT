import React, { useState } from 'react'
import Chart from 'react-apexcharts'
import Card from '@/components/ui/Card'
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
                        data: [80, 40, 60, 20, 33, 82, 65],
                    },
                    {
                        name: 'Not Complied',
                        data: [30, 12, 30, 18, 28, 16, 19],
                    },
                    {
                        name: 'NA',
                        data: [2, 6, 8, 12, 5, 10, 13],
                    },
                ],
                range: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July'],
            },
        },
    }

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
                        colors: [COLORS[2], COLORS[4], COLORS[7]], // Ensure you have three colors for three series
                        xaxis: {
                            categories: data.chart[timeRange[0]].range,
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
                    <div className="bg-emerald-600 h-2.5 w-2.5 rounded-full" />
                    <div className="flex items-center">
                        <p>{data.chart[timeRange[0]].series[0].name}</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="bg-red-500 h-2.5 w-2.5 rounded-full" />
                    <div>
                        <p>{data.chart[timeRange[0]].series[1].name}</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="bg-yellow-500 h-2.5 w-2.5 rounded-full" />
                    <div>
                        <p>{data.chart[timeRange[0]].series[2].name}</p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default MonthlyCard
