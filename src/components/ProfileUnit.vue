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
                        {{ name }}
                    </h1>
                    <v-avatar size="200">
                        <img
                            :src="
                                profilePic
                                    ? profilePic
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
                        <v-card-title class="pb-0 justify-center mt-n2">
                            <span class="body-2 grey--text text--darken-2">
                                Details
                            </span>
                        </v-card-title>

                        <v-card-text class="pb-0">
                            <v-list
                                class="px-4 pt-1"
                                :style="{ background: '#fafafa' }"
                            >
                                <v-list-item
                                    class="justify-center align-baseline mt-0 mb-1"
                                    style="min-height: 0px"
                                >
                                    <v-icon color="red" class="mr-2">
                                        mdi-cake</v-icon
                                    >

                                    <span class="body-2">
                                        <span class="font-weight-medium">
                                            Birthday:
                                        </span>
                                        8/1/89
                                    </span>
                                </v-list-item>
                                <v-list-item
                                    class="justify-center align-baseline my-1"
                                    style="min-height: 0px"
                                >
                                    <v-icon color="blue" class="mr-2">
                                        mdi-gender-male
                                    </v-icon>

                                    <span class="body-2">
                                        <span class="font-weight-medium">
                                            Gender:
                                        </span>
                                        Male
                                    </span>
                                </v-list-item>
                            </v-list>
                        </v-card-text>

                        <v-divider></v-divider>
                        <v-card-actions class="px-4 d-flex flex-column">
                            <MessageForm
                                :id="id"
                                @postAdded="addPost"
                            ></MessageForm>
                            <v-btn color="success" class="dark mt-2">
                                <v-icon class="mr-2">mdi-account-plus</v-icon>
                                Add as Friend
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col class="mt-n1" cols="12" lg="8" xl="7">
                    <v-timeline
                        :class="{
                            'v-timeline--dense': $vuetify.breakpoint.smAndDown
                        }"
                    >
                        <!-- ?prop here?-->
                        <TimelinePost
                            v-for="(post, index) in timeline"
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
// import axios from "axios";
import Cookies from "js-cookie";

export default {
    name: "Home",
    props: {
        id: String,
        name: String,
        profilePic: String,
        timeline: Array
    },
    components: {
        MessageForm,
        TimelinePost
    },
    methods: {
        updateTimeline() {
            this.$emit("updateTimeline");
        },
        addPost() {
            this.updateTimeline();
        },
        addComment() {
            this.updateTimeline();
        },
        logout() {
            Cookies.remove("jwtToken");
        },
        like(id) {
            this.$emit("like", id);
        }
    },
    computed: {
        noName: function() {
            // ?prop here?
            return this.name === "";
        }
    }
};
</script>
