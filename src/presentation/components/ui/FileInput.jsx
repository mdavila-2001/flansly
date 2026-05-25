import { forwardRef, useState, useCallback, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

export const FileInput = forwardRef(
    ({
        label,
        error,
        accept,
        multiple = false,
        disabled = false,
        className = '',
        onChange,
        ...props
    }, ref) => {
        const [files, setFiles] = useState([]);
        const [isDragOver, setIsDragOver] = useState(false);

        const formatSize = (bytes) => {
            if (bytes < 1024) return `${bytes} B`;
            if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
            return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
        };

        const handleFiles = useCallback((fileList) => {
            const arr = Array.from(fileList);
            setFiles(arr);
            if (onChange) {
                onChange({ target: { files: fileList } });
            }
        }, [onChange]);

        const handleDrop = useCallback((e) => {
            e.preventDefault();
            setIsDragOver(false);
            if (!disabled && e.dataTransfer.files.length) {
                handleFiles(e.dataTransfer.files);
            }
        }, [disabled, handleFiles]);

        const handleDragOver = useCallback((e) => {
            e.preventDefault();
            if (!disabled) setIsDragOver(true);
        }, [disabled]);

        const handleDragLeave = useCallback(() => {
            setIsDragOver(false);
        }, []);

        const localRef = useRef(null);
        const inputRef = ref || localRef;

        const handleClick = useCallback(() => {
            if (!disabled && inputRef.current) {
                inputRef.current.click();
            }
        }, [disabled, inputRef]);

        const handleInputChange = useCallback((e) => {
            handleFiles(e.target.files);
        }, [handleFiles]);

        const removeFile = useCallback((index) => {
            setFiles(prev => prev.filter((_, i) => i !== index));
        }, []);

        return (
            <div className={`flex flex-col gap-1.5 w-full ${className}`}>
                {label && (
                    <label className="text-flansly-muted text-sm font(inter) tracking-wide">
                        {label}
                    </label>
                )}
                <div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
                        relative w-full min-h-35 rounded-xl border-2 border-dashed
                        flex flex-col items-center justify-center gap-3 p-6
                        cursor-pointer transition-all duration-300
                        ${isDragOver
                            ? 'border-flansly-flan bg-flansly-flan/5 shadow-[0_0_20px_rgba(253,230,138,0.1)]'
                            : error
                                ? 'border-flansly-error/40 bg-flansly-card hover:border-flansly-error/60'
                                : 'border-flansly-surface bg-flansly-card hover:border-flansly-flan/40 hover:bg-flansly-surface/20'
                        }
                        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        accept={accept}
                        multiple={multiple}
                        disabled={disabled}
                        onChange={handleInputChange}
                        onClick={(e) => e.stopPropagation()}
                        className="hidden"
                        {...props}
                    />
                    <div className={`
                        p-3 rounded-full transition-all duration-300
                        ${isDragOver
                            ? 'bg-flansly-flan/15 text-flansly-flan scale-110'
                            : 'bg-flansly-surface/50 text-flansly-muted'
                        }
                    `}>
                        <Upload size={24} />
                    </div>
                    <div className="text-center">
                        <p className="text-flansly-flan/80 text-sm font-medium">
                            {isDragOver ? 'Soltar archivos aquí' : 'Arrastra archivos o haz clic'}
                        </p>
                        {accept && (
                            <p className="text-flansly-muted text-xs mt-1">
                                Formatos: {accept}
                            </p>
                        )}
                    </div>
                </div>

                {/* Lista de archivos */}
                {files.length > 0 && (
                    <div className="flex flex-col gap-2 mt-1">
                        {files.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="flex items-center gap-3 bg-flansly-surface/30 rounded-lg px-3 py-2 animate-[slide-in_0.2s_ease]"
                            >
                                <File size={16} className="text-flansly-caramel shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-flansly-flan text-xs truncate">{file.name}</p>
                                    <p className="text-flansly-muted text-[10px]">{formatSize(file.size)}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                                    className="text-flansly-muted hover:text-flansly-error transition-colors p-1 rounded hover:bg-flansly-surface/50"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <span className="text-flansly-error text-xs font(inter) animate-[slide-in_0.2s_ease]">
                        {error}
                    </span>
                )}
            </div>
        );
    }
);

FileInput.displayName = 'FileInput';
