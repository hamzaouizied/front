<template>
  <div>
    <div class="container">
      <div class="row">
        <form class="form-inline p-4" @submit.prevent="addPost">
          <label class="sr-only mt-3">Title</label>
          <input
            type="text"
            class="form-control col-8 mb-2 mr-sm-2"
            placeholder="Title post"
            v-model="title"
          />
          <label class="sr-only" for="inlineFormInputGroupUsername2"
            >Content</label
          >
          <div class="card">
            <v-md-editor v-model="text" height="400px"></v-md-editor>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Add Post</button>
        </form>
      </div>
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
</template>

<script>
export default {
  name: "CreatePost",
  components: {},
  data() {
    return {
      posts: [],
      title: '',
      text: '',
      errors: [],
      file:'',
      idUser: this.$store.getters.authUser.id
    };
  },
  methods: {
    addPost: function(e) {
      if (this.title && this.text) {
        let title   = this.title;
        let body    = this.text;
        let user    = this.idUser;
        this.$store
          .dispatch("addPost", {title, body, user})
          .then(() => this.$router.push("/"))
          .catch(err => console.log(err));
      }else{
      this.errors = [];
      if (!this.text) this.errors.push("Title required.");
      if (!this.title) this.errors.push("Content required.");
      }
     
      e.preventDefault();
    },
     handleFileUpload(e){
        this.file = e.target.files[0];
    }
  }
};
</script>

<style scoped>
ul.error {
  color: red;
}
</style>
