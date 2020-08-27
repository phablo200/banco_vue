<template>
  <div class="menu-navbar">
      <b-navbar id="topbar" toggleable="lg" type="light">
        <b-navbar-brand href="#" id="logo">
          <img :src='`${asset}/banco.png`' />
          <h5>Capgemini</h5>           
        </b-navbar-brand>
        <div style='display: flex; justify-content: space-between; width: 90%; margin-right: 10%'>
            <div>
              <h6>
                  <b>{{user.nome}}</b>
              </h6>
            </div>

            <div>
              <h6>
                  Documento: 
                  &nbsp;
                  <b>{{user.documento}}</b>
              </h6>
            </div>

            <div>
              <h6>
                Agência
                &nbsp;
                <b>{{user.nu_agencia}}</b>
              </h6>
            </div>

            <div>
              <h6>
                Conta
                <b>{{user.nu_conta}}</b>
              </h6>
            </div>
        </div> 

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-icon icon="person" v-b-tooltip.hover title="Opções do usuário"/>
            <b-nav-item-dropdown right id="dropdown-item">
              <b-dropdown-item href="javascript:;" @click="btnLogout">
                <b-icon icon="power" />
                Sair
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
  </div>
</template>

<script>

import jwtService from '../../../services/jwt.service';
import { asset } from '../../../config';
import { localServer } from '../../../config';

export default {
    data () {
      return {
        user: {},
        asset
      }
    },

    mounted () {
      this.user = JSON.parse(
          window.localStorage.getItem('user')
      );
    },

    methods: {
        btnLogout() {
            window.localStorage.removeItem('user');
            jwtService.destroyToken();

            window.location.href=`${localServer}/login`;
        }
    }
}
</script>

<style lang="css" scoped>
  #topbar {
    background: white !important; 
    border: 0; 
    box-shadow: none;
    height: 70px;
    box-sizing: border-box;
    position: fixed;
    z-index: 1;
    width: 100%;
    top:0;
  }

  #topbar #logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 300px;
    margin-left: 2%;
  }


  #topbar #logo img{
    margin-top: 2%;
    width: 30px;
  }

  #topbar #logo h5{
    margin-top: 4%;
    margin-left: 5%;
    font-weight:600;
    color: #434349;
  }

  .ml-auto {
    display: flex !important;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }

  .ml-auto .b-icon {
    font-size: 30px;
    cursor:pointer;
  }

  .ml-auto #dropdown-item {
    margin-left: -1%;
    margin-top: 0.5%;
  }
</style>