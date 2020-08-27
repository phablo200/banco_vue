const ID_TOKEN_KEY = "token";
export default {
    getToken () {
        return window.localStorage.getItem(ID_TOKEN_KEY);
    },
    setToken (token) {
        window.localStorage.setItem(ID_TOKEN_KEY, token);
    },
    destroyToken () {
        window.localStorage.removeItem(ID_TOKEN_KEY);
    }
};