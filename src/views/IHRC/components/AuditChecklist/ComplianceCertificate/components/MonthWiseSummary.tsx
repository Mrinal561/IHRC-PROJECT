
import React from 'react'
import Chart from 'react-apexcharts'
import {COLORS} from '../../../../../../constants/chart.constant'

const MonthWiseSummary = () => {
    const data = [
        {
            name: 'Completed',
            data: [44, 55, 107, 56, 98, 58],
        },
        {
            name: 'Not Completed',
            data: [76, 85, 101, 98, 87, 105],
        },
        {
            name: 'Not Applicable',
            data: [15, 25, 17, 40, 36, 18],
        },
    ]

    return (
        <Chart
            options={{
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                    },
                },
                colors: COLORS,
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
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                    ],
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => `$${val} thousands`,
                    },
                },
            }}
            series={data}
            height={300}
            type="bar"
        />
    )
}

export default MonthWiseSummary

