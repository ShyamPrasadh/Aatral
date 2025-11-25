'use client';

import { useState } from 'react';
import {
    Home,
    LayoutDashboard,
    Building2,
    Users,
    FileText,
    Zap,
    ShoppingCart,
    CreditCard,
    BarChart3,
    Settings,
    LayoutGrid,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Building2, label: 'Buildings', href: '/buildings' },
    { icon: Users, label: 'Admin', href: '/admin' },
    { icon: FileText, label: 'Files', href: '/files' },
    { icon: Zap, label: 'Meters', href: '/meters' },
    { icon: ShoppingCart, label: 'Orders', href: '/orders' },
    { icon: Users, label: 'Customers', href: '/customers' },
    { icon: CreditCard, label: 'Payments', href: '/payments' },
    { icon: BarChart3, label: 'Reports', href: '/reports' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: LayoutGrid, label: 'Others', href: '/others' },
];

interface SidebarProps {
    isExpanded: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({ isExpanded, toggleSidebar }: SidebarProps) {

    return (
        <aside className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
            <div className={styles.sidebarHeader}>
                <div className={styles.logoContainer}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>⚡</span>
                        {isExpanded && <span className={styles.logoText}>AATRAL</span>}
                    </div>
                </div>
                <button
                    className={styles.toggleButton}
                    onClick={toggleSidebar}
                    aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                >
                    {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.menuList}>
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className={`${styles.menuItem} ${item.active ? styles.active : ''}`}
                                    title={!isExpanded ? item.label : ''}
                                >
                                    <span className={styles.menuIcon}>
                                        <Icon size={20} />
                                    </span>
                                    {isExpanded && <span className={styles.menuLabel}>{item.label}</span>}
                                    {item.active && <span className={styles.activeIndicator}></span>}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className={styles.sidebarFooter}>
                {isExpanded && (
                    <div className={styles.footerContent}>
                        <p className={styles.footerText}>Energy Dashboard v1.0</p>
                    </div>
                )}
            </div>
        </aside>
    );
}
