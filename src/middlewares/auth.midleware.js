import jwtService from "../services/jwt.service";
import storageService from "../services/storage.service";
import store from "../store/store";
import { localServer } from '../config';

const verifyToken = async (_to, _from, _next) => {
    const resp = await store.dispatch('login/verifyToken');
    if ( (resp.title === 'Token expirado !' || resp.title === 'Token inválido !') && _to.name !== 'login' && _to.name !== 'index.html') {
        jwtService.destroyToken();
        storageService.destroyItem();
    } 
    _next();
}

export {
    verifyToken,
    makeMenu
}
