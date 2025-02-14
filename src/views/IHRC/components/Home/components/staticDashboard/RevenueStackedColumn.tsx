import React from 'react'
import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const RevenueStackedColumn = () => {
    // Sample data for 12 months
    const data = [
        {
            name: 'MAIN',
            data: [44, 55, 41, 67, 22, 43, 38, 45, 56, 61, 47, 50],
        },
        {
            name: 'ARREAR',
            data: [13, 23, 20, 8, 13, 27, 18, 22, 25, 17, 21, 24],
        },
        {
            name: 'CHALLAN',
            data: [11, 17, 15, 15, 21, 14, 12, 18, 20, 16, 19, 22],
        },
    ]

    // Generate 12 month categories starting from Jan 2023
    const generateMonthCategories = () => {
        const months = []
        const startDate = new Date('01/01/2024')
        
        for (let i = 0; i < 12; i++) {
            const currentDate = new Date(startDate)
            currentDate.setMonth(startDate.getMonth() + i)
            months.push(currentDate.toISOString())
        }
        return months
    }

    return (
        <Chart
            options={{
                chart: {
                    stacked: true,
                    toolbar: {
                        show: true,
                    },
                    zoom: {
                        enabled: true,
                    },
                },
                colors: COLORS,
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            legend: {
                                position: 'bottom',
                                offsetX: -10,
                                offsetY: 0,
                            },
                        },
                    },
                ],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '70%',
                    },
                },
                xaxis: {
                    type: 'datetime',
                    categories: generateMonthCategories(),
                    labels: {
                        format: 'MMM yyyy',
                    },
                },
                yaxis: {
                    title: {
                        text: 'Challan Amount',
                    },
                },
                legend: {
                    position: 'right',
                    offsetY: 40,
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val}`
                    }
                },
                title: {
                    text: 'Monthly Challan Breakdown',
                    align: 'left',
                    style: {
                        fontSize: '16px',
                    }
                },
            }}
            series={data}
            type="bar"
            height={300}
        />
    )
}

export default RevenueStackedColumn