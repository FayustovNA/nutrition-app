import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "./chart.css";

interface StatsDataItem {
    date: string;
    calories_actual: number;
    calories_target: number;
}

interface FoodTargetPanelProps {
    statsData: StatsDataItem[];
    startDate?: string;
}

const WeekAverCaloriesPanel: React.FC<FoodTargetPanelProps> = ({ statsData, startDate }) => {
    const getWeeklyAverageCalories = () => {
        if (!startDate) return [];

        const start = new Date(startDate).getTime();
        const groupedByWeek: { [week: string]: { actual: number[]; target: number[] } } = {};

        statsData.forEach((item) => {
            const currentDate = new Date(item.date).getTime();
            const weekNumber = Math.floor((currentDate - start) / (7 * 24 * 60 * 60 * 1000)) + 1;
            const weekKey = `W ${weekNumber}`;

            if (!groupedByWeek[weekKey]) {
                groupedByWeek[weekKey] = { actual: [], target: [] };
            }

            if (item.calories_actual > 0) groupedByWeek[weekKey].actual.push(item.calories_actual);
            if (item.calories_target > 0) groupedByWeek[weekKey].target.push(item.calories_target);
        });

        const sortedWeeks = Object.keys(groupedByWeek)
            .map((week) => {
                const actual = groupedByWeek[week].actual;
                const target = groupedByWeek[week].target;

                const avgActual = actual.length
                    ? Math.round(actual.reduce((sum, val) => sum + val, 0) / actual.length)
                    : 0;
                const avgTarget = target.length
                    ? Math.round(target.reduce((sum, val) => sum + val, 0) / target.length)
                    : 0;

                return { week, avgActual, avgTarget };
            })
            .sort((a, b) => parseInt(a.week.split(" ")[1], 10) - parseInt(b.week.split(" ")[1], 10));

        const recentWeeks = sortedWeeks.slice(-9);

        // Добавим 2 будущие недели
        let lastWeekNumber = 0;
        if (recentWeeks.length > 0) {
            lastWeekNumber = parseInt(recentWeeks[recentWeeks.length - 1].week.split(" ")[1], 10);
        }

        for (let i = 1; i <= 2; i++) {
            recentWeeks.push({
                week: `W ${lastWeekNumber + i}`,
                avgActual: 0,
                avgTarget: 0,
            });
        }

        return recentWeeks;
    };

    const weeklyData = getWeeklyAverageCalories();

    const chartOptions: ApexOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 8,
                borderRadiusApplication: 'end',
                columnWidth: "80%",
                dataLabels: { position: "top" },
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => val.toFixed(0),
            style: {
                fontSize: "8px",
                fontWeight: "bold",
                fontFamily: "Montserrat",
                colors: ["#E5E5EA"],
            },
        },
        yaxis: {
            title: { text: "Калории (kcal)" },
            labels: {
                formatter: (y: number) => y.toFixed(0),
                style: {
                    colors: "#A7A7A7",
                    fontSize: "10px",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                },
            },
        },
        xaxis: {
            categories: weeklyData.map((data) => data.week),
            labels: {
                rotate: -90,
                style: {
                    colors: "#A7A7A7",
                    fontSize: "10px",
                    fontFamily: "Montserrat",
                    fontWeight: 600,
                },
            },
        },
        grid: {
            show: false,
            yaxis: {
                lines: { show: true },
            },
        },
        legend: { show: false },
        colors: ["#007AFF", "#C8AB58"],
        responsive: [
            {
                breakpoint: 576,
                options: {
                    dataLabels: {
                        enabled: true,
                        rotate: -90,
                        style: { fontSize: "5px" },
                    },
                    yaxis: { labels: { style: { fontSize: "8px" } } },
                },
            },
        ],
    };

    return (
        <div id="chart">
            <ReactApexChart
                options={chartOptions}
                series={[
                    { name: "Факт", data: weeklyData.map((data) => data.avgActual) },
                    { name: "План", data: weeklyData.map((data) => data.avgTarget) },
                ]}
                type="bar"
                height={160}
            />
        </div>
    );
};

export default WeekAverCaloriesPanel;