<template>
  <header>
    <div>
      <b-navbar toggleable="md" type="dark" 
       class="header-color">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#"><img
      center
      src="@/assets/Blog_pic.png"
      fluid
      width="100"
      height="50"
      alt="Fluid image"
    ></b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <router-link
              v-if="isLoggedIn"
              class="nav-link"
              to="/"
              >Home</router-link
            >
            <router-link v-if="isLoggedIn" class="nav-link" to="/create-post"
              >Create Post</router-link
            >
            <a v-if="isLoggedIn" class="nav-link logout" @click="logout">Logout</a>
            <router-link v-if="!isLoggedIn" class="nav-link" to="/signup"
              >Register</router-link
            >
            <router-link
              v-if="!isLoggedIn"
              @authenticated="ChangeT($event)"
              class="nav-link"
              to="/login"
              >Login</router-link
            >
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </header>
</template>

<script>
export default {
  name: "app-header",
  data() {
    return {
    };
  },
  mounted() {

  },
  computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
  methods: {
  logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
  },
  watch: {}
};
</script>
<style scoped>
a.nav-link.logout {
    cursor: pointer;
}
</style>
