import React from 'react';
import ReactApexChart from 'react-apexcharts';
import style from './weigth-chart.module.css'

interface StatsDataItem {
    id: any;
    date: string;
    weight_actual: number;
    weight_target: number;
}

interface WeigthChartChartProps {
    statsData: StatsDataItem[];
}

interface WeigthChartState {
    series: {
        name: string;
        data: { x: number; y: number }[];
    }[];
    options: any;
}

class WeigthChart extends React.Component<WeigthChartChartProps, WeigthChartState> {
    constructor(props: WeigthChartChartProps) {
        super(props);

        // Форматирование данных для графика
        const formattedData = this.formatData(props.statsData);

        // Определяем минимальные и максимальные значения для оси Y
        const weightValues = formattedData.map((item) => item.y);
        const targetWeight = Math.min(...props.statsData.map(item => item.weight_target)); // Целевой вес
        const minWeight = targetWeight; // Устанавливаем минимальное значение как целевой вес
        const maxWeight = Math.max(...weightValues) * 1.01; // Немного увеличиваем для отступа

        // Инициализация начального состояния
        this.state = {
            series: [
                {
                    name: 'Weight Actual',
                    data: this.formatData(props.statsData), // Форматирование данных
                },
            ],
            options: {
                chart: {
                    type: 'area',
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
                fill: {
                    type: 'gradient',
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
                            return `${val.toFixed(1)} kg`;
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

    // Метод для форматирования данных
    formatData(statsData: StatsDataItem[]) {
        return statsData
            .filter((item) => item.weight_actual > 0) // Убираем записи с нулевым весом
            .map((item) => ({
                x: new Date(item.date).getTime(), // Преобразуем дату в timestamp
                y: item.weight_actual, // Используем вес
            }));
    }

    // Обновление данных при изменении пропсов
    componentDidUpdate(prevProps: WeigthChartChartProps) {
        if (prevProps.statsData !== this.props.statsData) {
            this.setState({
                series: [
                    {
                        name: 'Weight Actual',
                        data: this.formatData(this.props.statsData),
                    },
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
                        type="area"
                        height={220}
                        className={style.chart}
                    />
                </div>
            </div>
        );
    }
}

export default WeigthChart;