<template>
  <main class="my-5">
    <div class="container">
      <!--Section: Content-->
      <section class="text-center">
        <img src="@/assets/Blog_pic.png" class="img-blog text-center" />
        <b-row v-if="loading">
          <b-col class="text-center">
            <div class="lds-dual-ring"></div>
          </b-col>
        </b-row>
        <div class="row" v-if="!loading">
          <div
            class="col-lg-4 col-md-12 mb-4"
            v-for="post in posts"
            :key="post.id"
          >
            <div class="card">
              <div
                class="bg-image hover-overlay ripple"
                data-mdb-ripple-color="light"
              >
                <img :src="post.picture" class="img-fluid" />
                <a href="#!">
                  <div
                    class="mask"
                    style="background-color: rgba(251, 251, 251, 0.15);"
                  ></div>
                </a>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">
                  {{ post.content }}
                </p>
                <router-link class="btn btn-primary" :to="'post/' + post.id">
                  Read Post
                </router-link>
              </div>
            </div>
          </div>
          <infinite-loading @infinite="fetchPosts"></infinite-loading>
        </div>
      </section>
      <!--Section: Content-->
    </div>
  </main>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "PostList",
  components: {
    InfiniteLoading
  },
  data() {
    return {
      category: "",
      loading: true,
      posts: [],
      page: 1
    };
  },

  methods: {
    async fetchPosts($state) {
      this.$store
        .dispatch("getAllPosts", this.page)
        .then(res => {
          let body = res.data;
          if (body) {
            console.log(true);
            this.posts.push(...body.posts.data);
            this.loading = false;
            $state.loaded();
          } else {
            $state.complete();
          }
        })
        .catch(err => console.log(err));
      this.page = this.page + 1;
    }
  },
  created() {
    this.category = this.$route.name;
    this.fetchPosts();
  },
  watch: {
    $route() {
      this.category = this.$route.name;
      this.posts = [];
      this.fetchPosts();
    }
  }
};
</script>

<style>
h1 {
  margin-top: 25px !important;
}
.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
img.img-blog {
  width: 322px;
  padding: 14px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
p.card-text {
    color: #000;
}
h5.card-title {
    font-weight: 500;
    font-size: 35px;
    color: #0d1117;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
