// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './application/context/AuthProvider';
import { AuthLayout } from './presentation/layouts/AuthLayout';
import { DashboardLayout } from './presentation/layouts/DashboardLayout';
import { PrivateRoute } from './presentation/routes/PrivateRoute';
import { RoleRoute } from './presentation/routes/RoleRoute';

import { Login } from './presentation/pages/Login';
import { Register } from './presentation/pages/Register';

import { CreatorDashboard } from './presentation/pages/CreatorDashboard';
import { CreatorProfile } from './presentation/pages/CreatorProfile';
import { CreatorReports } from './presentation/pages/CreatorReports';

import { FollowerFeed } from './presentation/pages/follower/FollowerFeed';
import { ExploreCreators } from './presentation/pages/follower/ExploreCreators';
import { CreatorProfileView } from './presentation/pages/follower/CreatorProfileView';
import { FollowerFavorites } from './presentation/pages/follower/FollowerFavorites';
import { FollowerHistory } from './presentation/pages/follower/FollowerHistory';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>

                    <Route element={<PrivateRoute />}>
                        <Route element={<DashboardLayout />}>
                            
                            <Route element={<RoleRoute allowedRoles={['creator']} />}>
                                <Route path="/creator/dashboard" element={<CreatorDashboard />} />
                                <Route path="/creator/profile" element={<CreatorProfile />} />
                                <Route path="/creator/reports" element={<CreatorReports />} />
                            </Route>

                            <Route element={<RoleRoute allowedRoles={['follower']} />}>
                                <Route path="/follower/feed" element={<FollowerFeed />} />
                                <Route path="/follower/explore" element={<ExploreCreators />} />
                                <Route path="/follower/creator/:id" element={<CreatorProfileView />} />
                                <Route path="/follower/favorites" element={<FollowerFavorites />} />
                                <Route path="/follower/history" element={<FollowerHistory />} />
                            </Route>

                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;