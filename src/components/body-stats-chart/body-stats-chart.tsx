import React from 'react';
import ReactApexChart from 'react-apexcharts';

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
        data: Array<{ x: number; y: number }>;
    }>;
    options: any;
}

class MeasurementsChart extends React.Component<MeasurementsChartProps, MeasurementsChartState> {
    constructor(props: MeasurementsChartProps) {
        super(props);

        // Форматируем данные для каждой метрики
        const { waistData, hipsData, chestData } = this.formatData(props.statsData);

        this.state = {
            series: [
                { name: 'Waist', data: waistData },
                { name: 'Hips', data: hipsData },
                { name: 'Chest', data: chestData },
            ],
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
                    size: 3,
                    color: '#007AFF',
                    strokeWidth: 0,
                    strokeOpacity: 0.7,
                    hover: {
                        size: undefined,
                        sizeOffset: 0
                    }
                },
                stroke: {
                    width: 2,
                    curve: 'smooth',
                },
                colors: ['#86868b', '#007AFF', '#C8AB58'], // Цвета для линий
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
                            return `${val.toFixed(1)} cm`;
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
        const waistData = statsData
            .filter((item) => item.waist && item.waist > 0)
            .map((item) => ({
                x: new Date(item.date || '').getTime(),
                y: item.waist!,
            }));

        const hipsData = statsData
            .filter((item) => item.hips && item.hips > 0)
            .map((item) => ({
                x: new Date(item.date || '').getTime(),
                y: item.hips!,
            }));

        const chestData = statsData
            .filter((item) => item.chest && item.chest > 0)
            .map((item) => ({
                x: new Date(item.date || '').getTime(),
                y: item.chest!,
            }));

        return { waistData, hipsData, chestData };
    }

    // Обновление данных при изменении пропсов
    componentDidUpdate(prevProps: MeasurementsChartProps) {
        if (prevProps.statsData !== this.props.statsData) {
            const { waistData, hipsData, chestData } = this.formatData(this.props.statsData);
            this.setState({
                series: [
                    { name: 'Талия', data: waistData },
                    { name: 'Бедра', data: hipsData },
                    { name: 'Грудь', data: chestData },
                ],
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