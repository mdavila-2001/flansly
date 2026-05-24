import { api } from '../api/axios.instance';

export class AuthRepository {
    async login(identity, password) {
        const response = await api.post('/auth/login', { identity, password });
        return response.data;
    }

    async register(userData) {
        const response = await api.post('/auth/register', userData);
        return response.data;
    }
}

export const authRepository = new AuthRepository();
