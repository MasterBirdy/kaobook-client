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
        <ProfileUnit
            v-else
            :id="$route.params.id"
            :name="name"
            :timeline="timeline"
            :profilePic="profilePic"
        ></ProfileUnit>
    </div>
</template>

<script>
// @ is an alias to /src
import ProfileUnit from "@/components/ProfileUnit";
import axios from "axios";

export default {
    name: "Profile",
    components: {
        ProfileUnit
    },
    data() {
        return {
            loading: true,
            name: "",
            timeline: [],
            profilePic: ""
        };
    },
    created() {
        axios({
            method: "get",
            url: `/authprofile/${this.$route.params.id}/timeline`
        })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.name = res.data.user.name
                        ? res.data.user.name
                        : res.data.user.first_name +
                          " " +
                          res.data.user.last_name;

                    if (res.data.user.profile_pic) {
                        this.profilePic = res.data.user.profile_pic;
                    }
                    this.timeline = res.data.user.timeline;
                } else {
                    return Promise.reject(new Error("error"));
                }
            })
            .then(() => {
                this.loading = false;
            })
            .catch(err => {
                console.log(err);
            });
    }
};
</script>
