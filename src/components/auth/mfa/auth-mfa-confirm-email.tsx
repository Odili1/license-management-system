"use client";

import { Button } from "../../button/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { customToast } from "@/src/components/custom-toast";

interface MfaConfirmEmailProps {
    onNext: () => void;
    onBack?: () => void;
}

export function MfaConfirmEmail({ onNext, onBack }: MfaConfirmEmailProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');

    const handleSendCode = () => {
        setIsLoading(true);
        // Simulate sending code API
        setTimeout(() => {
            setIsLoading(false);
            customToast.success("Verification code sent to your email.");
            onNext();
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-1 text-slate-900">Confirm your email</h2>
            <p className="text-center text-[#525866] mb-4 text-sm font-light">
                Verification code will be sent to this address each time you sign in.
            </p>

            <div className="w-full h-px bg-gray-200 mb-4"></div>

            <div className="w-full mb-6">
                <label className="block text-sm font-bold text-slate-800 mb-1">
                    Email Address<span className="text-blue-600">*</span>
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="bello@innovantics.com"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg shadow-sm text-gray-500 bg-gray-50 focus:outline-none sm:text-sm"
                    />
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <Button
                    onClick={handleSendCode}
                    disabled={isLoading}
                    className={cn(
                        "w-full py-6 rounded-xl font-medium",
                        "bg-indigo-600 hover:bg-indigo-700 text-white"
                    )}
                >
                    {isLoading ? "Sending..." : "Send code"}
                </Button>

                <p className="text-center text-sm text-gray-500 max-w-[350px] mx-auto mt-2">
                    This is your registered admin email. To use a different address contact your system administrator
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
