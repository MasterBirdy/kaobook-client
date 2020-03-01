<template>
    <div class="login">
        <v-container>
            <h1>This is an login page</h1>
            <v-btn dark color="primary" depressed class="px-2" @click="login">
                <v-icon color="white" class="mr-1">
                    mdi-facebook
                </v-icon>
                <span>facebook</span>
            </v-btn>
        </v-container>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",
    methods: {
        login() {}
    }
};
</script>
