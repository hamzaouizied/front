import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: {},
    Posts: [],
    Post: [],
    comment: "",
    plugins: [createPersistedState()],

  },
  mutations: {
    set_user(state, user) {
      state.user = user;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token) {
      state.status = "success";
      state.token = token;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    set_posts(state, posts) {
      state.Posts = posts;
    },
    set_post(state, post) {
      state.Posts = post;
    },
    set_comment(state, comment) {
      state.Posts = comment;
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://127.0.0.1:8080/api/auth/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.access_token;
            const user = resp.data.user;

            // Add the following line:
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            commit("auth_success", token);
            commit("set_user", user);
            localStorage.setItem("token", token);

            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: "http://127.0.0.1:8080/api/auth/register",
          data: user,
          method: "POST"
        })
          .then(resp => {
            const token = resp.data.token;
            localStorage.setItem("token", token);
            // Add the following line:
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            commit("auth_success", token);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise(resolve => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    getAllPosts({ commit }, page) {
      console.log(page);
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:8080/api/all-posts?page=" + page,
          method: "GET"
        })
          .then(resp => {
            const posts = resp.data.posts;
            commit("set_posts", posts);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    getPost({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:8080/api/post",
          method: "POST",
          data: id
        })
          .then(resp => {
            const post = resp.data.post;
            console.log(resp);
            commit("set_post", post);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    postComment({ commit }, { comment, id, idUser }) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:8080/api/add/comment",
          method: "POST",
          data: {
            comment,
            id,
            idUser
          }
        })
          .then(resp => {
            const comment = resp.data.comment;
            console.log(resp);
            commit("set_comment", comment);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    addPost({ commit }, {title, body, user}){
      let formData = new FormData();
      formData.append('title', title);
      formData.append('body', body);
      formData.append('userId', user);

      return new Promise((resolve, reject) => {
        axios.post(
          "http://localhost:8080/api/add/post",
          formData
        )
          .then(resp => {
            console.log(resp);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    deleteComment({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:8080/api/delete/comment",
          method: "POST",
          data: {
            id,
          }
        })
          .then(resp => {
            console.log(resp);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    deletePost({ commit }, { id }) {
      return new Promise((resolve, reject) => {
        axios({
          url: "http://localhost:8080/api/delete/post",
          method: "POST",
          data: {
            id,
          }
        })
          .then(resp => {
            console.log(resp);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            reject(err);
          });
      });
    },
    
  },
  
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    authUser: state => state.user
  }
});
