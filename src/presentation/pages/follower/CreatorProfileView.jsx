// src/presentation/pages/follower/CreatorProfileView.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFollower } from '../../../application/hooks/useFollower';
import { useFollowerActions } from '../../../application/hooks/useFollowerActions';
import { PostCard } from '../../components/features/PostCard';
import { LockOverlay } from '../../components/features/LockOverlay';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Star, Target } from 'lucide-react';
import { resolveImageUrl } from '../../../core/utils/image.utils';

export const CreatorProfileView = () => {
    const { id } = useParams();
    const { currentProfile, isLoading, error, fetchProfile, handleToggleFavorite, markAsDonated } = useFollower();
    const { executeDonation, calculateCost, isActionLoading } = useFollowerActions();
    
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
    const [flansQuantity, setFlansQuantity] = useState(1);
    const [donationError, setDonationError] = useState(null);

    const handleConfirmDonate = async () => {
        if (!currentProfile) return;
        setDonationError(null);
        try {
            // DoD #3: Validación defensiva antes de la petición
            const parsedQuantity = Number(flansQuantity);
            if (!flansQuantity || isNaN(parsedQuantity) || parsedQuantity <= 0 || !Number.isInteger(parsedQuantity)) {
                setDonationError('Por favor ingresa un número entero positivo de flanes.');
                return;
            }

            await executeDonation(currentProfile.creator.id, parsedQuantity);
            
            // DoD #2: Mutación Optimista instantánea en el cliente
            markAsDonated();
            setIsDonateModalOpen(false);
        } catch (err) {
            console.error('Error al procesar la donación asíncrona:', err);
            setDonationError(err.message || 'Error al procesar el apoyo.');
        }
    };

    const handleQuantityChange = (e) => {
        setDonationError(null);
        const val = e.target.value;
        if (val === '') {
            setFlansQuantity('');
            return;
        }
        const parsed = Number(val);
        if (isNaN(parsed) || parsed < 1 || !Number.isInteger(parsed)) {
            setDonationError('La cantidad debe ser un número entero positivo.');
        }
        setFlansQuantity(val);
    };

    useEffect(() => {
        fetchProfile(id);
    }, [id, fetchProfile]);

    if (isLoading) {
        return (
            <div className="space-y-6 max-w-[1200px] mx-auto px-4 md:px-0 animate-pulse">
                {/* Banner Skeleton */}
                <div className="w-full h-48 bg-flansly-surface/50 rounded-2xl" />
                <div className="px-8 pb-6 flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 relative z-10 gap-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                        <div className="w-28 h-28 rounded-full bg-flansly-surface border-4 border-flansly-card shadow-lg" />
                        <div className="space-y-2 mb-2">
                            <div className="h-6 bg-flansly-surface/60 rounded w-48" />
                            <div className="h-4 bg-flansly-surface/40 rounded w-32" />
                        </div>
                    </div>
                    <div className="h-10 bg-flansly-surface/60 rounded-xl w-36" />
                </div>
                {/* Support Goal Skeleton */}
                <div className="bg-flansly-surface/30 border border-flansly-surface/20 rounded-2xl p-6 h-28" />
                {/* Posts Skeleton */}
                <div className="space-y-4">
                    <div className="h-6 bg-flansly-surface/50 rounded w-40" />
                    <div className="h-40 bg-flansly-surface/30 rounded-2xl border border-flansly-surface/20" />
                </div>
            </div>
        );
    }

    if (error || !currentProfile) {
        return (
            <div className="max-w-[1200px] mx-auto px-4 md:px-0 py-20 text-center text-flansly-error font-['Inter']">
                ⚠️ {error || 'No se halló el perfil.'}
            </div>
        );
    }

    const { creator, supportGoal, hasDonated, posts } = currentProfile;

    return (
        <div className="space-y-6 max-w-[1200px] mx-auto px-4 md:px-0">
            <div className="bg-flansly-card rounded-2xl border border-flansly-surface/30 overflow-hidden relative shadow-xl">
                <div className="w-full h-48 bg-flansly-surface relative">
                    {creator.bannerImageUrl && <img src={resolveImageUrl(creator.bannerImageUrl)} alt="Banner" className="w-full h-full object-cover" />}
                </div>
                <div className="px-8 pb-6 flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 relative z-10 gap-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                        <img src={resolveImageUrl(creator.profileImageUrl) || '/flansly_logo.png'} alt={creator.displayName} className="w-28 h-28 rounded-full border-4 border-flansly-card object-cover bg-flansly-surface shadow-lg" />
                        <div className="mb-2">
                            <h2 className="text-2xl font-extrabold text-white font-['Manrope'] tracking-tight flex items-center gap-2 justify-center sm:justify-start">
                                {creator.displayName}
                                <button onClick={() => handleToggleFavorite(creator.id)} className="text-flansly-muted hover:text-flansly-flan transition-colors cursor-pointer">
                                    <Star size={20} fill={creator.isFavorite ? "var(--color-flansly-flan)" : "none"} className={creator.isFavorite ? "text-flansly-flan" : ""} />
                                </button>
                            </h2>
                            <p className="text-flansly-muted text-sm font-mono">@{creator.username}</p>
                        </div>
                    </div>
                    {!hasDonated && (
                        <Button variant="primary" className="mb-2" onClick={() => { setDonationError(null); setIsDonateModalOpen(true); }}>
                            🍮 Apoyar con un Flan
                        </Button>
                    )}
                </div>
            </div>

            {supportGoal && (
                <div className="bg-flansly-caramel/10 border border-flansly-caramel/30 rounded-2xl p-6 flex gap-4 shadow-[0_0_20px_rgba(180,83,9,0.03)]">
                    <div className="p-3 bg-flansly-caramel/20 text-flansly-caramel rounded-xl h-fit"><Target size={24} /></div>
                    <div>
                        <h4 className="text-base font-bold text-flansly-flan font-['Manrope']">Meta de Apoyo: {supportGoal.title}</h4>
                        <p className="text-sm text-gray-200 mt-1 font-['Inter'] leading-relaxed">{supportGoal.description}</p>
                    </div>
                </div>
            )}

            <div className="space-y-4 relative">
                <h3 className="text-xl font-bold text-white font-['Manrope'] tracking-tight border-b border-flansly-surface/30 pb-2">Publicaciones Exclusivas</h3>
                
                {hasDonated ? (
                    posts.length === 0 ? (
                        <p className="text-flansly-muted text-sm text-center py-10 font-mono">Este creador no ha subido ingredientes culinarios aún.</p>
                    ) : (
                        posts.map(post => <PostCard key={post.id} post={{ ...post, creator }} />)
                    )
                ) : (
                    <div className="relative min-h-100 w-full">
                        <div className="space-y-4 opacity-10 pointer-events-none select-none blur-sm">
                            <div className="w-full h-40 bg-flansly-card rounded-2xl border border-flansly-surface" />
                            <div className="w-full h-60 bg-flansly-card rounded-2xl border border-flansly-surface" />
                        </div>
                        <LockOverlay onOpenDonateModal={() => { setDonationError(null); setIsDonateModalOpen(true); }} />
                    </div>
                )}
            </div>

            {/* Modal de Simulación de Donación (US5) */}
            <Modal isOpen={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} title={`Invitar Flanes a ${creator.displayName}`}>
                <div className="space-y-5">
                    <Input 
                        label="Cantidad de Flanes a enviar" 
                        type="number" 
                        min={1} 
                        value={flansQuantity} 
                        onChange={handleQuantityChange}
                        error={donationError}
                    />
                    
                    {/* DoD #1: Cálculo matemático financiero monoespaciado en modal */}
                    <div className="bg-flansly-dark border border-flansly-surface/40 rounded-xl p-4 flex justify-between items-center font-mono">
                        <span className="text-xs text-flansly-muted uppercase tracking-wider">Total Equivalente:</span>
                        <span className="text-xl font-bold text-flansly-flan">Bs. {calculateCost(flansQuantity).toFixed(2)}</span>
                    </div>

                    <div className="flex gap-3 justify-end mt-4">
                        <Button variant="secondary" onClick={() => setIsDonateModalOpen(false)}>Cancelar</Button>
                        <Button 
                            variant="primary" 
                            onClick={handleConfirmDonate} 
                            disabled={isActionLoading || !!donationError || flansQuantity === ''}
                        >
                            {isActionLoading ? 'Procesando...' : 'Confirmar Apoyo'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CreatorProfileView;