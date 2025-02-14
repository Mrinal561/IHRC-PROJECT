import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const ChallanUploadCounts = () => {
    const data = [
        {
            name: 'Challan Uploads',
            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
        }
    ]

    return (
        <div className="bg-white p-4 rounded-lg">
            <Chart
                options={{
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            borderRadius: 4,
                        },
                    },
                    colors: [COLORS[0]], // Using first color from COLORS array
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
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec'
                        ],
                    },
                    yaxis: {
                        title: {
                            text: 'Number of Challans'
                        }
                    },
                    fill: {
                        opacity: 1,
                    },
                    tooltip: {
                        y: {
                            formatter: (val) => `${val} challans`,
                        },
                    },
                    title: {
                        text: 'Challan Upload Statistics',
                        align: 'left'
                    }
                }}
                series={data}
                height={300}
                type="bar"
            />
        </div>
    )
}

export default ChallanUploadCounts