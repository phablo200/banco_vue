
<template>
     <div class="box-table">
        
        <br/>
        <br/>

        <div style='padding-left: 10%; padding-right: 10%;'>
            <h4 style='text-align: center;'>Acompanhe seu extrato</h4>
            <br/>
            <b-table id="genericTable"
                striped hover 
                :items="extrato" 
                :fields="fields"
                :responsive="true">
            </b-table>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            fields: [
                {'descricao': 
                    {
                        label: 'Descrição',
                        class: 'text-left'
                    }
                },
                {'tipoMovimento.descricao': 
                    {
                        label: 'Tipo',
                        class: 'text-left'
                    }
                },
                {'money_valor': 
                    {
                        label: 'Valor',
                        class: 'text-center'
                    }
                },
                {'data_hora': 
                    {
                        label: 'Data da Movimentação',
                        class: 'text-center'
                    }
                }
            ],
            items: []
        }
    },
    async created () {
        this.getExtrato();
    },
    computed: {
        extrato () {
            const extrato = this.$store.getters['movimentos/extrato'].data || [];
            const meta = this.$store.getters['movimentos/extrato'].meta || {};
            extrato.push({
                id: meta.registros,
                descricao: '',
                tipoMovimento: { descricao: 'Salto atualizado: ' },
                money_valor: meta.saldo,
                data_hora: ''
            });
            return extrato;
        },
        errors () {
            return this.$store.getters['errors'] || {};
        }
    },
    methods: {
    	async getExtrato () {
    		this.showLoading();
            await this.$store.dispatch('movimentos/extrato');
            if (Object.keys(this.errors).length) {
                
            }
            this.hideLoading();
        },
    }
}
</script>

<style>

</style>