<template>
    <nav>
        <v-app-bar flat color="light-blue lighten-1">
            <v-app-bar-nav-icon
                color="white"
                @click="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title
                class="text-uppercase white--text d-flex align-center flex-grow-1"
            >
                <v-icon class="mr-2" color="grey lighten-5">
                    mdi-book-open-variant
                </v-icon>
                <span class="font-weight-medium">Kao</span>book
            </v-toolbar-title>
        </v-app-bar>
        <v-navigation-drawer
            color="light-blue darken-2"
            dark
            v-model="drawer"
            app
            temporary
        >
            <v-list>
                <v-list-item router to="/">
                    <v-list-item-action>
                        <v-icon class="white--text">
                            mdi-home
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="white--text">
                        Home
                    </v-list-item-title>
                </v-list-item>
                <v-list-item router to="/login">
                    <v-list-item-action>
                        <v-icon class="white--text">
                            mdi-login
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="white--text">
                        Login
                    </v-list-item-title>
                </v-list-item>
                <v-list-item router to="/register">
                    <v-list-item-action>
                        <v-icon class="white--text">
                            mdi-account-plus
                        </v-icon>
                    </v-list-item-action>
                    <v-list-item-title class="white--text">
                        Register
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    data() {
        return {
            drawer: false
        };
    }
};
</script>
<style scoped></style>
