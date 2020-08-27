<template>
    <div class="d-flex">
        <div class="container-flex">
            <div class="container-flex-login">
                <form>
                    <h6 style='color: black; text-align: center;'>
                        {{ title }}
                    </h6>
                    <br/>
                    <template v-if='!confirmar'>
                        
                        <Error :errors="errors" source="generic" />

                        <div class="container-flex-login-item">
                            <b-input type="text" 
                                name="agencia" 
                                autocomplete="off" 
                                placeholder="Agência"
                                v-model="deposito.agencia"
                            />
                        </div>
                        <Error :errors="errors" source="agencia" />
                        
                        <div class="container-flex-login-item">
                            <b-input type="text" 
                                name="conta" 
                                autocomplete="off"
                                placeholder="Conta"
                                v-model="deposito.conta"
                            />
                        </div>
                        <Error :errors="errors" source="conta" />
                        
                        <div class="container-flex-login-item">
                            <b-input type="text" 
                                name="deposito" 
                                autocomplete="off"
                                placeholder="CPF/CNPJ"
                                v-model="deposito.documento"
                            />
                        </div>
                        <Error :errors="errors" source="documento" />
                        <div class="container-flex-login-item">
                            <b-input type="text" 
                                name="valor" 
                                autocomplete="off"
                                placeholder="Valor"
                                v-model='deposito.valor'
                                v-money='money'
                            />
                        </div>
                        <Error :errors="errors" source="valor" />
                        
                        <hr/>
                        <div>
                            <button class='btn btn-dark' @click.prevent='btnLimpar'>
                                Limpar
                            </button>
                            &nbsp;
                            <button class='btn btn-primary' @click.prevent='btnProximo'>
                                Próximo
                            </button>
                            <button class='btn btn-dark' style='float:right;' @click.prevent='btnSair'>
                                Sair
                            </button>
                        </div>
                    </template>
                    <template v-else-if='confirmar && !comprovante'>
                        <div class="container-show-item readonly">
                            <span>
                                Agencia:
                                &nbsp;
                                <b>{{deposito.agencia}}</b>
                            </span>
                        </div>
                        <div class="container-show-item readonly">
                            <span>
                                Conta:
                                &nbsp;
                                <b>{{deposito.conta}}</b>
                            </span>
                        </div>
                        <div class="container-show-item readonly">
                            <span>
                                CPF/CNPJ:
                                &nbsp;
                                <b>{{deposito.documento}}</b>
                            </span>
                        </div>
                        <div class="container-show-item readonly">
                            <span>
                                Nome completo:
                                &nbsp;
                                <b>{{conta.usuario.nome}}</b>
                            </span>
                        </div>
                        <div class="container-show-item readonly">
                            <span>
                                Valor:
                                &nbsp;
                                <b>R$ {{deposito.valor}}</b>
                            </span>
                        </div>
                        <hr/>

                        <div>
                            <button class='btn btn-dark' @click.prevent='btnVoltar'>
                                Voltar
                            </button>
                            &nbsp;
                            <button class='btn btn-primary' @click.prevent='btnConfirmar'>
                                Confirmar
                            </button>

                             <button class='btn btn-dark' style='float:right;' @click.prevent='btnSair'>
                                Sair
                            </button>
                        </div>
                    </template>

                    <template v-else-if='confirmar && comprovante'>
                        <div class='box-comprovante'>
                            <div class='box-comprovante-inner'>
                                <small>Valor:</small>
                                <br/>
                                <h4>
                                    <b>R$ {{movimento.money_valor}}</b>
                                </h4>
                            </div>


                            <div class='box-comprovante-inner'>
                                <small>Data do depósito</small>
                                <br/>
                                <span>
                                    <b>{{movimento.data_hora}}</b>
                                </span>
                            </div>

                            <div class='box-comprovante-inner'>
                                <small>Agência:</small>
                                <br/>
                                <span>
                                    <b>{{movimento.agencia.numero}}</b>
                                </span>
                            </div>

                            <div class='box-comprovante-inner'>
                                <small>Conta:</small>
                                <br/>
                                <span>
                                    <b>{{movimento.conta.numero}}</b>
                                </span>
                            </div>

                            <div class='box-comprovante-inner'>
                                <small>CPF/CNPJ:</small>
                                <br/>
                                <span>
                                    <b>{{movimento.usuario.documento}}</b>
                                </span>
                            </div>

                            <div class='box-comprovante-inner'>
                                <small>Nome:</small>
                                <br/>
                                <span>
                                    <b>{{movimento.usuario.nome}}</b>
                                </span>
                            </div>
                        </div>

                        <hr/>
                        <button class='btn btn-dark' style='float:right;' @click.prevent='btnSair'>
                            Sair
                        </button>
                    </template>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Error from '@/components/form/Error';
