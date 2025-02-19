import Chart from 'react-apexcharts';

const NoticeStatusPie = () => {
    return (
        <Chart
            options={{
                colors: ['#3b82f6', '#dc2626', '#22c55e'],  // Blue, Amber, Green
                labels: ['Total Notice', 'Open', 'Closed'],
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
                    text: 'Notice Status',
                    align: 'center',
                    style: {
                        fontSize: '20px',
                        fontWeight: 'bold'
                    },
                    offsetY:5,  // Add spacing below the title
                }
            }}
            series={[100, 30, 70]}  // Total Notice, Open, Closed
            height={300}  // Increased height
            type="pie"
        />
    );
};

export default NoticeStatusPie;
