<template>
    <v-content>
        <router-view
            @successEvent="successEvent"
            @errorEvent="errorEvent"
        ></router-view>
        <Alert :color="color" :text="text"></Alert>
    </v-content>
</template>

<script>
import Alert from "@/components/Alert";
import { eventBus } from "../main";

export default {
    components: {
        Alert
    },
    data() {
        return {
            text: "",
            color: "success"
        };
    },
    methods: {
        successEvent(successColor, successText) {
            this.text = successText;
            this.color = successColor;
            eventBus.$emit("alertOn");
        },
        errorEvent(errorColor, errorText) {
            this.text = errorText;
            this.color = errorColor;
            eventBus.$emit("alertOn");
        }
    }
};
</script>
