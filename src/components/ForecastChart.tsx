'use client';

import { useState } from 'react';
import { Info, X } from 'lucide-react';
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

interface ForecastChartProps {
    filterKey?: string;
}

export default function ForecastChart({ filterKey = '' }: ForecastChartProps) {
    const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('1day');
    const [showInfo, setShowInfo] = useState(false);

    const timeFrames: { value: TimeFrame; label: string }[] = [
        { value: '5m', label: '5m' },
        { value: '10m', label: '10m' },
        { value: '1hr', label: '1hr' },
        { value: '3hr', label: '3hr' },
        { value: '1day', label: '1 Day' },
    ];

    // Simple pseudo-random number generator for consistent noise based on a seed
    const getNoise = (seed: string) => {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        }
        let x = Math.sin(hash++) * 10000;
        return x - Math.floor(x); // Returns a value between 0 and 1
    };

    // Different data for each time frame
    const getChartData = () => {
        const noiseRange = 600; // Moderate random variation
        // Calculate a base shift to vary the data level
        const baseShift = (getNoise(`${filterKey}-base`) - 0.5) * 800; // -0.5 to center the shift around 0

        const randomize = (arr: number[]) => {
            if (!filterKey) return arr; // Don't randomize if filterKey is 0 (initial state)
            return arr.map((val, i) => {
                const noise = (getNoise(`${filterKey}-${selectedTimeFrame}-${i}`) - 0.5) * noiseRange; // -0.5 to center noise around 0
                const newVal = val + baseShift + noise;
                // Clamp values to stay within chart range (2800-5500)
                return Math.round(Math.max(2800, Math.min(5500, newVal)));
            });
        };

        switch (selectedTimeFrame) {
            case '5m':
                return {
                    labels: ['0m', '1m', '2m', '3m', '4m', '5m'],
                    actual: randomize([3200, 3250, 3180, 3300, 3280, 3350]),
                    forecast: randomize([3180, 3220, 3200, 3280, 3300, 3320]),
                };
            case '10m':
                return {
                    labels: ['0m', '2m', '4m', '6m', '8m', '10m'],
                    actual: randomize([3150, 3200, 3180, 3250, 3300, 3400]),
                    forecast: randomize([3140, 3190, 3200, 3240, 3280, 3380]),
                };
            case '1hr':
                return {
                    labels: ['0m', '10m', '20m', '30m', '40m', '50m', '60m'],
                    actual: randomize([3100, 3150, 3200, 3250, 3300, 3350, 3400]),
                    forecast: randomize([3080, 3140, 3180, 3230, 3280, 3330, 3380]),
                };
            case '3hr':
                return {
                    labels: ['0h', '0.5h', '1h', '1.5h', '2h', '2.5h', '3h'],
                    actual: randomize([3000, 3100, 3200, 3300, 3400, 3500, 3600]),
                    forecast: randomize([2980, 3080, 3180, 3280, 3380, 3480, 3580]),
                };
            case '1day':
            default:
                return {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    actual: randomize([3200, 3400, 3100, 3600, 3300, 3500, 3400, 3700, 3500, 3800, 3600, 3900]),
                    forecast: randomize([3000, 3200, 3300, 3400, 3500, 3600, 3500, 3700, 3600, 3800, 3700, 3900]),
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
                <div className={styles.headerLeft}>
                    <h3 className={styles.chartTitle}>Power Usage</h3>
                    <div
                        className={styles.infoContainer}
                        onMouseEnter={() => setShowInfo(true)}
                        onMouseLeave={() => setShowInfo(false)}
                    >
                        <button className={styles.infoButton}>
                            <Info size={16} />
                        </button>
                        {showInfo && (
                            <div className={styles.infoPopup}>
                                <div className={styles.infoContent}>
                                    <p>This chart compares the <strong>Actual</strong> energy consumption against the <strong>Forecasted</strong> values over time. It helps in identifying deviations and optimizing energy usage.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
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
