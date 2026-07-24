'use client';

import { useState } from "react";
import { StatsCard } from "@/src/components/card/card";
import EmptyDataState from "@/src/components/empty-data";
import { Button } from "@/src/components/button/button";
import { Input } from "@/src/components/ui/input";
import { DatePicker } from "@/src/components/date-picker/date-picker";
import { ChevronDown, Plus, ExternalLink, X, Upload, Search, Filter, MoreVertical, Edit2, Eye, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/data-table/data-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover";

export default function ClientPage() {
    const [loading, setLoading] = useState(false);
    const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [clientName, setClientName] = useState("");
    const [clientDate, setClientDate] = useState<Date | null>(null);
    const [clientEmail, setClientEmail] = useState("");
    const [clientProduct, setClientProduct] = useState("");
    const [clientNamespace, setClientNamespace] = useState("");

    const [clients, setClients] = useState<any[]>([]);

    const columns: ColumnDef<any>[] = [
        {
            id: 'select',
            header: () => <input type="checkbox" className="rounded border-gray-300 w-4 h-4" />,
            cell: () => <input type="checkbox" className="rounded border-gray-300 w-4 h-4" />,
        },
        {
            accessorKey: 'client',
            header: 'CLIENT',
        },
        {
            accessorKey: 'namespace',
            header: 'NAMESPACE',
        },
        {
            accessorKey: 'product',
            header: 'PRODUCT',
        },
        {
            accessorKey: 'licensesCount',
            header: 'LICENSES COUNT',
        },
        {
            accessorKey: 'dateCreated',
            header: 'DATE CREATED',
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => {
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2 bg-white border-gray-100" align="end">
                            <div className="flex flex-col gap-1">
                                <button className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-200 rounded-md text-left w-full">
                                    <Edit2 className="w-4 h-4 text-gray-600" />
                                    Update Client
                                </button>
                                <button className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-gray-200 rounded-md text-left w-full">
                                    <Eye className="w-4 h-4 text-gray-600" />
                                    View Details
                                </button>
                                <button className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-red-200 text-red-600 rounded-md text-left w-full">
                                    <Trash2 className="w-4 h-4" />
                                    Delete Client
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
            title: "Total Client",
            value: "0",
            cardIcon: "/cards/database-icon.svg",
            description: "total"
        },
        {
            title: "Active Client",
            value: "0",
            cardIcon: "/cards/success-icon.svg",
            description: "active"
        },
        {
            title: "Expiring",
            value: "0",
            cardIcon: "/cards/alarm-icon.svg",
            description: "expiring"
        },
        {
            title: "Inactive",
            value: "0",
            cardIcon: "/cards/delete-icon.svg",
            description: "inactive"
        }
    ]

    return (
        <div className="bg-[#F8F9FF] min-h-screen p-4 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Clients Management</h1>
                    <div className="text-gray-500 text-md mt-2">
                        See all clients and manage them here
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                        <Upload className="w-4 h-4" />
                        Export as
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                    <Button
                        onClick={() => setIsCreateClientOpen(true)}
                        className="bg-[#5830F7] hover:bg-[#5830F7]/80 text-white flex items-center gap-2 px-4 py-2 rounded-lg"
                    >
                        <Plus className="w-4 h-4" />
                        Create Client
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
                        <StatsCard key={i} title={stat.title} value={stat.value} cardIcon={stat.cardIcon} description={stat.description} />
                    ))}
                </div>
            )}

            {clients.length > 0 ? (
                <div className="w-full mt-6 space-y-4">
                    <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg border border-gray-100">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input placeholder="Search by client" className="pl-9 bg-gray-50/50 border-gray-200" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block">
                                <select className="h-10 pl-3 pr-8 rounded-md border border-gray-200 bg-white text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>All Products</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <div className="relative hidden md:block">
                                <select className="h-10 pl-3 pr-8 rounded-md border border-gray-200 bg-white text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Date Range</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <Button variant="outline" className="flex items-center gap-2 border-gray-200 bg-white">
                                <Filter className="w-4 h-4" />
                                Filters
                            </Button>
                        </div>
                    </div>
                    <DataTable columns={columns} data={clients} />
                </div>
            ) : (
                <div className="w-full mt-10">
                    <EmptyDataState icon="/clients-icon.svg" description="No client added yet" buttonText="Create a new client" />
                </div>
            )}

            {/* Overlay */}
            {isCreateClientOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 transition-opacity"
                    onClick={() => setIsCreateClientOpen(false)}
                />
            )}

            {/* Right Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isCreateClientOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Drawer Header */}
                <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-1">Create a client</h2>
                        <p className="text-sm text-gray-500">Enter client details to add one</p>
                    </div>
                    <button
                        onClick={() => setIsCreateClientOpen(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {/* Tabs */}
                    <div className="flex p-1 bg-slate-50 rounded-lg mb-6">
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'single' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('single')}
                        >
                            Single upload
                        </button>
                        <button
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'bulk' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('bulk')}
                        >
                            Bulk upload
                        </button>
                    </div>

                    {activeTab === 'single' ? (
                        <div className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-900">Client</label>
                                <Input placeholder="Enter client organization" className="border border-[#F2F5F8] shadow-sm" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                            </div>

                            <div className="space-y-1.5">
                                <DatePicker className="border border-[#F2F5F8] shadow-sm bg-white" label="Date Created" placeholder="Select date" value={clientDate} onChange={setClientDate} />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-900">Email</label>
                                <Input type="email" placeholder="Enter work email" className="border border-[#F2F5F8] shadow-sm" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-900">Product</label>
                                <div className="relative">
                                    <select className="w-full h-9 rounded-md border border-[#F2F5F8] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none" value={clientProduct} onChange={(e) => setClientProduct(e.target.value)}>
                                        <option value="" disabled>Select product</option>
                                        <option value="Banklet">Banklet</option>
                                        <option value="3B Admin">3B Admin</option>
                                        <option value="Bifense">Bifense</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-900">Namespace</label>
                                <Input placeholder="Enter namespace" className="border border-[#F2F5F8] shadow-sm" value={clientNamespace} onChange={(e) => setClientNamespace(e.target.value)} />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Drag and drop file here, or click to browse</p>
                        </div>
                    )}
                </div>

                {/* Drawer Footer */}
                <div className="p-6 border-t border-gray-100 flex items-center gap-3 bg-white">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsCreateClientOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-[#5830F7] hover:bg-[#5830F7]/90 text-white"
                        disabled={isSubmitting}
                        onClick={() => {
                            setIsSubmitting(true);
                            setTimeout(() => {
                                const newClient = {
                                    id: Math.random().toString(),
                                    client: clientName || 'New Client',
                                    namespace: clientNamespace || 'Namespace',
                                    product: clientProduct || 'Product',
                                    licensesCount: Math.floor(Math.random() * 15),
                                    dateCreated: clientDate
                                        ? clientDate.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                                        : 'Jan 01, 2026',
                                };
                                setClients((prev) => [...prev, newClient]);
                                setIsSubmitting(false);
                                setIsCreateClientOpen(false);
                                setClientName("");
                                setClientDate(null);
                                setClientEmail("");
                                setClientProduct("");
                                setClientNamespace("");
                            }, 1500);
                        }}
                    >
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                Loading...
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                            </div>
                        ) : (
                            "Send Secure Link"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}