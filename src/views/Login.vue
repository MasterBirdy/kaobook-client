<template>
    <div class="login">
        <v-container>
            <v-row>
                <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
                    <router-link :to="{ name: 'Landing' }">Go Back</router-link>
                    <v-alert type="error" v-if="errorOn" class="mt-n2">
                        {{ errorMessage }}
                        <ul v-if="errors.length">
                            <li v-for="error in errors" :key="error">
                                {{ error }}
                            </li>
                        </ul>
                    </v-alert>
                    <LoginForm
                        class="mt-1"
                        @successEvent="login"
                        @errorEvent="errorEvent"
                    ></LoginForm>

                    <v-row class="px-6 mt-3">
                        <v-btn
                            dark
                            color="info"
                            depressed
                            class="px-2"
                            href="/auth/logout"
                            @click="logout"
                            >logout</v-btn
                        >
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import Cookies from "js-cookie";
import LoginForm from "@/components/LoginForm";

export default {
    name: "Login",
    components: {
        LoginForm
    },
    data() {
        return {
            errorOn: false,
            errors: [],
            errorMessage: "Hello"
        };
    },
    methods: {
        handleError(error) {
            this.errorOn = true;
            if (error.message) {
                this.errorMessage = error.message;
            }
            if (error.errors) {
                this.errors = [];
                error.errors.forEach(err => this.error.push(err));
            }
        },
        logout() {
            Cookies.remove("jwtToken");
            localStorage.clear();
        },
        login() {
            this.$emit("successEvent", "success", "Successfully logged in!");
            this.$router.push({ name: "SuccessLogin" });
        },
        errorEvent(errorMessage) {
            this.$emit("errorEvent", "red", errorMessage);
        }
    }
};
</script>
