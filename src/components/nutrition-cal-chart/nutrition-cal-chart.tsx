import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { getWeeklyAverages } from "../../utils/weeklyAggregation";
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
    const weeklyData = useMemo(
        () => getWeeklyAverages(statsData, startDate, {
            getDate: (item) => item.date,
            getActual: (item) => item.calories_actual,
            getTarget: (item) => item.calories_target,
        }),
        [statsData, startDate]
    );

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