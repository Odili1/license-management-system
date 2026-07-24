"use client";

import { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Button } from "../../button/button";
import { Lock, Eye, EyeOff } from "lucide-react";

interface MfaCreateNewPasswordProps {
    onNext: () => void;
    onBack?: () => void;
}

export function MfaCreateNewPassword({ onNext, onBack }: MfaCreateNewPasswordProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isFormValid = currentPassword && newPassword && confirmPassword && (newPassword === confirmPassword) && newPassword.length >= 12;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1000);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-2 text-slate-900">Create your new password</h2>
            <p className="text-center text-[#525866] mb-4 text-sm font-light">Enter a new and secured password</p>

            <div className="w-full h-px bg-gray-200 mb-4"></div>

            <form className="w-full space-y-1" onSubmit={handleSubmit}>
                {/* Current Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">
                        Current Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            placeholder="••••••••••••"
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">
                        New Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            placeholder="••••••••••••"
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                    {/* Password Strength Indicators - simplified for visual match */}
                    <div className="flex gap-1 mt-3">
                        <div className={`h-1 flex-1 rounded-full ${newPassword.length > 0 ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${newPassword.length > 4 ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${newPassword.length > 8 ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                        <div className={`h-1 flex-1 rounded-full ${newPassword.length >= 12 ? 'bg-indigo-500' : 'bg-gray-200'}`}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter a new password</p>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            placeholder="••••••••••••"
                            required
                            className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold text-slate-900">Security requirement:</span> At least 12 characters & A mix of letters, numbers, and symbols
                    </p>
                </div>

                <div className="pt-1 flex flex-col gap-4">
                    <Button
                        type="submit"
                        disabled={!isFormValid || isLoading}
                        className={cn("w-full py-4 rounded-xl font-medium", isFormValid ? "bg-indigo-600 hover:bg-indigo-700 text-white" : "bg-indigo-600/50 text-white cursor-not-allowed")}
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </Button>

                    <button
                        type="button"
                        onClick={onBack}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900 py-2"
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}