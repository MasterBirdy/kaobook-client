<template>
    <ProfileUnit
        :id="$store.getters.id"
        :name="$store.getters.name"
        :profilePic="$store.getters.profilePic"
        :timeline="$store.getters.timeline"
        :gender="$store.getters.gender"
        :birthday="$store.getters.birthday"
        :isYou="true"
        @updateTimeline="updateTimeline"
        @like="like"
    ></ProfileUnit>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
import ProfileUnit from "@/components/ProfileUnit";

export default {
    name: "Home",
    components: {
        ProfileUnit
    },
    created() {
        this.updateTimeline();
    },
    methods: {
        updateTimeline() {
            axios({
                method: "get",
                url: `/authprofile/${this.$store.getters.id}/timeline`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.$store.commit(
                            "setTimeline",
                            res.data.user.timeline
                        );
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    if (err.response.status === 401) {
                        this.$store.commit("setLayout", "LandingLayout");
                        Cookies.remove("jwtToken");
                        localStorage.clear();
                        this.$router.push({ name: "Login" });
                    }
                });
        },
        like(id) {
            axios({
                method: "post",
                url: `/post/${id}`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                },
                data: {
                    author: this.$store.getters.id,
                    recipient: this.$store.getters.id
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.$store.commit("changeLikes", res.data.post);
                    }
                })
                .catch(err => console.log(err.response));
        }
    }
};
</script>
