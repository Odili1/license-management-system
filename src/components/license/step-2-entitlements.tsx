import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Input } from "@/src/components/ui/input";

interface Step2Props {
    data: any;
    updateData: (data: Partial<any>) => void;
}

export function Step2Entitlements({ data, updateData }: Step2Props) {
    return (
        <div className="space-y-6">
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900">License Type</label>
                <div className="relative">
                    <select 
                        className="w-full h-10 rounded-md border border-[#E5E7EB] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 appearance-none"
                        value={data.licenseType}
                        onChange={(e) => updateData({ licenseType: e.target.value })}
                    >
                        <option value="" disabled>Select license type</option>
                        <option value="Trial">Trial</option>
                        <option value="Custom">Custom</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900">Entitlement Count</label>
                <Input 
                    placeholder="Enter count (e.g. 100 or Unlimited)" 
                    className="border border-[#E5E7EB] shadow-sm h-10" 
                    value={data.entitlementCount} 
                    onChange={(e) => updateData({ entitlementCount: e.target.value })} 
                />
            </div>
        </div>
    );
}
