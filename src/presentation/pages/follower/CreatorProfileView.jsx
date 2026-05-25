// src/presentation/pages/follower/CreatorProfileView.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFollower } from '../../../application/hooks/useFollower';
import { useFollowerActions } from '../../../application/hooks/useFollowerActions';
import { DonateModal } from '../../components/features/DonateModal';
import { LockOverlay } from '../../components/features/LockOverlay';
import { PostInteractionCard } from '../../components/features/PostInteractionCard';
import { Button } from '../../components/ui/Button';
import { Star, Target } from 'lucide-react';
import { resolveImageUrl } from '../../../core/utils/image.utils';

export const CreatorProfileView = () => {
    const { id } = useParams();
    
    // Estado local para controlar el modal de donación (SRP)
    const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
    
    // Capa de Aplicación - Módulo Follower
    const { 
        currentProfile, 
        isLoading, 
        error, 
        fetchProfile, 
        handleToggleFavorite,
        handleDonate
    } = useFollower();

    // Capa de Aplicación - Módulo FollowerActions (Comentarios)
    const { executeComment, isActionLoading } = useFollowerActions();

    useEffect(() => {
        fetchProfile(id);
    }, [id, fetchProfile]);

    // Envío del apoyo financiero al backend
    const handleDonateSubmit = async (quantity) => {
        try {
            console.log("🍮 ENVIANDO DONACIÓN AL HORNO:", { creatorId: id, quantity });
            await handleDonate(id, quantity);
            console.log("✅ DONACIÓN EXITOSA. REFRESCANDO MURO...");
            await fetchProfile(id); 
            setIsDonateModalOpen(false);
        } catch (err) {
            console.error("❌ ERROR EN PASARELA DE FLANES:", err);
            alert(`Error al procesar los flanes: ${err.response?.data?.message || err.message || 'Error interno del servidor'}`);
        }
    };


    // Envío de comentarios privados a las publicaciones exclusivas
    const handleCommentSubmit = async (postId, content) => {
        try {
            console.log("💬 PUBLICANDO COMENTARIO PRIVADO EN POST:", postId);
            await executeComment(postId, content);
            console.log("✅ COMENTARIO PUBLICADO CON ÉXITO. REFRESCANDO...");
            await fetchProfile(id); // Recargar perfil para inyectar en caliente
        } catch (err) {
            console.error("❌ ERROR AL PUBLICAR COMENTARIO PRIVADO:", err);
            alert(`Error al comentar: ${err.message}`);
        }
    };

    if (isLoading) return <div className="text-center py-20 text-flansly-flan font-mono animate-pulse">Abriendo compuertas del perfil...</div>;
    if (error || !currentProfile) return <div className="text-center py-20 text-flansly-error font-['Inter']">⚠️ {error || 'No se halló el perfil.'}</div>;

    const { creator, supportGoal, hasDonated, posts } = currentProfile;

    const renderExclusiveContent = () => {
        if (!hasDonated) {
            return (
                <div className="relative min-h-100 w-full">
                    <div className="space-y-4 opacity-10 pointer-events-none select-none blur-sm">
                        <div className="w-full h-40 bg-flansly-card rounded-2xl border border-flansly-surface" />
                        <div className="w-full h-60 bg-flansly-card rounded-2xl border border-flansly-surface" />
                    </div>
                    <LockOverlay onOpenDonateModal={() => setIsDonateModalOpen(true)} />
                </div>
            );
        }

        if (posts.length === 0) {
            return (
                <p className="text-flansly-muted text-sm text-center py-10 font-mono">
                    Este creador no ha subido ingredientes culinarios aún.
                </p>
            );
        }

        return (
            <div className="space-y-6">
                {posts.map(post => (
                    <PostInteractionCard 
                        key={post.id} 
                        post={post} 
                        creator={creator} 
                        onCommentSubmit={handleCommentSubmit} 
                        isActionLoading={isActionLoading} 
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-flansly-card rounded-2xl border border-flansly-surface/30 overflow-hidden relative shadow-xl">
                <div className="w-full h-48 bg-flansly-surface relative">
                    {creator.bannerImageUrl && <img src={resolveImageUrl(creator.bannerImageUrl)} alt="Banner" className="w-full h-full object-cover" />}
                </div>
                <div className="px-8 pb-6 flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 relative z-10 gap-4">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                        <img src={resolveImageUrl(creator.profileImageUrl) || '/flansly_logo.png'} alt={creator.displayName} className="w-28 h-28 rounded-full border-4 border-flansly-card object-cover bg-flansly-surface shadow-lg" />
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
                    <Button variant="primary" className="mb-2" onClick={() => setIsDonateModalOpen(true)}>
                        {hasDonated ? '🍮 Enviar más Flanes' : '🍮 Apoyar con un Flan'}
                    </Button>
                </div>
            </div>
            {supportGoal && (
                <div className="bg-flansly-caramel/10 border border-flansly-caramel/30 rounded-2xl p-6 flex gap-4 shadow-[0_0_20px_rgba(180,83,9,0.03)]">
                    <div className="p-3 bg-flansly-caramel/20 text-flansly-caramel rounded-xl h-fit shrink-0"><Target size={24} /></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <h4 className="text-base font-bold text-flansly-flan font-['Manrope']">Meta de Apoyo: {supportGoal.title}</h4>
                            <span className="font-mono text-xs text-flansly-flan shrink-0">
                                🍮 {supportGoal.currentFlans || 0} / {supportGoal.targetFlans || 0} Flanes
                            </span>
                        </div>
                        <p className="text-sm text-[#E5E2E1] mt-1 font-['Inter'] leading-relaxed">{supportGoal.description}</p>
                        
                        {supportGoal.targetFlans > 0 && (
                            <div className="mt-4 space-y-1.5">
                                <div className="w-full bg-flansly-dark h-2 rounded-full overflow-hidden">
                                    <div 
                                        className="bg-flansly-flan h-full rounded-full transition-all duration-500 ease-out" 
                                        style={{ width: `${Math.min(100, ((supportGoal.currentFlans || 0) / supportGoal.targetFlans) * 100)}%` }} 
                                    />
                                </div>
                                <div className="flex justify-end text-[10px] font-mono text-flansly-muted">
                                    {Math.round(Math.min(100, ((supportGoal.currentFlans || 0) / supportGoal.targetFlans) * 100))}% completado
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-4 relative">
                <h3 className="text-xl font-bold text-[#F9F9F9] font-['Manrope'] tracking-tight border-b border-flansly-surface/30 pb-2">Publicaciones Exclusivas</h3>
                
                {renderExclusiveContent()}
            </div>

            <DonateModal 
                isOpen={isDonateModalOpen} 
                onClose={() => setIsDonateModalOpen(false)} 
                creator={creator} 
                onDonate={handleDonateSubmit} 
                isLoading={isLoading} 
            />
        </div>
    );
};

export default CreatorProfileView;