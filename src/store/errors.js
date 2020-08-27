import {
    PURGE_ERRORS,
    PUSH_ERROR
} from './mutations.type';

const state = {
    errors: []
};

const getters = {
    errors (_state) {
        return _state.errors
    }
};
const actions = {};

const mutations = {
    [PURGE_ERRORS](state) {
        state.errors = [];
    },
    [PUSH_ERROR](state, error) {
        state.errors = error.errors;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};