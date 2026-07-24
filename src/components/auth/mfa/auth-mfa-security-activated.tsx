"use client";

import { Button } from "../../button/button";
import { BadgeCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

export function MfaSecurityActivated() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = () => {
        setIsLoading(true);
        // Navigate to the main dashboard after completing MFA
        setTimeout(() => {
            router.push('/dashboard');
        }, 800);
    };

    const handleBack = () => {
        // Implement back behavior if needed
        console.log("Back clicked");
    };

    const items = [
        "Authenticator app linked",
        "Backup codes saved",
        "Security policy satisfied"
    ];

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 text-slate-900">Security Activated</h2>
            <p className="text-center text-[#525866] mb-8 text-sm font-light max-w-sm">
                Multi-factor authentication is now fully configured for your identity profile.
            </p>

            <div className="w-full h-px bg-gray-200 mb-8"></div>

            <div className="w-full flex flex-col gap-4 mb-8">
                {items.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl"
                    >
                        <BadgeCheck className="w-5 h-5 text-slate-700 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-800">{item}</span>
                    </div>
                ))}
            </div>

            <div className="w-full flex flex-col gap-4">
                <Button
                    onClick={handleContinue}
                    disabled={isLoading}
                    className="w-full py-6 rounded-xl font-medium bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                    {isLoading ? "Redirecting..." : "Go to dashboard"}
                </Button>

                <button
                    type="button"
                    onClick={handleBack}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2 mt-2"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
