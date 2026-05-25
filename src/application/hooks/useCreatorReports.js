import { useState, useEffect, useMemo, useCallback } from 'react';
import { useCreator } from './useCreator';

/**
 * Custom Hook encargado de orquestar la agregación analítica de ingresos
 * de forma reactiva y con alto rendimiento (useMemo). Desacopla la lógica
 * matemática de la capa de presentación.
 */
export const useCreatorReports = () => {
    const { reports, isLoading, creatorError, fetchReports } = useCreator();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Carga inicial sin filtros cronológicos
    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    // Filtrar transacciones por rango de fechas
    const handleFilter = useCallback((e) => {
        if (e) e.preventDefault();
        fetchReports(startDate || undefined, endDate || undefined);
    }, [fetchReports, startDate, endDate]);

    // Limpiar campos y relanzar consulta por defecto
    const handleClear = useCallback(() => {
        setStartDate('');
        setEndDate('');
        fetchReports();
    }, [fetchReports]);

    // Flujo reactivo e inmutable de transacciones
    const transactions = useMemo(() => reports?.transactions || [], [reports]);

    // Agregación analítica optimizada mediante useMemo
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
