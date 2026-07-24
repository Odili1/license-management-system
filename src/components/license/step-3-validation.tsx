import React from 'react';
import { Info, ShieldAlert } from 'lucide-react';
import { Input } from "@/src/components/ui/input";
import { DatePicker } from "@/src/components/date-picker/date-picker";

interface Step3Props {
    data: any;
    updateData: (data: Partial<any>) => void;
}

export function Step3Validation({ data, updateData }: Step3Props) {
    return (
        <div className="space-y-6">
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900">Target Organization</label>
                <Input 
                    placeholder="Enter an organization" 
                    className="border-red-400 focus-visible:ring-red-400 shadow-sm h-10" 
                    value={data.targetOrganization} 
                    onChange={(e) => updateData({ targetOrganization: e.target.value })} 
                />
                <div className="flex items-start gap-1.5 text-red-500 mt-1">
                    <Info className="w-4 h-4 shrink-0 mt-0.5" />
                    <span className="text-xs">The license will be cryptographically locked to this organization's unique tenant ID.</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1.5">
                    <DatePicker 
                        label="Start date" 
                        placeholder="Select date" 
                        className="border border-[#E5E7EB] shadow-sm bg-white"
                        value={data.startDate} 
                        onChange={(d) => updateData({ startDate: d })} 
                    />
                </div>
                <div className="flex-1 space-y-1.5">
                    <DatePicker 
                        label="End date" 
                        placeholder="Select date" 
                        className="border border-[#E5E7EB] shadow-sm bg-white"
                        value={data.endDate} 
                        onChange={(d) => updateData({ endDate: d })} 
                    />
                </div>
            </div>

            <div className="flex items-end gap-4">
                <div className="flex-1 space-y-1.5">
                    <label className="text-sm font-medium text-gray-900">Grace Period</label>
                    <div className="relative">
                        <Input 
                            className="border border-[#E5E7EB] shadow-sm h-10 pr-12" 
                            value={data.gracePeriod} 
                            onChange={(e) => updateData({ gracePeriod: e.target.value })} 
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">Days</span>
                    </div>
                </div>
                <div className="flex-1 bg-[#E6FDF9] text-[#00A887] h-10 rounded-md border border-[#B3F4E5] flex items-center px-3 gap-2 text-sm font-medium">
                    <Info className="w-4 h-4 shrink-0" />
                    Recommended: 7 Days
                </div>
            </div>

            <div className="bg-[#F8F9FF] p-4 rounded-lg flex items-start gap-3 mt-8">
                <ShieldAlert className="w-5 h-5 text-[#5830F7] shrink-0 mt-0.5" />
                <div>
                    <h4 className="text-xs font-bold text-[#5830F7] mb-1">Compliance Validation</h4>
                    <p className="text-sm text-gray-600">
                        The selected schedule ensures a 12-month audit window. Changes to the end date after generation will require a formal amendment audit log.
                    </p>
                </div>
            </div>
        </div>
    );
}
