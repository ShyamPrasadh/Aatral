'use client';

import { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Shuffle } from 'lucide-react';
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

        // Draw main value - moved down by 20px
        ctx.font = 'bold 1.5rem Inter, Arial, sans-serif';
        ctx.fillStyle = '#1f2937'; // Dark color for better visibility
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(value, chart.width / 2, chart.height / 2 + 30);

        // Draw unit - moved down by 20px
        if (unit) {
            ctx.font = '500 0.75rem Inter, Arial, sans-serif';
            ctx.fillStyle = '#6b7280'; // Darker grey for unit
            ctx.fillText(unit, chart.width / 2, chart.height / 2 + 50);
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
    const [inputValue, setInputValue] = useState<string>(value.toString());
    const [displayValue, setDisplayValue] = useState<number>(value);

    const percentage = (displayValue / maxValue) * 100;

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        // Parse and validate the input
        const numVal = parseFloat(val);
        if (!isNaN(numVal) && numVal >= 1 && numVal <= 100) {
            setDisplayValue(numVal);
        }
    };

    // Handle randomize
    const handleRandomize = () => {
        const randomVal = Math.floor(Math.random() * 100) + 1;
        setInputValue(randomVal.toString());
        setDisplayValue(randomVal);
    };

    // Calculate segments with gaps, progressive fill, and dynamic border radius
    const getSegmentData = (val: number) => {
        const gapSize = 2;
        const greenMax = 33;
        const orangeMax = 33;
        const redMax = 34;

        // Original Colors
        const cGreen = '#25A959';
        const cGreenInactive = '#25A95933'; // 20% opacity
        const cOrange = '#F5935D';
        const cOrangeInactive = '#F5935D33'; // 20% opacity
        const cRed = '#FF0000';
        const cRedInactive = '#FF000033'; // 20% opacity
        const cTransparent = 'rgba(0,0,0,0)';

        let data = [];
        let bgColors = [];
        let borderRadius = [];

        // Helper for rounded corners
        const roundAll = 8;
        const roundStart = { outerStart: 8, innerStart: 8, outerEnd: 0, innerEnd: 0 };
        const roundEnd = { outerStart: 0, innerStart: 0, outerEnd: 8, innerEnd: 8 };
        const noRound = 0;

        // 1. Green Segment Logic
        if (val >= greenMax) {
            // Fully Active
            data.push(greenMax);
            bgColors.push(cGreen);
            borderRadius.push(roundAll);
        } else {
            // Split: Active Part
            data.push(val);
            bgColors.push(cGreen);
            borderRadius.push(roundStart);

            // Split: Inactive Part
            data.push(greenMax - val);
            bgColors.push(cGreenInactive);
            borderRadius.push(roundEnd);
        }

        // Gap 1
        data.push(gapSize);
        bgColors.push(cTransparent);
        borderRadius.push(noRound);

        // 2. Orange Segment Logic
        if (val <= greenMax) {
            // Fully Inactive
            data.push(orangeMax);
            bgColors.push(cOrangeInactive);
            borderRadius.push(roundAll);
        } else if (val >= greenMax + orangeMax) {
            // Fully Active
            data.push(orangeMax);
            bgColors.push(cOrange);
            borderRadius.push(roundAll);
        } else {
            // Split
            const orangeFill = val - greenMax;
            data.push(orangeFill);
            bgColors.push(cOrange);
            borderRadius.push(roundStart);

            data.push(orangeMax - orangeFill);
            bgColors.push(cOrangeInactive);
            borderRadius.push(roundEnd);
        }

        // Gap 2
        data.push(gapSize);
        bgColors.push(cTransparent);
        borderRadius.push(noRound);

        // 3. Red Segment Logic
        if (val <= greenMax + orangeMax) {
            // Fully Inactive
            data.push(redMax);
            bgColors.push(cRedInactive);
            borderRadius.push(roundAll);
        } else {
            // Split
            const redFill = val - (greenMax + orangeMax);
            data.push(redFill);
            bgColors.push(cRed);
            borderRadius.push(roundStart);

            data.push(redMax - redFill);
            bgColors.push(cRedInactive);
            borderRadius.push(roundEnd);
        }

        return { data, bgColors, borderRadius };
    };

    const { data: segmentData, bgColors: segmentColors, borderRadius: segmentBorderRadius } = getSegmentData(displayValue);

    // Custom plugin to draw the indicator circle (needle head)
    const indicatorPlugin = {
        id: 'indicator',
        afterDraw: (chart: any) => {
            const ctx = chart.ctx;
            const meta = chart.getDatasetMeta(0);

            // Get the exact dimensions from the chart meta
            const outerRadius = meta.data[0].outerRadius;
            const innerRadius = meta.data[0].innerRadius;

            // The indicator should be exactly in the middle of the outer ring
            const radius = (outerRadius + innerRadius) / 2;

            // Calculate angle
            // Chart starts at -125 degrees (in radians)
            // Circumference is 250 degrees
            const startAngle = -125 * (Math.PI / 180);
            const circumference = 250 * (Math.PI / 180);
            const valPercent = Math.min(Math.max(displayValue, 0), 100) / 100;
            const angle = startAngle + (circumference * valPercent);

            const cx = chart.width / 2;
            const cy = chart.height / 2;

            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            ctx.save();

            // Draw Circle Border (White)
            ctx.beginPath();
            ctx.arc(x, y, 10, 0, 2 * Math.PI); // Slightly smaller circle
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            // Determine current color based on value
            const currentColor = displayValue <= 33 ? '#25A959' : displayValue <= 66 ? '#F5935D' : '#FF0000';

            ctx.strokeStyle = currentColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw Inner Circle (Color)
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = currentColor;
            ctx.fill();

            ctx.restore();
        }
    };

    const data = {
        datasets: [
            // Outer Segmented Ring
            {
                data: segmentData,
                backgroundColor: segmentColors,
                borderWidth: 0,
                borderRadius: segmentBorderRadius, // Dynamic border radius
                circumference: 250,
                rotation: -125,
                radius: '90%',
                cutout: '85%', // Thicker ring like original
                spacing: 0 // We handle gaps manually
            },
            // Inner Grey Gauge (Thick, Fixed) - Original dimensions
            {
                data: [100],
                backgroundColor: ['#eeeeee'],
                borderWidth: 0,
                radius: '100%',
                cutout: '55%',
                circumference: 248,
                rotation: -125
            }
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.4,
        animation: false, // Disable all animations
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            centerText: {
                textTop: displayValue.toLocaleString(),
                textBottom: unit,
                textColor: '#ffffff' // Restored white text
            }
        },
    };

    // Register the local plugin
    useEffect(() => {
        ChartJS.register(indicatorPlugin);
        return () => {
            ChartJS.unregister(indicatorPlugin);
        };
    }, [displayValue]); // Re-register to update color logic if needed, though mostly static logic works

    return (
        <div className={styles.gaugeContainer}>
            <div className={styles.gaugeHeader}>
                <h3 className={styles.gaugeLabel}>{label}</h3>
            </div>

            <div className={styles.gaugeWrapper}>
                <div className={styles.chartContainer}>
                    <Doughnut data={data} options={options} />
                </div>

                <div className={styles.inputWrapper}>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={inputValue}
                        onChange={handleInputChange}
                        className={styles.valueInput}
                        placeholder="Enter 1-100"
                    />
                    <button
                        onClick={handleRandomize}
                        className={styles.randomButton}
                        title="Randomize Value"
                    >
                        <Shuffle size={16} />
                    </button>
                </div>

                <div className={styles.gaugeFooter}>
                    <span className={styles.meterId}>Meter No: {meterId}</span>
                </div>
            </div>
        </div>
    );
}
