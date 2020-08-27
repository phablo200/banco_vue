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

const ApiService = {
    baseURL: `${server}`,
    init () {
        Vue.use(VueAxios, axios);
        this.setupHeaders();    
        Vue.axios.interceptors.response.use( _response => {
            store.commit(PURGE_ERRORS);
            return _response;
        }, this.handlerError);
    },
    setupHeaders () {
        Vue.axios.defaults.headers.common['Authorization'] = `bearer ${jwtService.getToken()}`;
    },
    async handlerError (_error) {
        store.commit(
            PURGE_ERRORS
        );

        switch (parseInt(_error.response.status)) {
            case 400:
                await store.commit(PUSH_ERROR, _error.response.data);
                break;
            case 401:
                await store.commit(PUSH_ERROR, _error.response.data);
                break;
            case 404:
                await store.commit(PUSH_ERROR, _error.response.data);
                break;
            case 405:
                await store.commit(PUSH_ERROR, _error.response.data);
                break;
            case 406:
                await store.commit(PUSH_ERROR, _error.response.data);
                break;
        }
    },
    async query (resource, data) {
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