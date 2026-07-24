import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Step4Props {
    data: any;
    goToStep: (step: number) => void;
}

export function Step4Summary({ data, goToStep }: Step4Props) {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Review License Details</h3>
                <span className="text-sm text-gray-500">All steps completed</span>
            </div>

            <div className="bg-[#F8F9FF] p-5 rounded-lg space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-500 tracking-wider">STEP 1 — CONFIGURATION</span>
                    <button onClick={() => goToStep(1)} className="text-xs font-bold text-[#5830F7] hover:underline">EDIT</button>
                </div>
                
                <div className="grid grid-cols-[1fr_auto] gap-y-3 gap-x-4 text-sm">
                    <div className="text-gray-500">Target Product</div>
                    <div className="text-right font-medium text-gray-900">{data.targetProduct || '-'}</div>
                    
                    <div className="text-gray-500">Service Bundle</div>
                    <div className="text-right font-medium text-gray-900">{data.serviceBundle || '-'}</div>
                </div>

                <div className="pt-2">
                    <div className="text-xs font-bold text-gray-400 tracking-wider mb-1">INTERNAL NOTES</div>
                    <div className="text-sm text-gray-600 italic">
                        {data.internalNotes || 'None'}
                    </div>
                </div>
            </div>

            <div className="bg-[#F8F9FF] p-5 rounded-lg space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-500 tracking-wider">STEP 2 — ENTITLEMENTS</span>
                    <button onClick={() => goToStep(2)} className="text-xs font-bold text-[#5830F7] hover:underline">EDIT</button>
                </div>
                
                <div className="grid grid-cols-[1fr_auto] gap-y-3 gap-x-4 text-sm">
                    <div className="text-gray-500">License Type</div>
                    <div className="text-right font-medium text-gray-900">{data.licenseType || '-'}</div>
                    
                    <div className="text-gray-500">Entitlement Count</div>
                    <div className="text-right font-medium text-gray-900">{data.entitlementCount || '-'}</div>
                </div>
            </div>
            
            <div className="bg-[#F8F9FF] p-5 rounded-lg space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-500 tracking-wider">STEP 3 — SCHEDULING & ASSIGNMENT</span>
                    <button onClick={() => goToStep(3)} className="text-xs font-bold text-[#5830F7] hover:underline">EDIT</button>
                </div>
                
                <div className="grid grid-cols-[1fr_auto] gap-y-3 gap-x-4 text-sm">
                    <div className="text-gray-500">Target Organisation</div>
                    <div className="text-right font-medium text-gray-900">{data.targetOrganization || '-'}</div>
                    
                    <div className="text-gray-500">Start Date</div>
                    <div className="text-right font-medium text-gray-900">
                        {data.startDate ? data.startDate.toLocaleDateString('en-GB') : '-'}
                    </div>

                    <div className="text-gray-500">End Date</div>
                    <div className="text-right font-medium text-gray-900">
                        {data.endDate ? data.endDate.toLocaleDateString('en-GB') : '-'}
                    </div>

                    <div className="text-gray-500">Grace Period</div>
                    <div className="text-right font-medium text-gray-900">
                        {data.gracePeriod ? `${data.gracePeriod} Days` : '-'}
                    </div>
                </div>
            </div>

            <div className="bg-[#F8F9FF] p-5 rounded-lg space-y-4">
                <div className="pb-2 border-b border-gray-200">
                    <span className="text-xs font-bold text-gray-500 tracking-wider">LICENSE STATUS ON GENERATION</span>
                </div>
                
                <div className="grid grid-cols-[1fr_auto] gap-y-3 gap-x-4 text-sm items-center">
                    <div className="text-gray-500">Initial Status</div>
                    <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 bg-[#EBF3FF] text-[#2563EB] px-3 py-1 rounded-md border border-[#BFDBFE] font-medium text-sm">
                            ⏳ Pending Activation
                        </span>
                    </div>
                    
                    <div className="text-gray-500">Notification</div>
                    <div className="text-right font-medium text-gray-900">Client Admin will be notified</div>
                </div>
            </div>

            <div className="bg-[#FFFBEB] p-4 rounded-lg flex items-start gap-3 border border-[#FCD34D]">
                <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
                <p className="text-sm text-[#B45309]">
                    Once generated, changes to this license will trigger a formal audit amendment.
                </p>
            </div>
        </div>
    );
}
