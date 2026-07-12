import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { computeLinearTrend, predictTrendY, TrendPoint } from '../../utils/linearTrend';

export type TStatisticsData = {
    id?: number;
    user?: string;
    date?: string;
    abdominal?: number;
    chest?: number;
    hips?: number;
    neck?: number;
    waist?: number;
};

interface MeasurementsChartProps {
    statsData: TStatisticsData[];
}

interface MeasurementsChartState {
    series: Array<{
        name: string;
        type: string;
        data: Array<{ x: number; y: number }>;
    }>;
    options: any;
}

class MeasurementsChart extends React.Component<MeasurementsChartProps, MeasurementsChartState> {
    constructor(props: MeasurementsChartProps) {
        super(props);

        this.state = {
            series: this.buildSeries(props.statsData),
            options: {
                chart: {
                    type: 'line',
                    zoom: {
                        enabled: true,
                        autoScaleYaxis: true,
                    },
                    toolbar: {
                        show: false,
                        autoSelected: 'zoom',
                    },
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [0, 1, 2],
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
                    position: 'bottom',
                    markers: {
                        size: 1,
                    },
                    fontSize: '11px',
                    fontFamily: 'Montserrat',
                    fontWeight: 'bold',
                },
                markers: {
                    size: [3, 3, 3, 0, 0, 0],
                    strokeWidth: 0,
                    strokeOpacity: 0.7,
                    hover: {
                        size: undefined,
                        sizeOffset: 0
                    }
                },
                stroke: {
                    width: [2, 2, 2, 1, 1, 1],
                    dashArray: [0, 0, 0, 4, 4, 4],
                    curve: 'smooth',
                },
                // Талия, Бедра, Грудь + их линии тренда тех же цветов
                colors: ['#86868b', '#007AFF', '#C8AB58', '#86868b', '#007AFF', '#C8AB58'],
                yaxis: {
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
                        text: 'Измерения (cm)',
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
                            return val === null || val === undefined ? '' : `${val.toFixed(1)} cm`;
                        },
                    },
                },
                grid: {
                    borderColor: '#1f1f1f',
                    strokeDashArray: 2,
                },
            },
        };
    }

    // Метод форматирования данных
    formatData(statsData: TStatisticsData[]) {
        const toPoints = (key: 'waist' | 'hips' | 'chest'): TrendPoint[] =>
            statsData
                .filter((item) => item[key] && item[key]! > 0)
                .map((item) => ({
                    x: new Date(item.date || '').getTime(),
                    y: item[key]!,
                }))
                .sort((a, b) => a.x - b.x);

        return {
            waistData: toPoints('waist'),
            hipsData: toPoints('hips'),
            chestData: toPoints('chest'),
        };
    }

    // Линия тренда (2 точки: от первой до последней даты) для одной метрики
    buildTrendLine(points: TrendPoint[]): TrendPoint[] {
        if (points.length === 0) return [];
        const trend = computeLinearTrend(points);
        if (!trend) return [];

        const first = points[0];
        const last = points[points.length - 1];
        return [
            { x: first.x, y: predictTrendY(trend, first.x) },
            { x: last.x, y: predictTrendY(trend, last.x) },
        ];
    }

    buildSeries(statsData: TStatisticsData[]) {
        const { waistData, hipsData, chestData } = this.formatData(statsData);

        return [
            { name: 'Талия', type: 'line', data: waistData },
            { name: 'Бедра', type: 'line', data: hipsData },
            { name: 'Грудь', type: 'line', data: chestData },
            { name: 'Талия (тренд)', type: 'line', data: this.buildTrendLine(waistData) },
            { name: 'Бедра (тренд)', type: 'line', data: this.buildTrendLine(hipsData) },
            { name: 'Грудь (тренд)', type: 'line', data: this.buildTrendLine(chestData) },
        ];
    }

    // Обновление данных при изменении пропсов
    componentDidUpdate(prevProps: MeasurementsChartProps) {
        if (prevProps.statsData !== this.props.statsData) {
            this.setState({
                series: this.buildSeries(this.props.statsData),
            });
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
                    />
                </div>
            </div>
        );
    }
}

export default MeasurementsChart;
