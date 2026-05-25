import { useState, useCallback } from 'react';
import { followerRepository } from '../../data/repositories/follower.repository';

export const useFollower = () => {
    const [creators, setCreators] = useState([]);
    const [currentProfile, setCurrentProfile] = useState(null);
    const [feed, setFeed] = useState([]);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCreators = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await followerRepository.getAllCreators();
            setCreators(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar creadores.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchProfile = useCallback(async (creatorId) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await followerRepository.getCreatorProfile(creatorId);
            setCurrentProfile(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar el perfil del creador.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleToggleFavorite = useCallback(async (creatorId) => {
        try {
            await followerRepository.toggleFavorite(creatorId);
            setCreators(prev => prev.map(c => c.id === creatorId ? { ...c, isFavorite: !c.isFavorite } : c));
            setCurrentProfile(prev => {
                if (prev && prev.creator.id === creatorId) {
                    return {
                        ...prev,
                        creator: {
                            ...prev.creator,
                            isFavorite: !prev.creator.isFavorite
                        }
                    };
                }
                return prev;
            });
        } catch (err) {
            console.error('Error al modificar favoritos:', err);
        }
    }, []);

    const fetchFeed = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await followerRepository.getFollowerFeed();
            setFeed(data);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar tu muro de flanes.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleDonate = useCallback(async (creatorId, quantity) => {
        setIsLoading(true);
        setError(null);
        try {
            await followerRepository.donate(creatorId, quantity);
            // Recargar el perfil para actualizar el estado de "hasDonated" y desbloquear posts al instante
            await fetchProfile(creatorId);
        } catch (err) {
            setError(err.response?.data?.message || 'Error al procesar la donación.');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [fetchProfile]);

    const markAsDonated = useCallback(() => {
        setCurrentProfile(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                hasDonated: true
            };
        });
    }, []);

    const fetchHistory = useCallback(async (startDate, endDate, creatorName) => {
        setIsHistoryLoading(true);
        setError(null);
        try {
            const data = await followerRepository.getHistory(startDate, endDate, creatorName);
            setHistory(data || []);
            return data;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al cargar el historial de inversiones.');
        } finally {
            setIsHistoryLoading(false);
        }
    }, []);

    return {
        creators,
        currentProfile,
        feed,
        history,
        isLoading,
        isHistoryLoading,
        error,
        fetchCreators,
        fetchProfile,
        handleToggleFavorite,
        fetchFeed,
        handleDonate,
        markAsDonated,
        fetchHistory
    };
};