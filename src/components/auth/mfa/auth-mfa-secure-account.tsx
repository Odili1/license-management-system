"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "../../button/button";
import { Smartphone, Mail } from "lucide-react";

interface MfaSecureAccountProps {
    onNext: (method: 'app' | 'email') => void;
    onBack?: () => void;
}

export function MfaSecureAccount({ onNext, onBack }: MfaSecureAccountProps) {
    const [selectedMethod, setSelectedMethod] = useState<'app' | 'email' | null>(null);

    const handleContinue = () => {
        if (selectedMethod) {
            onNext(selectedMethod);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 text-slate-900">Secure your account with MFA</h2>
            <p className="text-center text-[#525866] mb-4 text-sm font-light">Choose an additional security layer to protect your Innovantics SLM profile.</p>

            <div className="w-full h-px bg-gray-200 mb-4"></div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Authenticator App Option */}
                <button
                    type="button"
                    onClick={() => setSelectedMethod('app')}
                    className={cn(
                        "relative flex flex-col items-start p-5 text-left border rounded-xl transition-all h-full",
                        selectedMethod === 'app'
                            ? "border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/10"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                    )}
                >
                    <Smartphone className="w-6 h-6 text-slate-700 mb-4" />
                    <h3 className="font-semibold text-slate-900 mb-1">Authenticator App</h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">Google Authenticator or any Authenticator app</p>
                    <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-indigo-500 text-white uppercase tracking-wider mt-auto">
                        RECOMMENDED
                    </span>
                </button>

                {/* Email Code Option */}
                <button
                    type="button"
                    onClick={() => setSelectedMethod('email')}
                    className={cn(
                        "relative flex flex-col items-start p-5 text-left border rounded-xl transition-all h-full",
                        selectedMethod === 'email'
                            ? "border-indigo-600 ring-1 ring-indigo-600 bg-indigo-50/10"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                    )}
                >
                    <Mail className="w-6 h-6 text-slate-700 mb-4" />
                    <h3 className="font-semibold text-slate-900 mb-1">Email Code</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">A 6-digit code sent to your registered email</p>
                </button>
            </div>

            <div className="w-full flex flex-col gap-3">
                <Button
                    onClick={handleContinue}
                    disabled={!selectedMethod}
                    className={cn(
                        "w-full py-4 rounded-xl font-medium",
                        selectedMethod ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-600/50 text-white cursor-not-allowed"
                    )}
                >
                    Continue
                </Button>

                <p className="text-center text-sm text-gray-500 max-w-[280px] mx-auto">
                    MFA is mandatory for all administrative roles per innovantics security policy
                </p>

                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2 mt-1"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
