import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import "./chart.css";

interface StatsDataItem {
    date: string;
    protein_actual: number;
    protein_target: number;
}

interface FoodTargetPanelProps {
    statsData: StatsDataItem[];
    startDate?: string;
}

const WeekAverProteinPanel: React.FC<FoodTargetPanelProps> = ({ statsData, startDate }) => {
    const getWeeklyAverageProteins = () => {
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

            if (item.protein_actual > 0) groupedByWeek[weekKey].actual.push(item.protein_actual);
            if (item.protein_target > 0) groupedByWeek[weekKey].target.push(item.protein_target);
        });

        const sortedWeeks = Object.keys(groupedByWeek)
            .map((week) => ({
                week,
                avgActual: groupedByWeek[week].actual.length
                    ? Math.round(groupedByWeek[week].actual.reduce((sum, v) => sum + v, 0) / groupedByWeek[week].actual.length)
                    : 0,
                avgTarget: groupedByWeek[week].target.length
                    ? Math.round(groupedByWeek[week].target.reduce((sum, v) => sum + v, 0) / groupedByWeek[week].target.length)
                    : 0,
            }))
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

    const weeklyData = getWeeklyAverageProteins();

    const chartOptions: ApexOptions = {
        chart: {
            type: "bar",
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                borderRadius: 3,
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
            title: { text: "Потребление белка (g)" },
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

export default WeekAverProteinPanel;