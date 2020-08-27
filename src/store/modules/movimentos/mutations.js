export default {   
    async SET_SALDO (state, payload) {
        state.saldo = payload;
    },

    async SET_CONTA (state, payload) {
        state.conta  = payload;
    },

    async SET_MOVIMENTO (state, payload) {
        state.movimento = payload;
    },

    async SET_EXTRATO (state, payload) {
        state.extrato = [];
        state.extrato['data'] = payload.data;
        state.extrato['meta'] = payload.meta;
    }
}; 