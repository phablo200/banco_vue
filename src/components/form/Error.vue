<template>
    <div class="form-error">
        <b-form-text v-if="source">
            {{error}}
        </b-form-text>
    </div>
</template>

<script>
export default {
    props: [
        'errors',
        'source'
    ],
    data () {
        return {
            error: ''
        }
    },
    watch: {
        errors () {
            this.error='';
            if (this.errors) {
                for (let error in this.errors) {
                    if (error == this.source) {
                        let errors = this.errors[error];
                        if (errors && errors.length) {
                            errors.forEach(_error => {
                                this.error += `${_error}\n`;
                            });
                        } else {
                            this.error = errors
                        }
                    }
                }
            }
        }
    }
}
</script>

<style lang="css" scoped>
    .form-error small {
        color: red !important;
    }
</style>