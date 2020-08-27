<template>
    <div class="module">
        <li>
            <b-link v-b-tooltip.hover :title="title" @click.prevent="action" href="javascript:;" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">
                <b-icon :icon="icon" />
                <span>{{ label }}</span>
            </b-link>
            
            <ul :class="`list-unstyled ${toogleColapse}`" :id="id">    
                <slot></slot>
            </ul>
        </li>
    </div>
</template>
<script>
export default {
    props: [
        'label',
        'icon',
        'id'
    ],
    data () {
        return {
            collapse: false,
            title: ''
        }
    },
    computed: {
        toogleColapse () {
            return this.collapse ? '' : 'collapse';
        }
    },
    created () {
        this.title = this.label;
        if (window.innerWidth > 1250) {
            this.title = '';
        }
    },
    methods: {
        action () {
            this.collapse = !this.collapse;
        }
    }
}
</script>
<style lang="css" scoped>

    .module li a {
        text-decoration: none;
        cursor:pointer;
        display: flex !important;
        justify-content: flex-start;
        align-items: center;
    }

    .module li a span {
        margin-left: 5%;
        margin-top: 2%;
    }

    .module .b-icon {
        font-size: 30px !important;
    }

    @media (max-width: 1250px) {
        span {
            display:none;
        }
    }
</style>