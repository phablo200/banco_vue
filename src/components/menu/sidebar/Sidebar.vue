<template>
   <div>  
    <div class="sidebar" ref='sidebar'>
            <nav id="sidebar">
                <div class='col-md-12 box-icon'>
                    <b-icon icon="blockquote-left"/>
                </div>
    
                <ul class="list-unstyled components">
                    <Action icon="house"
                        plusClass="father"
                        label="Dashboard"
                        to="dashboard"
                    />
                    <Action icon="power"
                        plusClass="father"
                        label="Sair"
                        @action="btnLogout"/>
                </ul>
                <hr/>
            </nav>
        </div>
    </div>
</template>

<script>
    import Action from './Action';
    import jwtService from '../../../services/jwt.service';
    import storageService from '../../../services/storage.service';
    import { localServer } from '../../../config';
    import 'jquery/jquery';

    export default {
        components: {
            Action
        },
        methods: {
            btnLogout () {
                window.localStorage.removeItem('user');
                jwtService.destroyToken();
                window.location.href=`${localServer}/login`;
            }
        }
    }
</script>

<style lang="css" scoped>
    .components {
        overflow: auto; 
        height: 600px
    }
    ::-webkit-scrollbar-track {
        background-color: #F4F4F4;
    }
    ::-webkit-scrollbar {
        width: 6px;
        background: #F4F4F4;
    }
    ::-webkit-scrollbar-thumb {
        background: #dad7d7;
    }
    ::v-deep #sidebar {
        min-width: 250px;
        max-width: 250px;
        position: fixed;
        margin-top: 70px;
        height: 100%;
        background: #2c2e3e !important;
        color: #b8bac3;
        padding: 10px;
    }
    ::v-deep #sidebar.active {
        margin-left: -250px;
    }
    ::v-deep #sidebar a[data-toggle="collapse"] {
        position: relative;
    }
    ::v-deep #sidebar .dropdown-toggle::after {
        display: block;
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
    }

    @media (max-width: 1250px) {
        #sidebar {
            min-width: 95px;
            max-width: 95px;
        }
        #sidebar.active {
            margin-left: 0;
        }
    }

    ::v-deep #sidebar p {
        margin-top: 10%;
        font-size: 1.0em;
        font-weight: 300;
        line-height: 1.0em;
    }

    ::v-deep #sidebar a, a:hover, a:focus {
        color: inherit;
        text-decoration: none;
        transition: all 0.3s;
    }

    ::v-deep #sidebar .sidebar-header {
        margin-top: -5%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #666;
    }

    ::v-deep #sidebar ul.components {
        padding: 20px 0;
    }

    ::v-deep #sidebar ul p {
        color: #fff;
        padding: 10px;
    }

    ::v-deep #sidebar ul li a {
        padding: 10px;        
        font-size: 1.0em;
        display: block;
    }

    ::v-deep #sidebar ul li a:hover {
        color: #fff;
        background: #000e3e;
        border-radius: 5px;
    }
    ::v-deep #sidebar ul li.active > a{
        color: #fff;
        background: #222;
        border-radius: 5px;
    }
    ::v-deep #sidebar ul ul a {
        font-size: 1.0em !important;
        padding: 5px;
        color: #fff;
        background: #000e3e;
        border-radius: 5px;
        margin-top: 5px;
    }

    ::v-deep #sidebar ul ul a:hover {
        background: #f5f5f5 !important;
        color: #222 !important;
    }
    
    ::v-deep .b-icon {
        font-size: 20px !important;
    }

    .box-icon {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        cursor:pointer;
    }
</style>