import React from 'react';
import ReactApexChart from 'react-apexcharts';
import style from './weigth-chart.module.css'
import { computeLinearTrend, forecastFromTrend, predictTrendY, TrendPoint } from '../../utils/linearTrend';

interface StatsDataItem {
    id: any;
    date: string;
    weight_actual: number;
    weight_target: number;
}

interface WeigthChartChartProps {
    statsData: StatsDataItem[];
}

interface ForecastEntry {
    days: number;
    y: number;
}

interface WeigthChartState {
    series: {
        name: string;
        type: string;
        data: { x: number; y: number }[];
    }[];
    options: any;
    forecast: ForecastEntry[] | null;
}

const FORECAST_DAYS = [30, 60, 90];
const DAY_MS = 24 * 60 * 60 * 1000;

class WeigthChart extends React.Component<WeigthChartChartProps, WeigthChartState> {
    constructor(props: WeigthChartChartProps) {
        super(props);

        const { series, forecast } = this.buildSeriesAndForecast(props.statsData);

        // Определяем минимальные и максимальные значения для оси Y
        const weightValues = series[0].data.map((item) => item.y);
        const targetWeight = Math.min(...props.statsData.map(item => item.weight_target)); // Целевой вес
        const minWeight = targetWeight; // Устанавливаем минимальное значение как целевой вес
        const maxWeight = Math.max(...weightValues) * 1.01; // Немного увеличиваем для отступа

        // Инициализация начального состояния
        this.state = {
            series,
            forecast,
            options: {
                chart: {
                    type: 'line',
                    stacked: false,
                    // height: 350,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: true,
                    },
                    toolbar: {
                        show: true,
                        autoSelected: 'zoom',
                    },
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [0],
                    style: {
                        fontSize: '11px',
                        fontFamily: 'Montserrat',
                        fontWeight: 'bold',
                        colors: ['#E5E5EA'],
                    },
                    background: {
                        enabled: false,
                    }
                },
                legend: {
                    show: true,
                    position: 'bottom',
                    fontSize: '11px',
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                },
                markers: {
                    size: [3, 0, 0],
                    colors: ['#007AFF'],
                    strokeWidth: 0,
                    strokeOpacity: 0.7,
                    hover: {
                        size: undefined,
                        sizeOffset: 0
                    }
                },
                stroke: {
                    width: [2, 2, 2],
                    dashArray: [0, 0, 6],
                    curve: ['smooth', 'straight', 'straight'],
                },
                colors: ['#007AFF', '#C8AB58', '#C8AB58'],
                fill: {
                    type: ['gradient', 'solid', 'solid'],
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100],
                    },
                },
                yaxis: {
                    min: minWeight, // Устанавливаем минимальное значение оси Y
                    max: maxWeight,
                    labels: {
                        formatter: function (val: number) {
                            return `${val.toFixed(1)}`;
                        },
                        style: {
                            colors: '#A7A7A7',
                            fontSize: '10px',
                            fontFamily: 'Montserrat',
                            fontWeight: 600,
                        }

                    },
                    title: {
                        text: 'Вес (kg)',
                    },
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        format: 'dd MMM',
                        style: {
                            colors: '#A7A7A7',
                            fontSize: '10px',
                            fontFamily: 'Montserrat',
                            fontWeight: 600,
                        }
                    },

                },
                tooltip: {
                    shared: true,
                    y: {
                        formatter: function (val: number) {
                            return val === null || val === undefined ? '' : `${val.toFixed(1)} kg`;
                        },
                    },
                },
                grid: {
                    show: false,
                    borderColor: '#1f1f1f',
                    strokeDashArray: 2,
                },
            },
        };
    }

    // Форматирование фактических данных веса
    formatData(statsData: StatsDataItem[]): TrendPoint[] {
        return statsData
            .filter((item) => item.weight_actual > 0) // Убираем записи с нулевым весом
            .map((item) => ({
                x: new Date(item.date).getTime(), // Преобразуем дату в timestamp
                y: item.weight_actual, // Используем вес
            }))
            .sort((a, b) => a.x - b.x);
    }

    // Строит все 3 серии (факт/тренд/прогноз) и прогнозные значения на 30/60/90 дней
    buildSeriesAndForecast(statsData: StatsDataItem[]) {
        const actualData = this.formatData(statsData);
        const trend = computeLinearTrend(actualData);

        const trendData = trend && actualData.length > 0
            ? [
                { x: actualData[0].x, y: predictTrendY(trend, actualData[0].x) },
                { x: actualData[actualData.length - 1].x, y: predictTrendY(trend, actualData[actualData.length - 1].x) },
            ]
            : [];

        const lastPoint = actualData[actualData.length - 1];
        const forecastPoints = trend && lastPoint
            ? [
                { x: lastPoint.x, y: predictTrendY(trend, lastPoint.x) },
                { x: lastPoint.x + 90 * DAY_MS, y: predictTrendY(trend, lastPoint.x + 90 * DAY_MS) },
            ]
            : [];

        const forecastEntries = forecastFromTrend(actualData, FORECAST_DAYS);

        return {
            series: [
                { name: 'Вес (факт)', type: 'area', data: actualData },
                { name: 'Тренд', type: 'line', data: trendData },
                { name: 'Прогноз', type: 'line', data: forecastPoints },
            ],
            forecast: forecastEntries ? forecastEntries.map(({ days, y }) => ({ days, y })) : null,
        };
    }

    // Обновление данных при изменении пропсов
    componentDidUpdate(prevProps: WeigthChartChartProps) {
        if (prevProps.statsData !== this.props.statsData) {
            const { series, forecast } = this.buildSeriesAndForecast(this.props.statsData);
            this.setState({ series, forecast });
        }
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        height={220}
                        className={style.chart}
                    />
                </div>
                {this.state.forecast && (
                    <div className={style.forecast}>
                        <span className={style.forecastLabel}>Прогноз веса:</span>
                        {this.state.forecast.map(({ days, y }) => (
                            <span key={days} className={style.forecastItem}>
                                {days} дн. — <b>{y.toFixed(1)} кг</b>
                            </span>
                        ))}
                    </div>
                )}
            </div>
        );
    }
}

export default WeigthChart;
