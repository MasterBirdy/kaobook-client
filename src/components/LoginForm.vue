<template>
    <v-card outlined class="pa-2">
        <v-card-title>
            Login
        </v-card-title>
        <v-card-text>
            <v-form ref="form">
                <v-text-field
                    class="mb-1"
                    label="Email"
                    v-model="email"
                    :rules="[requiredRules]"
                ></v-text-field>
                <v-text-field
                    class="mb-1"
                    label="Password"
                    v-model="password"
                    :type="'password'"
                    :rules="[requiredRules]"
                ></v-text-field>
                <v-btn class="success" @click="submit">Submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
    name: "LoginForm",
    data() {
        return {
            email: "",
            password: "",
            requiredRules: v => !!v || "Required"
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    password: this.password
                };
                axios({ url: "/auth/login", data: user, method: "POST" })
                    .then(res => {
                        if (res.status === 200) {
                            Cookies.set("jwtToken", res.data.token);
                            this.$emit("successEvent");
                        }
                    })
                    .catch(err => {
                        this.$emit("errorEvent", err.response.data);
                    });
            }
        }
    }
};
</script>
