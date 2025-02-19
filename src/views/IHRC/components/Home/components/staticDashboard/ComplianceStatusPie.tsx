import Chart from 'react-apexcharts'

const ComplianceStatusPie = () => {
    return (
        <Chart
            options={{
                colors: ['#f97316', '#22c55e', '#0ea5e9', '#1e3a8a'],  // orange-500, green-500, sky-500, blue-900
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
            height={400}
            type="pie"
        />
    )
}

export default ComplianceStatusPie