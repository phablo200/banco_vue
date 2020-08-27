import getters from './getters';
import actions from './actions';
import mutations from './mutations';
export default {
    namespaced: true,
    state: {
        conta: {},
        saldo: {},
        extrato: [],
        movimento: {}
    },
    getters,
    actions,
    mutations  
};