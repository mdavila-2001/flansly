// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './application/context/AuthProvider';
import { AuthLayout } from './presentation/layouts/AuthLayout';
import { DashboardLayout } from './presentation/layouts/DashboardLayout';
import { PrivateRoute } from './presentation/routes/PrivateRoute';
import { RoleRoute } from './presentation/routes/RoleRoute';

// Páginas Reales de Acceso (US2)
import { Login } from './presentation/pages/Login';
import { Register } from './presentation/pages/Register';

// Páginas Reales de Creadores (US3)
import { CreatorDashboard } from './presentation/pages/CreatorDashboard';
import { CreatorProfile } from './presentation/pages/CreatorProfile';

// Componentes Mock Temporales para Validar el Enrutamiento de Seguidores (US4 - Pendiente)
const MockFeed = () => <div className="text-flansly-flan text-xl font-bold font-['Manrope']">Muro de Publicaciones Desbloqueadas (US4)</div>;

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* ── RUTAS PUBLICAS (Módulo de Acceso) ── */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    {/* ── RUTAS PRIVADAS GENERALES (Protegidas por Sesión) ── */}
                    <Route element={<PrivateRoute />}>
                        <Route element={<DashboardLayout />}>
                            
                            {/* Sub-Zona Exclusiva para Creadores de Contenido (US3) */}
                            <Route element={<RoleRoute allowedRoles={['creator']} />}>
                                <Route path="/creator/dashboard" element={<CreatorDashboard />} />
                                <Route path="/creator/profile" element={<CreatorProfile />} />
                            </Route>

                            {/* Sub-Zona Exclusiva para Seguidores/Donadores (US4) */}
                            <Route element={<RoleRoute allowedRoles={['follower']} />}>
                                <Route path="/follower/feed" element={<MockFeed />} />
                                <Route path="/follower/favorites" element={<div className="text-flansly-flan">Listado de Favoritos (US4)</div>} />
                            </Route>

                        </Route>
                    </Route>

                    {/* Redirección por defecto ante rutas inexistentes */}
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;