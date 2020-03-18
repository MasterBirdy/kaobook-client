<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" sm="8" offset-sm="2" md="6" offset-md="3">
                    <RegisterForm
                        class="mt-1"
                        @submit="edit"
                        :edit="true"
                    ></RegisterForm>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import RegisterForm from "@/components/RegisterForm";
import axios from "axios";

export default {
    components: {
        RegisterForm
    },
    methods: {
        edit(user) {
            axios({
                url: `/authprofile/${this.$store.getters.id}/edit`,
                data: user,
                method: "put",
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        return axios({
                            url: `/authprofile/${this.$store.getters.id}/profile`,
                            method: "get"
                        });
                    } else {
                        return Promise.reject(new Error("error"));
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.$store.commit(
                            "setName",
                            res.data.data.name
                                ? res.data.data.name
                                : res.data.data.first_name +
                                      " " +
                                      res.data.data.last_name
                        );
                        this.$store.commit(
                            "setFirstName",
                            res.data.data.first_name
                        );
                        this.$store.commit(
                            "setLastName",
                            res.data.data.last_name
                        );
                        if (res.data.data.profile_pic) {
                            this.$store.commit(
                                "setProfilePic",
                                res.data.data.profile_pic
                            );
                        }
                        this.$store.commit("setEmail", res.data.data.email);

                        this.$store.commit("setGender", res.data.data.gender);
                        this.$store.commit(
                            "setBirthday",
                            res.data.data.birthday
                        );
                        this.$emit(
                            "successEvent",
                            "success",
                            "Profile successfully editted!"
                        );
                        this.$router.push({ name: "Home" });
                    }
                })
                .catch(() => {
                    this.$emit("errorEvent", "red darken-2", "Error");
                });
        }
    }
};
</script>
