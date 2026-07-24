'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/src/components/button/button';
import { Input } from '@/src/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/src/components/ui/popover';
import { DataTable } from '@/src/components/data-table/data-table';
import { customToast } from '@/src/components/custom-toast';
import { auditLogsData, type AuditLogData } from './audit-data';
import { ColumnDef } from '@tanstack/react-table';
import {
    ChevronDown,
    Upload,
    Search,
    Filter,
    MoreVertical,
    X,
    RefreshCw,
    UserCheck,
    ArrowUpRight,
    User,
    Download,
    AlertCircle,
    Info
} from 'lucide-react';

export default function AuditLogsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState<AuditLogData | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    // Filtering logic
    const filteredData = useMemo(() => {
        let data = [...auditLogsData];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            data = data.filter(
                log =>
                    log.client.toLowerCase().includes(query) ||
                    log.product.toLowerCase().includes(query) ||
                    log.actorName.toLowerCase().includes(query)
            );
        }

        if (selectedRole !== 'all') {
            data = data.filter(log => log.role === selectedRole);
        }

        if (selectedProduct !== 'all') {
            data = data.filter(log => log.product === selectedProduct);
        }

        return data;
    }, [searchQuery, selectedRole, selectedProduct]);

    const handleViewDetails = (log: AuditLogData) => {
        setSelectedRequest(log);
        setIsSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
        setTimeout(() => setSelectedRequest(null), 300);
    };

    const handleDownload = (log: AuditLogData) => {
        customToast.success(`Audit log ${log.id} details downloaded successfully.`);
    };

    const ActionTypeBadge = ({ type }: { type: string }) => {
        switch (type) {
            case 'License Renewed':
                return (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <RefreshCw className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                        License Renewed
                    </span>
                );
            case 'Tenant Assigned':
                return (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <UserCheck className="w-4 h-4 text-[#06B6D4] flex-shrink-0" />
                        Tenant Assigned
                    </span>
                );
            case 'License Suspended':
                return (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <RefreshCw className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
                        License Suspended
                    </span>
                );
            case 'License Upgraded':
                return (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                        <ArrowUpRight className="w-4 h-4 text-[#6366F1] flex-shrink-0" />
                        License Upgraded
                    </span>
                );
            default:
                return <span className="text-sm text-slate-700">{type}</span>;
        }
    };

    const columns: ColumnDef<AuditLogData>[] = [
        {
            id: 'select',
            header: () => <input type="checkbox" className="rounded border-gray-300 w-4 h-4 accent-[#5830F7]" />,
            cell: () => <input type="checkbox" className="rounded border-gray-300 w-4 h-4 accent-[#5830F7]" />,
            size: 40,
        },
        {
            accessorKey: 'timestamp',
            header: 'TIME STAMP',
            cell: ({ row }) => <span className="text-[#64748B] font-mono text-sm">{row.original.timestamp}</span>,
        },
        {
            accessorKey: 'role',
            header: 'ROLE',
            cell: ({ row }) => <span className="text-slate-700 text-sm font-medium">{row.original.role}</span>,
        },
        {
            accessorKey: 'actionType',
            header: 'ACTION TYPE',
            cell: ({ row }) => <ActionTypeBadge type={row.original.actionType} />,
        },
        {
            id: 'organizationProduct',
            header: 'ORGANIZATION / PRODUCT',
            cell: ({ row }) => (
                <div className="flex items-center gap-1 text-sm">
                    <span className="font-semibold text-slate-800">{row.original.client}</span>
                    <span className="text-xs text-slate-400 font-medium">({row.original.product})</span>
                </div>
            ),
        },
        {
            accessorKey: 'changeSummary',
            header: 'BEFORE / AFTER',
            cell: ({ row }) => (
                <span className="text-slate-600 font-medium text-sm">{row.original.changeSummary}</span>
            ),
        },
        {
            accessorKey: 'result',
            header: 'RESULT',
            cell: ({ row }) => {
                if (row.original.result === 'Success') {
                    return (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                            Success
                        </span>
                    );
                } else {
                    return (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]">
                            <AlertCircle className="w-3.5 h-3.5 text-[#F97316] mr-0.5" />
                            Blocked (MFA)
                        </span>
                    );
                }
            },
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => {
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                                <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-44 p-1.5 bg-white border border-gray-100 rounded-xl shadow-lg z-50" align="end">
                            <div className="flex flex-col gap-0.5">
                                <button
                                    onClick={() => handleViewDetails(row.original)}
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 rounded-lg text-left w-full transition-colors cursor-pointer"
                                >
                                    <User className="w-4 h-4 text-slate-500" />
                                    View Details
                                </button>
                                <button
                                    onClick={() => handleDownload(row.original)}
                                    className="flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-slate-50 text-slate-700 rounded-lg text-left w-full transition-colors cursor-pointer"
                                >
                                    <Download className="w-4 h-4 text-slate-500" />
                                    Download
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                );
            },
        },
    ];

    return (
        <div className="bg-[#F8F9FF] min-h-screen p-4 md:p-6 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-[#0F172A]">Audit Log</h1>
                    <div className="text-slate-500 text-sm mt-1">
                        Immutable record of all license and system actions across all organisations.
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm cursor-pointer"
                        onClick={() => customToast.success('Export started.')}
                    >
                        <Upload className="w-4 h-4" />
                        Export as
                        <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            </div>

            {/* Compliance Info Banner */}
            <div className="flex items-start md:items-center gap-3 p-4 bg-[#F0FDF4] border-l-4 border-[#16A34A] rounded-r-lg text-sm text-[#15803D] mb-6 shadow-xs">
                <div className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                    i
                </div>
                <span className="font-medium text-[#14532D]">
                    Audit entries are append-only and cannot be edited or deleted. This log is ISO/IEC 19770 compliant.
                </span>
            </div>

            {/* Search & Filter Row */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b border-gray-100">
                    <div className="relative w-full md:w-[340px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search by organization / product"
                            className="pl-10 border border-gray-200 shadow-sm bg-white"
                            value={searchQuery}
                            onChange={e => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-3 flex-wrap md:flex-nowrap w-full md:w-auto justify-end">
                        <div className="relative w-full md:w-auto">
                            <select
                                className="w-full md:w-auto h-9 rounded-md border border-gray-200 bg-white px-3 pr-8 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none cursor-pointer"
                                value={selectedRole}
                                onChange={e => {
                                    setSelectedRole(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="all">Role</option>
                                <option value="Lead Developer">Lead Developer</option>
                                <option value="Super Admin">Super Admin</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative w-full md:w-auto">
                            <select
                                className="w-full md:w-auto h-9 rounded-md border border-gray-200 bg-white px-3 pr-8 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none cursor-pointer"
                                value={selectedProduct}
                                onChange={e => {
                                    setSelectedProduct(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="all">All Products</option>
                                <option value="3B Admin">3B Admin</option>
                                <option value="Bifense">Bifense</option>
                                <option value="Banklet">Banklet</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative w-full md:w-auto">
                            <select className="w-full md:w-auto h-9 rounded-md border border-gray-200 bg-white px-3 pr-8 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none cursor-pointer">
                                <option value="all">Date Range</option>
                                <option value="today">Today</option>
                                <option value="7days">Last 7 days</option>
                                <option value="30days">Last 30 days</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <button className="flex items-center gap-2 h-9 px-4 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer">
                            <Filter className="w-4 h-4 text-slate-500" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pageCount={Math.ceil(filteredData.length / 10)}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    totalItems={filteredData.length}
                    itemsPerPage={10}
                    showPagination={true}
                />
            </div>

            {/* View Details Drawer Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 transition-opacity"
                    onClick={handleCloseSidebar}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-[440px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {selectedRequest && (
                    <>
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Details</h2>
                                <p className="text-sm text-gray-500 mt-0.5">See all details below</p>
                            </div>
                            <button
                                onClick={handleCloseSidebar}
                                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {/* Event Information Section */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                    Event Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">Time Stamp</span>
                                        <span className="text-sm font-semibold text-slate-800 font-mono">
                                            {selectedRequest.timestamp} UTC
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-0.5 items-center">
                                        <span className="text-sm text-slate-400">Action Type</span>
                                        <div className="flex items-center gap-1.5">
                                            {selectedRequest.actionType === 'License Renewed' && (
                                                <RefreshCw className="w-3.5 h-3.5 text-[#10B981]" />
                                            )}
                                            {selectedRequest.actionType === 'Tenant Assigned' && (
                                                <UserCheck className="w-3.5 h-3.5 text-[#06B6D4]" />
                                            )}
                                            {selectedRequest.actionType === 'License Suspended' && (
                                                <RefreshCw className="w-3.5 h-3.5 text-[#EF4444]" />
                                            )}
                                            {selectedRequest.actionType === 'License Upgraded' && (
                                                <ArrowUpRight className="w-3.5 h-3.5 text-[#6366F1]" />
                                            )}
                                            <span className="text-sm font-semibold text-slate-800">
                                                {selectedRequest.actionType}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between py-0.5 items-center">
                                        <span className="text-sm text-slate-400">Result</span>
                                        {selectedRequest.result === 'Success' ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981] border border-[#A7F3D0]">
                                                <span className="w-1 h-1 rounded-full bg-[#10B981]"></span>
                                                Success
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]">
                                                <AlertCircle className="w-3 h-3 text-[#F97316] mr-0.5" />
                                                Blocked (MFA)
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Actor Section */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Actor</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">Name</span>
                                        <span className="text-sm font-semibold text-slate-800">{selectedRequest.actorName}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">Role</span>
                                        <span className="text-sm font-semibold text-[#5830F7]">{selectedRequest.role}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">Actor ID</span>
                                        <span className="text-sm font-semibold text-slate-800">{selectedRequest.actorId}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">IP Address</span>
                                        <span className="text-sm font-semibold text-slate-800">{selectedRequest.ipAddress}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Organization & Product Section */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                    Organization & Product
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">Client</span>
                                        <span className="text-sm font-semibold text-slate-800">{selectedRequest.client}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">Product</span>
                                        <span className="text-sm font-semibold text-slate-800">{selectedRequest.product}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">Service Bundle</span>
                                        <span className="text-sm font-semibold text-slate-800">{selectedRequest.bundle}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">License Reference</span>
                                        <span className="text-sm font-semibold text-[#5830F7] font-mono">{selectedRequest.licenseRef}</span>
                                    </div>
                                </div>
                            </div>

                            {/* State Change Section */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                    State Change
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">Before</span>
                                        <span className="text-sm font-medium text-slate-500">{selectedRequest.stateBefore}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">After</span>
                                        <span className="text-sm font-semibold text-slate-800">{selectedRequest.stateAfter}</span>
                                    </div>
                                    <div className="flex justify-between py-0.5">
                                        <span className="text-sm text-slate-400">Change</span>
                                        <span className="text-sm font-semibold text-slate-800 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-mono">
                                            {selectedRequest.changeSummary}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-6 border-t border-gray-100 flex items-center gap-3 bg-white">
                            <button
                                className="flex-1 h-[44px] rounded-lg border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={handleCloseSidebar}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 h-[44px] rounded-lg bg-[#3B28CC] hover:bg-[#3220B8] text-white font-semibold text-sm transition-colors cursor-pointer"
                                onClick={() => handleDownload(selectedRequest)}
                            >
                                Download
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}