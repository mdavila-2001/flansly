import { useEffect } from 'react';
import { useFollowerHistory } from '../../../application/hooks/useFollowerHistory';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { DataTable } from '../../components/ui/DataTable';
import { Search, Award, DollarSign, History } from 'lucide-react';

const FLAN_UNIT_PRICE_BS = 10;

export const FollowerHistory = () => {
    const {
        filters,
        donations,
        isLoading,
        error,
        fetchHistory,
        handleFilterChange,
        resetFilters
    } = useFollowerHistory();

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchHistory(filters);
    };

    const handleClear = () => {
        resetFilters();
    };

    const totalFlans = donations.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const totalInvested = donations.reduce((sum, item) => sum + (item.quantity || 0) * FLAN_UNIT_PRICE_BS, 0);

    const columns = [
        {
            header: 'Fecha',
            accessor: 'createdAt',
            cell: (row) => {
                const dateVal = row.createdAt;
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
            header: 'Creador',
            accessor: 'creatorName',
            cell: (row) => {
                const name = row.creator?.displayName || 'Creador de Flansly';
                const username = row.creator?.username;
                return (
                    <div className="flex flex-col">
                        <span className="font-semibold text-white">
                            {name}
                        </span>
                        {username && (
                            <span className="text-[10px] text-flansly-muted font-mono">
                                @{username}
                            </span>
                        )}
                    </div>
                );
            }
        },
        {
            header: 'Flanes Aportados',
            accessor: 'quantity',
            isNumeric: true,
            cell: (row) => {
                const quantity = row.quantity || 0;
                return (
                    <span className="font-mono text-flansly-flan bg-flansly-caramel/10 border border-flansly-caramel/30 px-2.5 py-1 rounded-lg">
                        {quantity} {quantity === 1 ? 'Flan' : 'Flanes'}
                    </span>
                );
            }
        },
        {
            header: 'Inversión Total',
            accessor: 'totalAmount',
            isNumeric: true,
            cell: (row) => {
                const quantity = row.quantity || 0;
                const amount = quantity * FLAN_UNIT_PRICE_BS;
                return (
                    <span className="font-mono text-[#FDE68A] font-bold">
                        Bs. {amount.toFixed(2)}
                    </span>
                );
            }
        }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6 text-[#F9F9F9] font-['Inter']">
            <div className="border-b border-flansly-surface/30 pb-6">
                <h2 className="text-3xl font-extrabold text-[#F9F9F9] font-['Manrope'] tracking-tight">
                    Historial de Inversiones
                </h2>
                <p className="text-flansly-muted text-sm mt-1">
                    Audita las muestras de amor e inversiones que has horneado y enviado a tus creadores preferidos de Flansly.
                </p>
            </div>

            {error && (
                <div className="bg-flansly-error/10 border border-flansly-error/30 text-flansly-error rounded-xl p-4 text-xs animate-[slide-in_0.2s_ease]">
                    {error}
                </div>
            )}

            <div className="bg-flansly-card rounded-2xl border border-flansly-surface/30 p-6 shadow-xl">
                <h3 className="text-sm font-bold text-flansly-flan uppercase tracking-wider font-['Manrope'] mb-4 flex items-center gap-2">
                    <Search size={16} className="text-flansly-caramel" />
                    Filtrar Inversiones
                </h3>
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div>
                        <Input
                            type="date"
                            label="Fecha Inicio"
                            value={filters.startDate}
                            onChange={(e) => handleFilterChange('startDate', e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <Input
                            type="date"
                            label="Fecha Fin"
                            value={filters.endDate}
                            onChange={(e) => handleFilterChange('endDate', e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            label="Nombre del Creador"
                            placeholder="Buscar por creador..."
                            value={filters.creatorName}
                            onChange={(e) => handleFilterChange('creatorName', e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? 'Buscando...' : 'Filtrar Historial'}
                        </Button>
                        {(filters.startDate || filters.endDate || filters.creatorName) && (
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={handleClear}
                                disabled={isLoading}
                            >
                                Limpiar
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-flansly-card rounded-2xl border border-flansly-surface/30 p-6 shadow-xl flex items-center gap-5 relative overflow-hidden group">
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

                <div className="bg-flansly-card rounded-2xl border border-flansly-surface/30 p-6 shadow-xl flex items-center gap-5 relative overflow-hidden group">
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

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-manrope border-b border-flansly-surface/30 pb-3 flex items-center gap-2">
                    <History size={18} className="text-flansly-caramel" />
                    Historial de Transacciones
                </h3>
                {donations.length === 0 ? (
                    <div className="text-center py-20 bg-flansly-card/30 rounded-3xl border border-flansly-surface/20 text-flansly-muted text-sm font-mono leading-relaxed">
                        {isLoading ? 'Auditando historial de transacciones...' : 'No se registraron aportes en este rango de auditoría'}
                    </div>
                ) : (
                    <DataTable columns={columns} data={donations} />
                )}
            </div>
        </div>
    );
};

export default FollowerHistory;
