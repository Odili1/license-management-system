"use client";

import { cn } from "@/src/lib/utils";
import { Button } from "../../button/button";
import { Copy, QrCode } from "lucide-react";
import { customToast } from "@/src/components/custom-toast";

interface MfaScanQrProps {
    onNext: () => void;
    onBack?: () => void;
}

export function MfaScanQr({ onNext, onBack }: MfaScanQrProps) {
    const manualKey = "INNO-SLMS-A7K2-9XPQ-M4NR";

    const handleCopy = () => {
        navigator.clipboard.writeText(manualKey);
        customToast.success("Key copied to clipboard!");
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-1 text-slate-900">Scan QR Code</h2>
            <p className="text-center text-[#525866] mb-4 text-sm font-light">Open your authenticator app and scan the code below to secure your SLM account.</p>

            <div className="w-full h-px bg-gray-200 mb-4"></div>

            <div className="flex items-center justify-center mb-2">
                <div className="w-40 h-40 border border-gray-200 rounded-2xl flex items-center justify-center p-4">
                    {/* Simulated QR Code placeholder */}
                    <QrCode className="w-full h-full text-slate-800" strokeWidth={1} />
                </div>
            </div>

            <div className="w-full mb-4">
                <p className="text-center text-sm font-medium text-slate-900 mb-2">Can't scan? Enter key manually</p>
                <div className="relative">
                    <input
                        type="text"
                        readOnly
                        value={manualKey}
                        className="block w-full pl-4 pr-12 py-3 border border-gray-200 rounded-lg shadow-sm font-mono text-sm bg-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                        title="Copy key"
                    >
                        <Copy className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <Button
                    onClick={onNext}
                    className="w-full py-6 rounded-xl font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    I've scanned the code
                </Button>

                <p className="text-center text-sm text-gray-500 max-w-[350px] mx-auto">
                    After scanning, your app will show a 6 digit code that refreshes every 30 seconds
                </p>

                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 py -2 mt-1"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
