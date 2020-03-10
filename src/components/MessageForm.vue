<template>
    <v-dialog max-width="600px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn depressed dark color="pink lighten-2" v-on="on"
                ><v-icon class="mr-2">mdi-message</v-icon> Leave a Post</v-btn
            >
        </template>
        <v-card>
            <v-card-title>
                Leave a Post
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                        label="Title"
                        prepend-icon="mdi-alphabetical"
                        v-model="title"
                        :rules="[requiredRules]"
                    >
                    </v-text-field>
                    <v-textarea
                        label="Text"
                        prepend-icon="mdi-pencil-outline"
                        v-model="text"
                        :rules="[requiredRules]"
                    >
                    </v-textarea>
                    <v-btn
                        text
                        class="success mt-3"
                        @click="submit"
                        :loading="loading"
                        >Submit</v-btn
                    >
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
import Cookies from "js-cookie";
import axios from "axios";

export default {
    name: "MessageForm",
    data() {
        return {
            title: "",
            text: "",
            dialog: false,
            loading: false,
            requiredRules: v => !!v || "Required"
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.loading = true;
                const post = {
                    title: this.title,
                    text: this.text,
                    author: this.$store.getters.id,
                    date: Date.now()
                };
                axios({
                    method: "post",
                    url: `/profile/${this.$store.getters.id}/post`,
                    headers: {
                        authorization: "Bearer " + Cookies.get("jwtToken")
                    },
                    data: post
                })
                    .then(res => {
                        this.$emit("postAdded", res.data.post);
                    })
                    .catch(err => console.log(err.response))
                    .finally(() => {
                        this.loading = false;
                        this.dialog = false;
                    });
            }
        }
    }
};
</script>
