import { useState, useCallback } from 'react';
import { creatorRepository } from '../../data/repositories/creator.repository';

export const useCreator = () => {
    const [posts, setPosts] = useState([]);
    const [activeGoal, setActiveGoal] = useState(() => {
        try {
            const savedGoal = localStorage.getItem('flansly_creator_goal');
            return savedGoal ? JSON.parse(savedGoal) : null;
        } catch (e) {
            console.error('Error al parsear flansly_creator_goal:', e);
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const [reports, setReports] = useState(null);
    const [creatorError, setCreatorError] = useState(null);

    const parseError = (err) => {
        const rawError = err.response?.data?.error;
        if (Array.isArray(rawError)) {
            return rawError.join(', ');
        }
        if (typeof rawError === 'string') {
            return rawError;
        }
        return err.response?.data?.message || err.message || 'Error de conexión con el servidor.';
    };

    const fetchCreatorPosts = useCallback(async () => {
        setIsLoading(true);
        setCreatorError(null);
        try {
            const data = await creatorRepository.getPosts();
            setPosts(data || []);
            return data;
        } catch (err) {
            console.error('Error en fetchCreatorPosts:', err);
            setCreatorError(parseError(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleUpdateProfile = useCallback(async (formData) => {
        setIsLoading(true);
        setCreatorError(null);
        try {
            const updatedUser = await creatorRepository.updateProfile(formData);
            // Sincronizar usuario guardado en localStorage para reflejar los cambios en el Header/Sidebar
            const savedUser = localStorage.getItem('flansly_user');
            if (savedUser) {
                const userObj = JSON.parse(savedUser);
                const newUserObj = {
                    ...userObj,
                    displayName: updatedUser.displayName || userObj.displayName,
                    profileImageUrl: updatedUser.profileImageUrl || userObj.profileImageUrl,
                    bannerImageUrl: updatedUser.bannerImageUrl || userObj.bannerImageUrl
                };
                localStorage.setItem('flansly_user', JSON.stringify(newUserObj));
            }
            return updatedUser;
        } catch (err) {
            console.error('Error en handleUpdateProfile:', err);
            const msg = parseError(err);
            setCreatorError(msg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleUpdateGoal = useCallback(async ({ title, description }) => {
        setIsLoading(true);
        setCreatorError(null);
        try {
            const goalData = await creatorRepository.updateGoal({ title, description });
            // Guardar meta en estado y en localStorage de forma persistente
            setActiveGoal(goalData);
            localStorage.setItem('flansly_creator_goal', JSON.stringify(goalData));
            return goalData;
        } catch (err) {
            console.error('Error en handleUpdateGoal:', err);
            const msg = parseError(err);
            setCreatorError(msg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleCreatePost = useCallback(async (formData) => {
        setIsLoading(true);
        setCreatorError(null);
        try {
            const newPost = await creatorRepository.createPost(formData);
            
            // CORTAFUEGOS REACTIVO DE FEED: Inyectar al inicio de posts de forma reactiva
            setPosts(prev => [newPost, ...prev]);
            
            return newPost;
        } catch (err) {
            console.error('Error en handleCreatePost:', err);
            const msg = parseError(err);
            setCreatorError(msg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchReports = useCallback(async (startDate, endDate) => {
        setIsLoading(true);
        setCreatorError(null);
        try {
            const data = await creatorRepository.getReports(startDate, endDate);
            setReports(data || null);
            return data;
        } catch (err) {
            console.error('Error en fetchReports:', err);
            setCreatorError(parseError(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        posts,
        activeGoal,
        isLoading,
        reports,
        creatorError,
        fetchCreatorPosts,
        handleUpdateProfile,
        handleUpdateGoal,
        handleCreatePost,
        fetchReports
    };
};
