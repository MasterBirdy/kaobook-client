import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store/index";
import Cookies from "js-cookie";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Landing from "@/views/Landing";
import Register from "@/views/Register.vue";
import Friends from "@/views/Friends.vue";
import SuccessLogin from "@/views/SuccessLogin.vue";
import Profile from "@/views/Profile.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/yourprofile",
        name: "Home",
        component: Home,
        beforeEnter: (to, from, next) => {
            Store.commit("setLayout", "DefaultLayout");
            cookieCheck(to, from, next);
        }
    },
    {
        path: "/",
        name: "Landing",
        component: Landing,
        beforeEnter: (to, from, next) => {
            Store.commit("setLayout", "LandingLayout");
            next();
        }
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
        path: "/profile/:id",
        name: "Profile",
        component: Profile
    },
    {
        path: "/friends",
        name: "Friends",
        component: Friends,
        beforeEnter: cookieCheck
    },
    {
        path: "/redirect",
        name: "SuccessLogin",
        component: SuccessLogin
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

const cookieCheck = (to, from, next) => {
    if (Store.getters.name === "") {
        if (!Cookies.get("jwtToken")) {
            next({ name: "Landing" });
        } else {
            next({ name: "SuccessLogin" });
        }
    } else {
        next();
    }
};

export default router;
