<template>
    <div class="login">
        <v-container>
            <v-row>
                <v-col cols="6" offset="3">
                    <v-alert type="error" v-if="errorOn" class="mt-n2">
                        {{ errorMessage }}
                        <ul v-if="errors.length">
                            <li v-for="error in errors" :key="error">
                                {{ error }}
                            </li>
                        </ul>
                    </v-alert>
                    <LoginForm></LoginForm>
                    <v-divider class="mt-6 mb-2"></v-divider>
                    <p class="title font-weight-regular">
                        Login through Social Media
                    </p>
                    <v-row class="pa-2 mt-n5">
                        <v-btn
                            dark
                            color="primary"
                            depressed
                            class="px-2 mr-2"
                            href="/auth/facebook"
                        >
                            <v-icon color="white" class="mr-1">
                                mdi-facebook
                            </v-icon>
                            <span>facebook</span>
                        </v-btn>
                        <v-btn
                            dark
                            color="info"
                            depressed
                            class="px-2"
                            href="/auth/logout"
                            >logout</v-btn
                        >
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
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
        }
    }
};
</script>
