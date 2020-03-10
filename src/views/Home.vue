<template>
    <div class="fill-height">
        <v-container :class="{ 'fill-height': noName }">
            <v-row
                class="fill-height ma-0"
                v-if="noName"
                align="center"
                justify="center"
            >
                <v-progress-circular
                    indeterminate
                    color="primary"
                ></v-progress-circular>
            </v-row>
            <v-row v-else>
                <v-col
                    class="mt-n1 d-flex flex-column align-center"
                    cols="12"
                    lg="4"
                    xl="3"
                    offset-xl="1"
                >
                    <h1 class="headline mb-1 font-weight-medium">
                        {{ $store.getters.name }}
                    </h1>
                    <v-avatar size="200">
                        <img
                            :src="
                                $store.getters.profilePic
                                    ? $store.getters.profilePic
                                    : require('@/assets/mystery.png')
                            "
                            alt="Profile Pic"
                        />
                    </v-avatar>
                    <v-card
                        outlined
                        class="mt-3 mx-4"
                        :style="{ background: '#fafafa' }"
                    >
                        <v-card-title class="pb-0 justify-center mt-n2"
                            ><span class="body-2 grey--text text--darken-2"
                                >Details</span
                            ></v-card-title
                        >
                        <v-card-text class="pb-0">
                            <v-list
                                class="px-4 pt-1"
                                :style="{ background: '#fafafa' }"
                            >
                                <v-list-item
                                    class="justify-center align-baseline mt-0 mb-1"
                                    style="min-height: 0px"
                                >
                                    <v-icon color="red" class="mr-2"
                                        >mdi-cake</v-icon
                                    >
                                    <span class="body-2"
                                        ><span class="font-weight-medium"
                                            >Birthday:</span
                                        >
                                        8/1/89</span
                                    >
                                </v-list-item>
                                <v-list-item
                                    class="justify-center align-baseline my-1"
                                    style="min-height: 0px"
                                >
                                    <v-icon color="blue" class="mr-2"
                                        >mdi-gender-male</v-icon
                                    >
                                    <span class="body-2"
                                        ><span class="font-weight-medium"
                                            >Gender:</span
                                        >
                                        Male</span
                                    >
                                </v-list-item>
                            </v-list></v-card-text
                        >
                        <v-divider></v-divider>
                        <v-card-actions class="px-4 d-flex justify-center">
                            <MessageForm @postAdded="addPost"></MessageForm>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col class="mt-n1" cols="12" lg="8" xl="7">
                    <v-timeline
                        :class="{
                            'v-timeline--dense': $vuetify.breakpoint.smAndDown
                        }"
                    >
                        <TimelinePost
                            v-for="(post, index) in this.$store.getters
                                .timeline"
                            :id="post._id"
                            :key="post.title + index"
                            :title="post.title"
                            :text="post.text"
                            :author="post.author"
                            :likes="post.likes"
                            :comments="post.comments"
                            @like="like"
                            @commentAdded="addComment"
                        ></TimelinePost>
                    </v-timeline>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MessageForm from "@/components/MessageForm";
import TimelinePost from "@/components/TimelinePost";
import axios from "axios";
import Cookies from "js-cookie";

export default {
    name: "Home",
    components: {
        MessageForm,
        TimelinePost
    },
    data() {
        return {
            loading: true
        };
    },
    methods: {
        updateTimeline() {
            axios({
                method: "get",
                url: `/profile/${this.$store.getters.id}/timeline`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                }
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.$store.commit("setTimeline", res.data.timeline);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        addPost() {
            this.updateTimeline();
        },
        addComment() {
            this.updateTimeline();
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
                    console.log(res);
                    console.log(res.status === 200);
                    if (res.status === 200) {
                        this.$store.getters.timeline.forEach(post => {
                            console.log("hi");
                            if (post._id === res.data.post._id) {
                                post.likes = res.data.post.likes;
                            }
                        });
                    }
                })
                .catch(err => console.log(err.response));
        }
    },
    computed: {
        noName: function() {
            return this.$store.getters.name === "";
        }
    },
    created() {
        if (this.noName) {
            axios({
                method: "get",
                url: "/profile",
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                }
            })
                .then(res => {
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
                    } else {
                        return Promise.reject(new Error("error"));
                    }
                })
                .then(() => {
                    return axios.get(
                        `/profile/${this.$store.getters.id}/timeline`
                    );
                })
                .then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        this.$store.commit("setTimeline", res.data.timeline);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
</script>
<style scoped>
.test {
    font-size: 2rem;
    font-weight: 400;
}
</style>
