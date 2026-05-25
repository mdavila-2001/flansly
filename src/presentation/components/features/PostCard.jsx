import { useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar, Send, CheckCircle } from 'lucide-react';
import { resolveImageUrl } from '../../../core/utils/image.utils';
import { useAuth } from '../../../application/hooks/useAuth';
import { useFollowerActions } from '../../../application/hooks/useFollowerActions';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

export const PostCard = ({ post }) => {
    const { user } = useAuth();
    const { executeComment, isActionLoading } = useFollowerActions();
    
    const [commentText, setCommentText] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);

    const formattedDate = new Date(post.createdAt).toLocaleDateString('es-BO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const handleSendComment = async () => {
        setCommentError(null);
        const trimmed = commentText.trim();
        if (!trimmed) {
            setCommentError('El comentario no puede estar vacío.');
            return;
        }
        try {
            await executeComment(post.id, trimmed);
            setCommentText('');
            setToastMessage('Mensaje enviado en privado al creador');
            setTimeout(() => {
                setToastMessage(null);
            }, 4000);
        } catch (err) {
            console.error('Error al registrar el comentario privado:', err);
            setCommentError(err.message || 'Error al enviar el comentario.');
        }
    };

    return (
        <div className="w-full bg-flansly-card border border-flansly-surface/30 rounded-2xl p-6 flex flex-col gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img 
                        src={resolveImageUrl(post.creator?.profileImageUrl) || '/flansly_logo.png'} 
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
                        src={resolveImageUrl(post.imageUrl)} 
                        alt="Material exclusivo" 
                        className="w-full max-h-112.5 object-cover hover:scale-[1.01] transition-transform duration-300"
                    />
                </div>
            )}

            {/* CA3: Caja de Comentarios Protegida - Se inyecta solo si es un seguidor apoyado */}
            {user?.role === 'follower' && (
                <div className="border-t border-flansly-surface/30 pt-4 mt-2 space-y-3">
                    <h6 className="text-xs font-semibold text-flansly-flan uppercase tracking-wider font-['Inter']">
                        Enviar mensaje privado de apoyo
                    </h6>
                    <div className="flex flex-col gap-2 relative">
                        <Textarea 
                            placeholder="Escribe un mensaje de apoyo que solo el creador podrá leer..." 
                            value={commentText}
                            onChange={(e) => {
                                setCommentError(null);
                                setCommentText(e.target.value);
                            }}
                            maxLength={300}
                            rows={3}
                            disabled={isActionLoading}
                            error={commentError}
                        />
                        <div className="flex items-center justify-between mt-1">
                            {toastMessage ? (
                                <div className="flex items-center gap-2 px-3 py-2 bg-flansly-success/10 border border-flansly-success/30 text-flansly-success rounded-xl text-xs font-semibold animate-[slide-in_0.2s_ease-out]">
                                    <CheckCircle size={14} className="text-flansly-success" />
                                    <span>{toastMessage}</span>
                                </div>
                            ) : (
                                <div />
                            )}
                            <Button 
                                variant="primary" 
                                className="min-h-9 px-4 text-xs rounded-xl flex items-center gap-1.5 ml-auto"
                                onClick={handleSendComment}
                                disabled={isActionLoading || commentText.trim() === ''}
                            >
                                <Send size={12} />
                                <span>{isActionLoading ? 'Enviando...' : 'Enviar'}</span>
                            </Button>
                        </div>
                    </div>
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

export default PostCard;