import Image from 'next/image';
import type React from 'react';

interface AuthLayoutProps {
    formProps: React.ReactNode;
}

export function AuthLayout({ formProps }: AuthLayoutProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen pt-20 md:pt-0 font-['Inter']">
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

            <div className='flex mb-8 z-10'>
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
            <div className="w-[95%] md:w-[450px] px-4 py-6 text-slate-900 border border-slate-200 rounded-2xl z-10 bg-white">{formProps}</div>
        </div>
    );
}
