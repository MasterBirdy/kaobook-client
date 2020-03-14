<template>
    <div>
        <v-container fluid v-if="loading">
            <v-row
                fill-height
                class="fill-height ma-0"
                align="center"
                justify="center"
            >
                <v-progress-circular
                    class="mt-12"
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </v-row>
        </v-container>
        <ProfileUnit
            v-else
            :id="$route.params.id"
            :name="name"
            :timeline="timeline"
            :profilePic="profilePic"
            @updateTimeline="updateTimeline"
            @like="like"
        ></ProfileUnit>
    </div>
</template>

<script>
// @ is an alias to /src
import ProfileUnit from "@/components/ProfileUnit";
import Cookies from "js-cookie";
import axios from "axios";

export default {
    name: "Profile",
    components: {
        ProfileUnit
    },
    data() {
        return {
            loading: true,
            name: "",
            timeline: [],
            profilePic: ""
        };
    },
    methods: {
        updateTimeline() {
            axios({
                method: "get",
                url: `/authprofile/${this.$route.params.id}/timeline`
            })
                .then(res => {
                    if (res.status === 200) {
                        this.timeline = res.data.user.timeline;
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        like(id) {
            console.log("hello?");
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
                        this.timeline.forEach(post => {
                            if (post._id === res.data.post._id) {
                                post.likes = res.data.post.likes;
                                console.log(res.data.post);
                            }
                        });
                    }
                })
                .catch(err => console.log(err.response));
        }
    },
    created() {
        axios({
            method: "get",
            url: `/authprofile/${this.$route.params.id}/timeline`
        })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.name = res.data.user.name
                        ? res.data.user.name
                        : res.data.user.first_name +
                          " " +
                          res.data.user.last_name;

                    if (res.data.user.profile_pic) {
                        this.profilePic = res.data.user.profile_pic;
                    }
                    this.timeline = res.data.user.timeline;
                } else {
                    return Promise.reject(new Error("error"));
                }
            })
            .then(() => {
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
            });
    }
};
</script>
