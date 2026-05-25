import { forwardRef } from 'react';
import { Check } from 'lucide-react';

export const Checkbox = forwardRef(
    ({
        label,
        error,
        className = '',
        disabled = false,
        checked = false,
        onChange,
        ...props
    }, ref) => {
        return (
            <div className="flex flex-col gap-1.5">
                <label className={`
                    inline-flex items-center gap-3 cursor-pointer select-none
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                    <div className="relative shrink-0">
                        <input
                            ref={ref}
                            type="checkbox"
                            checked={checked}
                            onChange={onChange}
                            disabled={disabled}
                            className="sr-only peer"
                            {...props}
                        />
                        <div className={`
                            w-5 h-5 rounded-md border-2 transition-all duration-200
                            flex items-center justify-center
                            ${checked
                                ? 'bg-flansly-caramel border-flansly-caramel shadow-[0_0_10px_rgba(180,83,9,0.3)]'
                                : 'bg-transparent border-flansly-surface hover:border-flansly-flan/50'
                            }
                            ${error ? 'border-flansly-error/60' : ''}
                            ${className}
                        `}>
                            {checked && (
                                <Check
                                    size={14}
                                    strokeWidth={3}
                                    className="text-flansly-flan"
                                    style={{ animation: 'checkmark-pop 0.3s ease forwards' }}
                                />
                            )}
                        </div>
                    </div>
                    {label && (
                        <span className="text-flansly-flan/90 text-sm font(--font-inter)">
                            {label}
                        </span>
                    )}
                </label>
                {error && (
                    <span className="text-flansly-error text-xs font(--font-inter) ml-8 animate-[slide-in_0.2s_ease]">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
