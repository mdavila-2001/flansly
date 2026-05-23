// src/presentation/layouts/DashboardLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../application/hooks/useAuth';
import { LogOut } from 'lucide-react';

export const DashboardLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-flansly-dark flex">
            {/* Sidebar Lateral Fijo de 280px dictado por el DESIGN.md */}
            <aside className="w-70 fixed h-screen bg-flansly-card border-r border-flansly-surface/40 flex flex-col justify-between p-6 z-30">
                <div className="space-y-8">
                    {/* Header Marca */}
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🍮</span>
                        <div>
                            <h1 className="text-lg font-bold text-flansly-flan font-['Manrope'] tracking-tight">Flansly</h1>
                            <span className="text-[10px] font-mono text-flansly-caramel uppercase tracking-widest font-semibold">{user?.role}</span>
                        </div>
                    </div>

                    {/* Navegación Dinámica según el Rol */}
                    <nav className="flex flex-col gap-2 font-['Inter'] text-sm">
                        {user?.role === 'creator' ? (
                            <>
                                <Link to="/creator/dashboard" className="px-4 py-3 rounded-xl text-flansly-muted hover:text-flansly-flan hover:bg-flansly-surface/40 transition-all font-medium">📊 Dashboard Analítico</Link>
                                <Link to="/creator/profile" className="px-4 py-3 rounded-xl text-flansly-muted hover:text-flansly-flan hover:bg-flansly-surface/40 transition-all font-medium">👤 Editar Mi Perfil</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/follower/feed" className="px-4 py-3 rounded-xl text-flansly-muted hover:text-flansly-flan hover:bg-flansly-surface/40 transition-all font-medium">🍮 Muro De Flanes</Link>
                                <Link to="/follower/favorites" className="px-4 py-3 rounded-xl text-flansly-muted hover:text-flansly-flan hover:bg-flansly-surface/40 transition-all font-medium">⭐ Mis Creadores</Link>
                            </>
                        )}
                    </nav>
                </div>

                {/* Perfil Inferior & Botón de Logout */}
                <div className="border-t border-flansly-surface/40 pt-4 flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-flansly-flan truncate">{user?.displayName}</p>
                        <p className="text-[11px] text-flansly-muted truncate">@{user?.username}</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="text-flansly-muted hover:text-flansly-error p-2 rounded-xl hover:bg-flansly-surface/40 transition-colors cursor-pointer"
                        title="Cerrar Sesión"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>

            {/* Espacio Contenedor Principal (Desplazado 280px para no solapar el Sidebar) */}
            <div className="flex-1 pl-70 flex flex-col">
                <main className="w-full max-w-300 mx-auto px-10 py-8 font-['Inter']">
                    {/* Renderizador de Vistas Protegidas */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};