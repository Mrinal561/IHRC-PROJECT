import Chart from 'react-apexcharts';

const ComplianceStatus = () => {
    return (
        <Chart
            options={{
                colors: ['#a78bfa', '#3b82f6', '#15803d', '#6d28d9'],  // Light Violet, Blue, Deep Green, Deep Violet
                labels: ['Complied', 'Not Complied', 'Complied with Delay', 'Not Applicable'],
                legend: {
                    position: 'top',  // Move legend to the top
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 300,  // Adjusted width for smaller screens
                            },
                            legend: {
                                position: 'top',  // Ensure legend stays at the top on smaller screens
                            },
                        },
                    },
                ],
                chart: {
                    width: '100%',  // Makes the chart responsive
                },
                title: {
                    text: 'Compliance Status',
                    align: 'center',
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold'
                    },
                    offsetY:-5,
                }
            }}
            series={[45, 20, 15, 10]}  // Complied, Not Complied, Complied with Delay, Not Applicable
            height={300}  // Increased height
            type="pie"
        />
    );
};


export default ComplianceStatus;