<template>
    <div>
        <Navbar></Navbar>
        <v-content>
            <router-view
                @successEvent="successEvent"
                @errorEvent="errorEvent"
            ></router-view>
        </v-content>
        <Alert :color="color" :text="text"></Alert>
    </div>
</template>

<script>
import Alert from "@/components/Alert";
import Navbar from "@/components/Navbar";
import { eventBus } from "../main";

export default {
    components: {
        Navbar,
        Alert
    },
    data() {
        return {
            text: "",
            color: "success",
            snackbarOn: false
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
