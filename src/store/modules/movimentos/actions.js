import genericService from '../../../services/generic.services';

export default {
    async extrato ({ commit }, payload) {
        const resp = await genericService
            .initialize('movimentos/extrato')
            .fetch(payload);

        await commit(
            'SET_EXTRATO', 
            resp.data
        );
    },
    async saldo ({ commit }, payload) {
        const resp = await genericService
            .initialize('movimentos/saldo')
            .fetch(payload);

        await commit(
            'SET_SALDO', 
            resp.data.data
        );
    },
    async saque ({ commit }, payload) {
        const resp = await genericService
            .initialize('movimentos/saque')
            .store(payload);

        if (resp) {
            await commit(
                'SET_MOVIMENTO',
                resp.data.data
            );
        }  
    },
    async deposito ({ commit }, payload) {
        const resp = await genericService
            .initialize('movimentos/deposito')
            .store(payload);

        if (resp) {
            Object.keys(resp.data.data).includes('token') 
                ? commit ('SET_CONTA', resp.data.data)
                : commit ('SET_MOVIMENTO', resp.data.data); 
        }
    },
}