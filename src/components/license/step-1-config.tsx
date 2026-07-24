import React from 'react';
import { ChevronDown, Info } from 'lucide-react';

interface Step1Props {
    data: any;
    updateData: (data: Partial<any>) => void;
}

export function Step1Config({ data, updateData }: Step1Props) {
    return (
        <div className="space-y-6">
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900">Target Product</label>
                <div className="relative">
                    <select 
                        className="w-full h-10 rounded-md border border-[#E5E7EB] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 appearance-none"
                        value={data.targetProduct}
                        onChange={(e) => updateData({ targetProduct: e.target.value })}
                    >
                        <option value="" disabled>Select product</option>
                        <option value="Banklet">Banklet</option>
                        <option value="3B Admin">3B Admin</option>
                        <option value="Bifense">Bifense</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900">Service Bundle Level</label>
                <div className="relative">
                    <select 
                        className="w-full h-10 rounded-md border border-[#E5E7EB] bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 appearance-none"
                        value={data.serviceBundle}
                        onChange={(e) => updateData({ serviceBundle: e.target.value })}
                    >
                        <option value="" disabled>Select service bundle</option>
                        <option value="Basic - Tier 1">Basic - Tier 1</option>
                        <option value="Premium - Tier 2">Premium - Tier 2</option>
                        <option value="Enterprise - Tier 3">Enterprise - Tier 3</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-900">Internal Notes</label>
                <textarea 
                    className="w-full min-h-[100px] rounded-md border border-[#E5E7EB] bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500"
                    placeholder="Enter notes..."
                    value={data.internalNotes}
                    onChange={(e) => updateData({ internalNotes: e.target.value })}
                />
            </div>

            <div className="bg-[#F8F9FF] p-4 rounded-lg flex items-start gap-3">
                <Info className="w-5 h-5 text-[#5830F7] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                    These notes are only visible to system administrators and will be appended to the audit log.
                </p>
            </div>
        </div>
    );
}
