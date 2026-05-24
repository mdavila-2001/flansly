import PropTypes from 'prop-types';
import { Calendar } from 'lucide-react';

export const PostCard = ({ post }) => {
    const formattedDate = new Date(post.createdAt).toLocaleDateString('es-BO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="w-full bg-flansly-card border border-flansly-surface/30 rounded-2xl p-6 flex flex-col gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img 
                        src={post.creator?.profileImageUrl || '/flansly_logo.png'} 
                        alt={post.creator?.displayName} 
                        className="w-10 h-10 rounded-full border border-flansly-surface object-cover"
                    />
                    <div>
                        <h5 className="text-sm font-bold text-[#F9F9F9] font-['Inter']">
                            {post.creator?.displayName || 'Creador de Flansly'}
                        </h5>
                        <p className="text-flansly-muted text-xs font-mono">
                            @{post.creator?.username || 'creador'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 text-flansly-muted text-xs font-mono">
                    <Calendar size={12} />
                    <span>{formattedDate}</span>
                </div>
            </div>

            {post.contentText && (
                <p className="text-[#E5E2E1] text-sm leading-relaxed font-['Inter'] whitespace-pre-wrap">
                    {post.contentText}
                </p>
            )}

            {post.imageUrl && (
                <div className="w-full rounded-xl overflow-hidden border border-flansly-surface/40 bg-flansly-dark/50">
                    <img 
                        src={post.imageUrl} 
                        alt="Material exclusivo" 
                        className="w-full max-h-112.5 object-cover hover:scale-[1.01] transition-transform duration-300"
                    />
                </div>
            )}
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        contentText: PropTypes.string,
        imageUrl: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        creator: PropTypes.shape({
            username: PropTypes.string,
            displayName: PropTypes.string,
            profileImageUrl: PropTypes.string
        })
    }).isRequired
};