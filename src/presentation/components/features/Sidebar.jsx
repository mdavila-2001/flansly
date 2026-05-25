import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../application/hooks/useAuth';
import { LogOut, Menu, X, BarChart3, UserCircle, Search, CakeSlice, Star, ScrollText, History } from 'lucide-react';

const MENU_ITEMS = {
    creator: [
        { to: '/creator/dashboard', label: 'Dashboard Analítico', icon: BarChart3 },
        { to: '/creator/reports', label: 'Auditoría de Ingresos', icon: ScrollText },
        { to: '/creator/profile', label: 'Editar Mi Perfil', icon: UserCircle }
    ],
    follower: [
        { to: '/follower/explore', label: 'Explorar Creadores', icon: Search },
        { to: '/follower/feed', label: 'Muro De Flanes', icon: CakeSlice },
        { to: '/follower/favorites', label: 'Mis Creadores', icon: Star },
        { to: '/follower/history', label: 'Historial de Aportes', icon: History }
    ]
};

export const Sidebar = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const role = user?.role || 'follower';
    const menuLinks = MENU_ITEMS[role] || [];

    const handleClose = () => setIsOpen(false);
    const handleToggle = () => setIsOpen(prev => !prev);

    return (
        <>
            <button
                onClick={handleToggle}
                className="md:hidden fixed top-4 left-4 z-40 p-2.5 rounded-xl bg-flansly-card border border-flansly-surface/60 text-flansly-flan shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-flansly-surface/60 transition-colors"
                title="Abrir Menú"
                aria-label="Abrir menú de navegación"
            >
                <Menu size={20} />
            </button>

            {isOpen && (
                <button
                    type="button"
                    onClick={handleClose}
                    className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 md:hidden transition-all duration-300 w-full h-full border-none cursor-default"
                    aria-label="Cerrar menú"
                />
            )}

            <aside
                className={`
                    w-70 fixed top-0 bottom-0 left-0 h-screen bg-flansly-card border-r border-flansly-surface/40 
                    flex flex-col justify-between p-6 z-50 transition-transform duration-300 ease-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0
                `}
            >
                <div className="space-y-8 relative">
                    <button
                        onClick={handleClose}
                        className="md:hidden absolute -top-2 right-0 text-flansly-muted hover:text-flansly-flan p-1.5 rounded-xl hover:bg-flansly-surface/40 transition-colors cursor-pointer"
                        title="Cerrar Menú"
                        aria-label="Cerrar menú de navegación"
                    >
                        <X size={18} />
                    </button>

                    <div className="flex items-center gap-3">
                        <span className="text-flansly-flan animate-[checkmark-pop_0.4s_ease]">
                            <CakeSlice size={24} />
                        </span>
                        <div>
                            <h1 className="text-lg font-bold text-flansly-flan font-['Manrope'] tracking-tight">Flansly</h1>
                            <span className="text-[10px] font-mono text-flansly-caramel uppercase tracking-widest font-semibold">{user?.role}</span>
                        </div>
                    </div>

                    <nav className="flex flex-col gap-2 font-['Inter'] text-sm">
                        {menuLinks.map((link) => {
                            const isActive = location.pathname === link.to;
                            const IconComponent = link.icon;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={handleClose}
                                    className={`
                                        px-4 py-3 rounded-xl transition-all duration-200 font-medium flex items-center gap-2
                                        ${isActive 
                                            ? 'text-flansly-flan bg-flansly-surface/60 font-semibold shadow-[inset_0_0_8px_rgba(180,83,9,0.08)] border-l-2 border-flansly-caramel' 
                                            : 'text-flansly-muted hover:text-flansly-flan hover:bg-flansly-surface/40'
                                        }
                                    `}
                                >
                                    <IconComponent size={16} />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t border-flansly-surface/40 pt-4 flex items-center justify-between">
                    <div className="min-w-0 pr-2">
                        <p className="text-sm font-semibold text-flansly-flan truncate">{user?.displayName}</p>
                        <p className="text-[11px] text-flansly-muted truncate">@{user?.username}</p>
                    </div>
                    <button 
                        onClick={logout}
                        className="text-flansly-muted hover:text-flansly-error p-2 rounded-xl hover:bg-flansly-surface/40 transition-colors cursor-pointer shrink-0"
                        title="Cerrar Sesión"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </aside>
        </>
    );
};
