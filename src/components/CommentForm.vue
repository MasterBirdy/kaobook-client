<template>
    <v-dialog max-width="700px" v-model="dialog">
        <template v-slot:activator="{ on }">
            <v-btn depressed color="primary lighten-1" v-on="on">
                <v-icon class="mr-2">
                    mdi-comment
                </v-icon>
                Comment
            </v-btn>
        </template>
        <v-card>
            <v-container class="py-0">
                <v-row>
                    <v-col class="pa-4">
                        <v-card outlined class="px-5">
                            <v-container>
                                <v-row>
                                    <v-col cols="9">
                                        <v-card-title>
                                            <p>{{ title }}</p>
                                        </v-card-title>
                                        <v-card-text>
                                            <p class="mt-n8 overline">
                                                {{ author.name }}
                                            </p>
                                            <p>{{ text }}</p>
                                        </v-card-text>
                                    </v-col>
                                    <v-col cols="3"
                                        ><v-avatar size="75">
                                            <img
                                                :src="author.profile_pic"
                                                alt="Profile Pic"
                                            /> </v-avatar
                                    ></v-col>
                                    <v-col cols="11" class="mt-n9 px-6">
                                        <v-form>
                                            <v-textarea
                                                outlined
                                                rows="1"
                                            ></v-textarea>
                                            <v-btn class="success mt-n4"
                                                >Submit</v-btn
                                            >
                                        </v-form>
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
export default {
    name: "CommentForm",
    props: {
        title: String,
        text: String,
        author: Object
    },
    data() {
        return {
            dialog: false
        };
    }
};
</script>
