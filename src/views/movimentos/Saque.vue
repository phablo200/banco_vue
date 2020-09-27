<template>
	<div>
		<br/>
		<div style='padding-left: 10%; padding-right: 10%'>
		<form>
			<div class='crud-form'>
				<div id="form">
		            <div id="head">
		                <h6>
		                    <span>{{ title }}</span>
		                </h6>
		            </div>

		            <div id="body">
		            	<div class='form-group'>
							<label for="saldo" v-if='!comprovante'>
			           	 		Saldo atual: <b>R$ {{ saldo }}</b>
			        		</label>		
			        	</div>
		            	<template v-if='!confirmar'>
							<div class='form-group'>
								<label for="valor">
				           	 		Valor de saque *
				        		</label>		
				        		<b-input type="text" 
				                    name="valor" 
				                    autocomplete="off"
				                    v-model='movimento.valor'
									v-money='money' 
				                />
							</div>
							<Error :errors="errors" source="valor" />
							<hr/>
							<button class='btn btn-primary' @click.prevent='btnProximo'>
								Próximo
							</button>
							<button class='btn btn-dark' style='float:right;' @click.prevent='btnSair'>
								Sair
							</button>
						</template>
						<template v-else-if='confirmar && !comprovante'>
							<div class='form-group'>
								<label for="valor">
				           	 		Valor *
				        		</label>		
				        		<b-input type="text" 
				                    name="valor" 
				                    autocomplete="off"
				                    v-model='movimento.valor'
									readonly
				                />
							</div>
						
							<div class='form-group'>
								<label for="password">
				           	 		Dígite novamente sua senha *
				        		</label>

				        		<b-input type="password" 
				                    name="password"
				                    autocomplete="off"
				                    v-model='movimento.password'
				                />
							</div>
							<Error :errors="errors" source="password" />
							<hr/>

							<button class='btn btn-dark' @click.prevent='btnVoltar'>
								Voltar
							</button>
							&nbsp;
							<button class='btn btn-primary' @click.prevent='btnSaque'>
								Confirmar
							</button>
							<button class='btn btn-dark' style='float:right;' @click.prevent='btnSair'>
								Sair
							</button>
						</template>
						<template v-else-if='confirmar && comprovante && saqueMovimento'>
							<div class='box-comprovante'>
								<div class='box-comprovante-inner'>
									<small>Valor</small>
									<br/>
									<h4>
										R$ {{saqueMovimento.money_valor.replace('-', '')}}
									</h4>
								</div>

								<div class='box-comprovante-inner'>
									<small>Data do saque</small>
									<br/>
									<span>{{saqueMovimento.data_hora}}</span>
								</div>

								<div class='box-comprovante-inner'>
									<small>Agência</small>
									<br/>
									<b>{{saqueMovimento.agencia.numero}}</b>
								</div>

								<div class='box-comprovante-inner'>
									<small>Conta</small>
									<br/>									
									<b>{{saqueMovimento.conta.numero}}</b>
								</div>

								<div class='box-comprovante-inner'>
									<small>Documento</small>
									<br/>
									<b>{{saqueMovimento.usuario.documento}}</b>
								</div>

								<div class='box-comprovante-inner'>
									<small>Tipo</small>
									<br/>
									<b>{{saqueMovimento.tipoMovimento.descricao}}</b>
								</div>
								<hr/>
							</div>

								<button class='btn btn-dark' @click.prevent='btnSair'>
									Sair
								</button>
						</template>
			    	</div>
	        	</div>
        	</div>
		</form>

		</div>
	</div>
</template>

<script>

import Error from '@/components/form/Error';
import { VMoney } from 'v-money';

export default {
	components: {
		Error,
	},
    data () {
        return {
         	movimento: {
         		valor: null,
         		senha: null
         	},
			money: {
                decimal: ',',
                thousands: '.',
                precision: 2,
                masked: false
            },
         	confirmar: false,
			comprovante: false
        }	
    },
	directives: {
		money: VMoney
	},
    computed: {
    	saldo () {
    		return this.$store.getters['movimentos/saldo'].money_valor || null;
    	},
		title () {
			if (!this.confirmar) {
				return 'Preencha os dados corretamente e realize um saque';
			} else if (this.confirmar && !this.comprovante) {
				return 'Confirme seu saque.';
			} else if (this.confirmar && this.comprovante) {
				return 'Comprovante de saque.';
			}
			return '';
		},
		saqueMovimento () {
			return this.$store.getters['movimentos/movimento'] || {};
		},
		errors () {
			return this.$store.getters['errors'];
		}
    },
    async created () {
    	this.$forceUpdate();
    	await this.getSaldo();
    },
    methods: {
    	async getSaldo () {
    		this.showLoading();
            await this.$store.dispatch('movimentos/saldo');
            this.hideLoading();
        },
    	btnLimpar () {
    		this.movimento['valor'] = null;
    	},
    	async btnProximo () {
    		this.showLoading();
            await this.$store.dispatch('movimentos/saque', this.movimento);
			this.hideLoading();
			
            if (this.errors && this.errors.valor) {
            	return;
            }
            delete this.errors['password'];
            this.confirmar = true;
    	},

    	async btnSaque () {
    		this.showLoading();
            await this.$store.dispatch('movimentos/saque', this.movimento);
            this.hideLoading();
            
            if (this.errors.password) {
            	return;
            }
            await this.$swal("Sucesso !", "Saque efetivado com sucesso !", "success");
            this.comprovante = true;
    	},

    	btnVoltar () {
    		this.confirmar = false;
    	},

		btnSair () {
			this.confirmar = false;
			this.$router.push({
				name: 'dashboard'
			});
		}
    }
}
</script>

<style scoped>
	.box-comprovante {
		width: 40%;
		display: flex;
		flex-direction: column;
	}

	.box-comprovante-inner {
		margin-top: 2%;
	}
</style>