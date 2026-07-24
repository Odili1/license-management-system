import { cn } from '@/src/lib/utils';

interface DataTableSkeletonProps {
    rowCount?: number;
    columnCount?: number;
}

export function DataTableSkeleton({ rowCount = 8, columnCount = 5 }: DataTableSkeletonProps) {
    // Width presets to simulate varied column widths
    const headerWidths = ['w-24', 'w-32', 'w-40', 'w-28', 'w-20', 'w-24', 'w-36'];
    const cellWidths = ['w-20', 'w-36', 'w-28', 'w-24', 'w-40', 'w-32'];

    return (
        <div className="w-full">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full w-full divide-y divide-gray-200 dark:divide-gray-700">
                        {/* Header */}
                        <thead className="bg-[#E5E7EB] dark:bg-gray-900">
                            <tr>
                                {Array.from({ length: columnCount }).map((_, idx) => (
                                    <th key={`h-${idx}`} className="px-6 py-3 text-left">
                                        <div className={`h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse ${headerWidths[idx % headerWidths.length]}`}></div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        {/* Body */}
                        <tbody className="bg-white dark:bg-[#18181b]">
                            {Array.from({ length: rowCount }).map((_, rIdx) => (
                                <tr
                                    key={`r-${rIdx}`}
                                    className={`border-b border-gray-100 dark:border-gray-800 ${rIdx % 2 === 0 ? 'bg-white dark:bg-[#18181b]' : 'bg-gray-50 dark:bg-white/5'}`}
                                >
                                    {Array.from({ length: columnCount }).map((_, cIdx) => (
                                        <td key={`c-${rIdx}-${cIdx}`} className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-3 rounded bg-gray-200 dark:bg-gray-700 animate-pulse ${cellWidths[(cIdx + rIdx) % cellWidths.length]}`}></div>
                                                <div className="h-3 rounded bg-gray-100 dark:bg-gray-800 animate-pulse w-12"></div>
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer Pagination Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2 px-2 py-4 bg-[#F7F7F7] dark:bg-[#18181b] rounded-b-lg border-t border-gray-200 dark:border-gray-700">
                    <div className="h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                        <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-8 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-8 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-8 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                        <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                </div>
            </div>
        </div>
    );
}
