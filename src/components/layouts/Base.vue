<template>
    <div class="">
        <div class="topbar">
            <Topbar/>
        </div>
        <div class="wrapper">
            <Sidebar/>
            <div id="content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import Sidebar from '@/components/menu/sidebar/Sidebar';
    import Topbar from '@/components/menu/topbar/Topbar';
    export default {
        components: {
            Sidebar,
            Topbar
        }
    }
</script>

<style lang="css" scoped>
    .wrapper #content {
        width: 100%;
        box-sizing: border-box;
        padding: 5px;    
        margin-left: 250px;
        margin-top: 70px;
    }

    @media (max-width: 1250px) {
        .wrapper #content {
            width: 100%;
            box-sizing: border-box;
            padding: 5px;    
            margin-left: 100px;
        }
    }

    .wrapper {
        display: flex;
        width: 100%;
        align-items: stretch;
    }
</style>