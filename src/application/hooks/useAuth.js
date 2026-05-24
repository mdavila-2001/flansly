import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authRepository } from '../../data/repositories/auth.repository';

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
        console.error('Error al decodificar el token JWT en useAuth:', e);
        return null;
    }
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    // Función utilitaria para parsear de manera robusta los errores del backend (Express)
    const parseError = (err) => {
        const rawError = err.response?.data?.error;
        if (Array.isArray(rawError)) {
            // Maneja arrays de mensajes de error de validación de Joi
            return rawError.join(', ');
        }
        if (typeof rawError === 'string') {
            // Maneja mensajes de error de reglas de negocio directas
            return rawError;
        }
        // Fallback por defecto si no viene de la forma Express esperada
        return err.response?.data?.message || err.message || 'Error inesperado de conexión con el servidor.';
    };

    const submitLogin = async (identity, password) => {
        setIsLoading(true);
        setAuthError(null);
        try {
            const responseData = await authRepository.login(identity, password);

            // CORTAFUEGOS DE CONTRATO: Extraer propiedad exacta del token
            const token = responseData?.token || responseData?.data?.token || responseData?.result?.token || responseData?.result;

            if (!token || typeof token !== 'string') {
                throw new Error('Token de autenticación no encontrado en la respuesta del servidor.');
            }

            context.login(token);

            const decoded = decodeJwt(token);
            return {
                token,
                role: decoded?.role || null,
                user: decoded
            };
        } catch (err) {
            console.error('Error durante submitLogin:', err);
            const msg = parseError(err);
            setAuthError(msg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const submitRegister = async (userData) => {
        setIsLoading(true);
        setAuthError(null);
        try {
            const responseData = await authRepository.register(userData);
            return responseData;
        } catch (err) {
            console.error('Error durante submitRegister:', err);
            const msg = parseError(err);
            setAuthError(msg);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        ...context,
        isLoading,
        authError,
        submitLogin,
        submitRegister
    };
};
