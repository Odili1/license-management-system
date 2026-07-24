import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/src/lib/utils';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95 active:opacity-90',
    {
        variants: {
            variant: {
                default: 'bg-[#232856] text-white hover:bg-[#2c3361] active:bg-[#1a1f3f]',
                secondary: 'bg-[#2F3261B2] text-white hover:bg-[#4c5080] active:bg-[#1a1f3f]',
                destructive:
                    'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80',
                outline:
                    'border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground active:bg-accent/80',
                link: 'text-primary underline-offset-4 hover:underline active:opacity-80',
                action: 'bg-[#232952] text-white hover:bg-[#2c3361] w-full py-6 active:bg-[#1a1f3f]',
                // Dark mode variants
                'default-dark': 'bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-800',
                'secondary-dark': 'bg-slate-800/70 text-white hover:bg-slate-700 active:bg-slate-900',
                'destructive-dark': 'bg-red-700 text-white hover:bg-red-600 active:bg-red-800',
                'outline-dark':
                    'border border-slate-600 bg-transparent text-white hover:bg-slate-800 hover:text-white active:bg-slate-900',
                'ghost-dark': 'text-white hover:bg-slate-800 hover:text-white active:bg-slate-900',
                'link-dark':
                    'text-blue-400 underline-offset-4 hover:underline hover:text-blue-300 active:opacity-80',
                'action-dark': 'bg-slate-800 text-white hover:bg-slate-700 w-full py-6 active:bg-slate-900',
            },
            size: {
                default: 'h-[51px] min-w-[173px] px-4 py-2',
                sm: 'h-[58px]  min-w-[76px] rounded-md px-3',
                lg: 'h-[58px] min-w-[523px] rounded-md px-8',
                icon: 'h-[51px] min-w-[173px]',
                custom: 'h-[34px] px-4 py-2',
            },
            hasIcon: {
                true: 'gap-2',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    darkMode?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'default',
            size,
            hasIcon,
            asChild = false,
            icon,
            iconPosition = 'right',
            darkMode = false,
            children,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'button';

        // Apply dark mode variant if darkMode is true
        const resolvedVariant =
            darkMode && typeof variant === 'string' && !variant.includes('-dark')
                ? (`${variant}-dark` as typeof variant)
                : variant;

        return (
            <Comp
                className={cn(
                    buttonVariants({
                        variant: resolvedVariant,
                        size,
                        hasIcon,
                        className,
                    }),
                )}
                ref={ref}
                {...props}
            >
                {iconPosition === 'left' && icon}
                {children}
                {iconPosition === 'right' && icon}
            </Comp>
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
