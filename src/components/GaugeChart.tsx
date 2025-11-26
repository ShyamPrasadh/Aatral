'use client';

import { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './GaugeChart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

// Center text plugin
const centerTextPlugin = {
    id: 'centerText',
    afterDraw(chart: any) {
        // Only draw if centerText is explicitly configured
        if (!chart.config.options.plugins.centerText) {
            return;
        }

        const ctx = chart.ctx;
        const value = chart.config.options.plugins.centerText?.textTop || '0';
        const unit = chart.config.options.plugins.centerText?.textBottom || '';

        ctx.save();

        // Draw main value
        ctx.font = 'bold 2.5rem Inter, Arial, sans-serif';
        ctx.fillStyle = chart.config.options.plugins.centerText?.textColor || '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value, chart.width / 2, chart.height / 2 - 10);

        // Draw unit
        if (unit) {
            ctx.font = '500 1rem Inter, Arial, sans-serif';
            ctx.fillStyle = '#a8b8d8';
            ctx.fillText(unit, chart.width / 2, chart.height / 2 + 25);
        }

        ctx.restore();
    }
};

ChartJS.register(centerTextPlugin);

interface GaugeChartProps {
    value: number;
    maxValue: number;
    label: string;
    unit: string;
    meterId?: string;
}

export default function GaugeChart({
    value,
    maxValue,
    label,
    unit,
    meterId = 'N/A'
}: GaugeChartProps) {
    const percentage = (value / maxValue) * 100;

    // Determine color based on percentage
    const getColor = (val: number) => {
        if (val <= 33) return '#25A959';      // Green
        if (val <= 66) return '#F5935D';      // Orange
        return '#FF0000';                      // Red
    };

    const data = {
        datasets: [
            // Background segments (always visible)
            {
                data: [33, 33, 34],
                backgroundColor: ['#25A959', '#F5935D', '#FF0000'],
                borderWidth: 0,
                borderRadius: 8,
                spacing: 4,
                circumference: 250,
                rotation: -125,
                radius: '100%',
                cutout: '85%'
            },
            // Needle/indicator layer
            {
                data: [percentage, 100 - percentage],
                backgroundColor: [getColor(percentage), 'rgba(42, 42, 42, 0.1)'],
                borderWidth: 0,
                circumference: 250,
                rotation: -125,
                radius: '110%',
                cutout: '75%'
            }
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.4,
        animation: {
            duration: 800,
            easing: 'easeInOutQuart'
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
            },
            centerText: {
                textTop: value.toLocaleString(),
                textBottom: unit,
                textColor: '#ffffff'
            }
        },
    };

    return (
        <div className={styles.gaugeContainer}>
            <div className={styles.gaugeHeader}>
                <h3 className={styles.gaugeLabel}>{label}</h3>
            </div>

            <div className={styles.gaugeWrapper}>
                <div className={styles.chartContainer}>
                    <Doughnut data={data} options={options} />
                </div>

                <div className={styles.gaugeFooter}>
                    <span className={styles.meterId}>Meter No: {meterId}</span>
                </div>
            </div>
        </div>
    );
}
