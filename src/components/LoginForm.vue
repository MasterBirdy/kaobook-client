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
                    :rules="[requiredRules]"
                ></v-text-field>
                <v-btn class="success">Submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from "axios";
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
                        if (res.status === 200) this.$router.push("/");
                        else console.log(res);
                    })
                    .catch(err => {
                        this.$emit("errorEvent", err.response.data);
                    });
            }
        }
    }
};
</script>
