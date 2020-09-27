export default {
    getItem (key="user") {
        let obj = null;
        try {
            obj = JSON.parse(window.localStorage.getItem(key));
        } catch (e) {}
        return obj;
    },
    setItem (value, key="user") { 
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    destroyItem (key="user") {
        window.localStorage.removeItem(key);
    }
};