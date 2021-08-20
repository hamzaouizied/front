import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import App from './App.vue'
import AllPosts from './components/AllPosts'
import CreatePost from './components/CreatePost'
import Post from './components/Post'
import moment from 'moment';

import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import store from './store/store.js'
import InfiniteLoading from 'vue-infinite-loading';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

import hljs from 'highlight.js';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/main.css'

Vue.prototype.$http = axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] ="Bearer " + token
}

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM-DD-YYYY hh:mm')
  }
});
// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

Vue.use(moment);
Vue.use(VMdPreviewHtml);
Vue.use(VMdPreview);
Vue.use(VueMarkdownEditor);
Vue.config.productionTip = false
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(InfiniteLoading, { /* options */ });

const routes = [
    {path: '/', component: Home, meta: {
      requiresAuth: true
    }},
    {path: '/all-posts', component: AllPosts,  meta: {
      requiresAuth: true
    }},

    {path: '/post/:id', component: Post,  meta: {
      requiresAuth: true
    }},
    {path: '/create-post', component: CreatePost, meta: {
      requiresAuth: true
    }},
    {path: '/signup', name:"signup", component: Signup},
    {path: '/login', name:"login", component: Login}

];

const router = new VueRouter({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
});

new Vue({
  render: h => h(App),
  router,
  store,

}).$mount('#app')
