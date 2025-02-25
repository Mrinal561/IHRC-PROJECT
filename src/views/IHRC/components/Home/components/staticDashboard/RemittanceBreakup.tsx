
// import Chart from 'react-apexcharts'
// import { COLORS } from '@/constants/chart.constant'

// const RemittanceBreakup = () => {
//     const data = [
//         {
//             data: [1200, 800, 500, 300], // Example values for PF, ESI, PT, LWF
//         },
//     ]

//     const colors = {
//         pf: '#002D62',     // Pure blue for PF
//         esi: '#ffc107',    // Orange for ESI
//         pt: '#059669',     // Green for PT
//         lwf: '#0ea5e9'     // Sky blue for LWF
//     }

//     return (
//         <Chart 
//             options={{
//                 title: {
//                     text: 'Remittance Breakup',
//                     align: 'center',
//                     style: {
//                         fontSize: '20px',
//                         fontWeight: 'bold',
//                     },
//                 },
//                 plotOptions: {
//                     bar: {
//                         horizontal: true,
//                         distributed: true, // This ensures each bar gets its own color
//                     },
//                 },
//                 colors: [colors.pf, colors.esi, colors.pt, colors.lwf],
//                 dataLabels: {
//                     enabled: false,
//                 },
//                 xaxis: {
//                     categories: ['PF', 'ESI', 'PT', 'LWF'],
//                 },
//                 legend: {
//                     show: true,
//                     position: 'right',
//                 },
//             }}
//             series={data}
//             type="bar"
//             height={300}
//         />
//     )
// }

// export default RemittanceBreakup






import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const RemittanceBreakup = () => {
    const data = [
        {
            name: '₹',  // Changed from series-1 to rupee symbol
            data: [120000, 80000, 50000, 30000], // Values increased to show in lakhs
        },
    ]

    const colors = {
        pf: '#002D62',     // Pure blue for PF
        esi: '#ffc107',    // Orange for ESI
        pt: '#059669',     // Green for PT
        lwf: '#0ea5e9'     // Sky blue for LWF
    }

    return (
        <Chart 
            options={{
                title: {
                    text: 'Remittance Breakup',
                    align: 'center',
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold',
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        distributed: true, // This ensures each bar gets its own color
                    },
                },
                colors: [colors.pf, colors.esi, colors.pt, colors.lwf],
                dataLabels: {
                    enabled: false,
                },
                xaxis: {
                    categories: ['PF', 'ESI', 'PT', 'LWF'],
                    labels: {
                        formatter: function(value) {
                            return (value/100000).toFixed(2) + 'L';  // Format to show in lakhs
                        }
                    },
                    max: 150000,  // Set maximum value for x-axis
                },
                tooltip: {
                    y: {
                        formatter: function(value) {
                            return value.toLocaleString('en-IN');  // Indian number format with rupee symbol
                        }
                    }
                },
                legend: {
                    show: true,
                    position: 'right',
                },
            }}
            series={data}
            type="bar"
            height={300}
        />
    )
}

export default RemittanceBreakup