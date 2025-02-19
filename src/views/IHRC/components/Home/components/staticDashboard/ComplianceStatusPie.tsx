import Chart from 'react-apexcharts'

const ComplianceStatusPie = () => {
    return (
        <Chart
            options={{
                colors: ['#22c55e', '#ef4444', '#f97316', '#0ea5e9'],
                labels: ['Updated', 'Not Yet Due', 'Closer Due', 'Overdue'],
                legend: {
                    position: 'top',  // Move legend to the top
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 300,
                            },
                            legend: {
                                position: 'top',
                            },
                        },
                    },
                ],
                chart: {
                    width: '100%',  // Makes the chart responsive
                },
                title: {
                    text: 'Compliance Updation Status',
                    align: 'center',
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold'
                    }
                }
            }}
            series={[35, 40, 15, 10]}  // Updated, Not Yet Due, Closer Due, Overdue
            height={300}
            type="pie"
        />
    )
}

export default ComplianceStatusPie