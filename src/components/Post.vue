<template>
  <section class="new-post ">
    <div id="main-content" class="blog-page">
      <div class="container">
        <b-col class="text-center">
          <img src="@/assets/Blog_pic.png" class="img-blog" />
        </b-col>
        <b-row v-if="loading">
          <b-col class="text-center">
            <div class="lds-dual-ring"></div>
          </b-col>
        </b-row>
        <div class="row clearfix" v-if="!loading">
          <div
            class="col-lg-12 col-md-12 left-box"
            v-for="item in post"
            :key="item.id"
            :title="item.title"
          >
            <div class="card single_post">
              <div class="body">
                <div class="text-right" v-if="idUser.id === item.user_id">
                  <button
                    type="button"
                    @click="deletePost(item.id)"
                    class="btn btn-outline-danger"
                  >
                    Delete Post
                  </button>
                </div>
                <div class="img-post text-center">
                  <img
                    src="https://source.unsplash.com/random/200x200?sig=1"
                    class="img-fluid"
                    alt="Responsive image"
                  />
                </div>
                <h3>
                  <a href="blog-details.html">{{ item.title }}</a>
                </h3>
                <v-md-preview :text="item.content"></v-md-preview>
              </div>
            </div>
            <div class="card">
              <div class="header">
                <h2>Comments {{ item.comment.length }}</h2>
              </div>
              <div class="body">
                <ul
                  class="comment-reply list-unstyled"
                  v-for="comment in item.comment"
                  :key="comment.id"
                >
                  <li class="row clearfix">
                    <div class="icon-box col-md-1 col-4">
                      <img
                        class="img-fluid img-thumbnail"
                        :src="selectedImage"
                        alt="Awesome Image"
                      />
                    </div>
                    <div class="text-box col-md-10 col-8 p-l-0 p-r0">
                      <h5 class="m-b-0">{{ idUser.name }}</h5>
                      <p>
                        {{ comment.content }}
                      </p>
                      <ul class="list-inline">
                        <li>
                          <a>{{ comment.created_at | formatDate }}</a>
                        </li>
                      </ul>
                      <div
                        class="text-right"
                        v-if="
                          idUser.id === comment.user_id ||
                            idUser.id === item.user_id
                        "
                        @click="deleteComment(comment.id, comment)"
                      >
                        <button type="button" class="btn btn-outline-danger">
                          Delete Comment
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card">
              <div class="body">
                <div class="comment-form" @submit.prevent="postComment">
                  <form class="row clearfix">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <textarea
                          rows="4"
                          v-model="comment"
                          class="form-control no-resize"
                          placeholder="Please type what you want..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        class="btn btn-block btn-primary mt-2"
                      >
                        Add Comment
                      </button>
                    </div>
                  </form>
                  <div class="row">
                    <p v-if="errors.length">
                      <b>Please correct the following error(s):</b>
                    </p>
                    <ul class="error">
                      <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "post",

  data() {
    return {
      post: [],
      id: this.$route.params.id,
      comment: "",
      idUser: this.$store.getters.authUser,
      loading: true,
      errors: [],

      images: [
        "https://bootdey.com/img/Content/avatar/avatar1.png",
        "https://bootdey.com/img/Content/avatar/avatar2.png",
        "https://bootdey.com/img/Content/avatar/avatar3.png",
        "https://bootdey.com/img/Content/avatar/avatar4.png",
        "https://bootdey.com/img/Content/avatar/avatar5.png",
        "https://bootdey.com/img/Content/avatar/avatar6.png",
        "https://bootdey.com/img/Content/avatar/avatar7.png",
        "https://bootdey.com/img/Content/avatar/avatar8.png"
      ],
      selectedImage: null
    };
  },
  methods: {
    async fetchPost() {
      let id = this.id;
      this.$store
        .dispatch("getPost", { id })
        .then(res => {
          const body = res.data;
          this.post = body.post;
          this.loading = false;
        })
        .catch(err => console.log(err));
    },
    async postComment() {
      let comment = this.comment;
      let id = this.id;
      let idUser = this.idUser.id;
      if (this.comment) {
        this.$store
          .dispatch("postComment", { comment, id, idUser })
          .then(res => {
            const body = res.data;
            this.post[0].comment.push(body.data);
            this.comment = "";
            this.loading = false;
          })
          .catch(err => console.log(err));
      } else {
        this.errors = [];
        if (!this.age) this.errors.push("Content required.");
      }
    },
    async deleteComment(id, comment) {
      console.log(comment);
      this.$store
        .dispatch("deleteComment", { id })
        .then(res => {
          if (res) {
            console.log(this.post[0].comment.indexOf(comment));
            this.post[0].comment.splice(
              this.post[0].comment.indexOf(comment),
              1
            );
            this.loading = false;
          }
        })
        .catch(err => console.log(err));
    },
    async deletePost(id, comment) {
      console.log(comment);
      this.$store
        .dispatch("deletePost", { id })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    },
    randomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
    }
  },
  mounted() {
    this.fetchPost();
  },
  created() {
    this.selectedImage = this.randomItem(this.images);
  }
};
</script>

