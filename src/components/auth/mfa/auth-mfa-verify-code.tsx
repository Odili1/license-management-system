"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "../../button/button";
import { Info } from "lucide-react";

interface MfaVerifyCodeProps {
    onNext: () => void;
    onBack?: () => void;
}

export function MfaVerifyCode({ onNext, onBack }: MfaVerifyCodeProps) {
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const isCodeComplete = code.every(digit => digit !== "");

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (!/^\d*$/.test(value)) return;
        
        setError(null); // Clear error on change

        const newCode = [...code];
        // Handle paste (multiple characters)
        if (value.length > 1) {
            const pastedValue = value.slice(0, 6).split("");
            for (let i = 0; i < pastedValue.length; i++) {
                if (index + i < 6) {
                    newCode[index + i] = pastedValue[i];
                }
            }
            setCode(newCode);
            // Focus on next empty input or last input
            const nextEmptyIndex = newCode.findIndex(val => val === "");
            const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : 5;
            inputRefs.current[focusIndex]?.focus();
            return;
        }

        // Single character input
        newCode[index] = value;
        setCode(newCode);

        // Move to next input if not empty
        if (value !== "" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && code[index] === "" && index > 0) {
            // Move to previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleConfirm = () => {
        if (!isCodeComplete) return;

        setIsLoading(true);
        // Simulate checking the code. 
        // For demonstration, let's say "470999" is the incorrect code from screenshot
        // If it's "123456", it's correct. Otherwise simulate error.
        setTimeout(() => {
            setIsLoading(false);
            const enteredCode = code.join('');
            if (enteredCode === "470999") {
                setError("Incorrect code, please check and try again");
            } else {
                onNext();
            }
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 text-slate-900">Enter Verification Code</h2>
            <p className="text-center text-[#525866] mb-8 text-sm font-light">Enter the 6-digit code from your authenticator app to confirm the setup</p>

            <div className="w-full h-px bg-gray-200 mb-8"></div>

            <div className="w-full mb-6">
                <div className="flex justify-between gap-2 max-w-sm mx-auto">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => { inputRefs.current[index] = el; }}
                            type="text"
                            maxLength={6} // allow pasting up to 6 chars
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className={cn(
                                "w-12 h-14 text-center text-xl font-semibold rounded-lg border focus:outline-none focus:ring-1 transition-colors",
                                error 
                                    ? "border-red-500 text-red-500 focus:ring-red-500 bg-white" 
                                    : "border-gray-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                            )}
                        />
                    ))}
                </div>
                {error && (
                    <div className="mt-2 flex items-center text-sm text-red-500 max-w-sm mx-auto">
                        <Info className="h-4 w-4 mr-1 flex-shrink-0" />
                        {error}
                    </div>
                )}
            </div>

            <div className="w-full flex flex-col gap-4">
                <Button
                    onClick={handleConfirm}
                    disabled={!isCodeComplete || isLoading}
                    className={cn(
                        "w-full py-6 rounded-xl font-medium transition-colors", 
                        isCodeComplete && !error ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-600/50 text-white cursor-not-allowed"
                    )}
                >
                    {isLoading ? "Confirming..." : "Confirm"}
                </Button>

                <p className="text-center text-sm text-gray-500 max-w-[280px] mx-auto mt-2">
                    The code refreshes every 30 seconds. Enter the current one shown in your app
                </p>
                
                <button
                    type="button"
                    className="text-sm font-medium text-slate-900 hover:underline underline-offset-4"
                >
                    Resend code
                </button>

                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2 mt-2"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
