'use client';

import { cn } from '@/src/lib/utils';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export type CalendarProps = {
    onDateSelect?: (date: Date) => void;
    initialDate?: Date;
    className?: string;
    variant?: 'default' | 'small';
    /**
     * When true, the calendar will adapt its size based on screen width
     */
    responsive?: boolean;
    /**
     * Controls the theme of the calendar
     * @default 'light'
     */
    mode?: 'light' | 'dark';
};

const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate();
};

const getStartDayOfMonth = (year: number, month: number): number => {
    return new Date(year, month, 1).getDay();
};

const getMonthName = (month: number): string => {
    return new Date(0, month).toLocaleString('default', { month: 'long' });
};

export const Calendar = ({
    onDateSelect,
    initialDate = new Date(),
    className,
    variant = 'default',
    responsive = false,
    mode = 'light',
}: CalendarProps) => {
    // Add responsive hook for mobile detection
    const [isMobile, setIsMobile] = useState(false);
    // State for the year dropdown
    const [showYearDropdown, setShowYearDropdown] = useState(false);

    // Determine if dark mode is active
    const isDarkMode = mode === 'dark';

    useEffect(() => {
        if (responsive) {
            const checkMobile = () => {
                setIsMobile(window.innerWidth < 640);
            };

            checkMobile();
            window.addEventListener('resize', checkMobile);
            return () => window.removeEventListener('resize', checkMobile);
        }
    }, [responsive]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

    const todayDate = new Date();
    const isToday = (date: number): boolean => {
        return (
            date === todayDate.getDate() &&
            currentMonth === todayDate.getMonth() &&
            currentYear === todayDate.getFullYear()
        );
    };

    const isSelected = (date: number): boolean => {
        if (!selectedDate) return false;
        return (
            date === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear()
        );
    };

    useEffect(() => {
        setCurrentMonth(initialDate.getMonth());
        setCurrentYear(initialDate.getFullYear());
    }, [initialDate]);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const startDay = getStartDayOfMonth(currentYear, currentMonth);

    // Get previous month's last days
    const prevMonthDays = getDaysInMonth(
        currentMonth === 0 ? currentYear - 1 : currentYear,
        currentMonth === 0 ? 11 : currentMonth - 1,
    );

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleDateClick = (day: number) => {
        const newSelectedDate = new Date(currentYear, currentMonth, day);
        setSelectedDate(newSelectedDate);
        if (onDateSelect) {
            onDateSelect(newSelectedDate);
        }
    };

    const handleYearSelect = (year: number) => {
        setCurrentYear(year);
        setShowYearDropdown(false);
    };

    // Get days for next month
    const nextMonthDays = 42 - (startDay + daysInMonth);

    // Prepare calendar days
    const calendarDays = [];

    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
        calendarDays.push({
            day: prevMonthDays - i,
            isPrevMonth: true,
            isNextMonth: false,
            isCurrentMonth: false,
        });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        calendarDays.push({
            day: i,
            isPrevMonth: false,
            isNextMonth: false,
            isCurrentMonth: true,
        });
    }

    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
        calendarDays.push({
            day: i,
            isPrevMonth: false,
            isNextMonth: true,
            isCurrentMonth: false,
        });
    }

    const weekdays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    // Generate year options (10 years back and forward)
    const yearOptions = Array.from({ length: 201 }, (_, i) => currentYear - 100 + i);
    // Determine if we should use the small variant
    const useSmallVariant = responsive ? isMobile : variant === 'small';

    return (
        <div
            className={cn(
                'w-full max-w-sm rounded-lg shadow-md p-4',
                isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
                useSmallVariant ? 'text-sm' : '',
                className,
            )}
        >
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center relative">
                    <h4
                        className={cn(
                            'font-semibold',
                            isDarkMode ? 'text-white' : 'text-gray-900',
                            useSmallVariant ? 'text-base' : 'text-lg',
                        )}
                    >
                        {getMonthName(currentMonth)} {currentYear}
                    </h4>
                    <button
                        className={cn(
                            'p-1 rounded-full',
                            isDarkMode ? 'hover:bg-[#2F3261]' : 'hover:bg-gray-100',
                        )}
                        aria-label="Toggle year dropdown"
                        onClick={() => setShowYearDropdown(!showYearDropdown)}
                    >
                        <ChevronDown
                            size={useSmallVariant ? 20 : 24}
                            className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                        />{' '}
                    </button>
                    {showYearDropdown && (
                        <div
                            className={cn(
                                'absolute top-10 left-0 z-10 shadow-lg rounded-md max-h-60 overflow-y-auto',
                                isDarkMode ? 'bg-gray-800' : 'bg-white',
                            )}
                        >
                            <div
                                className="py-1"
                                role="listbox"
                                tabIndex={0}
                                onKeyDown={e => {
                                    const currentIndex = yearOptions.indexOf(currentYear);
                                    if (e.key === 'ArrowDown') {
                                        e.preventDefault();
                                        const nextYear = yearOptions[currentIndex + 1];
                                        if (nextYear) handleYearSelect(nextYear);
                                    }
                                    if (e.key === 'ArrowUp') {
                                        e.preventDefault();
                                        const prevYear = yearOptions[currentIndex - 1];
                                        if (prevYear) handleYearSelect(prevYear);
                                    }
                                }}
                            >
                                {yearOptions.map(year => (
                                    <button
                                        key={year}
                                        ref={
                                            year === currentYear ? el => el?.scrollIntoView({ block: 'center' }) : null
                                        }
                                        className={cn(
                                            'block w-full px-8 py-2 text-left',
                                            isDarkMode
                                                ? 'text-gray-200 hover:bg-gray-700'
                                                : 'text-gray-800 hover:bg-gray-100',
                                            year === currentYear && (isDarkMode ? 'bg-gray-700' : 'bg-gray-200'),
                                        )}
                                        onClick={() => handleYearSelect(year)}
                                        role="option"
                                        aria-selected={year === currentYear}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}{' '}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={handlePrevMonth}
                        className={cn(
                            'p-1 rounded-full',
                            isDarkMode ? 'hover:bg-[#2F3261]' : 'hover:bg-gray-100',
                        )}
                        aria-label="Previous month"
                    >
                        <ChevronLeft
                            size={useSmallVariant ? 20 : 24}
                            className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                        />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className={cn(
                            'p-1 rounded-full',
                            isDarkMode ? 'hover:bg-[#2F3261]' : 'hover:bg-gray-100',
                        )}
                        aria-label="Next month"
                    >
                        <ChevronRight
                            size={useSmallVariant ? 20 : 24}
                            className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                        />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
                {weekdays.map((day, index) => (
                    <div
                        key={index}
                        className={cn(
                            'text-center py-2 font-medium',
                            isDarkMode ? 'text-gray-400' : 'text-gray-600',
                        )}
                    >
                        {day}
                    </div>
                ))}

                {calendarDays.map((item, index) => (
                    <div
                        key={index}
                        className={cn(
                            'flex items-center justify-center text-center cursor-pointer relative',
                            useSmallVariant ? 'h-8' : 'h-10',
                            item.isCurrentMonth
                                ? isDarkMode
                                    ? 'text-white'
                                    : 'text-gray-900'
                                : isDarkMode
                                    ? 'text-gray-600'
                                    : 'text-gray-400',
                        )}
                        onClick={() => item.isCurrentMonth && handleDateClick(item.day)}
                    >
                        <div
                            className={cn(
                                'flex items-center justify-center',
                                useSmallVariant ? 'w-7 h-7' : 'w-9 h-9',
                                isToday(item.day) &&
                                item.isCurrentMonth &&
                                (isDarkMode ? 'border border-gray-700' : 'border border-[#2F3261]') +
                                ' rounded-full',
                                isSelected(item.day) &&
                                item.isCurrentMonth &&
                                (isDarkMode ? 'bg-gray-700' : 'bg-[#2F3261]') + ' text-white rounded-full',
                            )}
                        >
                            {item.day}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
