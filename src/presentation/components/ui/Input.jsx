import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export const Input = forwardRef(
    ({
        label,
        error,
        className = '',
        type = 'text',
        startIcon: StartIcon,
        endIcon: EndIcon,
        disabled = false,
        ...props
    }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const isColor = type === 'color';
        const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-flansly-muted text-sm font-medium font-[var(--font-inter)] tracking-wide">
                        {label}
                    </label>
                )}
                <div className={`
                    relative flex items-center w-full
                    bg-flansly-card border rounded-xl
                    transition-all duration-200
                    ${error
                        ? 'border-flansly-error/60 shadow-[0_0_8px_rgba(255,180,171,0.15)]'
                        : 'border-flansly-surface hover:border-flansly-flan/40 focus-within:border-flansly-flan focus-within:shadow-[0_0_12px_rgba(253,230,138,0.12)]'
                    }
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                `}>
                    {StartIcon && (
                        <span className="pl-4 text-flansly-muted flex-shrink-0">
                            <StartIcon size={18} />
                        </span>
                    )}
                    {isColor ? (
                        <div className="flex items-center gap-3 w-full px-4 py-3 min-h-12">
                            <input
                                ref={ref}
                                type="color"
                                disabled={disabled}
                                className={`w-10 h-10 rounded-lg cursor-pointer flex-shrink-0 ${className}`}
                                {...props}
                            />
                            <span className="text-flansly-flan text-sm font-mono uppercase">
                                {props.value || '#000000'}
                            </span>
                        </div>
                    ) : (
                        <input
                            ref={ref}
                            type={resolvedType}
                            disabled={disabled}
                            className={`
                                w-full bg-transparent px-4 py-3 min-h-12
                                text-flansly-flan placeholder-flansly-muted
                                outline-none transition-colors
                                font-[var(--font-inter)]
                                disabled:cursor-not-allowed
                                ${StartIcon ? 'pl-2' : ''}
                                ${(isPassword || EndIcon) ? 'pr-12' : ''}
                                ${className}
                            `}
                            {...props}
                        />
                    )}
                    {isPassword && (
                        <button
                            type="button"
                            tabIndex={-1}
                            onClick={() => setShowPassword(v => !v)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-flansly-muted hover:text-flansly-flan transition-colors p-1 rounded-lg hover:bg-flansly-surface/50"
                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                            {showPassword
                                ? <EyeOff size={18} className="transition-transform duration-200" />
                                : <Eye size={18} className="transition-transform duration-200" />
                            }
                        </button>
                    )}
                    {EndIcon && !isPassword && (
                        <span className="pr-4 text-flansly-muted flex-shrink-0">
                            <EndIcon size={18} />
                        </span>
                    )}
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

Input.displayName = 'Input';