import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        id: "",
        name: "",
        firstName: "",
        lastName: "",
        profilePic: "",
        email: "",
        timeline: [],
        layout: "LandingLayout",
        gender: "",
        birthday: new Date(),
        friends: []
    },
    plugins: [createPersistedState()],
    getters: {
        id: state => state.id,
        name: state => state.name,
        firstName: state => state.firstName,
        lastName: state => state.lastName,
        profilePic: state => state.profilePic,
        email: state => state.email,
        timeline: state => state.timeline,
        layout: state => state.layout,
        gender: state => state.gender,
        birthday: state => state.birthday,
        friends: state => state.friends
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
        },
        setLayout(state, layout) {
            state.layout = layout;
        },
        changeLikes(state, updatedPost) {
            state.timeline.forEach(post => {
                if (post._id === updatedPost._id) {
                    post.likes = updatedPost.likes;
                }
            });
        },
        setGender(state, gender) {
            state.gender = gender;
        },
        setBirthday(state, birthday) {
            state.birthday = new Date(birthday);
        },
        setFriends(state, friends) {
            state.friends = friends;
        }
    },
    actions: {},
    modules: {}
});
