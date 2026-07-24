import { Calendar as CalendarComponent } from '@/src/components/calendar/calendar';
import { Button } from '@/src/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';
import { cn } from '@/src/lib/utils';
import { Calendar } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';

export interface DatePickerProps {
    label?: string;
    placeholder?: string;
    className?: string;
    defaultValue?: Date;
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    width?: string;
}

export const DatePicker = ({
    label,
    placeholder = 'Select date',
    className,
    defaultValue,
    value,
    onChange,
    width = '100%',
}: DatePickerProps) => {
    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        value !== undefined ? value : defaultValue || null,
    );

    if (value !== undefined && value !== selectedDate) {
        setSelectedDate(value);
    }

    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setOpen(false);
        if (onChange) {
            onChange(date);
        }
    };

    const handleClear = () => {
        setSelectedDate(null);
        if (onChange) {
            onChange(null);
        }
    };

    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
        : '';

    return (
        <div className="flex flex-col gap-2 w-full" style={{ width }}>
            {label && (
                <div className={cn('text-base font-medium', isDark ? 'text-slate-100' : 'text-slate-900')}>
                    {label}
                </div>
            )}
            <div className="relative">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            size="default"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                                'w-full justify-between px-3 font-normal text-sm h-10',
                                'text-left border rounded-md',
                                'focus:outline-none focus:ring-2',
                                isDark
                                    ? ['bg-white', 'border-slate-200', 'hover:bg-white', 'text-black']
                                    : [
                                        'bg-white',
                                        'border-slate-200',
                                        'hover:bg-slate-50',
                                        'focus:ring-slate-400',
                                        'text-slate-900',
                                    ],
                                className,
                            )}
                        >
                            <span className="flex items-center truncate">{formattedDate || placeholder}</span>
                            <span className="flex items-center">
                                <Calendar className="h-4 w-4 ml-2 shrink-0 opacity-70" />
                            </span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0 w-full" align="start" sideOffset={5}>
                        <CalendarComponent
                            onDateSelect={handleDateSelect}
                            initialDate={selectedDate || new Date()}
                            className="border-0 shadow-none"
                            mode={isDark ? 'dark' : 'light'}
                        />
                    </PopoverContent>
                </Popover>
                {selectedDate && (
                    <button
                        onClick={handleClear}
                        className="absolute right-9 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        type="button"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default DatePicker;
