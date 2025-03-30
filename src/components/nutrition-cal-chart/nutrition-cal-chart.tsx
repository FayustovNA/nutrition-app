import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './chart.css';

interface StatsDataItem {
    date: string;
    calories_actual: number;
    calories_target: number;
}

interface FoodTargetPanelProps {
    statsData: StatsDataItem[];
    startDate?: any;
}

const WeekAverCaloriesPanel: React.FC<FoodTargetPanelProps> = ({ statsData, startDate }) => {
    const getWeeklyAverageCalories = () => {
        const start = new Date(startDate).getTime();

        const groupedByWeek: { [week: string]: { actual: number[]; target: number[] } } = {};

        statsData.forEach((item) => {
            const currentDate = new Date(item.date).getTime();
            const weekNumber = Math.floor((currentDate - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
            const weekKey = `W ${weekNumber}`;

            if (!groupedByWeek[weekKey]) {
                groupedByWeek[weekKey] = { actual: [], target: [] };
            }

            if (item.calories_actual && item.calories_actual > 0) {
                groupedByWeek[weekKey].actual.push(item.calories_actual);
            }
            if (item.calories_target && item.calories_target > 0) {
                groupedByWeek[weekKey].target.push(item.calories_target);
            }
        });

        const weeksWithData = Object.keys(groupedByWeek)
            .sort((a, b) => {
                const weekA = parseInt(a.split(' ')[1], 10);
                const weekB = parseInt(b.split(' ')[1], 10);
                return weekA - weekB;
            })
            .map((week) => {
                const actualCalories = groupedByWeek[week].actual;
                const targetCalories = groupedByWeek[week].target;

                const avgActual = actualCalories.length > 0 ? actualCalories.reduce((sum, value) => sum + value, 0) / actualCalories.length : 0;
                const avgTarget = targetCalories.length > 0 ? targetCalories.reduce((sum, value) => sum + value, 0) / targetCalories.length : 0;

                return {
                    week,
                    avgActual: parseFloat(avgActual.toFixed(0)),
                    avgTarget: parseFloat(avgTarget.toFixed(0)),
                };
            });

        return weeksWithData.slice(-9); // Оставляем только последние 9 недель
    };

    const weeklyData = getWeeklyAverageCalories();

    const chartData: any = {
        series: [
            {
                name: 'Факт',
                data: weeklyData.map((data) => data.avgActual),
            },
            {
                name: 'План',
                data: weeklyData.map((data) => data.avgTarget),
            },
        ],
        options: {
            chart: { type: 'bar', toolbar: { show: false } },
            plotOptions: {
                bar: { borderRadius: 3, columnWidth: '80%', dataLabels: { position: 'top' } },
            },
            dataLabels: {
                enabled: true,
                style: { fontSize: '7px', fontFamily: 'Montserrat', fontWeight: 'bold', colors: ['#E5E5EA'] },
            },
            yaxis: {
                title: { text: 'Калории (kcal)' },
                labels: { formatter: (y: number) => y.toFixed(0), style: { colors: '#A7A7A7', fontSize: '10px', fontFamily: 'Montserrat', fontWeight: 600 } },
            },
            xaxis: {
                categories: weeklyData.map((data) => data.week),
                labels: { rotate: -90, style: { cssClass: 'vertical-data-label', colors: '#A7A7A7', fontSize: '10px', fontFamily: 'Montserrat', fontWeight: 600 } },
            },
            grid: { show: false, yaxis: { lines: { show: true }, row: { opacity: 0.1 } } },
            legend: { position: 'top', horizontalAlign: 'center', colors: '#A7A7A7', fontSize: '10px', fontFamily: 'Montserrat', fontWeight: 600 },
            colors: ['#007AFF', '#C8AB58'],
            responsive: [
                {
                    breakpoint: 576,
                    options: {
                        dataLabels: { enabled: true, rotate: -90, style: { cssClass: 'vertical-data-label', fontSize: '5px' } },
                        yaxis: { labels: { style: { fontSize: '8px' } } },
                    },
                },
            ],
        },
    };

    return (
        <div id="chart">
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={160} />
        </div>
    );
};

export default WeekAverCaloriesPanel;
