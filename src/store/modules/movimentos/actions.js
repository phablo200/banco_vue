import ApiService from '../../../services/api.service';

export default {
    async extrato ({ commit }, payload) {
        const resp = await ApiService.fetch(
            'movimentos/extrato', 
            payload
        );
        if (!resp) return;

        await commit(
            'SET_EXTRATO', 
            resp.data
        );
    },
    async saldo ({ commit }, payload) {
        const resp = await ApiService.fetch(
            'movimentos/saldo',
            payload
        );
        if (!resp) return;

        await commit(
            'SET_SALDO', 
            resp.data.data
        );
    },
    async saque ({ commit }, payload) {
        const resp = await ApiService.post(
            'movimentos/saque',
            payload
        );
        if (!resp) return;

        await commit(
            'SET_MOVIMENTO',
            resp.data.data
        );
    },
    async deposito ({ commit }, payload) {
        const resp = await ApiService.post(
            'movimentos/deposito',
            payload    
        );

        if (!resp) return;

        Object.keys(resp.data.data).includes('token') 
                ? commit ('SET_CONTA', resp.data.data)
                : commit ('SET_MOVIMENTO', resp.data.data); 
    },
}