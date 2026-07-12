import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import { getWeeklyAverages } from '../../utils/weeklyAggregation'
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

    const weeklyData = useMemo(
        () => getWeeklyAverages(statsData, startDate, {
            getDate: (item) => item.date,
            getActual: (item) => item.weight_actual,
            weeksToKeep: 10,
            round: (value) => parseFloat(value.toFixed(1)),
        }).map(({ week, avgActual }) => ({ week, avgWeight: avgActual })),
        [statsData, startDate]
    );

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