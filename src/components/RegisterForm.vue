<template>
    <v-card outlined class="pa-2">
        <v-card-title>
            <span v-if="edit">Edit Profile</span>
            <span v-else>Register</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="form">
                <v-text-field
                    class="mb-1"
                    label="First Name"
                    :rules="[lengthRules]"
                    v-model="firstname"
                >
                </v-text-field>
                <v-text-field
                    class="mb-1"
                    label="Last Name"
                    v-model="lastname"
                    :rules="[lengthRules]"
                ></v-text-field>
                <v-text-field
                    v-if="!edit"
                    class="mb-1"
                    label="Password"
                    v-model="password"
                    type="password"
                    :rules="[passwordRules]"
                ></v-text-field>
                <v-text-field
                    v-if="!edit"
                    class="mb-1"
                    label="Confirm Password"
                    v-model="confirmPassword"
                    type="password"
                    :rules="[confirmPasswordRules, passwordRules]"
                ></v-text-field>
                <v-text-field
                    class="mb-1"
                    label="E-mail"
                    v-model="email"
                    :rules="[lengthRules]"
                ></v-text-field>
                <v-menu max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                            class="mb-1"
                            :value="formattedBirthday"
                            v-on="on"
                            label="Birthday"
                            :rules="[requiredRules]"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker no-title v-model="birthday"></v-date-picker>
                </v-menu>
                <v-select
                    class="mb-1"
                    label="Gender"
                    v-model="gender"
                    :items="genders"
                    :rules="[requiredRules]"
                ></v-select>
                <v-text-field
                    class="mb-1"
                    label="Profile Pic"
                    v-model="profilePic"
                ></v-text-field>
                <v-btn class="success" @click="submit">Submit</v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>
<script>
import moment from "moment";

export default {
    name: "RegisterForm",
    props: {
        edit: { type: Boolean, default: false }
    },
    data() {
        return {
            firstname: "",
            lastname: "",
            email: "",
            birthday: null,
            password: "",
            confirmPassword: "",
            profilePic: "",
            genders: ["male", "female", "non-binary"],
            gender: "male",
            lengthRules: v => v.length >= 3 || "Minimum length is 3 characters",
            passwordRules: v =>
                v.length >= 8 || "Passwords must be 8 characters or longer",
            confirmPasswordRules: v =>
                v === this.password || "Passwords must match",
            requiredRules: v => !!v || "Required"
        };
    },
    computed: {
        formattedBirthday() {
            return this.birthday ? moment(this.birthday).format("LL") : "";
        }
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                const user = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    birthday: this.birthday,
                    gender: this.gender,
                    profilePic: this.profilePic
                };
                if (!this.edit) {
                    user.password = this.password;
                }
                this.$emit("submit", user);
            }
        }
    },
    mounted() {
        if (this.edit) {
            this.firstname = this.$store.getters.firstName;
            this.lastname = this.$store.getters.lastName;
            this.email = this.$store.getters.email;
            this.birthday = moment(
                new Date(this.$store.getters.birthday)
            ).format("YYYY-MM-DD");
            this.gender = this.$store.getters.gender;
            this.profilePic = this.$store.getters.profilePic;
        }
    }
};
</script>
