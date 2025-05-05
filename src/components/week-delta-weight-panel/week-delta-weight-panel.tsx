import ReactApexChart from 'react-apexcharts'
// import { useSelector } from 'react-redux'
// import { RootState } from '../../services/root-reducer'
import { useState } from 'react';
import { useEffect } from 'react'

interface StatsDataItem {
    id?: any;
    date: string;
    weight_actual: number;
}

interface WeekWeightPanelProps {
    statsData: StatsDataItem[];
    startDate: any; // Предполагаем, что это строка в формате "YYYY-MM-DD"
}

const WeekDeltaWeightPanel: React.FC<WeekWeightPanelProps> = ({ statsData, startDate }) => {
    // const startDate = useSelector((state: RootState) => state.projectData.projectData?.start_date);
    const [weeklyData, setWeeklyData] = useState<{ week: string; avgWeight: number | null; deltaWeight: number }[]>([]);

    const getWeeklyWeightDeltas = () => {
        const start = new Date(startDate).getTime();
        const now = Date.now();

        const groupedByWeek: { [weekNum: number]: number[] } = {};

        statsData.forEach((item) => {
            const currentDate = new Date(item.date).getTime();
            const weekNumber = Math.floor((currentDate - start) / (7 * 24 * 60 * 60 * 1000)) + 1;

            if (weekNumber < 1) return;

            if (!groupedByWeek[weekNumber]) {
                groupedByWeek[weekNumber] = [];
            }

            if (item.weight_actual && item.weight_actual > 0) {
                groupedByWeek[weekNumber].push(item.weight_actual);
            }
        });

        const currentWeekNumber = Math.floor((now - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
        const lastWeekToShow = currentWeekNumber + 2; // текущая + 2 будущих

        const firstWeekToShow = Math.max(1, lastWeekToShow - 11); // 12 недель максимум

        const weeksToRender = Array.from(
            { length: lastWeekToShow - firstWeekToShow + 1 },
            (_, i) => firstWeekToShow + i
        );

        const fullWeeks = weeksToRender.map((weekNum) => {
            const weights = groupedByWeek[weekNum] || [];
            const avgWeight = weights.length
                ? parseFloat((weights.reduce((a, b) => a + b, 0) / weights.length).toFixed(2))
                : null;

            return { week: `W ${weekNum}`, avgWeight };
        });

        const weightDeltas = fullWeeks.map((currentWeek, index) => {
            if (index === 0 || currentWeek.avgWeight === null) {
                return { ...currentWeek, deltaWeight: 0 };
            }

            const prevWeek = fullWeeks[index - 1];
            if (prevWeek.avgWeight === null) {
                return { ...currentWeek, deltaWeight: 0 };
            }

            const deltaWeight = currentWeek.avgWeight - prevWeek.avgWeight;
            return {
                ...currentWeek,
                deltaWeight: parseFloat(deltaWeight.toFixed(2)),
            };
        });

        return weightDeltas;
    };

    // Вызываем функцию, когда statsData или startDate изменяются
    useEffect(() => {
        if (statsData.length > 0 && startDate) {
            const calculatedData = getWeeklyWeightDeltas();
            setWeeklyData(calculatedData);
        }
    }, [statsData, startDate]);


    const chartData: any = {
        series: [
            {
                name: 'Разница веса',
                data: weeklyData.map((data) => data.deltaWeight),
            },
        ],
        options: {
            chart: {
                type: 'bar',
                // height: 350,
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 8,
                    borderRadiusApplication: 'end',
                    columnWidth: '70%',
                    colors: {
                        ranges: [
                            {
                                from: -Infinity,
                                to: 0,
                                color: '#C8AB58', // Золотой цвет для отрицательных значений
                            },
                            {
                                from: 0,
                                to: Infinity,
                                color: '#007AFF', // Синий цвет для положительных значений
                            },
                        ],
                    },
                    dataLabels: {
                        position: 'top',
                    },
                },
            },
            dataLabels: {
                enabled: true,
                offsetX: 0,
                offsetY: 0,
                style: {
                    fontSize: '8px',
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                    colors: ['#E5E5EA'],
                },
            },
            yaxis: {
                show: true,
                title: {
                    text: 'Разница веса (kg)',
                },
                labels: {
                    formatter: function (y: any) {
                        return `${y.toFixed(1)}`;

                    },
                    style: {
                        colors: '#A7A7A7',
                        fontSize: '10px',
                        fontFamily: 'Montserrat',
                        fontWeight: 600,
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
            },
        },
    };

    return (
        <div id="chart" >
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={220} />
        </div >
    );
};

export default WeekDeltaWeightPanel;