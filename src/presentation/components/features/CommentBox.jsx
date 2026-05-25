import { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { MessageSquare } from 'lucide-react';

/**
 * Componente CommentBox que encapsula su propia caja de comentarios e inputs.
 * Evita re-renderizar todo el perfil al momento de escribir en el campo de texto (SRP/SOLID).
 */
export const CommentBox = ({ postId, onComment, isLoading }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const trimmed = content.trim();
        if (!trimmed) return;
        try {
            await onComment(postId, trimmed);
            setContent('');
        } catch (err) {
            console.error('Error al enviar comentario desde CommentBox:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 w-full mt-3">
            <Input
                placeholder="Escribe un mensaje de apoyo..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
                className="bg-flansly-dark/40 border-flansly-surface/60 placeholder-flansly-muted text-flansly-flan text-sm min-h-10 py-1.5"
            />
            <Button
                variant="secondary"
                type="submit"
                disabled={isLoading || !content.trim()}
                className="min-h-10 px-4 shrink-0 flex items-center justify-center"
            >
                <MessageSquare size={16} />
            </Button>
        </form>
    );
};

CommentBox.propTypes = {
    postId: PropTypes.string.isRequired,
    onComment: PropTypes.func.isRequired,
    isLoading: PropTypes.bool
};
