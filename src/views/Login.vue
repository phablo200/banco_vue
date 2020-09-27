<template>
    <div class="d-flex">
        <div class="container-flex">
            <div class="container-flex-login">
                <form>
                    <div class="container-flex-img">
                        <img :src='`${asset}/banco.png`' width='30%' />
                    </div>
                    
                    <br/>
                    <Error :errors="errors" source="generic" />
                    <div class="container-flex-login-item">
                        <b-icon icon="person" />
                        <b-input type="text" 
                            name="documento" 
                            autocomplete="off" 
                            placeholder="CPF/CNPJ"
                            v-model="user.documento"
                            @keyup.enter="btnLogin"
                        />
                    </div>

                    <Error :errors="errors" source="documento" />
                    <div class="container-flex-login-item">
                        <b-icon icon="lock"/>
                        <b-input type="password" 
                            name="password" 
                            autocomplete="off"
                            placeholder="Senha"
                            v-model="user.password"
                            @keyup.enter="btnLogin"
                        />
                    </div>

                    <Error :errors="errors" source="password" />
                    <div class="container-flex-action">
                        <b-button variant="outline-dark"
                            @click.prevent="btnLogin">
                            <b-icon icon="lock"/>
                            Entrar
                        </b-button>
                    </div>

                    <hr />
                    <div class='container-flex-action box-deposito'>
                        <i>
                            <img :src='`${asset}/saque.png`' width='30px' />
                        </i>
                        &nbsp;&nbsp;&nbsp;
                        <a href='#' @click.prevent='btnDeposito'>Faça um depósito</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Error from '@/components/form/Error';
import { localServer, asset } from '../src/config';
import jwtService from '@/services/jwt.service';
import apiService from '@/services/api.service';

export default {
    components: {
        Error
    },
    data () {
        return {
            user: {
                documento: '',
                password: ''
            },
            asset
        }
    },
    computed: {
        errors () {
            return this.$store.getters['errors'];
        }
    },
    methods: {
        async btnLogin () {
            this.showLoading();
            await this.$store.dispatch('login/auth', this.user);

            if (!Object.keys(this.errors).length) {            
                await window.localStorage.setItem(
                    'user', 
                    JSON.stringify(this.$store.getters['login/user'])
                );

                await jwtService.setToken(
                    this.$store.getters['login/user'].token
                );

                apiService.init();
                window.location.href = `${localServer}/dashboard`;
            }
            this.hideLoading();
        },

        btnDeposito () {
            this.$router.push({
                name: 'movimentos.deposito'
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

.container-flex-login button {
    width: 100%;
    height: 40px;
    margin-top: 15px;
    cursor: pointer;
    border-radius: 0;
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

.box-deposito a {
    margin-left: 2%;
    margin-top: 1%;
}
</style>