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
            <v-row v-if="$store.getters.friends.length === 0">
                <v-col>
                    <p>You currently don't have any friends.</p>
                </v-col>
            </v-row>
            <v-row else>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                    lg="3"
                    v-for="friend in $store.getters.friends"
                    :key="friend._id"
                >
                    <FriendCard
                        :friendId="friend.friend._id"
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
                url: `http://167.172.216.194/authfriend/${this.$store.getters.id}/`,
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
                    this.$emit(
                        "errorEvent",
                        "red darken-2",
                        err.response.data.message
                    );
                });
        },
        accept(friendId) {
            axios({
                method: "post",
                url: `http://167.172.216.194/authfriend/${friendId}/accept`,
                headers: {
                    authorization: "Bearer " + Cookies.get("jwtToken")
                },
                data: {
                    id: this.$store.getters.id
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        this.$emit("successEvent", "success", "Friend added!");
                        this.updateFriends();
                    }
                })
                .catch(err => {
                    this.$emit(
                        "errorEvent",
                        "red darken-2",
                        err.response.data.message
                    );
                });
        },
        reject(friendId) {
            this.$emit("successEvent", "success", "Friend request rejected.");
            this.takeOff(friendId);
        },
        remove(friendId) {
            this.$emit("successEvent", "success", "Friend removed.");
            this.takeOff(friendId);
        },
        cancel(friendId) {
            this.$emit("successEvent", "success", "Friend request cancelled.");
            this.takeOff(friendId);
        },
        takeOff(friendId) {
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
                    if (res.status === 200) {
                        this.updateFriends();
                    }
                })
                .catch(err => {
                    this.$emit(
                        "errorEvent",
                        "red darken-2",
                        err.response.data.message
                    );
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
