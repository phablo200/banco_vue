import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { server } from '../config';
import jwtService from './jwt.service';
import store from '../store/store';
import {
    PURGE_ERRORS,
    PUSH_ERROR
} from '@/store/mutations.type.js';
import vueLoading from 'vue-loading-overlay';

const ApiService = {
    baseURL: `${server}`,
    init () {
        Vue.use(VueAxios, axios);

        this.setupHeaders();    
        Vue.axios.interceptors.response.use( _response => {
            return _response;
        }, this.handlerError);

        Vue.axios.interceptors.request.use( _request => {
            store.commit(PURGE_ERRORS);
            return _request;
        });
    },
    
    setupHeaders () {
        Vue.axios.defaults.headers.common["Content-Type"] = 'application/json';
        Vue.axios.defaults.headers.common["Accepts"] = "application/json";
        Vue.axios.defaults.headers.common['Authorization'] = `bearer ${jwtService.getToken()}`;

        ["get", "post", "put", "patch"].forEach(_method => {
            Vue.axios.defaults.headers[_method]["Content-Type"] = "application/json";
        });
    },

    async handlerError (_error) { 
        store.commit(
            PURGE_ERRORS
        );

        if (_error == 'Error: Network Error') {
            Vue.$swal(
                "Atenção !", 
                "Não foi possível realizar a conexão com o servidor.", 
                "warning"
            );
            await store.commit(PUSH_ERROR, _error);
            return;
        }

        switch (parseInt(_error.response.status)) {
            case 400:
                await store.commit(
                    PUSH_ERROR, 
                    _error.response.data
                );
                break;
            case 401:
                try {
                    const error = _error.response.data['errors']['generic'][0];
                    if (error === 'Sessão expirada !, faça o login novamente') {
                        await Vue.$swal(
                            "Atenção !", 
                            "Sua sessão expirou. Por favor faça o login novamente.", 
                            "warning"
                        );

                        window.localStorage.removeItem('user');
                        jwtService.destroyToken();
                        location.href = '/login';
                    }
                } catch (e) {}
                await store.commit(
                    PUSH_ERROR, 
                    _error.response.data
                );

                break;
            case 404:
                await store.commit(
                    PUSH_ERROR, 
                    _error.response.data
                );
                break;
            case 405:
                await store.commit(PUSH_ERROR, _error.response.data);
                break;
            case 406:
                await store.commit(PUSH_ERROR, _error.response.data);
                break;
            case 500:
                Vue.$swal(
                    "Atenção !", 
                    "Houve um erro genérico no servidor.", 
                    "warning"
                );

                await store.commit(PUSH_ERROR, _error);
                break;
        }
    },
    async fetch (resource, data) {
        return await Vue.axios.get(`${this.baseURL}/${resource}`, {
            params: data
        });
    },
    async post (resource, data) {
        return await Vue.axios.post(
            `${this.baseURL}/${resource}`, 
            data
        );
    },
    async get (resource, id) {
        return await Vue.axios.get(
            `${this.baseURL}/${resource}/${id}`
        );
    },
    async put (resource, data) {
        const { id } = data;
        return await Vue.axios.put(
            `${this.baseURL}/${resource}/${id}`, 
            data
        );
    },
    async delete(resource, id) {
        return await Vue.axios.delete(
            `${this.baseURL}/${resource}/${id}`
        );
    }
};
export default ApiService;