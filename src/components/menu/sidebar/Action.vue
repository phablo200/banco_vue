<template>
    <div class="action">
        <li>
            <b-link v-b-tooltip.hover :title="title" :class="plusClass" @click.prevent="action" :id="checked">
                <b-icon :icon="icon" />
                <span class='siderbar-action'>{{ label }}</span>
            </b-link>
        </li>
    </div>
</template>

<script>
    export default {
        props: [
            'icon',
            'label',
            'to',
            'plusClass'
        ],
        data () {
            return {
                checked: null,
                title: '',
                toIndex: ''
            }
        },
        created () {
            this.title = this.label;
            this.toIndex = `${this.to}.index`;
            if (window.innerWidth>1250) {
                this.title = '';
            }
        },
        watch: {
            $route: {
                handler (newer, old) {
                    if (this.$router.history.current.name===this.toIndex) {
                        //this.checked = "checked";
                    }
                },
                deep: true
            }
        },
        methods: {
            action () { 
                if (this.to) {
                    const current = `${this.$router.history.current.name}`;
                    if (current !== this.toIndex && current !== this.to) {
                        this.$router.push({
                            name: this.to
                        });
                    }
                } else {
                    this.$emit("action");
                }
            }
        }
    }
</script>

<style lang="css" scoped>
    .action li a {
        text-decoration: none;
        cursor:pointer;
        display: flex !important;
        align-items: center;
    }
    .action #checked {
        color: #222 !important;
        background: #f5f5f5 !important;
    }
    .action li span {
        margin-left: 5%;
        margin-top: 2%;
    }

    .action .b-icon {
        font-size: 30px !important;
    }

    .action .father:hover {
        background: #2c2e3e !important;
        color: #000e3e;
    }
    
    @media (max-width: 1250px) {
        span {
            display:none;
        }
        .action li .child { 
            justify-content: center;

        }
    }
</style>