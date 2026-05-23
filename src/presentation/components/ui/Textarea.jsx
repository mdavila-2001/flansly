import { forwardRef } from 'react';

export const Textarea = forwardRef(
    ({
        label,
        error,
        maxLength,
        className = '',
        disabled = false,
        value,
        ...props
    }, ref) => {
        const charCount = value ? value.length : 0;
        const isNearLimit = maxLength && charCount > maxLength * 0.85;

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-flansly-muted text-sm font-medium font-[var(--font-inter)] tracking-wide">
                        {label}
                    </label>
                )}
                <div className={`
                    relative w-full
                    bg-flansly-card border rounded-xl
                    transition-all duration-200
                    ${error
                        ? 'border-flansly-error/60 shadow-[0_0_8px_rgba(255,180,171,0.15)]'
                        : 'border-flansly-surface hover:border-flansly-flan/40 focus-within:border-flansly-flan focus-within:shadow-[0_0_12px_rgba(253,230,138,0.12)]'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                    <textarea
                        ref={ref}
                        value={value}
                        maxLength={maxLength}
                        disabled={disabled}
                        rows={4}
                        className={`
                            w-full bg-transparent px-4 py-3
                            text-flansly-flan placeholder-flansly-muted
                            outline-none resize-y min-h-[100px]
                            font-[var(--font-inter)]
                            disabled:cursor-not-allowed
                            ${className}
                        `}
                        {...props}
                    />
                </div>
                <div className="flex items-center justify-between">
                    {error && (
                        <span className="text-flansly-error text-xs font-[var(--font-inter)] animate-[slide-in_0.2s_ease]">
                            {error}
                        </span>
                    )}
                    {maxLength && (
                        <span className={`
                            text-xs font-mono ml-auto transition-colors duration-200
                            ${isNearLimit ? 'text-flansly-error' : 'text-flansly-muted'}
                        `}>
                            {charCount}/{maxLength}
                        </span>
                    )}
                </div>
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
