import ApiService from '../../../services/api.service';

export default {
    async auth ({ commit }, payload) {
        const resp = await ApiService.post(
            'login',
            payload
        );

        if (resp) {
            await commit('AUTH', resp.data.data);
        }
    }
} 
