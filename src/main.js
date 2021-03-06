import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import he from "he";

Vue.filter("decode", value => {
    return he.decode(value);
});

Vue.config.productionTip = false;

export const eventBus = new Vue();

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");
