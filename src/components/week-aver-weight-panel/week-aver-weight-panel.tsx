import ReactApexChart from 'react-apexcharts'
interface StatsDataItem {
    id: any;
    date: string;
    weight_actual: number;
}

interface WeekWeightPanelProps {
    statsData: StatsDataItem[];
    startDate?: any;
}

const WeekAverWeightPanel: React.FC<WeekWeightPanelProps> = ({ statsData, startDate }) => {

    const getWeeklyAverageWeights = () => {
        if (!startDate) return [];

        const start = new Date(startDate).getTime();
        const groupedByWeek: { [week: string]: number[] } = {};

        statsData.forEach((item) => {
            const currentDate = new Date(item.date).getTime();
            const weekNumber = Math.floor((currentDate - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
            const weekKey = `W ${weekNumber}`;

            if (!groupedByWeek[weekKey]) {
                groupedByWeek[weekKey] = [];
            }

            if (item.weight_actual > 0) {
                groupedByWeek[weekKey].push(item.weight_actual);
            }
        });

        const sortedWeeks = Object.keys(groupedByWeek)
            .map((week) => {
                const weights = groupedByWeek[week];
                const avgWeight = weights.length
                    ? parseFloat((weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(1))
                    : 0;
                return { week, avgWeight };
            })
            .sort((a, b) => parseInt(a.week.split(" ")[1], 10) - parseInt(b.week.split(" ")[1], 10));

        const recentWeeks = sortedWeeks.slice(-10);

        // Добавим 2 будущие недели
        let lastWeekNumber = 0;
        if (recentWeeks.length > 0) {
            lastWeekNumber = parseInt(recentWeeks[recentWeeks.length - 1].week.split(" ")[1], 10);
        }

        for (let i = 1; i <= 2; i++) {
            recentWeeks.push({
                week: `W ${lastWeekNumber + i}`,
                avgWeight: 0,
            });
        }

        return recentWeeks;
    };

    const weeklyData = getWeeklyAverageWeights();

    const chartData: any = {

        series: [{
            name: 'Вес',
            data: weeklyData.map((data) => data.avgWeight),
        }],
        options: {
            chart: {
                type: 'bar',
                // height: 350,
                toolbar: {
                    show: false,
                    tools: {
                        download: false
                    }
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                    colors: {
                        ranges: [{
                            from: -5,
                            to: 0,
                            color: '#007AFF'
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
                    fontSize: '8px',
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                    colors: ["#E5E5EA"],
                }
            },

            yaxis: {
                show: true,
                title: {
                    text: 'Средний вес (kg)',
                },
                labels: {
                    formatter: function (y: any) {
                        return y.toFixed(1);
                    }, style: {
                        colors: '#A7A7A7',
                        fontSize: '10px',
                    }
                },

            },

            xaxis: {
                type: 'string',
                categories: weeklyData.map((data) => data.week),
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
                    show: true,
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
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={220} />
        </div>

    );
}


export default WeekAverWeightPanel;