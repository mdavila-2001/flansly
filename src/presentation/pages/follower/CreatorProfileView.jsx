// src/presentation/pages/follower/CreatorProfileView.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFollower } from '../../../application/hooks/useFollower';
import { useFollowerActions } from '../../../application/hooks/useFollowerActions';
import { PostCard } from '../../components/features/PostCard';
import { DonateModal } from '../../components/features/DonateModal';
import { CommentBox } from '../../components/features/CommentBox';
import { LockOverlay } from '../../components/features/LockOverlay';
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

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Cabecera del Creador - Portada y Perfil */}
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
                    {!hasDonated && (
                        <Button variant="primary" className="mb-2" onClick={() => setIsDonateModalOpen(true)}>
                            🍮 Apoyar con un Flan
                        </Button>
                    )}
                </div>
            </div>

            {/* Tarjeta de Meta de Soporte del Canal */}
            {supportGoal && (
                <div className="bg-flansly-caramel/10 border border-flansly-caramel/30 rounded-2xl p-6 flex gap-4 shadow-[0_0_20px_rgba(180,83,9,0.03)]">
                    <div className="p-3 bg-flansly-caramel/20 text-flansly-caramel rounded-xl h-fit"><Target size={24} /></div>
                    <div>
                        <h4 className="text-base font-bold text-flansly-flan font-['Manrope']">Meta de Apoyo: {supportGoal.title}</h4>
                        <p className="text-sm text-[#E5E2E1] mt-1 font-['Inter'] leading-relaxed">{supportGoal.description}</p>
                    </div>
                </div>
            )}

            {/* Listado de Publicaciones Exclusivas con Paywall reactivo */}
            <div className="space-y-4 relative">
                <h3 className="text-xl font-bold text-[#F9F9F9] font-['Manrope'] tracking-tight border-b border-flansly-surface/30 pb-2">Publicaciones Exclusivas</h3>
                
                {hasDonated ? (
                    posts.length === 0 ? (
                        <p className="text-flansly-muted text-sm text-center py-10 font-mono">Este creador no ha subido ingredientes culinarios aún.</p>
                    ) : (
                        <div className="space-y-6">
                            {posts.map(post => (
                                <div key={post.id} className="bg-flansly-card rounded-[2rem] border border-flansly-surface/30 overflow-hidden flex flex-col shadow-lg">
                                    <PostCard post={{ ...post, creator }} />
                                    
                                    {/* Zona de Comentarios Privados (Desbloqueado post-Donación) */}
                                    <div className="p-6 bg-flansly-card/40 border-t border-flansly-surface/20 space-y-4">
                                        <h5 className="text-xs font-bold text-flansly-flan uppercase tracking-wider font-['Manrope']">
                                            Comentarios de Patrocinadores
                                        </h5>
                                        
                                        <CommentBox 
                                            postId={post.id} 
                                            onComment={handleCommentSubmit} 
                                            isLoading={isActionLoading} 
                                        />

                                        {post.comments && post.comments.length > 0 ? (
                                            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 pt-2">
                                                {post.comments.map(comment => (
                                                    <div 
                                                        key={comment.id} 
                                                        className="p-3.5 bg-flansly-dark/40 border border-flansly-surface/20 rounded-2xl flex gap-3 text-xs leading-relaxed"
                                                    >
                                                        <div className="w-7 h-7 rounded-full bg-flansly-surface shrink-0 flex items-center justify-center font-bold shadow-sm">
                                                            🍮
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-center mb-1 gap-2">
                                                                <span className="font-bold text-white truncate">
                                                                    {comment.follower?.displayName || 'Patrocinador'}
                                                                </span>
                                                                <span className="text-[10px] text-flansly-muted font-mono shrink-0">
                                                                    {new Date(comment.createdAt).toLocaleDateString('es-BO', {
                                                                        day: 'numeric',
                                                                        month: 'short'
                                                                    })}
                                                                </span>
                                                            </div>
                                                            <p className="text-[#E5E2E1] break-words font-['Inter'] text-[11px]">
                                                                {comment.content}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-[11px] font-mono text-flansly-muted">
                                                Aún no hay mensajes de apoyo en este post. ¡Sé el primero!
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
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

            {/* Modal de Simulación de Donación Modularizado (SRP / SOLID) */}
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