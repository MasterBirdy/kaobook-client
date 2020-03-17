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
                    <p class="overline grey--text mt-2">(ID: {{ id }})</p>
                    <v-card
                        outlined
                        class="mt-n2 mx-4"
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
                                        {{ formattedBirthday }}
                                    </span>
                                </v-list-item>
                                <v-list-item
                                    class="justify-center align-baseline my-1"
                                    style="min-height: 0px"
                                >
                                    <v-icon
                                        v-if="gender === 'male'"
                                        color="blue"
                                        class="mr-2"
                                    >
                                        mdi-gender-male
                                    </v-icon>
                                    <v-icon
                                        v-else-if="gender === 'female'"
                                        color="pink"
                                        class="mr-2"
                                    >
                                        mdi-gender-female
                                    </v-icon>
                                    <v-icon
                                        v-else
                                        color="yellow darken-2"
                                        class="mr-2"
                                    >
                                        mdi-gender-non-binary
                                    </v-icon>
                                    <span class="body-2">
                                        <span class="font-weight-medium">
                                            Gender:
                                        </span>
                                        {{ gender }}
                                    </span>
                                </v-list-item>
                            </v-list>
                        </v-card-text>

                        <v-divider></v-divider>
                        <v-card-actions class="px-4 d-flex flex-column">
                            <MessageForm
                                :profileId="id"
                                @postAdded="addPost"
                                @errorEvent="errorEvent"
                            ></MessageForm>
                            <div v-if="!isYou">
                                <v-btn
                                    v-if="friendStatus === 'Sent'"
                                    disabled
                                    class="dark mt-2"
                                >
                                    Friend Request Sent
                                </v-btn>
                                <v-btn
                                    v-else-if="friendStatus === 'Pending'"
                                    disabled
                                    class="dark mt-2"
                                >
                                    Friend Request Pending</v-btn
                                >
                                <v-btn
                                    v-else-if="friendStatus === 'Friend'"
                                    disabled
                                    class="dark mt-2"
                                >
                                    Friends</v-btn
                                >
                                <v-btn
                                    @click="addFriend"
                                    v-else
                                    color="success"
                                    class="dark mt-2"
                                >
                                    <v-icon class="mr-2"
                                        >mdi-account-plus</v-icon
                                    >
                                    Add as Friend
                                </v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col
                    :class="{
                        'mt-n1': true,
                        'text-center': timeline.length === 0
                    }"
                    cols="12"
                    lg="8"
                    xl="7"
                >
                    <v-timeline
                        v-if="timeline.length > 0"
                        :class="{
                            'v-timeline--dense': $vuetify.breakpoint.smAndDown
                        }"
                    >
                        <!-- ?prop here?-->
                        <TimelinePost
                            v-for="(post, index) in timeline"
                            :id="post._id"
                            :profileId="id"
                            :key="post.title + index"
                            :title="post.title"
                            :text="post.text"
                            :author="post.author"
                            :likes="post.likes"
                            :comments="post.comments"
                            @like="like"
                            @commentAdded="addComment"
                            @errorEvent="errorEvent"
                        ></TimelinePost>
                    </v-timeline>
                    <p v-else>Oops! No posts in this timeline. 🙁</p>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MessageForm from "@/components/MessageForm";
import TimelinePost from "@/components/TimelinePost";
import Cookies from "js-cookie";
import moment from "moment";

export default {
    name: "Home",
    props: {
        id: String,
        name: String,
        profilePic: String,
        timeline: Array,
        gender: String,
        birthday: [String, Date],
        isYou: Boolean,
        friendStatus: String
    },
    components: {
        MessageForm,
        TimelinePost
    },
    methods: {
        errorEvent(errorMessage) {
            this.$emit("errorEvent", errorMessage);
        },
        updateTimeline() {
            this.$emit("updateTimeline");
        },
        addPost() {
            this.updateTimeline();
            this.$emit("successEvent", "Post added!");
        },
        addComment() {
            this.updateTimeline();
            this.$emit("successEvent", "Comment added!");
        },
        addFriend() {
            this.$emit("addFriend");
        },
        logout() {
            Cookies.remove("jwtToken");
        },
        like(id) {
            this.$emit("like", id);
        }
    },
    computed: {
        noName() {
            return this.name === "";
        },
        formattedBirthday() {
            return moment(this.birthday).format("l");
        }
    }
};
</script>
