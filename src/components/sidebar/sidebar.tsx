'use client';

import { cn } from '@/src/lib/utils';
import { useAuthStore } from '@/src/store/authStore';
import {
    Bell,
    ChevronDown,
    Menu,
    User,
    Settings,
    LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from '@/src/components/ui/popover';

type NavItem = {
    id: string;
    label: string;
    href: string;
    iconUrl: string;
    activeIconUrl: string;
};

export interface SidebarProps {
    className?: string;
}

const mainNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', href: '/dashboard', iconUrl: '/sidebar/dashboard-icon.svg', activeIconUrl: '/sidebar/dashboard-icon-purple.svg' },
    { id: 'clients', label: 'Clients', href: '/dashboard/clients', iconUrl: '/sidebar/client-icon.svg', activeIconUrl: '/sidebar/client-icon-purple.svg' },
    { id: 'licenses', label: 'Licenses', href: '/dashboard/licenses', iconUrl: '/sidebar/license-icon.svg', activeIconUrl: '/sidebar/license-icon-purple.svg' },
    { id: 'requests', label: 'Requests', href: '/dashboard/requests', iconUrl: '/sidebar/requests-icon.svg', activeIconUrl: '/sidebar/requests-icon-purple.svg' },
    { id: 'reports', label: 'Reports', href: '/dashboard/reports', iconUrl: '/sidebar/reports-icon.svg', activeIconUrl: '/sidebar/reports-icon.svg' }, // Assuming no purple
    { id: 'audit-logs', label: 'Audit Logs', href: '/dashboard/audit-logs', iconUrl: '/sidebar/audit-icon.svg', activeIconUrl: '/sidebar/audit-icon-purple.svg' },
];

const otherNavItems: NavItem[] = [
    { id: 'settings', label: 'Settings', href: '/dashboard/settings', iconUrl: '/assets/settings-icon.svg', activeIconUrl: '/assets/settings-icon.svg' },
];

