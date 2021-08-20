<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="login">
        <h3>Sign In</h3>
        <div class="form-group">
          <label>Email address</label>
          <input
            type="email"
            class="form-control form-control-lg"
            v-model="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control form-control-lg"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-dark btn-lg btn-block mt-2">
          Sign In
        </button>
        <p class="forgot-password text-right">
          Create Account
          <router-link :to="{ name: 'signup' }">sign up?</router-link>
        </p>
      </form>
    </div>
    <b-col class="text-center">
    <img
      src="@/assets/Blog_pic.png"
      fluid
      width="800"
      height="400"
      alt="Fluid image"
    >
    </b-col>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
     login: function () {
        let email = this.email
        let password = this.password
        this.$store.dispatch('login', { email, password })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
  }
};
</script>
