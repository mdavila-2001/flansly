import { api } from '../api/axios.instance';

export class AuthRepository {
    async login(identity, password) {
        const response = await api.post('/auth/login', { identity, password });
        return response.data;
    }

    async getMe() {
        const response = await api.get('/auth/me');
        return response.data;
    }

    async register(userData) {
        if (userData.avatar || userData.banner) {
            const formData = new FormData();
            formData.append('username', userData.username);
            formData.append('email', userData.email);
            formData.append('password', userData.password);
            formData.append('displayName', userData.displayName);
            formData.append('role', userData.role);
            if (userData.avatar) {
                formData.append('avatar', userData.avatar);
            }
            if (userData.banner) {
                formData.append('banner', userData.banner);
            }
            const response = await api.post('/auth/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } else {
            const response = await api.post('/auth/register', userData);
            return response.data;
        }
    }
}

export const authRepository = new AuthRepository();
