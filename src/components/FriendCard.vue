<template>
    <div>
        <v-card class="mx-auto" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="headline mb-1"
                        ><router-link
                            :to="{ name: 'Profile', params: { id: friendId } }"
                            >{{ name }}</router-link
                        ></v-list-item-title
                    >
                    <v-list-item-subtitle
                        class="mt-n8 font-weight-medium"
                        :class="{
                            'mt-n8': true,
                            'font-weight-medium': true,
                            'orange--text': status === 'Sent',
                            'green--text': status === 'Friend',
                            'lime--text text--darken-2': status === 'Pending'
                        }"
                        >{{ status }}</v-list-item-subtitle
                    >
                </v-list-item-content>

                <v-list-item-avatar size="75">
                    <img
                        :src="avatar ? avatar : require('@/assets/mystery.png')"
                        alt="Profile Pic"
                    />
                </v-list-item-avatar>
            </v-list-item>

            <v-card-actions class="px-3">
                <v-btn
                    @click="cancel"
                    dark
                    color="red"
                    v-if="status === 'Sent'"
                    depressed
                >
                    <v-icon class="mr-2">mdi-cancel</v-icon>Cancel</v-btn
                >
                <div v-else-if="status === 'Pending'">
                    <v-btn
                        @click="accept"
                        dark
                        color="success"
                        depressed
                        class="mr-2"
                    >
                        <v-icon class="mr-2">mdi-check-bold</v-icon
                        >Accept</v-btn
                    >
                    <v-btn @click="reject" dark color="red" depressed>
                        <v-icon class="mr-2">mdi-account-cancel</v-icon
                        >Reject</v-btn
                    >
                </div>
                <v-btn
                    v-else-if="status === 'Friend'"
                    @click="remove"
                    dark
                    color="red lighten-1"
                    text
                >
                    <v-icon class="mr-2">mdi-account-cancel</v-icon>Remove
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
export default {
    name: "FriendCard",
    props: {
        id: String,
        friendId: String,
        name: String,
        status: String,
        avatar: String
    },
    methods: {
        accept() {
            this.$emit("accept", this.id);
        },
        reject() {
            this.$emit("reject", this.id);
        },
        cancel() {
            this.$emit("cancel", this.id);
        },
        remove() {
            this.$emit("remove", this.id);
        }
    }
};
</script>
<style scoped>
a {
    text-decoration: none;
}
</style>
