import PropTypes from 'prop-types';
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
                className="absolute inset-0 bg-flansly-dark/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-flansly-card w-full max-w-lg rounded-2xl shadow-[0_0_40px_rgba(180,83,9,0.08)] border border-flansly-surface overflow-hidden transform transition-all">
                <div className="flex justify-between items-center p-6 border-b border-flansly-surface">
                    <h3 className="text-2xl font-bold text-flansly-flan tracking-tight">
                        {title}
                    </h3>
                    <button 
                        onClick={onClose}
                        className="text-flansly-muted hover:text-flansly-flan transition-colors p-2 rounded-full hover:bg-flansly-surface"
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

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,        
    onClose: PropTypes.func.isRequired,       
    title: PropTypes.string.isRequired,       
    children: PropTypes.node.isRequired       
};