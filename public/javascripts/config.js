const router = new VueRouter();
const store = new Vuex.Store({
    state: {
        token: undefined
    }
});

var options = {
    persist: true
}

Vue.use(VueSession, options)
Vue.use(VueResource);
Vue.use(Vuex)