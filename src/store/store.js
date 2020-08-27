import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login/index';
import movimentos from './modules/movimentos/index';
import errors from './errors';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        errors,
        login,
        movimentos
    }
});