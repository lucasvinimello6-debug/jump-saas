import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, type, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                {label && (
                    <label className="text-[12px] text-apple-gray-600 dark:text-apple-gray-500 uppercase tracking-wide font-medium">
                        {label}
                    </label>
                )}
                <input
                    type={type}
                    className={cn(
                        'w-full px-4 py-3 rounded-[14px] text-[17px]',
                        'bg-apple-gray-100 dark:bg-white/5',
                        'border border-apple-gray-200 dark:border-white/10',
                        'text-black dark:text-white',
                        'placeholder:text-apple-gray-500',
                        'focus:outline-none focus:ring-2 focus:ring-apple-blue-light dark:focus:ring-apple-blue-dark',
                        'transition-all',
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';
