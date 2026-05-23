import { forwardRef } from 'react';

export const Radio = forwardRef(
    ({
        label,
        error,
        options = [],
        name,
        value,
        onChange,
        disabled = false,
        direction = 'vertical',
        className = '',
        ...props
    }, ref) => {
        return (
            <div className={`flex flex-col gap-1.5 ${className}`}>
                {label && (
                    <span className="text-flansly-muted text-sm font-medium font(--font-inter) tracking-wide">
                        {label}
                    </span>
                )}
                <div className={`
                    flex gap-3
                    ${direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'}
                `}>
                    {options.map((opt) => {
                        const isChecked = value === opt.value;
                        return (
                            <label
                                key={opt.value}
                                className={`
                                    inline-flex items-center gap-3 cursor-pointer select-none
                                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                <div className="relative shrink-0">
                                    <input
                                        ref={isChecked ? ref : undefined}
                                        type="radio"
                                        name={name}
                                        value={opt.value}
                                        checked={isChecked}
                                        onChange={onChange}
                                        disabled={disabled}
                                        className="sr-only"
                                        {...props}
                                    />
                                    <div className={`
                                        w-5 h-5 rounded-full border-2 transition-all duration-200
                                        flex items-center justify-center
                                        ${isChecked
                                            ? 'border-flansly-caramel shadow-[0_0_10px_rgba(180,83,9,0.3)]'
                                            : 'border-flansly-surface hover:border-flansly-flan/50'
                                        }
                                        ${error ? 'border-flansly-error/60' : ''}
                                    `}>
                                        {isChecked && (
                                            <div
                                                className="w-2.5 h-2.5 rounded-full bg-flansly-caramel"
                                                style={{ animation: 'radio-fill 0.3s ease forwards' }}
                                            />
                                        )}
                                    </div>
                                </div>
                                <span className="text-flansly-flan/90 text-sm font(--font-inter)">
                                    {opt.label}
                                </span>
                            </label>
                        );
                    })}
                </div>
                {error && (
                    <span className="text-flansly-error text-xs font(--font-inter) animate-[slide-in_0.2s_ease]">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

Radio.displayName = 'Radio';
