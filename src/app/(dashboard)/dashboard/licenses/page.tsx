'use client';

import { useState } from "react";
import { StatsCard } from "@/src/components/card/card";
import EmptyDataState from "@/src/components/empty-data";
import { Button } from "@/src/components/button/button";
import { Input } from "@/src/components/ui/input";
import { DatePicker } from "@/src/components/date-picker/date-picker";
import { ChevronDown, Plus, ExternalLink, X, Upload, Search, Filter, MoreVertical, Edit2, Eye, Trash2, RefreshCw, AlertTriangle, AlertCircle } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/data-table/data-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";
import { CreateLicenseDrawer } from "@/src/components/license/create-license-drawer";
import { Toaster } from "@/src/components/ui/sonner";
import { customToast } from "@/src/components/custom-toast";

export default function LicensePage() {
    const [loading, setLoading] = useState(false);
    const [isCreateLicenseOpen, setIsCreateLicenseOpen] = useState(false);

    const [licenses, setLicenses] = useState<any[]>([]);

    const columns: ColumnDef<any>[] = [
        {
            id: 'select',
            header: () => <input type="checkbox" className="rounded border-gray-300 w-4 h-4" />,
            cell: () => <input type="checkbox" className="rounded border-gray-300 w-4 h-4" />,
        },
        {
            accessorKey: 'licenseKey',
            header: 'LICENSE KEY',
            cell: ({ row }) => (
                <div className="bg-[#EBF3FF] text-[#2563EB] px-2 py-1.5 rounded text-xs font-mono font-medium max-w-[120px] break-all leading-tight">
                    {row.original.licenseKey || "INV-8821-\nX90-QLP"}
                </div>
            )
        },
        {
            accessorKey: 'product',
            header: 'PRODUCT',
            cell: ({ row }) => (
                <div className="font-medium text-gray-900 text-sm">
                    {row.original.product} {row.original.client}
                </div>
            )
        },
        {
            accessorKey: 'type',
            header: 'TYPE',
            cell: ({ row }) => (
                <div className="text-gray-600 text-sm font-medium">
                    {row.original.type || 'Trial'}
                </div>
            )
        },
        {
            accessorKey: 'utilization',
            header: 'UTILIZATION',
            cell: ({ row }) => {
                const util = row.original.utilization || { used: 0, total: 0, percent: 0, status: 'Inactive' };

                if (util.status === 'Inactive' || util.percent === 0 && util.total === 0) {
                    return (
                        <div className="w-full max-w-[150px]">
                            <div className="flex justify-between text-[10px] font-bold mb-1">
                                <span className="text-gray-500">Inactive</span>
                                <span className="text-gray-500">0%</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                                <div className="h-full bg-[#BFDBFE] w-1/4 opacity-0" />
                            </div>
                        </div>
                    );
                }

                const percent = util.percent;
                const isFull = percent >= 100;
                const isHigh = percent >= 80 && percent < 100;
                const barColor = isFull ? 'bg-[#2563EB]' : (isHigh ? 'bg-[#F59E0B]' : 'bg-[#10B981]');

                return (
                    <div className="w-full max-w-[150px]">
                        <div className="flex justify-between text-[10px] font-bold mb-1">
                            <span className="text-gray-900">{util.used.toLocaleString()} / {util.total.toLocaleString()} Seats</span>
                            <span className="text-gray-900">{percent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                            <div className={`h-full ${barColor}`} style={{ width: `${percent}%` }} />
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'status',
            header: 'STATUS',
            cell: ({ row }) => {
                const status = row.original.status || 'PENDING';

                if (status === 'PENDING') {
                    return (
                        <span className="inline-flex items-center gap-1.5 bg-[#EBF3FF] text-[#2563EB] px-2.5 py-1 rounded-full border border-[#BFDBFE] text-[10px] font-bold tracking-wider">
                            <RefreshCw className="w-3 h-3" />
                            PENDING
                        </span>
                    );
                }
                if (status === 'EXPIRING') {
                    return (
                        <span className="inline-flex items-center gap-1.5 bg-[#FFFBEB] text-[#D97706] px-2.5 py-1 rounded-full border border-[#FDE68A] text-[10px] font-bold tracking-wider">
                            <AlertTriangle className="w-3 h-3" />
                            EXPIRING
                        </span>
                    );
                }
                if (status === 'EXPIRED') {
                    return (
                        <span className="inline-flex items-center gap-1.5 bg-[#FEF2F2] text-[#DC2626] px-2.5 py-1 rounded-full border border-[#FECACA] text-[10px] font-bold tracking-wider">
                            <AlertCircle className="w-3 h-3" />
                            EXPIRED
                        </span>
                    );
                }

                return <span>{status}</span>;
            }
        },
        {
            accessorKey: 'expiry',
            header: 'EXPIRY',
            cell: ({ row }) => (
                <div className="text-gray-600 text-sm font-medium">
                    {row.original.expiry || 'Jun 20, 2026'}
                </div>
            )
        },
        {
            id: 'actions',
            header: 'ACTIONS',
            cell: ({ row }) => {
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2" align="end">
                            <div className="flex flex-col gap-1">
                                <button className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md text-left w-full">
                                    <Edit2 className="w-4 h-4 text-gray-600" />
                                    Update License
                                </button>
                                <button className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded-md text-left w-full">
                                    <Eye className="w-4 h-4 text-gray-600" />
                                    View Details
                                </button>
                                <button className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-red-50 text-red-600 rounded-md text-left w-full">
                                    <Trash2 className="w-4 h-4" />
                                    Delete License
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                );
            },
        },
    ];

    const statData = [
        {
            title: "Total Licenses",
            value: "1,284",
            cardIcon: "/cards/database-icon.svg",
            description: "total",
            subValue: "4%"
        },
        {
            title: "Active",
            value: "1,240",
            cardIcon: "/cards/success-icon.svg",
            description: "active",
            subValue: "96.5%"
        },
        {
            title: "Expiring (T-7)",
            value: "38",
            cardIcon: "/cards/alarm-icon.svg",
            description: "expiring",
            subValue: "Requires Review"
        },
        {
            title: "Expired",
            value: "6",
            cardIcon: "/cards/delete-icon.svg",
            description: "inactive",
            subValue: "Service Halted"
        }
    ]

    return (
        <div className="bg-[#F8F9FF] min-h-screen p-4 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">License Management</h1>
                    <div className="text-gray-500 text-md mt-2">
                        Real-time performance metrics and global license status.
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                        <Upload className="w-4 h-4" />
                        Export as
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                    <Button
                        onClick={() => setIsCreateLicenseOpen(true)}
                        className="bg-[#5830F7] hover:bg-[#5830F7]/80 text-white flex items-center gap-2 px-4 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Create License
                    </Button>
                </div>
            </div>

            {/* Stat Cards */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 bg border border-black/[0.03] dark:border-white/[0.05] rounded-lg p-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {statData.map((stat, i) => (
                        <StatsCard key={i} title={stat.title} value={stat.value} cardIcon={stat.cardIcon} description={stat.description} subValue={stat.subValue} />
                    ))}
                </div>
            )}

            {licenses.length > 0 ? (
                <div className="w-full mt-6 space-y-4">
                    <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-100">
                        <div className="relative flex-1 max-w-[280px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input placeholder="Search by product or license key..." className="pl-9 bg-gray-50/50 border-gray-200 shadow-none h-10" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block">
                                <select className="h-10 pl-3 pr-8 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 appearance-none outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>All Products</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative hidden md:block">
                                <select className="h-10 pl-3 pr-8 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 appearance-none outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Status : All</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative hidden md:block">
                                <select className="h-10 pl-3 pr-8 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 appearance-none outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Type: All</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative hidden md:block">
                                <select className="h-10 pl-3 pr-8 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 appearance-none outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Date Range</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <Button variant="outline" className="flex items-center gap-2 border-gray-200 bg-white text-gray-700 font-semibold h-10 px-4">
                                <Filter className="w-4 h-4" />
                                Filters
                            </Button>
                        </div>
                    </div>
                    <DataTable columns={columns} data={licenses} />
                </div>
            ) : (
                <div className="w-full mt-10">
                    <EmptyDataState icon="/license-icon.svg" description="No licenses added yet" buttonText="Create a new license" />
                </div>
            )}

            <CreateLicenseDrawer
                isOpen={isCreateLicenseOpen}
                onClose={() => setIsCreateLicenseOpen(false)}
                onSubmit={(data) => {
                    const totalSeats = data.entitlementCount === 'Unlimited' ? 9999 : (parseInt(data.entitlementCount) || 100);
                    const newLicense = {
                        id: Math.random().toString(),
                        licenseKey: 'INV-' + Math.floor(1000 + Math.random() * 9000) + '-\nX90-QLP',
                        client: data.targetOrganization || 'New Organization',
                        product: data.targetProduct || 'Product',
                        type: data.licenseType || 'Trial',
                        utilization: {
                            used: 0,
                            total: totalSeats,
                            percent: 0,
                            status: 'Active'
                        },
                        status: 'PENDING',
                        expiry: data.endDate
                            ? data.endDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                            : 'Jan 01, 2026',
                    };
                    setLicenses((prev) => [...prev, newLicense]);
                    customToast.success("License created and assigned. Key generated and the Client Admin has been notified.")
                }}
            />
        </div>
    );
}