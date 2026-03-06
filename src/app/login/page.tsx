'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Mail, Lock, ArrowRight, Sun, Moon, BarChart3, TrendingDown,
    Clock, Building2, Zap, Leaf, DollarSign, Shield, Activity,
    FileText, Settings, ChevronRight
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();
    const { theme, toggleTheme } = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            router.push('/');
        }, 600);
    };

    return (
        <div className={styles.landingContainer}>
            {/* ── Navbar ── */}
            <nav className={styles.navbar}>
                <div className={styles.navLeft}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            src="/assets/Aatral.png"
                            alt="AATRAL Logo"
                            width={120}
                            height={32}
                            className={styles.logoImage}
                            priority
                        />
                    </Link>
                    <div className={styles.navLinks}>
                        <Link href="#features" className={styles.navLink}>Features</Link>
                        <Link href="#stats" className={styles.navLink}>Overview</Link>
                        <Link href="#buildings" className={styles.navLink}>Buildings</Link>
                        <Link href="#cta" className={styles.navLink}>Get Started</Link>
                    </div>
                </div>
                <div className={styles.navRight}>
                    <button
                        className={styles.themeToggle}
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Link href="#login-form" className={styles.loginCtaBtn}>
                        Sign In
                    </Link>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className={styles.heroSection}>
                <div className={styles.heroBg}>
                    <Image
                        src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2940&auto=format&fit=crop"
                        alt="Wind turbines in field"
                        fill
                        className={styles.heroBgImage}
                        priority
                    />
                    <div className={styles.heroBgOverlay} />
                </div>

                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>
                            Embrace the data, <br />
                            <span className={styles.heroTitleHighlight}>empower your facilities.</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            AATRAL delivers actionable insights for sustainable and efficient building management. Unify your energy data across all your properties today.
                        </p>
                        <Link href="/dashboard" className={styles.heroBtn}>
                            Request Demo <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className={styles.loginCardWrapper} id="login-form">
                        <div className={styles.loginCard}>
                            <div className={styles.loginHeader}>
                                <h2 className={styles.loginTitle}>Welcome back</h2>
                                <p className={styles.loginSubtitle}>Sign in to access your energy dashboard</p>
                            </div>

                            <form onSubmit={handleLogin}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>Email Address</label>
                                    <div className={styles.inputWrapper}>
                                        <Mail size={18} className={styles.inputIcon} />
                                        <input
                                            type="email"
                                            id="email"
                                            className={styles.input}
                                            placeholder="you@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="password" className={styles.label}>Password</label>
                                    <div className={styles.inputWrapper}>
                                        <Lock size={18} className={styles.inputIcon} />
                                        <input
                                            type="password"
                                            id="password"
                                            className={styles.input}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.forgotPassword}>
                                    <Link href="#" className={styles.forgotLink}>Forgot password?</Link>
                                </div>

                                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                                    {isLoading ? 'Signing in...' : 'Enter Dashboard'}
                                    {!isLoading && <ArrowRight size={18} />}
                                </button>
                            </form>

                            <div className={styles.loginFooter}>
                                Don&apos;t have an account? <Link href="#cta" className={styles.forgotLink}>Request access</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Feature Section: Platform Capabilities ── */}
            <section id="features" className={styles.featureSection}>
                <div className={styles.featureContent}>
                    <div className={styles.featureTextWrapper}>
                        <span className={styles.featureSub}>• Platform Capabilities</span>
                        <h2 className={styles.featureTitle}>
                            Intelligent Energy Management at Scale
                        </h2>

                        <ul className={styles.featureList}>
                            <li className={styles.featureListItem}>
                                <div className={styles.featureListIcon}>
                                    <BarChart3 size={24} />
                                </div>
                                <div className={styles.featureListText}>
                                    <h4>Real-Time Analytics</h4>
                                    <p>Monitor your entire portfolio across multiple buildings to quickly identify usage anomalies and optimise efficiency.</p>
                                </div>
                            </li>
                            <li className={styles.featureListItem}>
                                <div className={styles.featureListIcon}>
                                    <TrendingDown size={24} />
                                </div>
                                <div className={styles.featureListText}>
                                    <h4>CO₂ Reduction Tracking</h4>
                                    <p>Meet sustainability goals by continuously measuring carbon footprints and benchmarking consumption against industry standards.</p>
                                </div>
                            </li>
                            <li className={styles.featureListItem}>
                                <div className={styles.featureListIcon}>
                                    <Clock size={24} />
                                </div>
                                <div className={styles.featureListText}>
                                    <h4>Predictive Forecasting</h4>
                                    <p>Our algorithms project multi-month usage, allowing proactive budget scaling and operational tweaks before issues arise.</p>
                                </div>
                            </li>
                        </ul>

                        <Link href="/dashboard" className={styles.featureBtn}>
                            Explore the Dashboard <ChevronRight size={16} />
                        </Link>
                    </div>

                    <div className={styles.featureImageGrid}>
                        <div className={styles.featureImageCard}>
                            <Image
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop"
                                alt="Dashboard Analytics Data"
                                fill
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Buildings Showcase ── */}
            <section id="buildings" className={styles.buildingsSection}>
                <div className={styles.buildingsContent}>
                    <div className={styles.buildingsHeader}>
                        <h2 className={styles.featureTitle}>Monitor Buildings Across All Locations</h2>
                        <p className={styles.buildingsDesc}>
                            Track energy usage, CO₂ emissions, and budget utilisation for every building in your portfolio from a single unified dashboard.
                        </p>
                    </div>

                    <div className={styles.buildingsGrid}>
                        {[
                            { name: 'Dubai Marina', co2: '70 Mt', usage: '340 kWh', budget: 70, status: 'Good', color: '#22C55E' },
                            { name: 'Downtown Dubai', co2: '45 Mt', usage: '520 kWh', budget: 85, status: 'Moderate', color: '#F59E0B' },
                            { name: 'Business Bay', co2: '82 Mt', usage: '180 kWh', budget: 55, status: 'High', color: '#DC2626' },
                            { name: 'JBR', co2: '25 Mt', usage: '150 kWh', budget: 42, status: 'Good', color: '#22C55E' },
                        ].map((b) => (
                            <Link href="/buildings" key={b.name} className={styles.buildingCard}>
                                <div className={styles.buildingCardHeader}>
                                    <Building2 size={20} />
                                    <h4>{b.name}</h4>
                                </div>
                                <div className={styles.buildingCardStats}>
                                    <div className={styles.buildingStatItem}>
                                        <span className={styles.buildingStatLabel}>CO₂</span>
                                        <span className={styles.buildingStatValue}>{b.co2}</span>
                                    </div>
                                    <div className={styles.buildingStatItem}>
                                        <span className={styles.buildingStatLabel}>Usage</span>
                                        <span className={styles.buildingStatValue}>{b.usage}</span>
                                    </div>
                                    <div className={styles.buildingStatItem}>
                                        <span className={styles.buildingStatLabel}>Budget</span>
                                        <span className={styles.buildingStatValue}>{b.budget}%</span>
                                    </div>
                                </div>
                                <div className={styles.buildingStatusRow}>
                                    <span className={styles.buildingStatusDot} style={{ background: b.color }} />
                                    <span className={styles.buildingStatusText}>{b.status}</span>
                                    <ChevronRight size={14} className={styles.buildingArrow} />
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className={styles.buildingsActions}>
                        <Link href="/buildings" className={styles.featureBtn}>
                            View All Buildings <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Dashboard Features Grid ── */}
            <section className={styles.dashFeaturesSection}>
                <div className={styles.dashFeaturesContent}>
                    <div className={styles.buildingsHeader}>
                        <span className={styles.featureSub}>• Everything You Need</span>
                        <h2 className={styles.featureTitle}>A Complete Facility Management Suite</h2>
                    </div>

                    <div className={styles.dashFeaturesGrid}>
                        <Link href="/dashboard" className={styles.dashFeatureCard}>
                            <div className={`${styles.dashFeatureIcon} ${styles.blueIcon}`}>
                                <BarChart3 size={24} />
                            </div>
                            <h4>Dashboard</h4>
                            <p>CO₂ gauges, forecast charts, and energy metrics at a glance.</p>
                        </Link>
                        <Link href="/buildings" className={styles.dashFeatureCard}>
                            <div className={`${styles.dashFeatureIcon} ${styles.greenIcon}`}>
                                <Building2 size={24} />
                            </div>
                            <h4>Buildings</h4>
                            <p>Manage properties across multiple locations in one place.</p>
                        </Link>
                        <Link href="/meters" className={styles.dashFeatureCard}>
                            <div className={`${styles.dashFeatureIcon} ${styles.amberIcon}`}>
                                <Activity size={24} />
                            </div>
                            <h4>Meters & Sub-Meters</h4>
                            <p>Granular metering data for each floor, zone, and equipment.</p>
                        </Link>
                        <Link href="/reports" className={styles.dashFeatureCard}>
                            <div className={`${styles.dashFeatureIcon} ${styles.purpleIcon}`}>
                                <FileText size={24} />
                            </div>
                            <h4>Reports</h4>
                            <p>Generate monthly energy and sustainability reports automatically.</p>
                        </Link>
                        <Link href="/settings" className={styles.dashFeatureCard}>
                            <div className={`${styles.dashFeatureIcon} ${styles.grayIcon}`}>
                                <Settings size={24} />
                            </div>
                            <h4>Settings</h4>
                            <p>Configure alerts, notification preferences, and user access.</p>
                        </Link>
                        <Link href="/admin" className={styles.dashFeatureCard}>
                            <div className={`${styles.dashFeatureIcon} ${styles.redIcon}`}>
                                <Shield size={24} />
                            </div>
                            <h4>Admin Panel</h4>
                            <p>Manage users, permissions, and system configuration.</p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section id="cta" className={styles.ctaSection}>
                <div className={styles.ctaContent}>
                    <h2 className={styles.ctaTitle}>Ready to optimise your energy infrastructure?</h2>
                    <p className={styles.ctaSubtitle}>
                        Get started with AATRAL today and take control of your facility&apos;s energy consumption, costs, and carbon footprint.
                    </p>
                    <div className={styles.ctaActions}>
                        <Link href="#login-form" className={styles.ctaPrimary}>
                            Sign In to Dashboard <ArrowRight size={18} />
                        </Link>
                        <Link href="/dashboard" className={styles.ctaSecondary}>
                            Explore Demo <ChevronRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerLeft}>
                        <Image src="/assets/Aatral.png" alt="AATRAL" width={100} height={28} />
                        <p className={styles.footerDesc}>Smart energy management for modern infrastructure.</p>
                    </div>
                    <div className={styles.footerLinks}>
                        <Link href="/dashboard">Dashboard</Link>
                        <Link href="/buildings">Buildings</Link>
                        <Link href="/reports">Reports</Link>
                        <Link href="/settings">Settings</Link>
                    </div>
                    <div className={styles.footerCopy}>
                        © 2026 AATRAL Engineering. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
