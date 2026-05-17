"use client";

import { useState, useRef, useEffect, useMemo,} from 'react';
import { ChevronDown } from 'lucide-react';
import { useGetProfile } from '@/features/settings/hooks/profileHooks';
import type { MonthOption } from '../types/dashboard-types';
import DashboardContent from './DashboardContent';

function buildMonthOptions(startYear: number, startMonth: number): MonthOption[] {
    const MONTH_NAMES = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // 1-indexed

    const options: MonthOption[] = [];
    let y = startYear;
    let m = startMonth;

    while (y < currentYear || (y === currentYear && m <= currentMonth)) {
        options.push({
            label: `${MONTH_NAMES[m - 1]} ${y}`,
            month: m,
            year: y,
        });
        m++;
        if (m > 12) {
            m = 1;
            y++;
        }
    }

    return options;
}

const DashboardSection = () => {
    const now = new Date();
    const [selectedYear, setSelectedYear] = useState(now.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownListRef = useRef<HTMLDivElement>(null);

    // Get user profile to determine registration date
    const { data: profileResponse } = useGetProfile();

    // Build month options from registration date to current month
    const monthOptions = useMemo(() => {
        const profileData = profileResponse?.updatedAt;
        if (profileData) {
            const regDate = new Date(profileData);
            return buildMonthOptions(regDate.getFullYear(), regDate.getMonth() + 1);
        }
        // Fallback: only show current month if no profile data yet
        return buildMonthOptions(now.getFullYear(), now.getMonth() + 1);
    }, [profileResponse]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Auto-scroll dropdown to the bottom (current month) when opened
    useEffect(() => {
        if (isDropdownOpen && dropdownListRef.current) {
            dropdownListRef.current.scrollTop = dropdownListRef.current.scrollHeight;
        }
    }, [isDropdownOpen]);

    // Get label for the currently selected month
    const selectedLabel = monthOptions.find(
        (o) => o.year === selectedYear && o.month === selectedMonth
    )?.label ?? 'Pilih bulan';

    return (
        <div className="space-y-8 w-full mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-poppins-700 text-black">Hai, Katering Sejahtera!</h1>
                    <p className="text-graytext-secondary mt-1">Ringkasan singkat usaha catering hari ini.</p>
                </div>

                {/* Month Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className="flex items-center gap-2 bg-green-primary text-white px-5 py-2.5 rounded-full font-semibold hover:bg-green-bitdark transition-colors w-fit"
                    >
                        {selectedLabel}
                        <ChevronDown
                            size={20}
                            className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {isDropdownOpen && (
                        <div ref={dropdownListRef} className="absolute right-0 mt-2 w-56 max-h-64 overflow-y-auto bg-white rounded-2xl shadow-lg shadow-gray-300 border border-gray-100 z-50 py-2">
                            {monthOptions.map((option) => {
                                const isActive =
                                    option.year === selectedYear && option.month === selectedMonth;
                                return (
                                    <button
                                        key={`${option.year}-${option.month}`}
                                        onClick={() => {
                                            setSelectedYear(option.year);
                                            setSelectedMonth(option.month);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-5 py-2.5 text-sm font-medium transition-colors ${isActive
                                                ? 'bg-green-superlight text-green-primary font-bold'
                                                : 'text-graytext-primary hover:bg-gray-50'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <DashboardContent year={selectedYear} month={selectedMonth} />
        </div>
    );
};

export default DashboardSection;
