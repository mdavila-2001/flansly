import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = forwardRef(
    ({
        label,
        error,
        options = [],
        placeholder = 'Seleccionar...',
        className = '',
        disabled = false,
        ...props
    }, ref) => {
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
                    <select
                        ref={ref}
                        disabled={disabled}
                        className={`
                            w-full bg-transparent px-4 py-3 min-h-12
                            text-flansly-flan
                            outline-none appearance-none
                            font-[var(--font-inter)]
                            cursor-pointer
                            disabled:cursor-not-allowed
                            pr-10
                            ${className}
                        `}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled className="bg-flansly-card text-flansly-muted">
                                {placeholder}
                            </option>
                        )}
                        {options.map((opt) => (
                            <option
                                key={opt.value}
                                value={opt.value}
                                className="bg-flansly-card text-flansly-flan"
                            >
                                {opt.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        size={18}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-flansly-muted pointer-events-none"
                    />
                </div>
                {error && (
                    <span className="text-flansly-error text-xs font-[var(--font-inter)] animate-[slide-in_0.2s_ease]">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