import { localServer, asset } from '@/config';
import jwtService from '@/services/jwt.service';
import apiService from '@/services/api.service';
import { VMoney } from 'v-money';

const depositoInicial = {
    documento: null,
    conta: null,
    agencia: null,
    valor: null
};

export default {
    components: {
        Error
    },
    data () {
        return {
            deposito: {
                ...depositoInicial
            },
            confirmar: false,
            comprovante: false,
            asset,
            money: {
                decimal: ',',
                thousands: '.',
                precision: 2,
                masked: false
            }
        }
    },
    directives: {
		money: VMoney
	},
    computed: {
        errors () {
            return this.$store.getters['errors'] || {};
        },
        conta () {
            return this.$store.getters['movimentos/conta'];
        },
        movimento () {
            return this.$store.getters['movimentos/movimento'];
        },
        title () {
            if (!this.confirmar) {
                return 'Faça um depósito';
            } else if (this.confirmar && !this.comprovante) {
                return 'Confirme as informações';
            } else if (this.confirmar && this.comprovante) {
                return 'Comprovante de depósito';
            }

            return '';
        }
    },
    methods: {
        btnLimpar () {
            this.deposito = { ...depositoInicial };
        },

        async depositar () {
            const loader=await this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
            });

            await this.$store.dispatch('movimentos/deposito', this.deposito);
            loader.hide();
        },

        async btnProximo () { 
            await this.depositar();
            if (!Object.keys(this.errors).length) {
                this.deposito.token = this.conta.token;
                this.confirmar = true;
            }
        },

        async btnConfirmar () {
            await this.depositar();
            if (!Object.keys(this.errors).length) {
                await this.$swal("Sucesso !", "Deposito efetivado com sucesso !", "success");
                this.comprovante = true;
            }
        },

        btnVoltar () {
            this.confirmar = false;
            this.comprovante = false;
        },

        btnSair () {
            this.confirmar = false;
            this.comprovante = false;

            this.$router.push({
                name: 'login'
            });
        }
    }

}
</script>

<style lang="css" scoped>
.d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: #666;
}

.container-flex {
    padding: 20px;
    display: flex;
    flex-direction: row;
    width: 30vw;
    box-shadow: 0 0 1 5px;
    background: white;
    border-radius: 5px;
    box-shadow: 1px 1px 1px 1px #f5f5f5;
}

@media (max-width: 1000px) {
    .container-flex {
        width: 40vw;
    }
}

@media (max-width: 600px) {
    .container-flex {
        width: 50vw;
    }
}

.container-flex-img {
    display: flex;
    justify-content: center;
}

.container-flex-action {
    display: flex;
    justify-content: center;
}

.container-flex-login {
    flex:10 60%;
    color:#fff;
    padding: 30px 15px;
}
.container-flex-login-item {
    display: flex;
    margin-top: 2%;
    align-items: center;
    justify-content: center;
    height: 45px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.container-show-item {
    display: flex;
    margin-top: 2%;
    align-items: center;
    justify-content: flex-start;
    height: 45px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black;
    padding-left: 2%;
}

.container-show-item span{
    display: flex;
    width: 100%;
    padding: 5%;
    justify-content: space-between;
}

.container-flex-login-item > .bi {
    width: 10%;
    color: black;
    font-size: 25px;
}

.container-flex-login-item > input {
    height: 45px;
    border: none;
    background: none;
    padding-left: 0;
    width: 90%;
}

.container-flex-login-item > input:focus {
    border: none;
    box-shadow: none;
}

.readonly {
    background: #ddd;
}

.box-comprovante {
    color: black;
    display: flex;
    flex-direction: column;
    margin-top: 3%;
}
</style>