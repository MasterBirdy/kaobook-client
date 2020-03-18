<template>
    <nav>
        <v-app-bar flat color="light-blue lighten-1">
            <v-app-bar-nav-icon
                color="white"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <router-link
                :to="{ name: 'Home' }"
                :style="{ textDecoration: 'none' }"
            >
                <v-toolbar-title
                    class="text-uppercase white--text d-flex align-center flex-grow-1"
                >
                    <v-icon class="mr-2" color="grey lighten-5">
                        mdi-book-open-variant
                    </v-icon>
                    <span class="font-weight-medium">Kao</span>book
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn @click="logout" text color="white">
                <span>Sign Out</span>
                <v-icon class="ml-2"> mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer
            color="light-blue darken-2"
            dark
            v-model="drawer"
            app
            temporary
        >
            <v-list>
                <v-list-item router :to="{ name: 'Home' }">
                    <v-list-item-action>
                        <v-icon class="white--text">
                            mdi-home
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="white--text">
                        Home
                    </v-list-item-title>
                </v-list-item>
                <v-list-item router :to="{ name: 'Edit' }">
                    <v-list-item-action>
                        <v-icon class="white--text">
                            mdi-clipboard-account
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="white--text">
                        Edit Profile
                    </v-list-item-title>
                </v-list-item>
                <v-list-item router :to="{ name: 'Friends' }">
                    <v-list-item-action>
                        <v-icon class="white--text">
                            mdi-account-group
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="white--text">
                        Friends
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
    name: "Navbar",
    data() {
        return {
            drawer: false
        };
    },
    methods: {
        logout() {
            Cookies.remove("jwtToken");
            axios({
                method: "get",
                url: `/auth/logout`
            })
                .then(() => {})
                .catch(err => console.log(err))
                .finally(() => this.$router.push({ name: "Landing" }));
        }
    }
};
</script>
<style scoped></style>
