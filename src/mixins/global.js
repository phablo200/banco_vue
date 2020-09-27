const GenericMixin = {
    date () {
        return {
            loader: null
        }
    },
    methods: {
        async showLoading(){
            this.loader = await this.$loading.show({
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
            });
        },
        hideLoading(){
            this.loader.hide();
        },
        elert (icon, title, text) {
            return this.$swal({
                icon,
                title,
                text,
                buttons: {
                    confirm: {
                        text: 'OK',
                        value: true,
                        visible: true,
                        closeModal: true
                    }
                }
            });
        }
    }
};

export default GenericMixin;