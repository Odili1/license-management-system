'use client';

import { cn } from '@/src/lib/utils';
import { Search, Bell, Settings } from 'lucide-react';
import { useTheme } from 'next-themes';

interface TopBarProps {
    className?: string;
    isMobile?: boolean;
}

export function TopBar({ className, isMobile = false }: TopBarProps) {
    const { resolvedTheme } = useTheme();

    return (
        <div className={cn('w-full flex items-center justify-between px-6 h-[72px] border-b border-[#E2E5F1] bg-white text-slate-900', className)}>
            
            {/* Left Side: Greeting */}
            <div className="flex items-center">
                <h1 className="text-[17px] font-semibold text-[#0A0D14]">Welcome back to SLMS 👋🏻</h1>
            </div>

            {/* Right Side: Search and Actions */}
            <div className="flex items-center gap-2 md:gap-4">
                
                {/* Search Input */}
                <div className="relative hidden md:block w-72">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-[#868C98]" />
                    </div>
                    <input
                        type="text"
                        placeholder="Global Search..."
                        className="block w-full pl-9 pr-3 py-2 border-none rounded-xl bg-[#F0F2F9] text-sm text-[#0A0D14] placeholder-[#868C98] focus:outline-none focus:ring-1 focus:ring-[#5830F7]"
                    />
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block w-px h-6 bg-[#E2E5F1] mx-2"></div>

                {/* Action Icons */}
                <button className="relative p-2 text-[#525866] hover:bg-[#F0F2F9] rounded-lg transition-colors focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5830F7]/40">
                    <Bell className="h-[22px] w-[22px]" />
                    {/* Red dot indicator */}
                    <span className="absolute top-[9px] right-[9px] w-[5px] h-[5px] bg-[#EF4444] rounded-full border border-white"></span>
                </button>
                
                <button className="p-2 text-[#525866] hover:bg-[#F0F2F9] rounded-lg transition-colors focus:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5830F7]/40">
                    <Settings className="h-[22px] w-[22px]" />
                </button>
            </div>
        </div>
    );
}

export default TopBar;
