import { api } from '../api/axios.instance';

export class FollowerRepository {
    async getAllCreators() {
        const response = await api.get('/follower/creators');
        return response.data;
    }

    async getCreatorProfile(creatorId) {
        const response = await api.get(`/follower/creators/${creatorId}`);
        return response.data;
    }

    async toggleFavorite(creatorId) {
        const response = await api.post(`/follower/favorites/${creatorId}`);
        return response.data;
    }

    async getFollowerFeed() {
        const response = await api.get('/follower/feed');
        return response.data;
    }

    async donate(creatorId, quantity) {
        const response = await api.post('/follower/donate', { creatorId, quantity });
        return response.data;
    }

    async createComment(postId, content) {
        const response = await api.post(`/follower/posts/${postId}/comments`, { content });
        return response.data;
    }
}

export const followerRepository = new FollowerRepository();