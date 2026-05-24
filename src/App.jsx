// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './application/context/AuthProvider';
import { AuthLayout } from './presentation/layouts/AuthLayout';
import { DashboardLayout } from './presentation/layouts/DashboardLayout';
import { PrivateRoute } from './presentation/routes/PrivateRoute';
import { RoleRoute } from './presentation/routes/RoleRoute';

// Componentes Mock Temporales para Validar el Enrutamiento (Sebastián los reemplazará en las siguientes US)
const MockLogin = () => <div className="text-center text-sm text-flansly-muted">Pantalla de Login (US2 - Pendiente)</div>;
const MockDashboard = () => <div className="text-flansly-flan text-xl font-bold font-['Manrope']">Bienvenido al Panel del Creador (US3)</div>;
const MockFeed = () => <div className="text-flansly-flan text-xl font-bold font-['Manrope']">Muro de Publicaciones Desbloqueadas (US4)</div>;

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* ── RUTAS PUBLICAS (Módulo de Acceso) ── */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<MockLogin />} />
                        <Route path="/register" element={<div className="text-center text-sm text-flansly-muted">Pantalla de Registro (US2)</div>} />
                    </Route>

                    {/* ── RUTAS PRIVADAS GENERALES (Protegidas por Sesión) ── */}
                    <Route element={<PrivateRoute />}>
                        <Route element={<DashboardLayout />}>
                            
                            {/* Sub-Zona Exclusiva para Creadores de Contenido */}
                            <Route element={<RoleRoute allowedRoles={['creator']} />}>
                                <Route path="/creator/dashboard" element={<MockDashboard />} />
                                <Route path="/creator/profile" element={<div className="text-flansly-flan">Formulario de Edición Multimedia (US3)</div>} />
                            </Route>

                            {/* Sub-Zona Exclusiva para Seguidores/Donadores */}
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