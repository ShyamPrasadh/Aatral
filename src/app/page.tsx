'use client';

import { useState, useEffect } from 'react';

import MainLayout from '@/components/MainLayout';
import BuildingSummaryCard from '@/components/BuildingSummaryCard';
import { Building2, Zap, Leaf, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import styles from './page.module.css';

const buildings = [
    {
        buildingName: 'Building 1 — Dubai Marina',
        co2Value: 70,
        currentUsage: 340,
        predictedUsage: 310,
        gaugeColor: '#22C55E',
        gaugeLabel: 'Good',
        trendPercent: '+2.4%',
        budgetPercent: 70,
    },
    {
        buildingName: 'Building 2 — Downtown Dubai',
        co2Value: 45,
        currentUsage: 520,
        predictedUsage: 480,
        gaugeColor: '#F59E0B',
        gaugeLabel: 'Moderate',
        trendPercent: '+5.8%',
        budgetPercent: 85,
    },
    {
        buildingName: 'Building 3 — Business Bay',
        co2Value: 82,
        currentUsage: 180,
        predictedUsage: 195,
        gaugeColor: '#DC2626',
        gaugeLabel: 'High',
        trendPercent: '-1.2%',
        budgetPercent: 55,
    },
    {
        buildingName: 'Building 4 — JBR',
        co2Value: 25,
        currentUsage: 150,
        predictedUsage: 140,
        gaugeColor: '#22C55E',
        gaugeLabel: 'Good',
        trendPercent: '+0.9%',
        budgetPercent: 42,
    },
];

const quickStats = [
    {
        icon: Building2,
        label: 'Total Buildings',
        value: '4',
        trend: '+1',
        trendDir: 'up' as const,
        colorClass: 'blue',
    },
    {
        icon: Zap,
        label: 'Total Energy',
        value: '620 kWh',
        trend: '+5.2%',
        trendDir: 'up' as const,
        colorClass: 'amber',
    },
    {
        icon: Leaf,
        label: 'CO₂ Saved',
        value: '1.2 Tons',
        trend: '+12%',
        trendDir: 'up' as const,
        colorClass: 'green',
    },
    {
        icon: DollarSign,
        label: 'Monthly Cost',
        value: '620 AED',
        trend: '-3.1%',
        trendDir: 'down' as const,
        colorClass: 'purple',
    },
];

const activities = [
    {
        message: 'Energy spike detected — consumption up 18% in last hour',
        time: '5 minutes ago',
        location: 'Dubai Marina',
        dotColor: 'red',
    },
    {
        message: 'Solar panel output reached peak generation at 1,240 kW',
        time: '22 minutes ago',
        location: 'Business Bay',
        dotColor: 'green',
    },
    {
        message: 'HVAC system scheduled maintenance completed successfully',
        time: '1 hour ago',
        location: 'Downtown Dubai',
        dotColor: 'blue',
    },
    {
        message: 'Monthly energy report generated and available for download',
        time: '3 hours ago',
        location: 'All Buildings',
        dotColor: 'blue',
    },
    {
        message: 'CO₂ emissions threshold warning — approaching 85% limit',
        time: '5 hours ago',
        location: 'Business Bay',
        dotColor: 'amber',
    },
    {
        message: 'New smart meter (M-1042) successfully registered and online',
        time: 'Yesterday',
        location: 'JBR',
        dotColor: 'green',
    },
];

export default function Home() {
    const [showAllBuildings, setShowAllBuildings] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const now = new Date();
    const greeting = mounted ? (now.getHours() < 12 ? 'Good Morning' : now.getHours() < 17 ? 'Good Afternoon' : 'Good Evening') : 'Good Morning';
    const dateStr = mounted ? now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }) : '';

    return (
        <MainLayout>
            <div className={styles.summaryWrapper}>
                {/* ── Welcome Banner ── */}
                <div className={styles.welcomeBanner}>
                    <div className={styles.welcomeContent}>
                        <div className={styles.welcomeText}>
                            <h2>{greeting}, Shyam 👋</h2>
                            <p>{dateStr} — Here&apos;s your energy portfolio overview.</p>
                        </div>
                        <div className={styles.welcomeStats}>
                            <div className={styles.welcomeStat}>
                                <span className={styles.welcomeStatValue}>4</span>
                                <span className={styles.welcomeStatLabel}>Buildings</span>
                            </div>
                            <div className={styles.welcomeStat}>
                                <span className={styles.welcomeStatValue}>12</span>
                                <span className={styles.welcomeStatLabel}>Meters</span>
                            </div>
                            <div className={styles.welcomeStat}>
                                <span className={styles.welcomeStatValue}>98%</span>
                                <span className={styles.welcomeStatLabel}>Uptime</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Quick Stats ── */}
                <div className={styles.quickStatsGrid}>
                    {quickStats.map((stat) => (
                        <div key={stat.label} className={styles.quickStatCard}>
                            <div className={`${styles.quickStatIcon} ${styles[stat.colorClass]}`}>
                                <stat.icon size={22} />
                            </div>
                            <div className={styles.quickStatInfo}>
                                <span className={styles.quickStatLabel}>{stat.label}</span>
                                <span className={styles.quickStatValue}>{stat.value}</span>
                                <span
                                    className={`${styles.quickStatTrend} ${stat.trendDir === 'up' ? styles.up : styles.down
                                        }`}
                                >
                                    {stat.trendDir === 'up' ? (
                                        <ArrowUpRight size={12} />
                                    ) : (
                                        <ArrowDownRight size={12} />
                                    )}
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Buildings ── */}
                <div className={styles.sectionHeader}>
                    <div>
                        <h3 className={styles.sectionTitle}>Your Buildings</h3>
                        <span className={styles.sectionSubtitle}>Monitor energy across all locations</span>
                    </div>
                    {buildings.length > 2 && (
                        <button
                            className={styles.viewAllBtn}
                            onClick={() => setShowAllBuildings(!showAllBuildings)}
                        >
                            {showAllBuildings ? 'Show Less' : `View All (${buildings.length})`}
                        </button>
                    )}
                </div>
                <div className={styles.buildingsGrid}>
                    {(showAllBuildings ? buildings : buildings.slice(0, 2)).map((b) => (
                        <BuildingSummaryCard
                            key={b.buildingName}
                            buildingName={b.buildingName}
                            co2Value={b.co2Value}
                            currentUsage={b.currentUsage}
                            predictedUsage={b.predictedUsage}
                            gaugeColor={b.gaugeColor}
                            gaugeLabel={b.gaugeLabel}
                            trendPercent={b.trendPercent}
                            budgetPercent={b.budgetPercent}
                        />
                    ))}
                </div>

                {/* ── Recent Activity ── */}
                <div className={styles.activitySection}>
                    <div className={styles.activityHeader}>
                        <h3 className={styles.activityTitle}>Recent Activity</h3>
                        <span className={styles.activityBadge}>{activities.length} events</span>
                    </div>
                    <div className={styles.activityList}>
                        {activities.map((a, i) => (
                            <div key={i} className={styles.activityItem}>
                                <div className={`${styles.activityDot} ${styles[a.dotColor]}`} />
                                <div className={styles.activityInfo}>
                                    <p className={styles.activityMessage}>{a.message}</p>
                                    <p className={styles.activityTime}>{a.time}</p>
                                </div>
                                <span className={styles.activityLocation}>{a.location}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
