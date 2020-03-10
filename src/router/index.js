import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Friends from "@/views/Friends.vue";
import Cookies from "js-cookie";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeRoute: checkCookie
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    },
    {
        path: "/friends",
        name: "Friends",
        component: Friends,
        beforeRoute: checkCookie
    },
    {
        path: "/*",
        redirect: { name: "Home" }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

const checkCookie = (to, from, next) => {
    if (!Cookies.get("jwtToken")) {
        next({ name: "Login" });
    } else {
        next();
    }
};

export default router;
