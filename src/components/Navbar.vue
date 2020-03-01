<template>
    <nav>
        <v-app-bar flat color="light-blue lighten-1">
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
            <v-toolbar-title
                class="text-uppercase white--text d-flex align-center flex-grow-1"
            >
                <v-icon class="mr-2" color="grey lighten-5">
                    mdi-book-open-variant
                </v-icon>
                <span class="font-weight-medium">Kao</span>book
            </v-toolbar-title>
        </v-app-bar>
    </nav>
</template>

<script>
export default {
    name: "Navbar"
};
</script>
<style scoped></style>
