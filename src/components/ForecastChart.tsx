'use client';

import { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './ForecastChart.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

type TimeFrame = '5m' | '10m' | '1hr' | '3hr' | '1day';

export default function ForecastChart() {
    const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('1day');

    const timeFrames: { value: TimeFrame; label: string }[] = [
        { value: '5m', label: '5m' },
        { value: '10m', label: '10m' },
        { value: '1hr', label: '1hr' },
        { value: '3hr', label: '3hr' },
        { value: '1day', label: '1 Day' },
    ];

    // Different data for each time frame
    const getChartData = () => {
        switch (selectedTimeFrame) {
            case '5m':
                return {
                    labels: ['0m', '1m', '2m', '3m', '4m', '5m'],
                    actual: [3200, 3250, 3180, 3300, 3280, 3350],
                    forecast: [3180, 3220, 3200, 3280, 3300, 3320],
                };
            case '10m':
                return {
                    labels: ['0m', '2m', '4m', '6m', '8m', '10m'],
                    actual: [3150, 3200, 3180, 3250, 3300, 3400],
                    forecast: [3140, 3190, 3200, 3240, 3280, 3380],
                };
            case '1hr':
                return {
                    labels: ['0m', '10m', '20m', '30m', '40m', '50m', '60m'],
                    actual: [3100, 3150, 3200, 3250, 3300, 3350, 3400],
                    forecast: [3080, 3140, 3180, 3230, 3280, 3330, 3380],
                };
            case '3hr':
                return {
                    labels: ['0h', '0.5h', '1h', '1.5h', '2h', '2.5h', '3h'],
                    actual: [3000, 3100, 3200, 3300, 3400, 3500, 3600],
                    forecast: [2980, 3080, 3180, 3280, 3380, 3480, 3580],
                };
            case '1day':
            default:
                return {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    actual: [3200, 3400, 3100, 3600, 3300, 3500, 3400, 3700, 3500, 3800, 3600, 3900],
                    forecast: [3000, 3200, 3300, 3400, 3500, 3600, 3500, 3700, 3600, 3800, 3700, 3900],
                };
        }
    };

    const chartData = getChartData();

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Actual',
                data: chartData.actual,
                borderColor: '#00d084',
                backgroundColor: 'rgba(0, 208, 132, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#00d084',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
            {
                label: 'Forecast',
                data: chartData.forecast,
                borderColor: '#ffa726',
                backgroundColor: 'rgba(255, 167, 38, 0.1)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#ffa726',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                borderDash: [5, 5],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
                align: 'end' as const,
                labels: {
                    color: '#a8b8d8',
                    font: {
                        size: 12,
                        weight: '500' as const,
                    },
                    usePointStyle: true,
                    pointStyle: 'circle',
                    padding: 15,
                },
            },
            tooltip: {
                backgroundColor: 'rgba(26, 47, 74, 0.95)',
                titleColor: '#ffffff',
                bodyColor: '#a8b8d8',
                borderColor: 'rgba(168, 184, 216, 0.2)',
                borderWidth: 1,
                padding: 12,
                displayColors: true,
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y.toLocaleString() + ' kW';
                        }
                        return label;
                    }
                }
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(168, 184, 216, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7a94',
                    font: {
                        size: 11,
                    },
                },
            },
            y: {
                beginAtZero: false,
                min: 2800,
                grid: {
                    color: 'rgba(168, 184, 216, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#6b7a94',
                    font: {
                        size: 11,
                    },
                    callback: function (value: any) {
                        return value.toLocaleString() + ' kW';
                    },
                },
            },
        },
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
    };

    return (
        <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>Forecast vs Actual</h3>
                <div className={styles.timeFrameButtons}>
                    {timeFrames.map((tf) => (
                        <button
                            key={tf.value}
                            className={`${styles.timeFrameButton} ${selectedTimeFrame === tf.value ? styles.active : ''
                                }`}
                            onClick={() => setSelectedTimeFrame(tf.value)}
                        >
                            {tf.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.chartWrapper}>
                <Line data={data} options={options as any} />
            </div>
        </div>
    );
}
