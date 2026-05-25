import { api } from '../api/axios.instance';

export class CreatorRepository {
    async updateProfile(formData) {
        const response = await api.put('/creator/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    async updateGoal({ title, description, targetFlans }) {
        const response = await api.put('/creator/goal', { title, description, targetFlans });
        return response.data;
    }

    async getActiveGoal() {
        const response = await api.get('/creator/goal');
        return response.data;
    }

    async createPost(formData) {
        const response = await api.post('/creator/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }

    async getPosts() {
        const response = await api.get('/creator/posts');
        return response.data;
    }

    async getReports(startDate, endDate) {
        const response = await api.get('/creator/reports', {
            params: {
                start_date: startDate,
                end_date: endDate
            }
        });
        return response.data;
    }
}

export const creatorRepository = new CreatorRepository();
