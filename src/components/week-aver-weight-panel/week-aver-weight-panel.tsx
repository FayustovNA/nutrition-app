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
    // const startDate = useSelector((state: RootState) => state.projectData.projectData?.start_date);

    // Группируем данные по неделям
    const getWeeklyAverageWeights = () => {
        const start = new Date(startDate).getTime();

        const groupedByWeek: { [week: string]: number[] } = {};
        statsData.forEach((item) => {
            const currentDate = new Date(item.date).getTime();
            const weekNumber = Math.floor((currentDate - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
            const weekKey = `W ${weekNumber}`;

            if (!groupedByWeek[weekKey]) {
                groupedByWeek[weekKey] = [];
            }

            // Учитываем только значения больше 0
            if (item.weight_actual && item.weight_actual > 0) {
                groupedByWeek[weekKey].push(item.weight_actual);
            }
        });

        // Рассчитываем средний вес по неделям
        const weeksWithData = Object.keys(groupedByWeek)
            .sort((a, b) => {
                const weekA = parseInt(a.split(' ')[1], 16);
                const weekB = parseInt(b.split(' ')[1], 16);
                return weekA - weekB;
            })
            .map((week) => {
                const weights = groupedByWeek[week];
                if (weights.length === 0) {
                    return { week, avgWeight: 0 }; // Если нет данных, средний вес 0
                }
                const avgWeight = weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
                return { week, avgWeight: parseFloat(avgWeight.toFixed(1)) };
            });

        // Добавляем пустые недели до 16
        const fullWeeks = Array.from({ length: 16 }, (_, index) => {
            const weekKey = `W ${index + 1}`;
            const existingWeek = weeksWithData.find((weekData) => weekData.week === weekKey);
            return {
                week: weekKey,
                avgWeight: existingWeek ? existingWeek.avgWeight : 0, // Если данных нет, ставим 0
            };
        });

        return fullWeeks;
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
                    borderRadius: 5,
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