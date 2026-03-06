'use client';

import { Bell, User, Sun, Moon, Play, X, Search, SlidersHorizontal, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import styles from './Header.module.css';
import { useTheme } from './ThemeProvider';
import { useSplash } from './SplashProvider';
import { useFilter } from './FilterProvider';

export default function Header() {
    const { theme, toggleTheme } = useTheme();
    const { showSplash, toggleSplash } = useSplash();
    const { isFilterVisible, toggleFilter } = useFilter();
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <h1 className={styles.title}>Energy Dashboard</h1>

                <div className={styles.headerActions}>
                    <div className={styles.searchBar}>
                        <div className={styles.searchInputWrapper}>
                            <Search size={16} className={styles.searchIcon} />
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                className={`${styles.filterToggleBtn} ${isFilterVisible ? styles.filterActive : ''}`}
                                onClick={toggleFilter}
                                aria-label="Toggle filters"
                                title={isFilterVisible ? 'Hide Filters' : 'Show Filters'}
                            >
                                <SlidersHorizontal size={15} />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Actions */}
                    <div className={styles.desktopActions}>
                        <button
                            className={styles.iconButton}
                            onClick={toggleSplash}
                            aria-label="Toggle splash screen"
                            title={showSplash ? 'Hide Splash Screen' : 'Show Splash Screen'}
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

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="More options"
                    >
                        <MoreVertical size={20} />
                    </button>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className={styles.mobileMenuDropdown}>
                            <div className={styles.mobileMenuItem} onClick={toggleSplash}>
                                {showSplash ? <X size={18} /> : <Play size={18} />}
                                <span>Splash Screen</span>
                            </div>
                            <div className={styles.mobileMenuItem} onClick={toggleTheme}>
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                                <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                            </div>
                            <div className={styles.mobileMenuItem}>
                                <div className={styles.iconWithBadge}>
                                    <Bell size={18} />
                                    <span className={styles.mobileBadge}>3</span>
                                </div>
                                <span>Notifications</span>
                            </div>
                            <div className={styles.mobileMenuItem}>
                                <User size={18} />
                                <span>Profile</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
