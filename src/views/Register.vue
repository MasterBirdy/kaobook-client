<template>
    <div class="register">
        <v-container>
            <v-row>
                <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
                    <router-link :to="{ name: 'Landing' }">Go Back</router-link>
                    <RegisterForm
                        class="mt-1"
                        @submit="register"
                        :edit="false"
                    ></RegisterForm>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import axios from "axios";
import RegisterForm from "@/components/RegisterForm";
export default {
    name: "Register",
    components: {
        RegisterForm
    },
    methods: {
        register(user) {
            axios({
                url: "http://167.172.216.194/registeruser",
                data: user,
                method: "post"
            })
                .then(res => {
                    if (res.status === 200) {
                        this.$emit(
                            "successEvent",
                            "success",
                            "Registration success! Please log in."
                        );
                        this.$router.push({ name: "Login" });
                    }
                })
                .catch(err => {
                    this.$emit(
                        "errorEvent",
                        "red darken-2",
                        err.response.data.message
                    );
                });
        }
    }
};
</script>
