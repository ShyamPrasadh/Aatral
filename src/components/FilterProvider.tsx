'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FilterContextType {
    isFilterVisible: boolean;
    toggleFilter: () => void;
    setFilterVisible: (visible: boolean) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [isFilterVisible, setIsFilterVisible] = useState(true);

    // Initialize from local storage if available
    useEffect(() => {
        const savedState = localStorage.getItem('isFilterVisible');
        if (savedState !== null) {
            setIsFilterVisible(savedState === 'true');
        }
    }, []);

    const toggleFilter = () => {
        setIsFilterVisible(prev => {
            const newState = !prev;
            localStorage.setItem('isFilterVisible', String(newState));
            return newState;
        });
    };

    const setFilterVisible = (visible: boolean) => {
        setIsFilterVisible(visible);
        localStorage.setItem('isFilterVisible', String(visible));
    };

    return (
        <FilterContext.Provider value={{ isFilterVisible, toggleFilter, setFilterVisible }}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}
