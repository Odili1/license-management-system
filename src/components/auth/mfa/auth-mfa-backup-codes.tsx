"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "../../button/button";
import { Copy, Download, Printer } from "lucide-react";
import { customToast } from "@/src/components/custom-toast";

interface MfaBackupCodesProps {
    onNext: () => void;
    onBack?: () => void;
}

export function MfaBackupCodes({ onNext, onBack }: MfaBackupCodesProps) {
    const [savedConfirmed, setSavedConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const backupCodes = [
        "4920-X821", "8831-P029", "1152-Q882",
        "9028-M215", "6673-Z110", "3341-Y904",
        "5582-W773", "2290-A441", "7712-B665",
        "4490-C223", "1109-D887", "8823-E994"
    ];

    const handleCopyAll = () => {
        navigator.clipboard.writeText(backupCodes.join('\n'));
        customToast.success("Backup codes copied to clipboard");
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([backupCodes.join('\n')], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "innovantics-backup-codes.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
        customToast.success("Backup codes downloaded");
    };

    const handlePrint = () => {
        window.print();
    };

    const handleContinue = () => {
        if (!savedConfirmed) return;
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-1 text-slate-900">Save your backup codes</h2>
            <p className="text-center text-[#525866] mb-4 text-sm font-light">These are your only backup if you lose MFA access. Save them securely.</p>

            <div className="w-full h-px bg-gray-200 mb-4"></div>

            {/* Backup Codes Grid */}
            <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {backupCodes.map((code, index) => (
                    <div
                        key={index}
                        className="py-2 px-3 border border-gray-200 rounded-lg text-center text-sm font-medium text-slate-800 bg-white shadow-sm"
                    >
                        {code}
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-3 w-full mb-4">
                <button
                    onClick={handleCopyAll}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-gray-50 transition-colors bg-white shadow-sm"
                >
                    <Copy className="w-4 h-4" />
                    Copy all
                </button>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-gray-50 transition-colors bg-white shadow-sm"
                >
                    <Download className="w-4 h-4" />
                    Download .txt
                </button>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-slate-700 hover:bg-gray-50 transition-colors bg-white shadow-sm"
                >
                    <Printer className="w-4 h-4" />
                    Print
                </button>
            </div>

            {/* Checkbox */}
            <div className="w-full flex items-center mb-3">
                <input
                    id="saved-confirm"
                    type="checkbox"
                    checked={savedConfirmed}
                    onChange={(e) => setSavedConfirmed(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                />
                <label htmlFor="saved-confirm" className="ml-3 text-sm text-slate-600 cursor-pointer select-none">
                    I have saved my backup codes in a safe place
                </label>
            </div>

            <div className="w-full flex flex-col gap-4">
                <Button
                    onClick={handleContinue}
                    disabled={!savedConfirmed || isLoading}
                    className={cn(
                        "w-full py-6 rounded-xl font-medium transition-colors",
                        savedConfirmed ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-600/50 text-white cursor-not-allowed"
                    )}
                >
                    {isLoading ? "Processing..." : "Continue"}
                </Button>

                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 py -2 mt-2"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
