'use client';

import { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen';

interface AppWrapperProps {
    children: React.ReactNode;
    showSplash?: boolean;
    splashDuration?: number;
}

export default function AppWrapper({
    children,
    showSplash = true,
    splashDuration = 3000
}: AppWrapperProps) {
    const [isLoading, setIsLoading] = useState(showSplash);
    const [hasShownSplash, setHasShownSplash] = useState(false);

    useEffect(() => {
        // Check if splash has been shown in this session
        const splashShown = sessionStorage.getItem('splashShown');

        if (splashShown === 'true' || !showSplash) {
            setIsLoading(false);
        } else {
            setHasShownSplash(true);
        }
    }, [showSplash]);

    const handleSplashComplete = () => {
        setIsLoading(false);
        sessionStorage.setItem('splashShown', 'true');
    };

    return (
        <>
            {isLoading && hasShownSplash && (
                <SplashScreen
                    onComplete={handleSplashComplete}
                    duration={splashDuration}
                />
            )}
            {children}
        </>
    );
}
