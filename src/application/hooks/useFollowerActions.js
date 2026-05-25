import { useState, useCallback } from 'react';
import { followerRepository } from '../../data/repositories/follower.repository';
import { SUPPORT_TYPES } from '../../core/constants/support.constants';

export const useFollowerActions = () => {
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [actionError, setActionError] = useState(null);

    const calculateCost = useCallback((quantity) => {
        const parsed = Number.parseInt(quantity, 10);
        if (Number.isNaN(parsed) || parsed <= 0) return 0;
        return parsed * SUPPORT_TYPES.FLAN.priceBs;
    }, []);


    const executeDonation = useCallback(async (creatorId, quantity) => {
        const parsedQuantity = Number(quantity);
        if (!quantity || Number.isNaN(parsedQuantity) || parsedQuantity <= 0 || !Number.isInteger(parsedQuantity)) {
            throw new Error('La cantidad de flanes debe ser un número entero mayor a 0.');
        }

        setIsActionLoading(true);
        setActionError(null);
        try {
            const data = await followerRepository.donate(creatorId, parsedQuantity);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || 'Error al realizar la donación.';
            setActionError(message);
            throw new Error(message, { cause: err });
        } finally {
            setIsActionLoading(false);
        }
    }, []);

    const executeComment = useCallback(async (postId, content) => {
        const trimmedContent = content?.trim();
        if (!trimmedContent) {
            throw new Error('El comentario no puede estar vacío.');
        }

        setIsActionLoading(true);
        setActionError(null);
        try {
            const data = await followerRepository.createComment(postId, trimmedContent);
            return data;
        } catch (err) {
            const message = err.response?.data?.message || 'Error al enviar el comentario.';
            setActionError(message);
            throw new Error(message, { cause: err });
        } finally {
            setIsActionLoading(false);
        }
    }, []);

    return {
        isActionLoading,
        actionError,
        calculateCost,
        executeDonation,
        executeComment
    };
};
