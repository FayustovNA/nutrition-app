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

    console.log(statsData)
    // Функция для вычисления изменения веса по неделям
    const getWeeklyWeightDeltas = () => {
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

        // Рассчитываем средний вес по завершённым неделям
        const weeksWithData = Object.keys(groupedByWeek)
            .sort((a, b) => parseInt(a.split(' ')[1], 10) - parseInt(b.split(' ')[1], 10))
            .map((week) => {
                const weights = groupedByWeek[week];
                if (weights.length === 0) {
                    return { week, avgWeight: null }; // Если нет данных, средний вес null
                }
                const avgWeight = weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
                return { week, avgWeight: parseFloat(avgWeight.toFixed(2)) };
            });

        // Добавляем пустые недели до 16
        const fullWeeks = Array.from({ length: 16 }, (_, index) => {
            const weekKey = `W ${index + 1}`;
            const existingWeek = weeksWithData.find((weekData) => weekData.week === weekKey);
            return {
                week: weekKey,
                avgWeight: existingWeek ? existingWeek.avgWeight : null, // Если данных нет, ставим null
            };
        });

        // Рассчитываем разницу веса между неделями
        //     const weightDeltas = fullWeeks.map((currentWeek, index) => {
        //         if (index === 0) {
        //             return { ...currentWeek, deltaWeight: 0 }; // Для первой недели разница 0
        //         }

        //         const prevWeek = fullWeeks[index - 1];

        //         // Если текущая или предыдущая неделя не имеют данных, deltaWeight = 0
        //         if (currentWeek.avgWeight === null || prevWeek.avgWeight === null) {
        //             return { ...currentWeek, deltaWeight: 0 };
        //         }

        //         const deltaWeight = currentWeek.avgWeight - prevWeek.avgWeight;
        //         return { ...currentWeek, deltaWeight: parseFloat(deltaWeight.toFixed(2)) };
        //     });

        //     return weightDeltas;
        // };
        const weightDeltas = fullWeeks.map((currentWeek, index) => {
            if (index === 0 || currentWeek.avgWeight === null) {
                // Первая неделя или неделя без данных
                return { ...currentWeek, deltaWeight: 0 };
            }

            const prevWeek = fullWeeks[index - 1];

            // Игнорируем разницу, если предыдущая неделя имеет avgWeight = null
            if (prevWeek.avgWeight === null) {
                return { ...currentWeek, deltaWeight: 0 };
            }

            const deltaWeight = currentWeek.avgWeight - prevWeek.avgWeight;
            return { ...currentWeek, deltaWeight: parseFloat(deltaWeight.toFixed(2)) };
        });
        return weightDeltas;

    };

    // Вызываем функцию, когда statsData или startDate изменяются
    useEffect(() => {
        if (statsData.length > 0 && startDate) {
            console.log("Start date:", startDate);
            console.log("Stats data:", statsData);
            const calculatedData = getWeeklyWeightDeltas();
            console.log("Calculated weekly data:", calculatedData);
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
                    borderRadius: 5,
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