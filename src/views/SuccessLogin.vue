<template>
    <v-container fluid>
        <v-row>
            <v-col><p>Logging you in and redirecting you shortly...</p></v-col>
        </v-row>
    </v-container>
</template>
<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
    methods: {
        getMainInfo() {
            axios({
                method: "get",
                url: "/authprofile",
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                }
            })
                .then(res => {
                    console.log("poop");
                    console.log(res);
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
                        this.$store.commit("setId", res.data.data._id);
                        this.$store.commit("setGender", res.data.data.gender);
                        this.$store.commit(
                            "setBirthday",
                            res.data.data.birthday
                        );
                    } else {
                        return Promise.reject(new Error("error"));
                    }
                })
                .then(() => {
                    setTimeout(() => {
                        this.$router.push("/yourprofile");
                    }, 900);
                })
                .catch(err => {
                    console.log(err);
                    this.$router.push("/");
                });
        }
    },
    created() {
        if (Cookies.get("jwtToken")) {
            this.getMainInfo();
        } else {
            axios
                .get("/auth/getfacebookauth")
                .then(res => {
                    if (res.status === 200) {
                        Cookies.set("jwtToken", res.data.token);
                        this.getMainInfo();
                    } else {
                        Promise.reject(new Error("error"));
                    }
                })
                .catch(err => console.log(err.response));
        }
    }
};
</script>
