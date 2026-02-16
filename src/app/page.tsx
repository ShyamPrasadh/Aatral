'use client';

import MainLayout from '@/components/MainLayout';
import BuildingSummaryCard from '@/components/BuildingSummaryCard';
import styles from './page.module.css';

export default function Home() {
    return (
        <MainLayout>
            <div className={styles.summaryWrapper}>
                <BuildingSummaryCard
                    buildingName="Building 1 - Dubai Marina"
                    co2Value={70}
                    currentUsage={100}
                    predictedUsage={100}
                />
            </div>
        </MainLayout>
    );
}
