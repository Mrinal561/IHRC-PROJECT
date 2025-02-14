import Chart from 'react-apexcharts'
import { COLOR_2 } from '@/constants/chart.constant'

const PaymentDateComparison = () => {
    const data = [
        {
            name: 'Due Date',
            data: Array(9).fill(15) // 15th of each month
        },
        {
            name: 'Actual Payment Date',
            // Random dates between 13-18 for example
            data: [14, 16, 13, 15, 17, 16, 14, 15, 18]
        }
    ]

    return (
        <Chart
            options={{
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 3,
                },
                colors: [COLOR_2, '#ff6b6b'], // Two colors for two lines
                xaxis: {
                    categories: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                    ],
                },
                yaxis: {
                    title: {
                        text: 'Day of Month'
                    },
                    min: 12,
                    max: 19,
                    tickAmount: 7
                },
                title: {
                    text: 'Payment Date Comparison',
                    align: 'center'
                },
                legend: {
                    position: 'top'
                }
            }}
            series={data}
            height={300}
        />
    )
}

export default PaymentDateComparison