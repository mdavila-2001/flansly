import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';

const decodeJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replaceAll('-', '+').replaceAll('_', '/');
        const jsonPayload = decodeURIComponent(
            globalThis.atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.codePointAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Error al decodificar el token JWT:', e);
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('flansly_token'));
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('flansly_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (token && user) {
            localStorage.setItem('flansly_token', token);
            localStorage.setItem('flansly_user', JSON.stringify(user));
        } else {
            localStorage.removeItem('flansly_token');
            localStorage.removeItem('flansly_user');
        }
    }, [token, user]);

    const login = useCallback((jwtToken) => {
        const decoded = decodeJwt(jwtToken);
        if (!decoded) throw new Error('Token JWT corrupto o inválido.');

        setToken(jwtToken);
        setUser({
            id: decoded.id,
            username: decoded.username,
            displayName: decoded.displayName,
            role: decoded.role
        });
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        token,
        isAuthenticated: !!token,
        role: user?.role || null,
        login,
        logout
    }), [user, token, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};
