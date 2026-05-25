import { useCreatorReports } from '../../application/hooks/useCreatorReports';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { DataTable } from '../components/ui/DataTable';
import { Award, DollarSign, Calendar } from 'lucide-react';

export const CreatorReports = () => {
    const {
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
    } = useCreatorReports();

    // Definición de columnas de la DataTable
    const columns = [
        {
            header: 'Fecha',
            accessor: 'createdAt',
            cell: (row) => new Date(row.createdAt).toLocaleDateString('es-BO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        },
        {
            header: 'Patrocinador',
            accessor: 'followerName',
            cell: (row) => (
                <span className="font-semibold text-white">
                    {row.followerName || 'Seguidor Anónimo'}
                </span>
            )
        },
        {
            header: 'Cantidad de Flanes',
            accessor: 'quantity',
            isNumeric: true,
            cell: (row) => (
                <span className="font-mono text-flansly-flan bg-flansly-caramel/10 border border-flansly-caramel/30 px-2.5 py-1 rounded-lg">
                    🍮 {row.quantity} {row.quantity === 1 ? 'Flan' : 'Flanes'}
                </span>
            )
        },
        {
            header: 'Monto en Bs.',
            accessor: 'totalAmount',
            isNumeric: true,
            cell: (row) => (
                <span className="font-mono text-[#FDE68A] font-bold">
                    Bs. {Number(row.totalAmount).toFixed(2)}
                </span>
            )
        }
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Cabecera de la Pantalla */}
            <div className="border-b border-flansly-surface/30 pb-6">
                <h2 className="text-3xl font-extrabold text-[#F9F9F9] font-['Manrope'] tracking-tight flex items-center gap-2">
                    📊 Auditoría de Ingresos
                </h2>
                <p className="text-flansly-muted text-sm mt-1">
                    Visualiza y filtra cronológicamente la recaudación de soporte e inversiones recibidas de tus patrocinadores.
                </p>
            </div>

            {/* Alerta de Error si la hay */}
            {creatorError && (
                <div className="bg-flansly-error/10 border border-flansly-error/30 text-flansly-error rounded-xl p-4 text-xs animate-[slide-in_0.2s_ease]">
                    ⚠️ {creatorError}
                </div>
            )}

            {/* Barra de Filtros Cronológicos */}
            <div className="bg-[#1E1E1E] rounded-[2rem] p-6 border border-[#2A2A2A] shadow-xl">
                <h3 className="text-sm font-bold text-flansly-flan uppercase tracking-wider font-['Manrope'] mb-4 flex items-center gap-2">
                    <Calendar size={16} className="text-flansly-caramel" />
                    Filtrar por Rango de Fechas
                </h3>
                <form onSubmit={handleFilter} className="flex flex-col md:flex-row items-end gap-6">
                    <div className="w-full md:w-1/3">
                        <Input
                            type="date"
                            label="Fecha Inicio"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="w-full md:w-1/3">
                        <Input
                            type="date"
                            label="Fecha Fin"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex gap-3 w-full md:w-1/3 pt-2">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading}
                            className="flex-1"
                        >
                            {isLoading ? 'Filtrando...' : '🔍 Filtrar'}
                        </Button>
                        {(startDate || endDate) && (
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

            {/* Tarjetas Analíticas KPIs (Glassmorphism de Baja Luminancia) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Tarjeta 1: Flanes Acumulados */}
                <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#2A2A2A] rounded-3xl p-6 shadow-xl flex items-center gap-5 relative overflow-hidden group">
                    <div className="absolute w-32 h-32 bg-[#B45309]/5 rounded-full blur-2xl top-1/2 -right-4 -translate-y-1/2 pointer-events-none" />
                    <div className="p-4 bg-flansly-caramel/10 text-flansly-flan rounded-2xl shrink-0">
                        <Award size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-flansly-muted">Flanes Acumulados</p>
                        <h4 className="text-3xl font-black text-[#FDE68A] font-mono mt-1 group-hover:scale-102 transition-transform duration-300">
                            {totalFlans}
                        </h4>
                    </div>
                </div>

                {/* Tarjeta 2: Ingreso Neto */}
                <div className="bg-[#1E1E1E]/80 backdrop-blur-md border border-[#2A2A2A] rounded-3xl p-6 shadow-xl flex items-center gap-5 relative overflow-hidden group">
                    <div className="absolute w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl top-1/2 -right-4 -translate-y-1/2 pointer-events-none" />
                    <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl shrink-0">
                        <DollarSign size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-flansly-muted">Ingreso Neto Recaudado</p>
                        <h4 className="text-3xl font-black text-emerald-400 font-mono mt-1 group-hover:scale-102 transition-transform duration-300">
                            Bs. {totalAmountBs.toFixed(2)}
                        </h4>
                    </div>
                </div>
            </div>

            {/* Tabla de Transacciones Recibidas */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-white font-manrope border-b border-flansly-surface/30 pb-3 flex items-center gap-2">
                    <span>📜</span> Desglose de Transacciones
                </h3>
                {transactions.length === 0 ? (
                    <div className="text-center py-20 bg-flansly-card/30 rounded-3xl border border-flansly-surface/20 text-flansly-muted text-sm font-mono leading-relaxed">
                        {isLoading ? 'Consultando los reportes transaccionales...' : 'No se registraron transacciones en el periodo seleccionado.'}
                    </div>
                ) : (
                    <DataTable columns={columns} data={transactions} />
                )}
            </div>
        </div>
    );
};

export default CreatorReports;
