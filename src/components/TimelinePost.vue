<template>
    <v-timeline-item>
        <v-card outlined :style="{ background: '#fafafa' }">
            <v-card-title class="font-weight-regular">
                {{ title | decode }}
            </v-card-title>
            <v-card-text class="mt-n3 py-0">
                {{ text | decode }}
                <p class="caption grey--text">{{ author.name | decode }}</p>
            </v-card-text>

            <v-card-actions class="mt-n3 ml-2 mb-1">
                <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                        <v-btn
                            v-on="on"
                            depressed
                            dark
                            :color="userLiked ? 'blue darken-2' : 'success'"
                            class="mr-2"
                            @click="like"
                        >
                            <v-icon
                                v-if="!$vuetify.breakpoint.xsOnly"
                                class="mr-2"
                            >
                                mdi-thumb-up
                            </v-icon>
                            {{ userLiked ? "Liked" : "Like" }}
                        </v-btn>
                    </template>
                    <span>{{ likes.length }} likes</span>
                </v-tooltip>

                <CommentForm
                    :title="title"
                    :text="text"
                    :author="author"
                    :comments="comments"
                    :postId="id"
                    :profileId="profileId"
                    @commentAdded="commentAdded"
                    @errorEvent="errorEvent"
                ></CommentForm>
            </v-card-actions>
        </v-card>
    </v-timeline-item>
</template>
<script>
import CommentForm from "./CommentForm";
export default {
    name: "TimelinePost",
    components: {
        CommentForm
    },
    props: {
        profileId: String,
        id: String,
        title: String,
        text: String,
        author: Object,
        likes: Array,
        comments: Array
    },
    computed: {
        userLiked() {
            return this.likes.some(like => this.$store.getters.id === like);
        }
    },
    methods: {
        like() {
            this.$emit("like", this.id);
        },
        errorEvent(errorMessage) {
            this.$emit("errorEvent", errorMessage);
        },
        commentAdded() {
            this.$emit("commentAdded");
        }
    }
};
</script>
