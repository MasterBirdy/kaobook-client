<template>
    <v-dialog max-width="700px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn depressed color="primary lighten-1" v-on="on">
                <v-icon v-if="!$vuetify.breakpoint.xsOnly" class="mr-2">
                    mdi-comment
                </v-icon>
                Comment
            </v-btn>
        </template>
        <v-card>
            <v-container class="py-0">
                <v-row>
                    <v-col class="pa-4">
                        <v-card
                            outlined
                            :class="{
                                'px-5': !$vuetify.breakpoint.xsOnly
                            }"
                        >
                            <v-container>
                                <v-row>
                                    <v-col cols="8" sm="9" md="10">
                                        <v-card-title>
                                            <p>{{ title | decode }}</p>
                                        </v-card-title>
                                        <v-card-text>
                                            <p class="mt-n8 overline">
                                                {{ author.name | decode }}
                                            </p>
                                            <p>{{ text | decode }}</p>
                                        </v-card-text>
                                    </v-col>
                                    <v-col cols="4" sm="3" md="2"
                                        ><v-avatar size="75">
                                            <img
                                                :src="
                                                    author.profile_pic
                                                        ? author.profile_pic
                                                        : require('@/assets/mystery.png')
                                                "
                                                alt="Profile Pic"
                                            /> </v-avatar
                                    ></v-col>
                                    <v-col cols="11" class="mt-n9 px-6">
                                        <v-form ref="form">
                                            <v-textarea
                                                outlined
                                                rows="1"
                                                :rules="[requiredRules]"
                                                v-model="commentText"
                                            ></v-textarea>
                                            <v-btn
                                                class="success"
                                                :loading="loading"
                                                @click="submit"
                                                >Submit</v-btn
                                            >
                                        </v-form>
                                    </v-col>
                                    <v-col class="pb-0">
                                        <v-card-text class="pb-0">
                                            <div
                                                v-for="(comment,
                                                index) in comments"
                                                :key="comment.text + index"
                                            >
                                                <p>
                                                    {{ comment.text | decode }}
                                                </p>
                                                <p class="overline">
                                                    {{
                                                        comment.author.name
                                                            | decode
                                                    }}
                                                </p>
                                                <p
                                                    class="overline mt-n4 grey--text"
                                                >
                                                    {{
                                                        comment.formatted_date
                                                            | decode
                                                    }}
                                                </p>
                                            </div>
                                        </v-card-text>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>
<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
    name: "CommentForm",
    props: {
        profileId: String,
        title: String,
        text: String,
        author: Object,
        comments: Array,
        postId: String
    },
    data() {
        return {
            commentText: "",
            dialog: false,
            requiredRules: v => !!v || "Required",
            loading: false
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                const comment = {
                    text: this.commentText,
                    author: this.$store.getters.id,
                    post: this.postId,
                    date: Date.now(),
                    recipient: this.profileId
                };
                axios({
                    method: "post",
                    url: `/post/${this.postId}/comment`,
                    headers: {
                        authorization: "Bearer " + Cookies.get("jwtToken")
                    },
                    data: comment
                })
                    .then(() => {
                        this.$emit("commentAdded");
                    })
                    .catch(err => {
                        this.$emit("errorEvent", err.response.data.message);
                    })
                    .finally(() => {
                        this.loading = false;
                        this.dialog = false;
                    });
            }
        }
    }
};
</script>
