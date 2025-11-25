'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import GaugeChart from '@/components/GaugeChart';
import ForecastChart from '@/components/ForecastChart';
import FilterDropdown from '@/components/FilterDropdown';
import { Building2, Zap, Activity } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [selectedBuilding, setSelectedBuilding] = useState('Building 1 - Dubai Marina');
    const [selectedMeter, setSelectedMeter] = useState('Meter 1');
    const [selectedSubMeter, setSelectedSubMeter] = useState('Sub Meter A');

    const buildings = [
        'Building 1 - Dubai Marina',
        'Building 2 - Downtown Dubai',
        'Building 3 - Business Bay',
        'Building 4 - JBR',
    ];

    const meters = ['Meter 1', 'Meter 2', 'Meter 3', 'Meter 4'];
    const subMeters = ['Sub Meter A', 'Sub Meter B', 'Sub Meter C'];

    return (
        <div className={styles.layout}>
            <Sidebar
                isExpanded={isSidebarExpanded}
                toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
            />

            <main
                className={`${styles.main} ${!isSidebarExpanded ? styles.mainCollapsed : ''}`}
            >
                <Header />

                <div className={styles.content}>
                    <div className={styles.filtersSection}>
                        <FilterDropdown
                            label="Buildings"
                            options={buildings}
                            value={selectedBuilding}
                            onChange={setSelectedBuilding}
                            icon={<Building2 size={16} />}
                        />

                        <FilterDropdown
                            label="Meter"
                            options={meters}
                            value={selectedMeter}
                            onChange={setSelectedMeter}
                            icon={<Zap size={16} />}
                        />

                        <FilterDropdown
                            label="Sub Meter"
                            options={subMeters}
                            value={selectedSubMeter}
                            onChange={setSelectedSubMeter}
                            icon={<Activity size={16} />}
                        />
                    </div>

                    <div className={styles.buildingTitle}>
                        <h2>{selectedBuilding}</h2>
                    </div>

                    <div className={styles.dashboardGrid}>
                        <div className={styles.gaugeSection}>
                            <GaugeChart
                                value={8400}
                                maxValue={10000}
                                label="CO2"
                                unit="Kw"
                                meterId="54556476"
                            />
                        </div>

                        <div className={styles.chartSection}>
                            <ForecastChart />
                        </div>
                    </div>

                    <div className={styles.metricsGrid}>
                        <div className={styles.metricCard}>
                            <div className={styles.metricIcon} style={{ background: 'linear-gradient(135deg, #00d084, #00a86b)' }}>
                                <Zap size={24} />
                            </div>
                            <div className={styles.metricContent}>
                                <p className={styles.metricLabel}>Total Energy</p>
                                <p className={styles.metricValue}>42,850 kWh</p>
                                <p className={styles.metricChange}>+12.5% from last month</p>
                            </div>
                        </div>

                        <div className={styles.metricCard}>
                            <div className={styles.metricIcon} style={{ background: 'linear-gradient(135deg, #ffa726, #f57c00)' }}>
                                <Activity size={24} />
                            </div>
                            <div className={styles.metricContent}>
                                <p className={styles.metricLabel}>Peak Demand</p>
                                <p className={styles.metricValue}>8,950 kW</p>
                                <p className={styles.metricChange}>+5.2% from last month</p>
                            </div>
                        </div>

                        <div className={styles.metricCard}>
                            <div className={styles.metricIcon} style={{ background: 'linear-gradient(135deg, #2563a8, #1a4d7a)' }}>
                                <Building2 size={24} />
                            </div>
                            <div className={styles.metricContent}>
                                <p className={styles.metricLabel}>Efficiency Score</p>
                                <p className={styles.metricValue}>87.5%</p>
                                <p className={styles.metricChange}>+3.1% from last month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
