export default {   
    async AUTH (state, payload) {  
        state.user = payload;
        state.token = payload.token;  
    }
}