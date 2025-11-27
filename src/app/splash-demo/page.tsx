'use client';

import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import MainLayout from '@/components/MainLayout';
import styles from './page.module.css';

export default function SplashDemoPage() {
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    const resetSplash = () => {
        setShowSplash(true);
    };

    return (
        <>
            {showSplash && <SplashScreen onComplete={handleSplashComplete} duration={3000} />}

            <MainLayout>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Splash Screen Demo</h1>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                        The splash screen has completed. Click the button below to see it again.
                    </p>
                    <button
                        onClick={resetSplash}
                        className="btn btn-primary"
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Show Splash Screen Again
                    </button>
                </div>
            </MainLayout>
        </>
    );
}
