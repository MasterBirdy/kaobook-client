<template>
    <div class="register">
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
                    <RegisterForm @errorEvent="handleError"></RegisterForm>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm";
export default {
    name: "Register",
    components: {
        RegisterForm
    },
    data() {
        return {
            errorOn: false,
            errorMessage: "Error alert.",
            errors: []
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
