<template>
    <div>
        <Navbar></Navbar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
    components: {
        Navbar
    }
};
</script>
