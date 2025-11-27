'use client';

import { useState, useMemo } from 'react';
import MainLayout from '@/components/MainLayout';
import GaugeChart from '@/components/GaugeChart';
import ForecastChart from '@/components/ForecastChart';
import FilterDropdown from '@/components/FilterDropdown';
import { Building2, Zap, Activity } from 'lucide-react';
import styles from './page.module.css';

export default function Home() {
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

    // Generate a deterministic pseudo-random number based on a seed string
    const getSeededRandom = (seed: string): number => {
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
            hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        }
        let x = Math.sin(hash) * 10000;
        return x - Math.floor(x); // Returns a value between 0 and 1
    };

    // Calculate CO2 value based on selected filters (1-100 range)
    const co2Value = useMemo(() => {
        const filterKey = `${selectedBuilding}-${selectedMeter}-${selectedSubMeter}`;
        const randomValue = getSeededRandom(filterKey);
        // Generate a value between 20 and 95 for better visual variety
        return Math.round(20 + randomValue * 75);
    }, [selectedBuilding, selectedMeter, selectedSubMeter]);

    // Create a unique filter key for the ForecastChart
    const filterKey = useMemo(() => {
        return `${selectedBuilding}-${selectedMeter}-${selectedSubMeter}`;
    }, [selectedBuilding, selectedMeter, selectedSubMeter]);

    return (
        <MainLayout>
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
                        value={co2Value}
                        maxValue={10000}
                        label="CO2"
                        unit="Mt"
                        meterId="54556476"
                    />
                </div>

                <div className={styles.chartSection}>
                    <ForecastChart filterKey={filterKey} />
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
        </MainLayout>
    );
}
