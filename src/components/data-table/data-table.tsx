'use client';

import { cn } from '@/src/lib/utils';
import {
    type ColumnDef,
    type ColumnFiltersState,
    Row,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import * as React from 'react';
import { Button } from '../button/button';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    className?: string;
    pageCount?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
    showPagination?: boolean;
    onRowClick?: (row: Row<TData>) => void;
    rowHover?: boolean;
    rowClassName?: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    className,
    pageCount = 1,
    currentPage = 1,
    onPageChange,
    totalItems = 0,
    itemsPerPage = 10,
    showPagination = true,
    onRowClick,
    rowHover = true,
    rowClassName,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    // Ensure data is always an array
    const tableData = Array.isArray(data) ? data : [];

    const table = useReactTable({
        data: tableData,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        pageCount: pageCount,
        state: {
            sorting,
            columnFilters,
            pagination: {
                pageIndex: currentPage - 1,
                pageSize: itemsPerPage,
            },
        },
        onPaginationChange: updater => {
            if (typeof updater === 'function') {
                const newState = updater({
                    pageIndex: currentPage - 1,
                    pageSize: itemsPerPage,
                });
                onPageChange?.(newState.pageIndex + 1);
            }
        },
    });

    const getPageNumbers = () => {
        const maxButtons = 2; // this is how many center numbers around currentPage
        const pages: (number | string)[] = [];

        if (pageCount <= maxButtons + 1) {
            // Render all if total pages small enough
            for (let i = 1; i <= pageCount; i++) pages.push(i);
        } else {
            const left = Math.max(2, currentPage - 1);
            const right = Math.min(pageCount - 1, currentPage + 1);

            pages.push(1); // Always show first

            if (left > 2) pages.push('...');
            for (let i = left; i <= right; i++) pages.push(i);
            if (right < pageCount - 1) pages.push('...');

            pages.push(pageCount); // Always show last
        }

        return pages;
    };

    return (
        <div className={cn('w-full', className)}>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-[#E5E7EB] dark:bg-gray-900">
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-bold text-[#000000] dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="bg-white dark:bg-[#18181b]">
                            {table.getRowModel()?.rows?.length ? (
                                table.getRowModel().rows.map(row => (
                                    <tr
                                        key={row.id}
                                        style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                        className={cn(
                                            'bg-white dark:bg-[#18181b] border-b border-gray-100 dark:border-gray-800 transition-colors',
                                            rowHover && onRowClick && 'hover:bg-gray-50 dark:hover:bg-white/5',
                                            rowClassName,
                                        )}
                                        onClick={() => onRowClick && onRowClick(row)}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td
                                                key={cell.id}
                                                className={`px-6 py-4 text-sm text-gray-900 dark:text-gray-100 text-left`}
                                            >
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        No results.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {showPagination !== false && (
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 px-2 py-4 bg-[#F7F7F7] dark:bg-[#18181b] rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            {totalItems > 0 ? (
                                <>
                                    {(currentPage - 1) * itemsPerPage + 1}-
                                    {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} row(s).
                                </>
                            ) : (
                                <>0 of 0 row(s).</>
                            )}
                        </div>

                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            {/* Previous button */}
                            <Button
                                variant="outline"
                                className="h-8 w-20 px-3 text-sm"
                                size="sm"
                                onClick={() => onPageChange?.(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </Button>

                            {/* Numbered pagination with ellipsis */}
                            {getPageNumbers().map((item, idx) =>
                                item === '...' ? (
                                    <span
                                        key={`ellipsis-${idx}`}
                                        className="px-1 text-black dark:text-white font-bold text-lg"
                                    >
                                        ...
                                    </span>
                                ) : (
                                    <Button
                                        key={item}
                                        variant={currentPage === item ? 'default' : 'outline'}
                                        className="h-8 min-w-[32px] px-2 text-sm"
                                        size="sm"
                                        onClick={() => onPageChange?.(item as number)}
                                    >
                                        {item}
                                    </Button>
                                ),
                            )}

                            {/* Next button */}
                            <Button
                                variant="outline"
                                className="h-8 w-20 px-3 text-sm"
                                size="sm"
                                onClick={() => onPageChange?.(currentPage + 1)}
                                disabled={currentPage === pageCount}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper components for specific cell types
export const StatusCell = ({ status }: { status: string }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            // case 'active':
            //   return 'text-blue-600';
            case 'ongoing collection':
            case 'pending':
                return 'text-[#FFB84D]';
            case 'not started':
                return 'text-blue-600';
            case 'recovered':
            case 'collected':
            case 'successful':
            case 'success':
            case 'active':
            case 'approved':
            case 'activated':
                return 'text-green-600';
            case 'failed':
            case 'suspended':
            case 'rejected':
            case 'deactivated':
            case 'unapproved':
                return 'text-red-600';
            default:
                return 'text-gray-500';
        }
    };

    return <span className={getStatusColor(status)}>{status}</span>;
};

export const CurrencyCell = ({ amount }: { amount: number }) => {
    return <span>₦{amount.toLocaleString()}</span>;
};

// Helper components for specific cell types with Background Color
export const StatusCellWithBg = ({ status }: { status: string }) => {
    const getStatusColor = (status: string): { text: string; bg: string } => {
        switch (status.toLowerCase()) {
            case 'online':
            case 'success':
            case 'completed':
            case 'recovered':
                return {
                    text: 'text-[#35BC52]',
                    bg: 'bg-[#E0FFE7]',
                };
            case 'info':
            case 'active':
                return {
                    text: 'text-[#0B13FF]',
                    bg: 'bg-[#BEC5FF]',
                };
            case 'pending':
                return {
                    text: 'text-[#FFC42B]',
                    bg: 'bg-[#FFC42B26]',
                };
            case 'approvedbyprovider':
            case 'approved by provider':
                return {
                    text: 'text-[#0B13FF]',
                    bg: 'bg-[#BEC5FF]',
                };
            case 'approvedbycosigner':
            case 'approved by cosigner':
                return {
                    text: 'text-[#35BC52]',
                    bg: 'bg-[#E0FFE7]',
                };
            case 'cancelledbyrequester':
            case 'cancelled by requester':
            case 'cancelled':
                return {
                    text: 'text-[#FF0B27]',
                    bg: 'bg-[#FEC6E2]',
                };
            case 'ongoing recovery':
                return {
                    text: 'text-[#FFC42B]',
                    bg: 'bg-[#FFC42B26]',
                };
            case 'inactive':
            case 'offline':
            case 'warning':
                return {
                    text: 'text-[#A43C00]',
                    bg: 'bg-[#FEF3C6]',
                };
            case 'error':
            case 'overdue':
                return {
                    text: 'text-[#FF0B27]',
                    bg: 'bg-[#FEC6E2]',
                };
            case 'revoked':
                return {
                    text: 'text-[#484848]',
                    bg: 'bg-[#E2E2E2]',
                };
            default:
                return {
                    text: 'text-gray-900',
                    bg: 'bg-gray-100',
                };
        }
    };

    return (
        <span
            className={`py-1 px-2 ${getStatusColor(status).text} rounded-xl ${getStatusColor(status).bg}`}
        >
            {status}
        </span>
    );
};

// Helper component for truncating long IDs
export const TruncatedIdCell = ({ id, maxLength = 8 }: { id: string; maxLength?: number }) => {
    const truncatedId = id.length > maxLength ? `${id.substring(0, maxLength)}...` : id;

    return (
        <span title={id} className="font-mono text-sm cursor-help">
            {truncatedId}
        </span>
    );
};

export { DataTableSkeleton } from './data-table-skeleton';
