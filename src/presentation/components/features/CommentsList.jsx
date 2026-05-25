import PropTypes from 'prop-types';

export const CommentsList = ({ comments = [] }) => {
    if (!comments || comments.length === 0) {
        return (
            <p className="text-[11px] font-mono text-flansly-muted">
                Aún no hay mensajes de apoyo en este post. ¡Sé el primero!
            </p>
        );
    }

    return (
        <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 pt-2">
            {comments.map(comment => (
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
    );
};

CommentsList.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            content: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            follower: PropTypes.shape({
                displayName: PropTypes.string
            })
        })
    )
};

export default CommentsList;
