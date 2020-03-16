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
            :birthday="birthday"
            :gender="gender"
            :isYou="false"
            :friendStatus="friendStatus"
            @updateTimeline="updateTimeline"
            @like="like"
            @addFriend="addFriend"
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
            profilePic: "",
            gender: "",
            birthday: new Date(),
            friendStatus: ""
        };
    },
    methods: {
        commitToStore(friendData) {
            this.$store.commit("setFriends", friendData);
            this.$store.getters.friends.forEach(friendType => {
                if (
                    friendType.friend._id.toString() ===
                    this.$route.params.id.toString()
                ) {
                    if (
                        friendType.status === "Sent" ||
                        friendType.status === "Pending" ||
                        friendType.status === "Friend"
                    ) {
                        this.friendStatus = friendType.status;
                    }
                }
            });
        },
        addFriend() {
            axios({
                method: "post",
                url: `/authfriend/${this.$route.params.id}`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                },
                data: {
                    id: this.$store.getters.id
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        return axios({
                            method: "get",
                            url: `/authfriend/${this.$store.getters.id}`,
                            headers: {
                                authorization:
                                    "Bearer " + Cookies.get("jwtToken")
                            }
                        });
                    } else {
                        return Promise.reject(new Error("error"));
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        this.commitToStore(res.data.friends);
                    }
                })
                .catch(err => {
                    console.log(err.response);
                });
        },
        updateTimeline() {
            axios({
                method: "get",
                url: `/authprofile/${this.$route.params.id}/timeline`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                }
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
            axios({
                method: "post",
                url: `/post/${id}`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                },
                data: {
                    author: this.$store.getters.id,
                    recipient: this.$route.params.id
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.timeline.forEach(post => {
                            if (post._id === res.data.post._id) {
                                post.likes = res.data.post.likes;
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
            url: `/authprofile/${this.$route.params.id}/timeline`,
            headers: {
                authorization: "Bearer " + Cookies.get("jwtToken")
            }
        })
            .then(res => {
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
                    this.gender = res.data.user.gender;
                    this.birthday = new Date(res.data.user.birthday);
                } else {
                    return Promise.reject(new Error("error"));
                }
            })
            .then(() => {
                return axios({
                    method: "get",
                    url: `/authfriend/${this.$store.getters.id}/`,
                    headers: {
                        authorization: "Bearer " + Cookies.get("jwtToken")
                    }
                });
            })
            .then(res => {
                if (res.status === 200) {
                    this.commitToStore(res.data.friends);
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
