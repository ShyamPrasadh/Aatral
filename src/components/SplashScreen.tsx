'use client';

import { useEffect, useState } from 'react';
import { Zap, TrendingUp, BarChart3 } from 'lucide-react';
import styles from './SplashScreen.module.css';
import { useTheme } from './ThemeProvider';

interface SplashScreenProps {
    onComplete?: () => void;
    duration?: number;
}

export default function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const [key, setKey] = useState(0); // Key to force re-render for looping
    const { theme } = useTheme();

    // Check if this is continuous mode (empty onComplete function)
    const isContinuousMode = onComplete?.toString() === '() => {}';

    useEffect(() => {
        // Reset progress when key changes (for looping)
        setProgress(0);

        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, duration / 50);

        // Handle completion
        const timer = setTimeout(() => {
            if (isContinuousMode) {
                // Loop: reset and restart
                setKey((prev) => prev + 1);
            } else {
                // Normal mode: hide and call onComplete
                setIsVisible(false);
                setTimeout(() => {
                    onComplete?.();
                }, 500);
            }
        }, duration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(timer);
        };
    }, [duration, onComplete, isContinuousMode, key]);

    if (!isVisible) {
        return null;
    }

    return (
        <div className={styles.splashContainer} key={key}>
            {/* Animated Background */}
            <div className={styles.backgroundAnimation}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
            </div>

            {/* Main Content */}
            <div className={styles.content}>
                {/* Logo/Icon */}
                <div className={styles.logoContainer}>
                    <div className={styles.logoCircle}>
                        <Zap className={styles.logoIcon} size={48} />
                    </div>
                    <div className={styles.orbitingIcons}>
                        <div className={styles.orbitIcon} style={{ '--delay': '0s' } as React.CSSProperties}>
                            <TrendingUp size={20} />
                        </div>
                        <div className={styles.orbitIcon} style={{ '--delay': '1s' } as React.CSSProperties}>
                            <BarChart3 size={20} />
                        </div>
                    </div>
                </div>

                {/* Brand Logo */}
                <div className={styles.brandLogoContainer}>
                    <img
                        src="/assets/aatral_logo.png"
                        alt="AATRAL"
                        className={styles.brandLogo}
                    />
                </div>

                <p className={styles.tagline}>Energy Intelligence Platform</p>

                {/* Progress Bar */}
                <div className={styles.progressContainer}>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className={styles.loadingText}>Loading your dashboard...</p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className={styles.decorativeGrid}></div>
        </div>
    );
}
