import { forwardRef } from 'react';

export const Switch = forwardRef(
    ({
        label,
        error,
        checked = false,
        onChange,
        disabled = false,
        className = '',
        ...props
    }, ref) => {
        return (
            <div className={`flex flex-col gap-1.5 ${className}`}>
                <label className={`
                    inline-flex items-center gap-3 cursor-pointer select-none
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                    <div className="relative shrink-0">
                        <input
                            ref={ref}
                            type="checkbox"
                            role="switch"
                            checked={checked}
                            onChange={onChange}
                            disabled={disabled}
                            className="sr-only"
                            {...props}
                        />
                        <div className={`
                            w-11 h-6 rounded-full transition-all duration-300 ease-in-out
                            ${checked
                                ? 'bg-flansly-caramel shadow-[0_0_14px_rgba(180,83,9,0.35)]'
                                : 'bg-flansly-surface'
                            }
                        `}>
                            <div className={`
                                absolute top-0.5 w-5 h-5 rounded-full
                                transition-all duration-300 ease-in-out
                                shadow-md
                                ${checked
                                    ? 'left-5.5 bg-flansly-flan scale-110'
                                    : 'left-0.5 bg-flansly-muted scale-100'
                                }
                            `} />
                        </div>
                    </div>
                    {label && (
                        <span className="text-flansly-flan/90 text-sm font(--font-inter)">
                            {label}
                        </span>
                    )}
                </label>
                {error && (
                    <span className="text-flansly-error text-xs font(--font-inter) animate-[slide-in_0.2s_ease]">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Switch.displayName = 'Switch';
