'use client';

import { useRouter } from 'next/navigation';
import { ArrowUpRight, Leaf, Zap, TrendingUp } from 'lucide-react';
import styles from './BuildingSummaryCard.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartEvent, ActiveElement, Plugin } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface BuildingSummaryCardProps {
    buildingName?: string;
    co2Value?: number;
    currentUsage?: number;
    predictedUsage?: number;
}

// Needle Plugin
const needlePlugin: Plugin<'doughnut'> = {
    id: 'needle',
    afterDatasetsDraw(chart, args, plugins) {
        const { ctx, data } = chart;

        const meta = chart.getDatasetMeta(0);
        // Cast to any to access internal Chart.js ArcElement properties which includes startAngle/endAngle in correct radians
        const arc = meta.data[0] as any;
        const { x, y, outerRadius, startAngle, endAngle } = arc;

        // Get the value from the data
        const dataTotal = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
        const value = data.datasets[0].data[0];
        // Calculate angle based on the actual drawn arc angles
        // The green arc (arc 0) EXACTLY represents the value coverage.
        // So the end of this arc IS the needle position.
        const angle = endAngle;

        ctx.save();

        // Translate to center of the doughnut arc
        ctx.translate(x, y);

        // Rotate to angle
        ctx.rotate(angle);

        // Draw Needle
        const length = outerRadius - 15; // Shorter length
        const tipRadius = 2;
        const baseRadius = 4; // Narrower base

        ctx.beginPath();
        // Start at top of base circle
        ctx.moveTo(0, -baseRadius);
        // Line to top of tip circle
        ctx.lineTo(length - tipRadius, -tipRadius);
        // Rounded tip
        ctx.arc(length - tipRadius, 0, tipRadius, -Math.PI / 2, Math.PI / 2);
        // Line to bottom of base circle
        ctx.lineTo(0, baseRadius);
        // Rounded base (draws arc from bottom to top around 0,0)
        ctx.arc(0, 0, baseRadius, Math.PI / 2, -Math.PI / 2);

        ctx.fillStyle = '#21c45dff'; // Green needle
        ctx.fill();

        ctx.restore();
    }
};

// Helper Gauge Component (Chart.js)
function Gauge({ value }: { value: number }) {
    const data = {
        labels: ['Value', 'Remainder'],
        datasets: [
            {
                data: [value, 100 - value],
                backgroundColor: ['#22C55E', '#E2E8F0'], // Green-500, Slate-200
                borderWidth: 0,
                circumference: 200, // User edited to 200
                rotation: 260, // User edited to 260
                borderRadius: 30, // Rounded ends
                cutout: '85%', // Thin arc
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }, // Disable tooltips for gauge
        },
        layout: {
            padding: {
                bottom: 0
            }
        }
    };

    return (
        <div className={styles.gaugeWrapper}>
            <Doughnut data={data} options={options} plugins={[needlePlugin]} />
        </div>
    );
}

export default function BuildingSummaryCard({
    buildingName = 'Building 1 - Dubai Marina',
    co2Value = 70,
    currentUsage = 100,
    predictedUsage = 100
}: BuildingSummaryCardProps) {
    const router = useRouter();

    const handleViewStats = () => {
        router.push('/dashboard');
    };

    return (
        <div className={styles.summaryCard}>
            {/* Header */}
            <div className={styles.cardHeader}>
                <h2 className={styles.buildingName}>{buildingName}</h2>
                <button className={styles.viewStatsButton} onClick={handleViewStats}>
                    <span className={styles.buttonText}>View all Stats</span>
                    <div className={styles.iconContainer}>
                        <div className={styles.rollingInner}>
                            <ArrowUpRight size={16} className={styles.buttonIcon} />
                            <ArrowUpRight size={16} className={`${styles.buttonIcon} ${styles.blueIcon}`} />
                        </div>
                    </div>
                </button>
            </div>

            {/* Grid Layout */}
            <div className={styles.statsGrid}>

                {/* Card 1: CO2 */}
                <div className={styles.statCard}>
                    <div className={styles.cardTop}>
                        <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
                            <Leaf size={20} />
                        </div>
                        <span className={styles.cardLabel}>CO2</span>
                    </div>

                    {/* New Horizontal Layout for Content */}
                    <div className={styles.co2ContentWrapper}>
                        {/* Left: Value */}
                        <div className={styles.valueGroupLeft}>
                            <span className={styles.valueLarge}>{co2Value}</span>
                            <span className={styles.unitBold}>Kg</span>
                        </div>

                        {/* Right: Gauge */}
                        <div className={styles.gaugeContainerSide}>
                            <Gauge value={co2Value} />
                            <span className={styles.gaugeLabelSide}>Excellent</span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Current Usage */}
                <div className={`${styles.statCard} ${styles.relativeCard}`}>
                    <div className={styles.cardTop}>
                        <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
                            <Zap size={20} />
                        </div>
                        <span className={styles.cardLabel}>Current Usage</span>
                    </div>

                    <div className={styles.cardBody}>
                        <div className={styles.valueGroup}>
                            <span className={styles.valueLarge}>{currentUsage}</span>
                            <span className={styles.unitBold}>AED</span>
                        </div>
                    </div>

                    {/* Trend Badge */}
                    <div className={styles.trendBadge}>
                        <ArrowUpRight size={14} className={styles.trendIcon} />
                        <span className={styles.trendText}>+2.4%</span>
                    </div>
                </div>

                {/* Card 3: Predicted Usage */}
                <div className={styles.statCard}>
                    <div>
                        <div className={styles.cardTop}>
                            <div className={`${styles.iconWrapper} ${styles.iconPurple}`}>
                                <TrendingUp size={20} />
                            </div>
                            <span className={styles.cardLabel}>Predicted Usage</span>
                        </div>

                        <div className={styles.cardBody}>
                            <div className={styles.valueGroup}>
                                <span className={styles.valueLarge}>{predictedUsage}</span>
                                <span className={styles.unitBold}>AED</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className={styles.progressContainer}>
                        <div className={styles.progressBarBg}>
                            <div className={styles.progressBarFill} style={{ width: '70%' }}></div>
                        </div>
                        <p className={styles.progressLabel}>70% of budget</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