export const CollapsibleSidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    // Check screen size on mount and when window resizes
    useEffect(() => {
        const checkScreenSize = () => {
            const isSmallScreen = window.innerWidth < 1024;
            setIsMobile(isSmallScreen);
            if (isSmallScreen) setCollapsed(true);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const toggleCollapse = () => setCollapsed(prev => !prev);

    const handleItemClick = () => {
        if (isMobile) setCollapsed(true);
    };

    const renderMobileOverlay = () => {
        if (isMobile && !collapsed) {
            return <button aria-label="Close sidebar overlay" className="fixed inset-0 bg-black/40 z-20" onClick={toggleCollapse} />;
        }
        return null;
    };

    const isItemActive = (item: NavItem) => {
        return pathname === item.href || (pathname.startsWith(item.href + '/') && item.href !== '/dashboard');
    };

    const renderNavItems = (items: NavItem[]) => (
        <ul className="space-y-1">
            {items.map(item => {
                const active = isItemActive(item);
                return (
                    <li key={item.id} className="relative group">
                        {/* Active Left Indicator */}
                        {active && !collapsed && (
                            <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-6 bg-[#5830F7] rounded-r-md"></div>
                        )}
                        <Link
                            href={item.href}
                            className={cn(
                                'w-full flex items-center rounded-xl px-4 py-3 text-[15px] font-medium transition-colors relative',
                                collapsed ? 'justify-center' : 'gap-3',
                                active
                                    ? 'bg-[#E3E7FA] text-[#0A0D14]'
                                    : 'text-[#525866] hover:bg-black/5'
                            )}
                            onClick={handleItemClick}
                        >
                            {collapsed && active && (
                                <div className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-1 h-6 bg-[#5830F7] rounded-r-md"></div>
                            )}
                            <div className="relative w-5 h-5 flex-shrink-0 flex items-center justify-center">
                                <Image
                                    src={active ? item.activeIconUrl : item.iconUrl}
                                    alt={item.label}
                                    width={20}
                                    height={20}
                                    className="object-contain"
                                />
                            </div>
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );

    return (
        <>
            {renderMobileOverlay()}

            {/* Floating Collapse Button - mobile when closed */}
            {collapsed && isMobile && (
                <button
                    onClick={toggleCollapse}
                    className={cn(
                        'fixed top-2 left-4 z-50 flex items-center justify-center h-9 w-9 rounded-md border bg-white/90 shadow-sm transition'
                    )}
                    aria-label="Open sidebar"
                >
                    <Menu className="h-5 w-5 text-neutral-800" />
                </button>
            )}

            <aside
                className={cn(
                    'h-screen flex flex-col transition-all duration-300 overflow-hidden',
                    'bg-[#F3F2FF] text-slate-900 border-r border-[#E2E5F1]',
                    isMobile ? (collapsed ? 'w-0' : 'w-64') : collapsed ? 'w-20' : 'w-[280px]',
                    isMobile && 'fixed z-30',
                    className,
                )}
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                aria-label="Primary navigation"
            >
                {/* Header */}
                <div className={cn('flex flex-col px-6 pt-8 pb-6 border-b border-[#E2E5F1]')}>
                    {!collapsed && (
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <Image src="/assets/logo.svg" alt="Icon" width={22} height={22} />
                                <span className="text-xl font-bold tracking-tight text-[#0A0D14]">Innovantics</span>
                            </div>
                            <span className="text-[13px] text-[#525866] ml-8 tracking-wide">SLMS Portal</span>
                        </div>
                    )}
                    {collapsed && (
                        <div className="mx-auto flex items-center justify-center h-8">
                            <Image src="/assets/logo.svg" alt="Icon" width={24} height={24} />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex-1 px-4 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {/* Notification Link */}
                    <div className="mb-6 px-4">
                        <Link
                            href="/dashboard/notifications"
                            className={cn(
                                "flex items-center text-[15px] font-medium text-[#525866] hover:text-[#0A0D14] transition-colors",
                                collapsed ? "justify-center" : "justify-between"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5" />
                                {!collapsed && <span>Notification</span>}
                            </div>
                            {!collapsed && (
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#EF4444] text-white text-[11px] font-bold">
                                    8
                                </span>
                            )}
                        </Link>
                    </div>

                    {!collapsed && <p className="text-[11px] font-bold text-[#868C98] tracking-wider mb-3 px-2 uppercase">Main</p>}
                    {renderNavItems(mainNavItems)}

                    <div className="mt-8">
                        {!collapsed && <p className="text-[11px] font-bold text-[#868C98] tracking-wider mb-3 px-2 uppercase">Others</p>}
                        {renderNavItems(otherNavItems)}
                    </div>
                </div>

                {/* Profile Section */}
                <div className="p-4 bg-[#F0F2F9] border-t border-[#E2E5F1]">
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="w-full flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-[#E2E5F1] hover:bg-gray-50 transition-colors text-left">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E3E7FA] text-[#5830F7] font-semibold text-sm flex-shrink-0">
                                    AT
                                </div>
                                {!collapsed && (
                                    <div className="flex-1 min-w-0 flex items-center justify-between">
                                        <div className="flex flex-col truncate">
                                            <div className="flex items-center gap-1">
                                                <span className="text-sm font-semibold text-[#0A0D14] truncate">SuperAdmin</span>
                                                <div className="flex items-center justify-center w-[14px] h-[14px] bg-[#5830F7] rounded-full text-white">
                                                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1 3.5L2.5 5L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-[12px] text-[#525866] truncate">afolayan@innovantics.com</span>
                                        </div>
                                        <ChevronDown className="w-4 h-4 text-[#868C98] flex-shrink-0" />
                                    </div>
                                )}
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[240px] p-2 mb-2 ml-4 rounded-xl shadow-lg border border-gray-100 bg-white" align="start" side="top">
                            <div className="flex flex-col gap-1">
                                <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-gray-200 rounded-lg text-gray-700 w-full text-left transition-colors">
                                    <User className="w-[18px] h-[18px]" />
                                    View Profile
                                </button>
                                <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-gray-200 rounded-lg text-gray-700 w-full text-left transition-colors">
                                    <Settings className="w-[18px] h-[18px]" />
                                    System Preference
                                </button>
                                <div className="h-[1px] bg-gray-100 my-1 w-[90%] mx-auto" />
                                <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-[#F0F2F9] rounded-lg text-[#EF4444] w-full text-left transition-colors">
                                    <LogOut className="w-[18px] h-[18px]" />
                                    Log Out
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </aside>
        </>
    );
};

export default CollapsibleSidebar;
