import Image from "next/image"
import { Button } from "./button/button"
import { Plus } from "lucide-react"

type EmtyDataStateProps = {
    icon: string
    description: string
    buttonText: string
}

export default function EmptyDataState({ icon, description, buttonText }: EmtyDataStateProps) {
    return (
        <div className="flex flex-col justify-center gap-6 w-[30%] mx-auto">
            <div className="flex items-center justify-center h-[75px] w-[75px] mx-auto rounded-full bg-[#F2F5F8]">
                <Image src={icon} alt="Empty data Icon" width={5} height={5} style={{ width: 'auto', height: 'auto' }} />
            </div>
            <p className="text-center">{description}</p>
            <Button
                className="bg-transparent hover:bg-gray-200 text-black flex items-center gap-2 rounded-lg border border-gray-300"
            >
                <Plus className="w-4 h-4" />
                {buttonText}
            </Button>
        </div>
    )
}