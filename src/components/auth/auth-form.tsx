'use client';

import type React from 'react';

import { Button } from '@/src/components/button/button';
import { Eye, EyeOff, Lock, Mail, XCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/src/components/ui/input';
import { customToast } from '@/src/components/custom-toast';
import { cn } from '@/src/lib/utils';
// import { forgotPassword } from '@/services/api/auth';

export interface FormError {
    email?: string;
    password?: string;
    terms?: string;
}

export interface AuthFormProps {
    type: 'signin' | 'signup';
    title: string;
    subtitle: string;
    buttonText: string;
    showTerms?: boolean;
    showRememberMe?: boolean;
    showForgotPassword?: boolean;
    errors?: FormError;
    isLoading?: boolean;
    onSubmit?: (data: {
        email: string;
        password: string;
        remember?: boolean;
        terms?: boolean;
    }) => void;
}

export function AuthForm({
    //   type,
    title,
    subtitle,
    buttonText,
    showTerms = false,
    showRememberMe = false,
    showForgotPassword = false,
    errors = {},
    isLoading = false,
    onSubmit,
}: AuthFormProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isForgotOpen, setIsForgotOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [isForgotLoading, setIsForgotLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({
                email,
                password,
                remember: rememberMe,
                terms: agreeToTerms,
            });
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!forgotEmail) {
            customToast.error('Please enter your email');
            return;
        }
        try {
            setIsForgotLoading(true);
            // await forgotPassword(forgotEmail);
            customToast.success('If an account exists for this email, a reset link has been sent. Please check your inbox.');
            setIsForgotOpen(false);
        } catch (error) {
            console.error('Forgot password error', error);
            customToast.error('Unable to send reset link. Please try again.');
        } finally {
            setIsForgotLoading(false);
        }
    };

    return (
        <div className="p-6 flex flex-col items-center justify-center h-full text-slate-900">
            <div className="w-full max-w-lg">
                <div className="flex mx-auto justify-center items-center h-[102px] w-[102px] rounded-full bg-gradient-to-b from-[#717784]/20 via-[#717784]/5 to-transparent mb-6">
                    <div className="flex items-center justify-center h-[75px] w-[75px] rounded-full border-2 bg-white border-gray-200">
                        <Image src="/auth/login-person.svg" alt="Login Icon" width={21} height={20} style={{ width: 'auto', height: 'auto' }} />
                    </div>
                </div>

                <h2 className="text-lg md:text-xl font-semibold text-center mb-2 text-slate-900">{title}</h2>
                <p className="text-center text-[#525866] mb-6 text-sm md:text-base font-light">{subtitle}</p>

                <div className="w-full h-0.5 bg-[#717784]/20 mb-6"></div>
                <form
                    className="space-y-5"
                    onSubmit={handleSubmit}
                    method="post"
                    autoComplete="on"
                    action="#"
                >
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="bello@innovantics.com"
                                autoComplete="username"
                                required
                                className={`block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            />
                        </div>
                        {errors.email && (
                            <div className="mt-1 flex items-center text-sm text-red-500">
                                <XCircle className="h-4 w-4 mr-1" />
                                {errors.email}
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password."
                                autoComplete="current-password"
                                required
                                className={`block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </div>
                            </div>
                        </div>
                        {errors.password && (
                            <div className="mt-1 flex items-center text-sm text-red-500">
                                <XCircle className="h-4 w-4 mr-1" />
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        {showRememberMe && (
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={e => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                                    Keep me logged in
                                </label>
                            </div>
                        )}

                        {showForgotPassword && (
                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setForgotEmail(email);
                                        setIsForgotOpen(true);
                                    }}
                                    className="text-neutral-800 dark:text-neutral-200 hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}
                    </div>

                    {showTerms && (
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={e => setAgreeToTerms(e.target.checked)}
                                    className={`h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded ${errors.terms ? 'border-red-500' : ''
                                        }`}
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="terms" className="text-slate-900">
                                    I agree to Peerpay{' '}
                                    <Link href="#" className="text-blue-500 hover:underline">
                                        Terms of Use
                                    </Link>{' '}
                                    and consent to Peerpay{' '}
                                    <Link href="#" className="text-blue-500 hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </label>
                                {errors.terms && (
                                    <div className="mt-1 flex items-center text-sm text-red-500">
                                        <XCircle className="h-4 w-4 mr-1" />
                                        {errors.terms}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div>
                        <Button
                            variant={'default'}
                            className={cn("w-full text-white cursor-pointer rounded-2xl", `${email && password ? 'bg-[#5830F7] hover:bg-[#5830F7]' : 'bg-[#F2F5F9] hover:bg-[#F2F5F9]'}`)}
                            type="submit"
                            name="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    Loading...
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                                </div>
                            ) : (
                                buttonText
                            )}
                        </Button>
                    </div>
                </form>

                {/* <div className="mt-6 text-center">
          <p className="text-slate-900 text-sm md:text-base">
            {footerText}{' '}
            <Link
              href={footerLinkHref}
              className="text-blue-700 font-medium hover:underline inline-flex items-center cursor-pointer"
            >
              {footerLinkText} <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </p>
        </div> */}
            </div>
            {isForgotOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-2">Reset password</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                            Enter the email associated with your account and we will send you a password reset link.
                        </p>
                        <form className="space-y-4" onSubmit={handleForgotPassword}>
                            <div className="relative">
                                <Mail className="h-4 w-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <Input
                                    type="email"
                                    value={forgotEmail}
                                    onChange={e => setForgotEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="pl-9"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsForgotOpen(false)}
                                    disabled={isForgotLoading}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isForgotLoading}>
                                    {isForgotLoading ? 'Sending…' : 'Send reset link'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
