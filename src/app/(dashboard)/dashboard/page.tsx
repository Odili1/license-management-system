import { StatsCard } from "@/src/components/card/card";
import { title } from "process";

export default function DashboardPage() {
    let loading = false

    const statData = [
        {
            title: "Total Client",
            value: "0",
            cardIcon: ""
        }
    ]

    return (
        <div className="bg-[#F8F9FF] dark:bg- black min-h-screen p-4">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Dashboard Overview</h1>
                    <div className="text-gray-500 text-md mt-2">
                        Real-time performance metrics and global license status.
                    </div>
                </div>
            </div>

            {/* Stat Cards */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 bg border border-black/[0.03] dark:border白/[0.05] rounded-lg p-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 ">
                    {statData.map((stat, i) => (
                        <StatsCard key={i} title={stat.title} value={stat.value} cardIcon="" description="active" />
                    ))}
                </div>
            )}
        </div>
    );
}