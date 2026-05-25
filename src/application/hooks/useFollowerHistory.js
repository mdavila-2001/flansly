import { useState, useCallback } from 'react';
import { followerRepository } from '../../data/repositories/follower.repository';

export const useFollowerHistory = () => {
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        creatorName: ''
    });
    const [donations, setDonations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHistory = useCallback(async (currentFilters = {}) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await followerRepository.getDonationHistory(currentFilters);
            setDonations(data || []);
        } catch (err) {
            console.error('Error fetching donation history:', err);
            setError(err.response?.data?.message || err.message || 'Error al obtener el historial de aportes.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleFilterChange = useCallback((name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const resetFilters = useCallback(() => {
        const defaultFilters = {
            startDate: '',
            endDate: '',
            creatorName: ''
        };
        setFilters(defaultFilters);
        fetchHistory(defaultFilters);
    }, [fetchHistory]);

    return {
        filters,
        donations,
        isLoading,
        error,
        fetchHistory,
        handleFilterChange,
        resetFilters
    };
};
