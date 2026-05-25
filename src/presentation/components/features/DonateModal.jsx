import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { SUPPORT_TYPES } from '../../../core/constants/support.constants';

/**
 * Componente DonateModal que encapsula la simulación de donaciones de flanes.
 * Aíslan el estado local de cantidad del resto del perfil general (SRP).
 */
export const DonateModal = ({ isOpen, onClose, creator, onDonate, isLoading }) => {
    const [flansQuantity, setFlansQuantity] = useState(1);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        try {
            await onDonate(flansQuantity);
        } catch (err) {
            console.error('Error en DonateModal al procesar envío:', err);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Invitar Flanes a ${creator?.displayName || 'Creador'}`}>
            <form onSubmit={handleSubmit} className="space-y-5">
                <Input 
                    label="Cantidad de Flanes a enviar" 
                    type="number" 
                    min={1} 
                    max={50} 
                    value={flansQuantity} 
                    onChange={(e) => setFlansQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    disabled={isLoading}
                />
                <div className="bg-flansly-dark border border-flansly-surface/40 rounded-xl p-4 flex justify-between items-center font-['JetBrains_Mono']">
                    <span className="text-xs text-flansly-muted uppercase tracking-wider">Total Equivalente:</span>
                    <span className="text-xl font-bold text-flansly-flan font-mono">Bs. {(flansQuantity * SUPPORT_TYPES.FLAN.priceBs).toFixed(2)}</span>
                </div>
                <div className="flex gap-3 justify-end mt-4">
                    <Button variant="secondary" type="button" onClick={onClose} disabled={isLoading}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Enviando...' : 'Confirmar Apoyo'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

DonateModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    creator: PropTypes.shape({
        displayName: PropTypes.string
    }),
    onDonate: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};
