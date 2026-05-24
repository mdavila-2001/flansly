import { useState, useCallback } from 'react';
import { followerRepository } from '../../data/repositories/follower.repository';

export const useFollower = () => {
    const [creators, setCreators] = useState([]);
    const [currentProfile, setCurrentProfile] = useState(null);
    const [feed, setFeed] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
            if (currentProfile && currentProfile.creator.id === creatorId) {
                setCurrentProfile(prev => ({
                    ...prev,
                    creator: {
                        ...prev.creator,
                        isFavorite: !prev.creator.isFavorite
                    }
                }));
            }
        } catch (err) {
            console.error('Error al modificar favoritos:', err);
        }
    }, [currentProfile]);

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

    return {
        creators,
        currentProfile,
        feed,
        isLoading,
        error,
        fetchCreators,
        fetchProfile,
        handleToggleFavorite,
        fetchFeed
    };
};