import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFollower } from '../../../application/hooks/useFollower';
import { Star } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { resolveImageUrl } from '../../../core/utils/image.utils';
import { CardSkeleton } from '../../components/ui/CardSkeleton';

export const ExploreCreators = () => {
    const { creators, isLoading, error, fetchCreators, handleToggleFavorite } = useFollower();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCreators();
    }, [fetchCreators]);

    if (isLoading) {
        return (
            <div className="space-y-6 max-w-[1200px] mx-auto px-4 md:px-0">
                <div>
                    <h2 className="text-3xl font-extrabold text-white font-['Manrope'] tracking-tight">Explorar Creadores</h2>
                    <p className="text-flansly-muted text-sm mt-1">Descubre mentes brillantes independientes y endulza sus proyectos.</p>
                </div>
                <CardSkeleton count={6} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-[1200px] mx-auto px-4 md:px-0 py-20 text-center text-flansly-error font-['Inter']">
                ⚠️ {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-[1200px] mx-auto px-4 md:px-0">
            <div>
                <h2 className="text-3xl font-extrabold text-white font-['Manrope'] tracking-tight">Explorar Creadores</h2>
                <p className="text-flansly-muted text-sm mt-1">Descubre mentes brillantes independientes y endulza sus proyectos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creators.map((creator) => (
                    <div key={creator.id} className="relative bg-flansly-card border border-flansly-surface/30 rounded-2xl overflow-hidden group flex flex-col justify-between shadow-lg">
                        {/* Banner Miniatura */}
                        <div className="w-full h-24 bg-flansly-surface overflow-hidden relative">
                            {creator.bannerImageUrl && (
                                <img src={resolveImageUrl(creator.bannerImageUrl)} alt="Banner" className="w-full h-full object-cover" />
                            )}
                            {/* Botón de Favorito Flotante */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); handleToggleFavorite(creator.id); }}
                                className="absolute top-3 right-3 p-2 rounded-full bg-flansly-dark/60 border border-flansly-surface/60 text-flansly-muted hover:text-flansly-flan transition-colors cursor-pointer z-20 backdrop-blur-sm"
                            >
                                <Star size={16} fill={creator.isFavorite ? "var(--color-flansly-flan)" : "none"} className={creator.isFavorite ? "text-flansly-flan" : ""} />
                            </button>
                        </div>

                        {/* Cuerpo de Tarjeta */}
                        <div className="p-5 flex flex-col items-center -mt-10 relative z-10 flex-1">
                            <img 
                                src={resolveImageUrl(creator.profileImageUrl) || '/flansly_logo.png'} 
                                alt={creator.displayName} 
                                className="w-16 h-16 rounded-full border-2 border-flansly-card object-cover bg-flansly-surface shadow-md"
                            />
                            <h4 className="text-base font-bold text-white font-['Manrope'] mt-3 truncate w-full text-center">
                                {creator.displayName}
                            </h4>
                            <p className="text-flansly-muted text-xs font-mono">@{creator.username}</p>
                        </div>

                        <div className="p-5 pt-0">
                            <Button 
                                variant="secondary" 
                                className="w-full min-h-10 text-xs py-2 rounded-xl"
                                onClick={() => navigate(`/follower/creator/${creator.id}`)}
                            >
                                Ver Perfil Público
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreCreators;