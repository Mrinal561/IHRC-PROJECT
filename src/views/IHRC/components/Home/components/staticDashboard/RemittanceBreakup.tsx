
import Chart from 'react-apexcharts'
import { COLORS } from '@/constants/chart.constant'

const RemittanceBreakup = () => {
    const data = [
        {
            data: [1200, 800, 500, 300], // Example values for PF, ESI, PT, LWF
        },
    ]

    const colors = {
        pf: '#1e3a8a',     // Pure blue for PF
        esi: '#FFA500',    // Orange for ESI
        pt: '#008000',     // Green for PT
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