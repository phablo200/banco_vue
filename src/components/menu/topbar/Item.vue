<template>
    <div class="item">
        <b-dropdown-item href="javascript:;" @click="btnNavigationRoute">
            <b-icon :icon="icon" />
            {{ description }}
        </b-dropdown-item>
    </div>
</template>

<script>
    export default {
        props: [
            'description',
            'to',
            'icon'
        ],
        methods: {
            btnNavigationRoute () {
                this.$router.push({name: `${this.to}`});
            }
        }
    }
</script>

<style lang="css" scoped>

</style>