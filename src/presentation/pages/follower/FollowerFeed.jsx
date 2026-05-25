import { useEffect } from 'react';
import { useFollower } from '../../../application/hooks/useFollower';
import { PostCard } from '../../components/features/PostCard';
import { Sparkles, AlertTriangle, CakeSlice } from 'lucide-react';

export const FollowerFeed = () => {
    const { feed, isLoading, error, fetchFeed } = useFollower();

    useEffect(() => {
        fetchFeed();
    }, [fetchFeed]);

    if (isLoading) {
        return (
            <div className="space-y-6 max-w-2xl mx-auto animate-pulse">
                <div className="h-8 bg-flansly-surface/30 rounded-lg w-1/3" />
                <div className="h-4 bg-flansly-surface/20 rounded-md w-1/2" />
                <div className="space-y-4 pt-4">
                    <div className="h-44 bg-flansly-card rounded-2xl border border-flansly-surface" />
                    <div className="h-44 bg-flansly-card rounded-2xl border border-flansly-surface" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto p-6 bg-flansly-card/40 border border-flansly-error/20 rounded-2xl text-center text-flansly-error font-inter">
                <AlertTriangle size={14} /> {error}
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <header>
                <h2 className="text-3xl font-extrabold text-[#F9F9F9] font-manrope tracking-tight flex items-center gap-2">
                    <CakeSlice size={20} className="text-flansly-caramel" /> Muro de tus Creadores
                </h2>
                <p className="text-flansly-muted text-sm mt-1">
                    Visualiza las publicaciones exclusivas de los creadores a los que has apoyado.
                </p>
            </header>

            {feed.length === 0 ? (
                <div className="text-center py-20 bg-flansly-card/30 rounded-3xl border border-flansly-surface/20 text-flansly-muted text-sm font-mono leading-relaxed">
                    <Sparkles className="mx-auto text-flansly-flan mb-3 opacity-60" size={32} />
                    Aún no tienes publicaciones exclusivas.<br />
                    ¡Explora creadores y apoya al menos con un flan para ver su contenido aquí!
                </div>
            ) : (
                <div className="space-y-6">
                    {feed.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FollowerFeed;
