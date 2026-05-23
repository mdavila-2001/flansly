import { forwardRef } from 'react';

export const Slider = forwardRef(
    ({
        label,
        error,
        min = 0,
        max = 100,
        step = 1,
        value,
        showValue = true,
        unit = '',
        className = '',
        disabled = false,
        ...props
    }, ref) => {
        return (
            <div className={`flex flex-col gap-1.5 w-full ${className}`}>
                {(label || showValue) && (
                    <div className="flex items-center justify-between">
                        {label && (
                            <label className="text-flansly-muted text-sm font-medium font(--font-inter) tracking-wide">
                                {label}
                            </label>
                        )}
                        {showValue && (
                            <span className="text-flansly-flan text-sm font-mono font-bold tabular-nums bg-flansly-surface/60 px-2.5 py-0.5 rounded-lg">
                                {value}{unit}
                            </span>
                        )}
                    </div>
                )}
                <div className={`
                    w-full py-2
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                    <input
                        ref={ref}
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        disabled={disabled}
                        className="w-full"
                        {...props}
                    />
                </div>
                <div className="flex justify-between text-[10px] text-flansly-muted font-mono">
                    <span>{min}{unit}</span>
                    <span>{max}{unit}</span>
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

Slider.displayName = 'Slider';
