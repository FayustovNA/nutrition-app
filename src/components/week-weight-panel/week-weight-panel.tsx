import ReactApexChart from 'react-apexcharts'

function WeekWeightPanel() {

    const data: any = {

        series: [{
            name: 'Вес',
            data: [0.45, -0.42, 0.9, -0.42, -0.6, -0.1, -0.2, 0.16, 0.1, -0.9, 0.34, 1.88,
            ]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false,
                    tools: {
                        download: false
                    }
                },
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    colors: {
                        ranges: [{
                            from: -5,
                            to: 0,
                            color: '#C8AB58'
                        }, {
                            from: 0,
                            to: 5,
                            color: '#007AFF'
                        }]
                    },
                    columnWidth: '70%',
                    dataLabels: {
                        position: 'top',
                    }
                },
            },

            dataLabels: {
                enabled: true,
                // textAnchor: 'top',
                distributed: false,
                offsetX: 0,
                offsetY: 0,
                style: {
                    fontSize: '10px',
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                    colors: ["#E5E5EA"],
                }
            },

            yaxis: {
                show: false,
                title: {
                    text: 'Изменение веса',
                },
                labels: {
                    formatter: function (y: any) {
                        return y.toFixed(0) + " kg";
                    }
                },

            },

            xaxis: {
                type: 'string',
                categories: [
                    'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6',
                    'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12',
                ],
                labels: {
                    rotate: -90,
                    style: {
                        colors: '#A7A7A7',
                        fontSize: '10px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            grid: {
                show: false,
                yaxis: {
                    lines: {
                        show: true
                    }
                },
            }
        },
    };

    return (


        <div id="chart">
            <ReactApexChart options={data.options} series={data.series} type="bar" height={220} />
        </div>

    );
}


export default WeekWeightPanel;