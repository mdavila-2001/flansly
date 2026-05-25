import { useEffect, useState } from 'react';
import { useFollower } from '../../../application/hooks/useFollower';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { Calendar, Search, Heart, Award, DollarSign } from 'lucide-react';

export const FollowerHistory = () => {
    const { history, isHistoryLoading, error, fetchHistory } = useFollower();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [creatorName, setCreatorName] = useState('');

    useEffect(() => {
        // Carga inicial sin filtros
        fetchHistory();
    }, [fetchHistory]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchHistory(startDate || undefined, endDate || undefined, creatorName || undefined);
    };

    const handleClear = () => {
        setStartDate('');
        setEndDate('');
        setCreatorName('');
        fetchHistory();
    };

    // Calcular KPIs acumulativos de inversiones locales del seguidor
    const totalFlans = history.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalInvested = history.reduce((sum, item) => sum + Number(item.totalAmount || item.amount || 0), 0);

    // Definición de columnas ultra defensivas y robustas
    const columns = [
        {
            header: 'Fecha',
            accessor: 'createdAt',
            cell: (row) => {
                const dateVal = row.createdAt || row.date;
                return dateVal ? new Date(dateVal).toLocaleDateString('es-BO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }) : 'Sin Fecha';
            }
        },
        {
            header: 'Creador Apoyado',
            accessor: 'creatorName',
            cell: (row) => {
                const name = row.creator?.displayName || row.creatorName || 'Creador de Flansly';
                return (
                    <span className="font-semibold text-white flex items-center gap-2">
                        🍮 {name}
                    </span>
                );
            }
        },
        {
            header: 'Flanes Donados',
            accessor: 'quantity',
            isNumeric: true,
            cell: (row) => {
                const quantity = row.quantity || 0;
                return (
                    <span className="font-mono text-flansly-flan bg-flansly-caramel/10 border border-flansly-caramel/30 px-2.5 py-1 rounded-lg">
                        🍮 {quantity} {quantity === 1 ? 'Flan' : 'Flanes'}
                    </span>
                );
            }
        },
        {
            header: 'Total Invertido',
            accessor: 'totalAmount',
            isNumeric: true,
            cell: (row) => {
                const amount = Number(row.totalAmount || row.amount || 0);
                return (
                    <span className="font-mono text-[#FDE68A] font-bold">
                        Bs. {amount.toFixed(2)}
                    </span>
                );
            }
        }
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Cabecera de la Pantalla */}
            <div className="border-b border-flansly-surface/30 pb-6">
                <h2 className="text-3xl font-extrabold text-[#F9F9F9] font-['Manrope'] tracking-tight flex items-center gap-2">
                    📈 Historial de Inversiones
                </h2>
                <p className="text-flansly-muted text-sm mt-1">
                    Audita las muestras de amor e inversiones que has horneado y enviado a tus creadores preferidos de Flansly.
                </p>
            </div>

            {/* Alerta de Error */}
            {error && (
                <div className="bg-flansly-error/10 border border-flansly-error/30 text-flansly-error rounded-xl p-4 text-xs animate-[slide-in_0.2s_ease]">
                    ⚠️ {error}
                </div>
            )}

            {/* Barra de Filtros Triples */}
            <div className="bg-[#1E1E1E] rounded-[2rem] p-6 border border-[#2A2A2A] shadow-xl">
                <h3 className="text-sm font-bold text-flansly-flan uppercase tracking-wider font-['Manrope'] mb-4 flex items-center gap-2">
                    <Search size={16} className="text-flansly-caramel" />
                    Filtrar Inversiones
                </h3>
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div>
                        <Input
                            type="date"
                            label="Desde"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            disabled={isHistoryLoading}
                        />
                    </div>
                    <div>
                        <Input
                            type="date"
                            label="Hasta"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={isHistoryLoading}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Nombre del Creador"
                            placeholder="Buscar por creador..."
                            value={creatorName}
                            onChange={(e) => setCreatorName(e.target.value)}
                            disabled={isHistoryLoading}
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isHistoryLoading}
                            className="flex-1"
                        >
                            {isHistoryLoading ? 'Buscando...' : '🔍 Buscar'}
                        </Button>
                        {(startDate || endDate || creatorName) && (
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={handleClear}
                                disabled={isHistoryLoading}
                            >
                                Limpiar
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            {/* KPIs de Inversiones Acumuladas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Flanes Donados Acumulados */}
                <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#2A2A2A] rounded-3xl p-6 shadow-xl flex items-center gap-5 relative overflow-hidden group">
                    <div className="absolute w-32 h-32 bg-[#B45309]/5 rounded-full blur-2xl top-1/2 -right-4 -translate-y-1/2 pointer-events-none" />
                    <div className="p-4 bg-flansly-caramel/10 text-flansly-flan rounded-2xl shrink-0">
                        <Award size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-flansly-muted">Flanes Donados</p>
                        <h4 className="text-3xl font-black text-[#FDE68A] font-mono mt-1 group-hover:scale-102 transition-transform duration-300">
                            {totalFlans}
                        </h4>
                    </div>
                </div>

                {/* Total Capital Invertido */}
                <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#2A2A2A] rounded-3xl p-6 shadow-xl flex items-center gap-5 relative overflow-hidden group">
                    <div className="absolute w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl top-1/2 -right-4 -translate-y-1/2 pointer-events-none" />
                    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl shrink-0">
                        <DollarSign size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-flansly-muted">Total Bs. Invertido</p>
                        <h4 className="text-3xl font-black text-emerald-400 font-mono mt-1 group-hover:scale-102 transition-transform duration-300">
                            Bs. {totalInvested.toFixed(2)}
                        </h4>
                    </div>
                </div>
            </div>

            {/* Listado Principal de Transacciones de Inversión */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-manrope border-b border-flansly-surface/30 pb-3 flex items-center gap-2">
                    <Heart size={18} className="text-flansly-caramel animate-pulse" /> Historial de Transacciones
                </h3>
                {history.length === 0 ? (
                    <div className="text-center py-20 bg-flansly-card/30 rounded-3xl border border-flansly-surface/20 text-flansly-muted text-sm font-mono leading-relaxed">
                        {isHistoryLoading ? 'Auditiando historial de transacciones...' : 'Aún no has invitado flanes a ningún creador independiente.'}
                    </div>
                ) : (
                    <DataTable columns={columns} data={history} />
                )}
            </div>
        </div>
    );
};

export default FollowerHistory;
