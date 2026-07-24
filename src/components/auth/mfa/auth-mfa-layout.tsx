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

interface AuthMfaLayoutProps {
    componentProps: React.ReactNode;

}

export function AuthMfaLayout({
    componentProps
}: AuthMfaLayoutProps) {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-10 md:pt-12 font-['Inter']">
            <div className='absolute top-0 left-0 w-full h-full z-0'>
                <Image
                    src="/auth/auth-background-image.png"
                    alt="Background Image"
                    // width={26}
                    // height={43}
                    // style={{ width: 'auto', height: 'auto' }}
                    // className='h-auto w-auto mr-2'
                    fill
                    priority
                />
            </div>

            <div className='flex mb-6 z-10'>
                <Image
                    src="/assets/logo.svg"
                    alt="Logo"
                    width={26}
                    height={43}
                    // style={{ width: 'auto', height: 'auto' }}
                    className='h-auto w-auto mr-2'
                />
                <Image
                    src="/assets/logo-text.svg"
                    alt="Logo"
                    width={162}
                    height={23}
                    style={{ width: 'auto', height: 'auto' }}
                />
            </div>
            <div className="w-[95%] md:w-[450px] px-4 py-2 text-slate-900 border border-slate-200 rounded-2xl z-10 bg-white">
                <div className="px-6 py-4 flex flex-col items-center justify-center h-full text-slate-900">
                    <div className="w-full max-w-lg">
                        <div className="flex mx-auto justify-center items-center h-[102px] w-[102px] rounded-full bg-gradient-to-b from-[#717784]/20 via-[#717784]/5 to-transparent mb-2">
                            <div className="flex items-center justify-center h-[75px] w-[75px] rounded-full border-2 bg-white border-gray-200">
                                <Image src="/auth/mfa-icon.svg" alt="Login Icon" width={35} height={35} style={{ width: 'auto', height: 'auto' }} />
                            </div>
                        </div>

                        {componentProps}
                    </div>
                </div>
            </div>
        </div>

    );
}
