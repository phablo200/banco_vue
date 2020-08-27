import service from '../../../services/generic.services';

export default {
    async auth ({ commit }, payload) {
        const resp = await service
            .initialize('login')
            .store(payload);

        if (resp) {
            await commit('AUTH', resp.data.data);
        }
    }
} 
