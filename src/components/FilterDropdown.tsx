'use client';

import { ChevronDown } from 'lucide-react';
import styles from './FilterDropdown.module.css';

interface FilterDropdownProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    icon?: React.ReactNode;
}

export default function FilterDropdown({
    label,
    options,
    value,
    onChange,
    icon
}: FilterDropdownProps) {
    return (
        <div className={styles.filterContainer}>
            <label className={styles.label}>
                {icon && <span className={styles.icon}>{icon}</span>}
                {label}
            </label>
            <div className={styles.selectWrapper}>
                <select
                    className={styles.select}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDown className={styles.chevron} size={16} />
            </div>
        </div>
    );
}
