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
        <v-container v-else>
            <h1 class="display-1">Friends:</h1>
            <v-row>
                <v-col cols="12" md="4" sm="6" lg="3">
                    <FriendCard
                        v-for="friend in $store.getters.friends"
                        :friendId="friend.friend._id"
                        :key="friend._id"
                        :id="friend._id"
                        :name="friend.friend.name"
                        :status="friend.status"
                        :avatar="
                            friend.friend.profile_pic
                                ? friend.friend.profile_pic
                                : ''
                        "
                        @accept="accept"
                        @reject="reject"
                        @cancel="cancel"
                        @remove="remove"
                    ></FriendCard>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
import FriendCard from "@/components/FriendCard";

export default {
    name: "Friends",
    data() {
        return {
            loading: true
        };
    },
    methods: {
        updateFriends() {
            axios({
                method: "get",
                url: `/authfriend/${this.$store.getters.id}/`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.$store.commit("setFriends", res.data.friends);
                        this.loading = false;
                    }
                })
                .catch(err => {
                    console.log(err.response);
                });
        },
        accept(friendId) {
            axios({
                method: "post",
                url: `/authfriend/${friendId}/accept`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                },
                data: {
                    id: this.$store.getters.id
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.updateFriends();
                    }
                })
                .catch(err => {
                    console.log(err.response);
                });
        },
        reject(friendId) {
            this.cancel(friendId);
        },
        remove(friendId) {
            this.cancel(friendId);
        },
        cancel(friendId) {
            axios({
                method: "delete",
                url: `/authfriend/${friendId}/cancel`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                },
                data: {
                    id: this.$store.getters.id
                }
            })
                .then(res => {
                    console.log("mee");
                    if (res.status === 200) {
                        this.updateFriends();
                    }
                })
                .catch(err => {
                    console.log(err.response);
                });
        }
    },
    components: {
        FriendCard
    },
    created() {
        this.updateFriends();
    }
};
</script>
