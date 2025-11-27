'use client';

import { createContext, useContext, useState } from 'react';

interface SplashContextType {
    showSplash: boolean;
    toggleSplash: () => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export function SplashProvider({ children }: { children: React.ReactNode }) {
    const [showSplash, setShowSplash] = useState(false);

    const toggleSplash = () => {
        setShowSplash((prev) => !prev);
    };

    return (
        <SplashContext.Provider value={{ showSplash, toggleSplash }}>
            {children}
        </SplashContext.Provider>
    );
}

export function useSplash() {
    const context = useContext(SplashContext);
    if (context === undefined) {
        throw new Error('useSplash must be used within a SplashProvider');
    }
    return context;
}
