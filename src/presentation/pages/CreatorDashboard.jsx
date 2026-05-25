import { useEffect, useState, useRef } from 'react';
import { useCreator } from '../../application/hooks/useCreator';
import { useAuth } from '../../application/hooks/useAuth';
import { PostCard } from '../components/features/PostCard';
import { Textarea } from '../components/ui/Textarea';
import { FileInput } from '../components/ui/FileInput';
import { Button } from '../components/ui/Button';
import { Heart, Sparkles, TrendingUp, AlertTriangle, Flame, ScrollText, Target, Crown, Gem, CakeSlice } from 'lucide-react';

export const CreatorDashboard = () => {
    const { user } = useAuth();
    const { 
        posts, 
        activeGoal, 
        reports, 
        isLoading, 
        creatorError, 
        fetchCreatorPosts, 
        handleCreatePost, 
        fetchReports,
        fetchActiveGoal
    } = useCreator();

    const [contentText, setContentText] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [fileInputKey, setFileInputKey] = useState(0);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchCreatorPosts();
        fetchReports();
        fetchActiveGoal();
    }, [fetchCreatorPosts, fetchReports, fetchActiveGoal]);

    const handlePublish = async (e) => {
        e.preventDefault();
        if (!contentText.trim() && !postImage) return;

        try {
            const formData = new FormData();
            if (contentText.trim()) {
                formData.append('contentText', contentText.trim());
            }
            if (postImage) {
                formData.append('image', postImage);
            }

            await handleCreatePost(formData);
            
            setContentText('');
            setPostImage(null);
            setFileInputKey(prev => prev + 1);
        } catch (err) {
            console.error('Error al publicar post:', err);
        }
    };

    const isPublishDisabled = !contentText.trim() && !postImage;

    const processedPosts = posts.map(p => ({
        ...p,
        creator: p.creator || {
            displayName: user?.displayName || 'Creador de Flansly',
            username: user?.username || 'creador',
            profileImageUrl: user?.profileImageUrl || '/flansly_logo.png'
        }
    }));

    const recentComments = posts
        .flatMap(p => 
            (p.comments || []).map(c => ({
                ...c,
                postText: p.contentText || 'Publicación multimedia',
                postId: p.id
            }))
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const getBadgeStyle = (followerId) => {
        const charCodeSum = (followerId || '').split('').reduce((sum, c) => sum + c.codePointAt(0), 0);
        if (charCodeSum % 3 === 0) return { label: 'WHALE', icon: Crown, bg: 'bg-[#B45309]/20 text-[#FDE68A] border-[#B45309]/50' };
        if (charCodeSum % 3 === 1) return { label: 'VIP', icon: Gem, bg: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
        return { label: 'PATRON', icon: CakeSlice, bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    };

    const totalFlans = reports?.metrics?.totalFlans || 0;
    const totalAmountBs = reports?.metrics?.totalAmountBs || 0;
    const targetFlans = activeGoal?.targetFlans || 50;
    const percent = Math.min(100, Math.round((totalFlans / targetFlans) * 100));

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-flansly-surface/30 pb-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-[#F9F9F9] font-['Manrope'] tracking-tight flex items-center gap-2">
                        ¡Buenas vibras, Chef! <Flame size={18} className="animate-bounce text-flansly-caramel" />
                    </h2>
                    <p className="text-flansly-muted text-sm mt-1">
                        Tu cocina digital está activa. Gestiona tus posts y consiente a tus patrocinadores.
                    </p>
                </div>
                {reports?.metrics && (
                    <div className="flex items-center gap-4 bg-flansly-card/40 border border-flansly-surface/30 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="p-3 bg-flansly-caramel/10 text-flansly-flan rounded-xl">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-mono tracking-wider text-flansly-muted">Ingresos Totales</p>
                            <p className="text-xl font-black text-[#F9F9F9] font-mono">Bs. {totalAmountBs.toFixed(2)}</p>
                        </div>
                    </div>
                )}
            </div>

            {creatorError && (
                <div className="bg-flansly-error/10 border border-flansly-error/30 text-flansly-error rounded-xl p-4 text-xs animate-[slide-in_0.2s_ease]">
                    <AlertTriangle size={14} /> {creatorError}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">                
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <div className="bg-flansly-card rounded-4xl p-6 md:p-8 border border-flansly-surface shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                        <h3 className="text-lg font-bold text-flansly-flan font-['Manrope'] mb-4 flex items-center gap-2">
                            <Sparkles size={18} className="text-flansly-caramel" />
                            Añadir al Horno
                        </h3>
                        <form onSubmit={handlePublish} className="space-y-4">
                            <Textarea
                                placeholder="¿Qué estás cocinando hoy, Chef? Comparte una receta exclusiva..."
                                value={contentText}
                                onChange={(e) => setContentText(e.target.value)}
                                disabled={isLoading}
                                maxLength={1000}
                                className="min-h-24 bg-flansly-dark/40 border-flansly-surface/60 placeholder-flansly-muted text-flansly-flan text-sm"
                            />
                            
                            <FileInput
                                key={fileInputKey}
                                ref={fileInputRef}
                                label="Adjuntar fotografía o ingrediente visual exclusivo"
                                accept="image/*"
                                disabled={isLoading}
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setPostImage(file);
                                }}
                            />

                            <div className="flex justify-end pt-2 border-t border-flansly-surface/30">
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={isLoading || isPublishDisabled}
                                    className="min-w-40"
                                >
                                    {isLoading ? 'Cocinando Publicación...' : 'Publicar Post Exclusivo'}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-flansly-flan font-['Manrope'] border-b border-flansly-surface/30 pb-3 flex items-center gap-2">
                            <ScrollText size={18} /> Tu Historial del Muro
                        </h3>
                        
                        {processedPosts.length === 0 ? (
                            <div className="text-center py-20 bg-flansly-card/30 rounded-3xl border border-flansly-surface/20 text-flansly-muted text-sm font-mono leading-relaxed">
                                No has publicado ningún post aún.<br />
                                ¡Añade tu primer ingrediente al horno arriba!
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {processedPosts.map(post => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        )}
                    </div>

                </div>
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="bg-flansly-card/60 backdrop-blur-md rounded-3xl p-6 border border-flansly-surface/50 shadow-xl flex flex-col gap-5">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-flansly-flan uppercase tracking-wider font-['Manrope']">
                                <Target size={14} /> Meta de Apoyo Activa
                            </h4>
                            <span className="text-xs font-mono text-flansly-caramel bg-flansly-caramel/10 px-2.5 py-1 rounded-lg border border-flansly-caramel/30 font-semibold">
                                {percent}%
                            </span>
                        </div>

                        {activeGoal ? (
                            <div className="space-y-4">
                                <div>
                                    <h5 className="text-base font-bold text-[#F9F9F9] font-['Inter']">
                                        {activeGoal.title}
                                    </h5>
                                    <p className="text-xs text-flansly-muted mt-1 leading-relaxed">
                                        {activeGoal.description}
                                    </p>
                                </div>

                                <div className="space-y-1.5 pt-2">
                                    <div className="flex justify-between text-xs font-mono text-flansly-flan">
                                        <span>Bs. {totalAmountBs.toFixed(2)}</span>
                                        <span>Meta: {targetFlans} Flanes (Bs. {targetFlans * 10})</span>
                                    </div>
                                    <div className="w-full bg-flansly-dark rounded-full h-3 overflow-hidden border border-flansly-surface/40 p-0.5">
                                        <div 
                                            className="bg-flansly-caramel h-full transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(180,83,9,0.5)]" 
                                            style={{ width: `${percent}%` }} 
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6 text-xs text-flansly-muted font-mono bg-flansly-dark/40 rounded-2xl border border-flansly-surface/40">
                                No has definido metas de apoyo en tu perfil aún.
                            </div>
                        )}
                    </div>

                    <div className="bg-flansly-card/60 backdrop-blur-md rounded-3xl p-6 border border-flansly-surface/30 shadow-xl flex flex-col gap-4">
                        <h4 className="text-sm font-bold text-flansly-flan uppercase tracking-wider font-['Manrope'] flex items-center gap-2">
                            <Heart size={14} className="text-flansly-caramel animate-pulse" />
                            Recent Love (Apoyos)
                        </h4>
                        
                        {recentComments.length === 0 ? (
                            <div className="text-center py-8 text-xs text-flansly-muted font-mono bg-flansly-dark/40 rounded-2xl border border-flansly-surface/40">
                                Sin comentarios o muestras de apoyo recientes.
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentComments.map((comment) => {
                                    const badge = getBadgeStyle(comment.followerId);
                                    return (
                                        <div 
                                            key={comment.id}
                                            className="p-3 bg-flansly-dark/50 rounded-2xl border border-flansly-surface/30 flex gap-3 text-xs leading-relaxed animate-[slide-in_0.2s_ease]"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-flansly-surface/80 flex items-center justify-center shrink-0 border border-flansly-surface shadow-sm text-sm">
                                                <CakeSlice size={14} className="text-flansly-flan" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center gap-2 mb-1">
                                                    <span className="font-bold text-flansly-flan truncate">
                                                        {comment.follower?.displayName || 'Patrocinador'}
                                                    </span>
                                                    <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-mono border font-black flex items-center gap-1 ${badge.bg}`}>
                                                        {badge.icon && <badge.icon size={10} />}
                                                        {badge.label}
                                                    </span>
                                                </div>
                                                <p className="text-[#E5E2E1] font-['Inter'] text-[11px] leading-relaxed wrap-break-word">
                                                    {comment.content}
                                                </p>
                                                <span className="text-[9px] text-flansly-muted block mt-1.5 font-mono">
                                                    En: "{comment.postText.slice(0, 25)}..."
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CreatorDashboard;
