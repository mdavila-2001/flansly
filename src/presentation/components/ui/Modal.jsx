import { X } from 'lucide-react';

export const Modal = ({
    isOpen,
    onClose,
    title,
    children
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div 
                className="absolute inset-0 bg-[#121212]/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-[#1E1E1E] w-full max-w-lg rounded-2xl shadow-[0_0_40px_rgba(180,83,9,0.08)] border border-[#2A2A2A] overflow-hidden transform transition-all">
                <div className="flex justify-between items-center p-6 border-b border-[#2A2A2A]">
                    <h3 className="text-2xl font-bold text-[#F9F9F9] font-['Manrope'] tracking-tight">
                        {title}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="text-[#A0A0A0] hover:text-[#FDE68A] transition-colors p-2 rounded-full hover:bg-[#2A2A2A]"
                    >
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};