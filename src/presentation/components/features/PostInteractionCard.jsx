import PropTypes from 'prop-types';
import { PostCard } from './PostCard';
import { CommentBox } from './CommentBox';
import { CommentsList } from './CommentsList';

export const PostInteractionCard = ({ post, creator, onCommentSubmit, isActionLoading }) => {
    return (
        <div className="bg-flansly-card rounded-[2rem] border border-flansly-surface/30 overflow-hidden flex flex-col shadow-lg">
            <PostCard post={{ ...post, creator }} />
            
            <div className="p-6 bg-flansly-card/40 border-t border-flansly-surface/20 space-y-4">
                <h5 className="text-xs font-bold text-flansly-flan uppercase tracking-wider font-['Manrope']">
                    Comentarios de Patrocinadores
                </h5>
                
                <CommentBox 
                    postId={post.id} 
                    onComment={onCommentSubmit} 
                    isLoading={isActionLoading} 
                />

                <CommentsList comments={post.comments} />
            </div>
        </div>
    );
};

PostInteractionCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.string.isRequired,
        comments: PropTypes.array
    }).isRequired,
    creator: PropTypes.object,
    onCommentSubmit: PropTypes.func.isRequired,
    isActionLoading: PropTypes.bool
};

export default PostInteractionCard;