<style scoped>
.card {
  background: #fff;
  transition: 0.5s;
  border: 0;
  margin-bottom: 30px;
  border-radius: 0.55rem;
  position: relative;
  width: 100%;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 10%);
}
.card .body {
  color: #444;
  padding: 20px;
  font-weight: 400;
}
.card .header {
  color: #444;
  padding: 20px;
  position: relative;
  box-shadow: none;
}
.single_post {
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}

.single_post .body {
  padding: 30px;
}

.single_post .img-post {
  position: relative;
  overflow: hidden;
  max-height: 500px;
  margin-bottom: 30px;
}

.single_post .img-post > img {
  -webkit-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  opacity: 1;
  -webkit-transition: -webkit-transform 0.4s ease, opacity 0.4s ease;
  transition: transform 0.4s ease, opacity 0.4s ease;
  max-width: 100%;
  filter: none;
  -webkit-filter: grayscale(0);
  -webkit-transform: scale(1.01);
}

.single_post .img-post:hover img {
  -webkit-transform: scale(1.02);
  -ms-transform: scale(1.02);
  transform: scale(1.02);
  opacity: 0.7;
  filter: gray;
  -webkit-filter: grayscale(1);
  -webkit-transition: all 0.8s ease-in-out;
}

.single_post .img-post:hover .social_share {
  display: block;
}

.single_post .footer {
  padding: 0 30px 30px 30px;
}

.single_post .footer .actions {
  display: inline-block;
}

.single_post .footer .stats {
  cursor: default;
  list-style: none;
  padding: 0;
  display: inline-block;
  float: right;
  margin: 0;
  line-height: 35px;
}

.single_post .footer .stats li {
  border-left: solid 1px rgba(160, 160, 160, 0.3);
  display: inline-block;
  font-weight: 400;
  letter-spacing: 0.25em;
  line-height: 1;
  margin: 0 0 0 2em;
  padding: 0 0 0 2em;
  text-transform: uppercase;
  font-size: 13px;
}

.single_post .footer .stats li a {
  color: #777;
}

.single_post .footer .stats li:first-child {
  border-left: 0;
  margin-left: 0;
  padding-left: 0;
}

.single_post h3 {
  font-size: 20px;
  text-transform: uppercase;
}

.single_post h3 a {
  color: #242424;
  text-decoration: none;
}

.single_post p {
  font-size: 16px;
  line-height: 26px;
  font-weight: 300;
  margin: 0;
}

.single_post .blockquote p {
  margin-top: 0 !important;
}

.single_post .meta {
  list-style: none;
  padding: 0;
  margin: 0;
}

.single_post .meta li {
  display: inline-block;
  margin-right: 15px;
}

.single_post .meta li a {
  font-style: italic;
  color: #959595;
  text-decoration: none;
  font-size: 12px;
}

.single_post .meta li a i {
  margin-right: 6px;
  font-size: 12px;
}

.single_post2 {
  overflow: hidden;
}

.single_post2 .content {
  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 80px;
  position: relative;
}

.single_post2 .content .actions_sidebar {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 60px;
}

.single_post2 .content .actions_sidebar a {
  display: inline-block;
  width: 100%;
  height: 60px;
  line-height: 60px;
  margin-right: 0;
  text-align: center;
  border-right: 1px solid #e4eaec;
}

.single_post2 .content .title {
  font-weight: 100;
}

.single_post2 .content .text {
  font-size: 15px;
}

.right-box .categories-clouds li {
  display: inline-block;
  margin-bottom: 5px;
}

.right-box .categories-clouds li a {
  display: block;
  border: 1px solid;
  padding: 6px 10px;
  border-radius: 3px;
}

.right-box .instagram-plugin {
  overflow: hidden;
}

.right-box .instagram-plugin li {
  float: left;
  overflow: hidden;
  border: 1px solid #fff;
}

.comment-reply li {
  margin-bottom: 15px;
}

.comment-reply li:last-child {
  margin-bottom: none;
}

.comment-reply li h5 {
  font-size: 18px;
}

.comment-reply li p {
  margin-bottom: 0px;
  font-size: 15px;
  color: #777;
}

.comment-reply .list-inline li {
  display: inline-block;
  margin: 0;
  padding-right: 20px;
}

.comment-reply .list-inline li a {
  font-size: 13px;
}

img.img-fluid.img-thumbnail {
  border-radius: 113px;
}

@media (max-width: 640px) {
  .blog-page .left-box .single-comment-box > ul > li {
    padding: 25px 0;
  }
  .blog-page .left-box .single-comment-box ul li .icon-box {
    display: inline-block;
  }
  .blog-page .left-box .single-comment-box ul li .text-box {
    display: block;
    padding-left: 0;
    margin-top: 10px;
  }
  .blog-page .single_post .footer .stats {
    float: none;
    margin-top: 10px;
  }
  .blog-page .single_post .body,
  .blog-page .single_post .footer {
    padding: 30px;
  }
}
</style>
