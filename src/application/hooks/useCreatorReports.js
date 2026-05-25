import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCreator } from './useCreator';

export const useCreatorReports = () => {
    const { reports, isLoading, creatorError, fetchReports } = useCreator();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);
    const handleFilter = useCallback((e) => {
        if (e) e.preventDefault();
        fetchReports(startDate || undefined, endDate || undefined);
    }, [fetchReports, startDate, endDate]);

    const handleClear = useCallback(() => {
        setStartDate('');
        setEndDate('');
        fetchReports();
    }, [fetchReports]);

    const transactions = useMemo(() => reports?.transactions || [], [reports]);

    const totalFlans = useMemo(() => {
        return transactions.reduce((sum, item) => sum + (item.quantity || 0), 0);
    }, [transactions]);

    const totalAmountBs = useMemo(() => {
        return transactions.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
    }, [transactions]);

    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        isLoading,
        creatorError,
        transactions,
        totalFlans,
        totalAmountBs,
        handleFilter,
        handleClear
    };
};
