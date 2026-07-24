'use client';

import { useState, useMemo } from "react";
import { StatsCard } from "@/src/components/card/card";
import { Button } from "@/src/components/button/button";
import { Input } from "@/src/components/ui/input";
import { ChevronDown, Upload, Search, Filter, Eye, X, AlertTriangle, Info } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/src/components/data-table/data-table";
import { requestsData, type RequestData } from "./request-data";

export default function RequestPage() {
    const [loading, setLoading] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'New License' | 'Renewal' | 'Upgrade'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    // Sidebar state
    const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Modal state
    const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [declineReason, setDeclineReason] = useState('');

    const quickReasons = [
        'Insufficient justification',
        'Budget not approved',
        'Duplicate request',
        'Incorrect bundle selected',
        'Contract terms not met',
    ];

    // Filter counts
    const filterCounts = useMemo(() => ({
        all: requestsData.length,
        'New License': requestsData.filter(r => r.requestType === 'New License').length,
        'Renewal': requestsData.filter(r => r.requestType === 'Renewal').length,
        'Upgrade': requestsData.filter(r => r.requestType === 'Upgrade').length,
    }), []);

    // Filtered data
    const filteredData = useMemo(() => {
        let data = [...requestsData];

        if (activeFilter !== 'all') {
            data = data.filter(r => r.requestType === activeFilter);
        }

        if (searchQuery.trim()) {
            data = data.filter(r =>
                r.client.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedProduct !== 'all') {
            data = data.filter(r => r.product === selectedProduct);
        }

        return data;
    }, [activeFilter, searchQuery, selectedProduct]);

    const handleViewDetails = (request: RequestData) => {
        setSelectedRequest(request);
        setIsSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
        setTimeout(() => setSelectedRequest(null), 300);
    };

    const handleDecline = () => {
        setIsDeclineModalOpen(true);
    };

    const handleApprove = () => {
        setIsApproveModalOpen(true);
    };

    const handleConfirmDecline = () => {
        // In real app, would call API
        setIsDeclineModalOpen(false);
        setDeclineReason('');
        handleCloseSidebar();
    };

    const handleConfirmApprove = () => {
        // In real app, would call API
        setIsApproveModalOpen(false);
        handleCloseSidebar();
    };

    const getSubmittedDaysAgo = (dateStr: string) => {
        const submitted = new Date(dateStr);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - submitted.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Request type badge component
    const RequestTypeBadge = ({ type }: { type: string }) => {
        switch (type) {
            case 'New License':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        New License
                    </span>
                );
            case 'Renewal':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.5 8.5a5.5 5.5 0 1 1-1.28-3.53" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M13.5 3v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Renewal
                    </span>
                );
            case 'Upgrade':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 3v10M8 3L4 7M8 3l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Upgrade
                    </span>
                );
            default:
                return <span>{type}</span>;
        }
    };

    const columns: ColumnDef<RequestData>[] = [
        {
            id: 'select',
            header: () => <input type="checkbox" className="rounded border-gray-300 w-4 h-4 accent-[#5830F7]" />,
            cell: () => <input type="checkbox" className="rounded border-gray-300 w-4 h-4 accent-[#5830F7]" />,
            size: 40,
        },
        {
            accessorKey: 'client',
            header: 'CLIENT',
            cell: ({ row }) => (
                <span className="font-medium text-gray-900">{row.original.client}</span>
            ),
        },
        {
            accessorKey: 'requestType',
            header: 'REQUEST TYPE',
            cell: ({ row }) => <RequestTypeBadge type={row.original.requestType} />,
        },
        {
            id: 'productBundle',
            header: 'PRODUCT / BUNDLE',
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{row.original.product}</span>
                    <span className="text-xs text-gray-500">({row.original.bundle})</span>
                </div>
            ),
        },
        {
            id: 'seatDuration',
            header: 'SEAT / DURATION',
            cell: ({ row }) => (
                <div>
                    <span className="font-semibold text-gray-900">{row.original.seats} seats</span>
                    <span className="text-xs text-gray-400 ml-1">({row.original.duration})</span>
                </div>
            ),
        },
        {
            accessorKey: 'justification',
            header: 'JUSTIFICATION',
            cell: ({ row }) => (
                <span className="text-gray-600 text-sm max-w-[200px] truncate block">
                    {row.original.justification}
                </span>
            ),
        },
        {
            accessorKey: 'dateSubmitted',
            header: 'DATE SUBMITTED',
            cell: ({ row }) => (
                <span className="text-gray-700">{row.original.dateSubmitted}</span>
            ),
        },
        {
            id: 'actions',
            header: 'ACTION',
            cell: ({ row }) => (
                <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleViewDetails(row.original);
                    }}
                    title="View Details"
                >
                    <Eye className="w-4 h-4 text-gray-500" />
                </button>
            ),
        },
    ];

    const statData = [
        {
            title: "Total Requests",
            value: "135",
            description: "total",
            cardIcon: "/cards/database-icon.svg",
            subValue: "All time"
        },
        {
            title: "Approved",
            value: "38",
            description: "approved",
            cardIcon: "/cards/success-icon.svg",
            subValue: "This month"
        },
        {
            title: "Pending Review",
            value: "24",
            description: "awaiting",
            cardIcon: "/cards/alarm-icon.svg",
            subValue: "Awaiting Action"
        },
        {
            title: "Declined",
            value: "16",
            description: "declined",
            cardIcon: "/cards/delete-icon.svg",
            subValue: "This month"
        },
    ];

    const filterTabs: { key: typeof activeFilter; label: string }[] = [
        { key: 'all', label: 'All Requests' },
        { key: 'New License', label: 'New License' },
        { key: 'Renewal', label: 'Renewal' },
        { key: 'Upgrade', label: 'Upgrade' },
    ];

    return (
        <div className="bg-[#F8F9FF] min-h-screen p-4 relative overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Requests</h1>
                    <div className="text-gray-500 text-md mt-2">
                        Review and action all incoming procurement, renewal and upgrade requests from client organisations.
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
                        <Upload className="w-4 h-4" />
                        Export as
                        <ChevronDown className="w-4 h-4 ml-1" />
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

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-4">
                {filterTabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => { setActiveFilter(tab.key); setCurrentPage(1); }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                            activeFilter === tab.key
                                ? 'bg-[#232856] text-white shadow-md'
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                    >
                        {tab.label}
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                            activeFilter === tab.key
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-100 text-gray-500'
                        }`}>
                            {filterCounts[tab.key]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Search & Filter Bar + Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                {/* Search & Filter Row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-4 border-b border-gray-100">
                    <div className="relative w-full md:w-[340px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search by client"
                            className="pl-10 border border-gray-200 shadow-sm bg-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <select
                                className="h-9 rounded-md border border-gray-200 bg-white px-3 py-1 pr-8 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none cursor-pointer"
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                <option value="all">All Products</option>
                                <option value="3B Admin">3B Admin</option>
                                <option value="Bifense">Bifense</option>
                                <option value="Banklet">Banklet</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select className="h-9 rounded-md border border-gray-200 bg-white px-3 py-1 pr-8 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring appearance-none cursor-pointer">
                                <option>Date Submitted</option>
                                <option>Newest First</option>
                                <option>Oldest First</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <button className="flex items-center gap-2 h-9 px-4 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                </div>

                {/* Data Table */}
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

            {/* ============================================ */}
            {/* VIEW DETAILS SIDEBAR OVERLAY                 */}
            {/* ============================================ */}

            {/* Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-40 transition-opacity"
                    onClick={handleCloseSidebar}
                />
            )}

            {/* Right Side Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {selectedRequest && (
                    <>
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                            <div>
                                <h2 className="text-xl font-semibold mb-1">Request Details</h2>
                                <p className="text-sm text-gray-500">
                                    {selectedRequest.requestType} . Submitted {selectedRequest.dateSubmitted}
                                </p>
                            </div>
                            <button
                                onClick={handleCloseSidebar}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Drawer Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-5">
                            {/* Status Row */}
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="2" width="12" height="12" rx="2" opacity="0.2"/><rect x="7" y="5" width="2" height="4" rx="1" /><rect x="7" y="10" width="2" height="2" rx="1" /></svg>
                                    Pending Review
                                </span>
                                <span className="text-sm text-gray-500">
                                    Submitted {getSubmittedDaysAgo(selectedRequest.dateSubmitted)} days ago
                                </span>
                            </div>

                            {/* Client Organization Section */}
                            <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Client Organization</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Client</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedRequest.client}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Submitted by</span>
                                        <span className="text-sm font-semibold text-gray-900 text-right max-w-[220px] truncate">{selectedRequest.submittedBy}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">End Date</span>
                                        <span className="text-sm font-semibold text-gray-900 text-right max-w-[220px] truncate">{selectedRequest.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Request Details Section */}
                            <div className="bg-gray-50 rounded-xl p-5 space-y-4">
                                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wider">Request Details</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Request Type</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedRequest.requestType}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Product</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedRequest.product}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Service Bundle</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedRequest.bundle.replace(' - ', ' . ')}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Seats Requested</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedRequest.seats} Seats</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Duration</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedRequest.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">Desired Start</span>
                                        <span className="text-sm font-semibold text-gray-900">{selectedRequest.desiredStart}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Justification Note */}
                            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                                    <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider">Justification Note</h3>
                                </div>
                                <p className="text-sm text-gray-700 italic leading-relaxed">
                                    {selectedRequest.justificationNote}
                                </p>
                            </div>
                        </div>

                        {/* Drawer Footer */}
                        <div className="p-6 border-t border-gray-100 flex items-center gap-3 bg-white">
                            <button
                                className="flex-1 h-[44px] rounded-lg border-2 border-red-300 text-red-600 font-semibold text-sm hover:bg-red-50 transition-colors"
                                onClick={handleDecline}
                            >
                                Decline
                            </button>
                            <button
                                className="flex-1 h-[44px] rounded-lg bg-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-300 transition-colors"
                                onClick={handleApprove}
                            >
                                Approve
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* ============================================ */}
            {/* DECLINE MODAL                                */}
            {/* ============================================ */}
            {isDeclineModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center">
                    {/* Modal Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => { setIsDeclineModalOpen(false); setDeclineReason(''); }}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[520px] mx-4 p-8 animate-in fade-in zoom-in-95 duration-200">
                        {/* Warning Icon */}
                        <div className="flex justify-center mb-5">
                            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-amber-600" />
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-center text-gray-900 mb-2">
                            Decline this request?
                        </h3>
                        <p className="text-sm text-gray-500 text-center mb-6">
                            {selectedRequest?.client} will be notified with your reason. This action
                            will be logged to the audit trail.
                        </p>

                        {/* Reason Textarea */}
                        <div className="mb-4">
                            <label className="text-sm font-semibold text-gray-900 mb-2 block">
                                Reason for declining <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                className="w-full h-[100px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all placeholder:text-gray-400"
                                placeholder="Enter reason for declining this request..."
                                value={declineReason}
                                onChange={(e) => {
                                    if (e.target.value.length <= 500) {
                                        setDeclineReason(e.target.value);
                                    }
                                }}
                                maxLength={500}
                            />
                            <div className="flex justify-end mt-1">
                                <span className="text-xs text-gray-400">
                                    {declineReason.length} / 500 characters
                                </span>
                            </div>
                        </div>

                        {/* Quick Reasons */}
                        <div className="mb-5">
                            <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-3">Quick Reasons</p>
                            <div className="flex flex-wrap gap-2">
                                {quickReasons.map((reason) => (
                                    <button
                                        key={reason}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-150 ${
                                            declineReason.includes(reason)
                                                ? 'bg-red-50 border-red-300 text-red-700'
                                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                                        }`}
                                        onClick={() => {
                                            if (declineReason.includes(reason)) {
                                                setDeclineReason(declineReason.replace(reason, '').trim());
                                            } else {
                                                const newReason = declineReason ? `${declineReason} ${reason}` : reason;
                                                if (newReason.length <= 500) {
                                                    setDeclineReason(newReason);
                                                }
                                            }
                                        }}
                                    >
                                        {reason}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Warning Notice */}
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-6 flex items-start gap-2.5">
                            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-600 leading-relaxed">
                                This reason will be sent to the Client Admin via notification and permanently logged to the immutable audit trail.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                className="flex-1 h-[44px] rounded-lg border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                                onClick={() => { setIsDeclineModalOpen(false); setDeclineReason(''); }}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 h-[44px] rounded-lg bg-red-600 text-white font-semibold text-sm hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleConfirmDecline}
                                disabled={!declineReason.trim()}
                            >
                                Yes, decline
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================ */}
            {/* APPROVE MODAL                                */}
            {/* ============================================ */}
            {isApproveModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center">
                    {/* Modal Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsApproveModalOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[420px] mx-4 p-8 animate-in fade-in zoom-in-95 duration-200">
                        {/* Info Icon */}
                        <div className="flex justify-center mb-5">
                            <div className="w-12 h-12 rounded-full bg-[#5830F7]/10 flex items-center justify-center">
                                <Info className="w-6 h-6 text-[#5830F7]" />
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                            Would you like to approve this request?
                        </h3>
                        <p className="text-sm text-gray-500 text-center mb-8">
                            All permission will be granted for this request
                        </p>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                className="flex-1 h-[44px] rounded-lg border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
                                onClick={() => setIsApproveModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="flex-1 h-[44px] rounded-lg bg-[#232856] text-white font-semibold text-sm hover:bg-[#2c3361] transition-colors"
                                onClick={handleConfirmApprove}
                            >
                                Yes, approve
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}