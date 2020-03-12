<template>
    <v-app style="background: #fefefe">
        <component v-bind:is="layout"></component>
    </v-app>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout";
import LandingLayout from "@/layouts/LandingLayout";

export default {
    name: "App",
    computed: {
        layout() {
            return this.$store.getters.layout;
        }
    },
    components: {
        DefaultLayout,
        LandingLayout
    }
};
</script>
