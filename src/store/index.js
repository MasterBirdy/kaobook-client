import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        id: "",
        name: "",
        firstName: "",
        lastName: "",
        profilePic: "@/assets/mystery.png",
        email: "",
        timeline: []
    },
    getters: {
        id: state => state.id,
        name: state => state.name,
        firstName: state => state.firstName,
        lastName: state => state.lastName,
        profilePic: state => state.profilePic,
        email: state => state.email,
        timeline: state => state.timeline
    },
    mutations: {
        setId(state, id) {
            state.id = id;
        },
        setName(state, name) {
            state.name = name;
        },
        setFirstName(state, firstName) {
            state.firstName = firstName;
        },
        setLastName(state, lastName) {
            state.lastName = lastName;
        },
        setProfilePic(state, profilePic) {
            state.profilePic = profilePic;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setTimeline(state, timeline) {
            state.timeline = timeline;
        },
        addToTimeline(state, object) {
            state.timeline.push(object);
        }
    },
    actions: {},
    modules: {}
});
