<template>
	<div>
		<br/>
		<br/>
		<h3 style='text-align: center;'>
			Saldo atualizado
		</h3>
		<br/>
		<div class='box'>
			<div class='box-inner'>
				<h6>
					<small>Saldo:</small> 
					<br/>
					<h3>R$ {{saldo.money_valor}}</h3>
				</h6>

				<hr/>
				<h6>
					<small>
						<b-icon icon="calendar" />
						Data da operação
					</small>
					<br/> 
					<span>{{saldo.data_hora}}</span>
				</h6>

				<button class='btn btn-dark' style='float:right;' @click.prevent='btnSair'>
					Sair
				</button>
			</div>

		</div>
	</div>
</template>

<script>
export default {
    data () {
        return {
        	saldo: {
        		valor: null,
        		data_hora: null,
        		money_valor: null
        	}
        }
    },
    async mounted () {
    
    },

    created () {
    	this.getSaldo();
    },

    methods: {
    	async getSaldo () {
    		const loader=await this.$loading.show({
	            container: this.fullPage ? null : this.$refs.formContainer,
	            canCancel: true,
	            onCancel: this.onCancel,
	        });

            await this.$store.dispatch('movimentos/saldo');
            this.saldo = this.$store.getters['movimentos/saldo'];
            loader.hide();
        },
		btnSair () {
			this.$router.push({
				name: 'dashboard'
			});
		}
    }
}
</script>

<style scoped>
	.box {
		display: flex;
		justify-content: center;
	}

	.box-inner {
		width: 500px;
		background: white;
		box-sizing: border-box;
		box-shadow: 1px 1px 1px white;
		border: 1px solid #f0f0f0;
		padding: 2%;
	}
</style>