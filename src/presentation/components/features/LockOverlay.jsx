import { Lock } from 'lucide-react';
import PropTypes from 'prop-types';
import { Button } from '../ui/Button';

export const LockOverlay = ({ onOpenDonateModal }) => {
    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-flansly-dark/40 backdrop-blur-md rounded-2xl p-6 text-center border border-flansly-surface/30">
            <div className="w-16 h-16 rounded-full bg-flansly-surface/80 flex items-center justify-center text-flansly-flan shadow-[0_0_30px_rgba(253,230,138,0.15)] mb-4 animate-pulse">
                <Lock size={28} />
            </div>
            <h4 className="text-xl font-bold text-[#F9F9F9] font-['Manrope'] tracking-tight">
                Contenido Exclusivo Bloqueado
            </h4>
            <p className="text-flansly-muted text-sm max-w-xs mt-2 font-['Inter']">
                Apoya a este creador comprándole un flan para desbloquear el acceso inmediato a todo su muro.
            </p>
            <Button 
                variant="primary" 
                className="mt-5" 
                onClick={onOpenDonateModal}
            >
                🍮 Invitar un Flan
            </Button>
        </div>
    );
};

LockOverlay.propTypes = {
    onOpenDonateModal: PropTypes.func.isRequired
};