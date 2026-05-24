// src/presentation/pages/follower/CreatorProfileView.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFollower } from '../../../application/hooks/useFollower';
import { PostCard } from '../../components/features/PostCard';
import { LockOverlay } from '../../components/features/LockOverlay';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Star, Target } from 'lucide-react';

export const CreatorProfileView = () => {
    const { id } = useParams();
    const { currentProfile, isLoading, error, fetchProfile, handleToggleFavorite } = useFollower();
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
    const [flansQuantity, setFlansQuantity] = useState(1);

    useEffect(() => {
        fetchProfile(id);
    }, [id, fetchProfile]);

    if (isLoading) return <div className="text-center py-20 text-flansly-flan font-mono animate-pulse">Abriendo compuertas del perfil...</div>;
    if (error || !currentProfile) return <div className="text-center py-20 text-flansly-error font-['Inter']">⚠️ {error || 'No se halló el perfil.'}</div>;

    const { creator, supportGoal, hasDonated, posts } = currentProfile;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-flansly-card rounded-2xl border border-flansly-surface/30 overflow-hidden relative shadow-xl">
                <div className="w-full h-48 bg-flansly-surface relative">
                    {creator.bannerImageUrl && <img src={creator.bannerImageUrl} alt="Banner" className="w-full h-full object-cover" />}
                </div>
                <div className="px-8 pb-6 flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 relative z-10 gap-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                        <img src={creator.profileImageUrl || '/flansly_logo.png'} alt={creator.displayName} className="w-28 h-28 rounded-full border-4 border-flansly-card object-cover bg-flansly-surface shadow-lg" />
                        <div className="mb-2">
                            <h2 className="text-2xl font-extrabold text-[#F9F9F9] font-['Manrope'] tracking-tight flex items-center gap-2 justify-center sm:justify-start">
                                {creator.displayName}
                                <button onClick={() => handleToggleFavorite(creator.id)} className="text-flansly-muted hover:text-flansly-flan transition-colors cursor-pointer">
                                    <Star size={20} fill={creator.isFavorite ? "#FDE68A" : "none"} className={creator.isFavorite ? "text-flansly-flan" : ""} />
                                </button>
                            </h2>
                            <p className="text-flansly-muted text-sm font-mono">@{creator.username}</p>
                        </div>
                    </div>
                    {!hasDonated && (
                        <Button variant="primary" className="mb-2" onClick={() => setIsDonateModalOpen(true)}>
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
                        <p className="text-sm text-[#E5E2E1] mt-1 font-['Inter'] leading-relaxed">{supportGoal.description}</p>
                    </div>
                </div>
            )}

            <div className="space-y-4 relative">
                <h3 className="text-xl font-bold text-[#F9F9F9] font-['Manrope'] tracking-tight border-b border-flansly-surface/30 pb-2">Publicaciones Exclusivas</h3>
                
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
                        <LockOverlay onOpenDonateModal={() => setIsDonateModalOpen(true)} />
                    </div>
                )}
            </div>

            {/* Modal de Simulación de Donación (US5 Cimiento) */}
            <Modal isOpen={isDonateModalOpen} onClose={() => setIsDonateModalOpen(false)} title={`Invitar Flanes a ${creator.displayName}`}>
                <div className="space-y-5">
                    <Input label="Cantidad de Flanes a enviar" type="number" min={1} max={50} value={flansQuantity} onChange={(e) => setFlansQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                    <div className="bg-flansly-dark border border-flansly-surface/40 rounded-xl p-4 flex justify-between items-center font-['JetBrains_Mono']">
                        <span className="text-xs text-flansly-muted uppercase tracking-wider">Total Equivalente:</span>
                        <span className="text-xl font-bold text-flansly-flan">Bs. {(flansQuantity * 10).toFixed(2)}</span>
                    </div>
                    <div className="flex gap-3 justify-end mt-4">
                        <Button variant="secondary" onClick={() => setIsDonateModalOpen(false)}>Cancelar</Button>
                        <Button variant="primary" onClick={() => { alert('Inyectando donación simbólica al backend...'); setIsDonateModalOpen(false); }}>Confirmar Apoyo</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};