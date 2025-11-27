'use client';

import { Bell, User, Sun, Moon, Play, X } from 'lucide-react';
import styles from './Header.module.css';
import { useTheme } from './ThemeProvider';
import { useSplash } from './SplashProvider';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const { showSplash, toggleSplash } = useSplash();

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.title}>Energy Dashboard</h1>

                <div className={styles.headerActions}>
                    <button
                        className={styles.iconButton}
                        onClick={toggleSplash}
                        aria-label="Toggle splash screen"
                        title={showSplash ? "Hide Splash Screen" : "Show Splash Screen"}
                    >
                        {showSplash ? <X size={20} /> : <Play size={20} />}
                    </button>

                    <button
                        className={styles.iconButton}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button className={styles.iconButton}>
                        <Bell size={20} />
                        <span className={styles.badge}>3</span>
                    </button>

                    <button className={styles.iconButton}>
                        <User size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
