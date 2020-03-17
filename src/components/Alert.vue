<template>
    <v-snackbar v-model="snackbarOn" :timeout="3000" :color="color" top>
        {{ text }}
        <v-btn color="white" text @click="snackbarOn = false">
            Close
        </v-btn>
    </v-snackbar>
</template>
<script>
import { eventBus } from "../main";

export default {
    name: "Alert",
    data() {
        return {
            snackbarOn: false
        };
    },
    props: {
        text: { type: String, default: "" },
        color: { type: String, default: "success" }
    },
    created() {
        eventBus.$on("alertOn", () => {
            this.snackbarOn = true;
        });
    }
};
</script>
