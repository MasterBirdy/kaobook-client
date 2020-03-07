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
                            :src="$store.getters.profilePic"
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
                            <!-- <v-btn depressed dark color="pink lighten-2"><v-icon  class="mr-2">mdi-message</v-icon> Leave a Post</v-btn> -->
                            <MessageForm></MessageForm>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col class="mt-n1" cols="12" lg="8" xl="7">
                    <v-timeline
                        :class="{
                            'v-timeline--dense': $vuetify.breakpoint.smAndDown
                        }"
                    >
                        <v-timeline-item
                            v-for="post in timeline"
                            :key="post.title"
                        >
                            <v-card outlined :style="{ background: '#fafafa' }">
                                <v-card-title class="font-weight-regular">
                                    {{ post.title }}
                                </v-card-title>
                                <v-card-text class="mt-n3">
                                    {{ post.text }}
                                </v-card-text>
                                <v-card-actions class="mt-n3 ml-2 mb-1">
                                    <v-btn depressed color="success">
                                        <v-icon class="mr-2">
                                            mdi-thumb-up
                                        </v-icon>
                                        Like
                                    </v-btn>
                                    <v-btn depressed color="primary lighten-1">
                                        <v-icon class="mr-2">
                                            mdi-comment
                                        </v-icon>
                                        Comment
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-timeline-item>
                        <!-- <v-timeline-item>
                            <v-card outlined :style="{ background: '#fafafa' }">
                                <v-card-title class="headline"
                                    >Lorem ipsum</v-card-title
                                >
                                <v-card-text>
                                    Lorem ipsum dolor sit amet, no nam oblique
                                    veritus. Commune scaevola imperdiet nec ut,
                                    sed euismod convenire principes at. Est et
                                    nobis iisque percipit, an vim zril
                                    disputando voluptatibus, vix an salutandi
                                    sententiae.
                                </v-card-text>
                                <v-card-actions class="mt-n3 ml-2 mb-1">
                                    <v-btn depressed color="success"
                                        ><v-icon class="mr-2"
                                            >mdi-thumb-up</v-icon
                                        >
                                        Like</v-btn
                                    >
                                    <v-btn depressed color="primary lighten-1"
                                        ><v-icon class="mr-2"
                                            >mdi-comment</v-icon
                                        >
                                        Comment</v-btn
                                    >
                                </v-card-actions>
                            </v-card>
                        </v-timeline-item>
                        <v-timeline-item>
                            <v-card outlined :style="{ background: '#fafafa' }">
                                <v-card-title class="headline"
                                    >Lorem ipsum</v-card-title
                                >
                                <v-card-text>
                                    Lorem ipsum dolor sit amet, no nam oblique
                                    veritus. Commune scaevola imperdiet nec ut,
                                    sed euismod convenire principes at. Est et
                                    nobis iisque percipit, an vim zril
                                    disputando voluptatibus, vix an salutandi
                                    sententiae.
                                </v-card-text>
                            </v-card>
                        </v-timeline-item> -->
                    </v-timeline>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import MessageForm from "@/components/MessageForm";
import axios from "axios";

export default {
    name: "Home",
    components: {
        MessageForm
    },
    data() {
        return {
            loading: true,
            timeline: []
        };
    },
    computed: {
        noName: function() {
            return this.$store.getters.name === "";
        }
    },
    created() {
        if (this.noName) {
            axios
                .get("/profile")
                .then(res => {
                    if (res.status === 200) {
                        this.$store.commit("setName", res.data.data.name);
                        this.$store.commit(
                            "setFirstName",
                            res.data.data.first_name
                        );
                        this.$store.commit(
                            "setLastName",
                            res.data.data.last_name
                        );
                        this.$store.commit(
                            "setProfilePic",
                            res.data.data.profile_pic
                        );
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
                        this.timeline = res.data.timeline;
                    }
                })
                .catch(err => {
                    console.log(err);
                    console.log("Hellko?");
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
