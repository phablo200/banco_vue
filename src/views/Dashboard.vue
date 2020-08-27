<template>
    <div class="dashboard">
        <div class='box' @click.prevent='toExtrato'>
            <img :src='`${asset}/extrato.png`' width='70%' />
            <b>Extrato</b>
        </div>

        <div class='box' @click.prevent='toSaldo'>
            <img :src='`${asset}/saldo.png`' width='70%' />
            <b>Saldo</b>
        </div>

        <div class='box' @click.prevent='toSaque'>
            <img :src='`${asset}/saque.png`' width='70%' />
            <b>Saque</b>
        </div>

        <div class='box box-transferencia' @click.prevent='toTransferencia'>
            <img :src='`${asset}/transferencia.svg`' width='70%' />
            <b>Transferência</b>
        </div>
    </div>
</template>

<script>
import { asset } from '@/config';

export default {
    data () {
        return {
            asset
        }
    },
    async mounted () {
    
    },
    methods:{
        toExtrato () {
            this.$router.push({
                name: 'movimentos.extrato'
            });
        },

        toSaldo () {
            this.$router.push({
                name: 'movimentos.saldo'
            });
        },

        toSaque () {
            this.$router.push({
                name: 'movimentos.saque'
            });
        },

        toTransferencia () {
            this.$router.push({
                name: 'movimentos.transferencia'
            });
        }
    }
}
</script>

<style scoped>
    .dashboard {
        padding: 40px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }

    .dashboard .box {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border: 1px solid #333;
        padding: 1%;
        cursor: pointer;
        flex-direction: column;
    }


    .box:hover {
        background: #333;
        color: white;
        transition: 1s;
    }
    .box-transferencia img{
        margin-left: 5px;
    }
</style>