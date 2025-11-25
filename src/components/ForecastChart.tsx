'use client';

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

export default function ForecastChart() {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Actual',
                data: [3200, 3400, 3100, 3600, 3300, 3500, 3400, 3700, 3500, 3800, 3600, 3900],
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
                data: [3000, 3200, 3300, 3400, 3500, 3600, 3500, 3700, 3600, 3800, 3700, 3900],
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
            </div>
            <div className={styles.chartWrapper}>
                <Line data={data} options={options as any} />
            </div>
        </div>
    );
}
