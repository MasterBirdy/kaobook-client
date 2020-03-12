<template>
    <v-container fluid class="pa-0">
        <v-row no-gutters>
            <v-img
                cover
                height="100vh"
                gradient="to top right, rgba(25,32,72,.65), rgba(25,32,72,.35)"
                :src="require('@/assets/computers.jpg')"
            >
                <v-container
                    class="fill-height d-flex align-center justify-center white--text font-weight-bold"
                >
                    <v-row no-gutters>
                        <v-col
                            cols="12"
                            sm="8"
                            offset-sm="2"
                            md="6"
                            offset-md="3"
                            xl="4"
                            offset-xl="4"
                        >
                            <div class="text-center">
                                <p class="display-2">Welcome to KaoBook!</p>
                                <p class="subheading font-weight-regular">
                                    A social media website that lets you and
                                    your friends post on your timeline, like
                                    each other's posts, and comment on your
                                    pages! 👍
                                </p>

                                <v-btn
                                    color="primary"
                                    class="mt-n1"
                                    :to="{ name: 'Register' }"
                                    >Register today!</v-btn
                                >

                                <p class="caption mt-3">
                                    If you already have registered, log in
                                    <router-link
                                        :to="{ name: 'Login' }"
                                        class="white--text font-weight-medium"
                                        >here</router-link
                                    >.
                                </p>
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </v-img>
        </v-row>
    </v-container>
</template>
<script>
export default {};
</script>
<style scoped>
a {
    cursor: pointer;
}
</style>
