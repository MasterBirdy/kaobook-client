<template>
    <ProfileUnit
        :id="$store.getters.id"
        :name="$store.getters.name"
        :profilePic="$store.getters.profilePic"
        :timeline="$store.getters.timeline"
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
                url: `/authprofile/${this.$store.getters.id}/timeline`
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
                    console.log(err);
                });
        },
        like(id) {
            axios({
                method: "post",
                url: `/post/${id}`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                },
                data: { id: this.$store.getters.id }
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
