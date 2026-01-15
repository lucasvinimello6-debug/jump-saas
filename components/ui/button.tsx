import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
        const baseStyles = 'font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';

        const variants = {
            primary: 'bg-apple-blue-light dark:bg-apple-blue-dark text-white shadow-lg shadow-blue-500/30',
            secondary: 'bg-white dark:bg-apple-background-elevated text-black dark:text-white border border-apple-gray-200 dark:border-white/5',
            ghost: 'text-apple-blue-light dark:text-apple-blue-dark hover:bg-apple-gray-100 dark:hover:bg-white/5',
        };

        const sizes = {
            sm: 'px-4 py-2 text-[15px] rounded-[14px]',
            md: 'px-6 py-3 text-[17px] rounded-[18px]',
            lg: 'px-8 py-4 text-[17px] rounded-apple',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
