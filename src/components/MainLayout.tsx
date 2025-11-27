'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import SplashScreen from '@/components/SplashScreen';
import { useSplash } from '@/components/SplashProvider';
import styles from '@/app/page.module.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
    const { showSplash } = useSplash();

    return (
        <div className={styles.layout}>
            {/* Continuous Splash Screen */}
            {showSplash && (
                <SplashScreen
                    onComplete={() => { }}
                    duration={3000}
                />
            )}

            <Sidebar
                isExpanded={isSidebarExpanded}
                toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)}
            />

            {/* Mobile-only toggle button */}
            <button
                className={styles.mobileToggle}
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                aria-label={isSidebarExpanded ? 'Close sidebar' : 'Open sidebar'}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
            </button>

            <main
                className={`${styles.main} ${!isSidebarExpanded ? styles.mainCollapsed : ''}`}
            >
                <Header />
                <div className={styles.content}>
                    {children}
                </div>
            </main>
        </div>
    );
}
