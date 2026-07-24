import Image from "next/image"

type StatsCardProps = {
    title: string
    value: string
    description: string
    cardIcon: string
    subValue?: string
}

export function StatsCard({ title, value, description, cardIcon, subValue }: StatsCardProps) {
    // Define background and text colors based on status
    const getStatusStyles = () => {
        switch (description.toLowerCase()) {
            case "active":
            case "approved":
                return {
                    borderColor: "border-[#10B981]",
                    valueColor: "text-[#10B981]"
                }
            case "inactive":
            case "declined":
                return {
                    borderColor: "border-[#ED1C24]",
                    valueColor: "text-[#ED1C24]"
                }
            case "expiring":
            case "awaiting":
                return {
                    borderColor: "border-[#F59E0B]",
                    valueColor: "text-[#F59E0B]"
                }
            default:
                return {
                    borderColor: "border-[#181B25]",
                    valueColor: "text-[#181B25]"
                }
        }
    }

    const { valueColor, borderColor } = getStatusStyles()

    return (
        <div className={`bg-[#FFFFFF] p-6 rounded-md border-l-3 ${borderColor} flex shadow-sm`}>
            <div className="w-[80%]">
                <div className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">{title.toUpperCase()}</div>
                <div className="flex items-end gap-2">
                    <div className={`text-4xl font-bold ${valueColor}`}>{value}</div>
                    {subValue && <div className={`text-xs whitespace-nowrap italic`}>{subValue}</div>}
                </div>
            </div>
            <div className="">
                <Image src={cardIcon} alt="card icon" width={5} height={5} style={{ width: 'auto', height: 'auto', opacity: 0.1 }} className="" />
            </div>
        </div>
    )
}
