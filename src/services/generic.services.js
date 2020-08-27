
import ApiService from './api.service';

const GenericService = { 
    route: null,
    
    initialize(route) {
        this.route = route;

        return this;
    },

    async fetch (query) {
        return new Promise(resolve => {
            ApiService.query(`${this.route}`, query)
                .then(response => {
                    return resolve(response);
                });
        });
    },

    async store (request) {
        return new Promise(resolve => {
            ApiService.post(
                `${this.route}`, 
                request
            ).then(response => {
                return resolve(response);
            });
        });
    },

    async get (id) {
        return new Promise(resolve => {
            ApiService.get(`${this.route}`, id).then(response => resolve(response));
        });
    },

    async update (data) {
        return new Promise(resolve => {
            ApiService.put(`${this.route}`, data).then(response => resolve(response));
        });
    },

    async delete (id) {
        return new Promise(resolve => {
            ApiService.delete(`${this.route}`, id).then(response => resolve(response));
        });
    },
    
    async generic (route, query) {
        const newRoute = this.route
            ? `${this.route}/${route}`
            : route;

        return new Promise(resolve => {
            ApiService.query(newRoute, query).then(response => resolve(response));
        });
    }
};

export default GenericService;
