import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Saque from './views/movimentos/Saque';
import Saldo from './views/movimentos/Saldo';
import Deposito from './views/movimentos/Deposito';
import Extrato from './views/movimentos/Extrato';


Vue.use(Router);

const router = new Router({
    mode: 'history',
    
    routes: [
        {
            path: '/login',
            component: Login,
            name: 'login',
            meta: 'login',
        },

        {
            path: '/dashboard',
            component: Dashboard,
            name: 'dashboard',
            meta: 'dashboard',
        },

        {
            path: '/saldo',
            component: Saldo,
            name: 'movimentos.saldo',
            meta: 'movimetos.saldo',
        },

        {
            path: '/saque',
            component: Saque,
            name: 'movimentos.saque',
            meta: 'movimentos.saque',
        },
        {
            path: '/deposito',
            component: Deposito,
            name: 'movimentos.deposito',
            meta: 'movimentos.deposito',
        },
        {
            path: '/extrato',
            component: Extrato,
            name: 'movimentos.extrato',
            meta: 'movimentos.extrato',
        }
    ]
});

export default router;