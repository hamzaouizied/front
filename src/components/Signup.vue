<template>
  <div class="vue-tempalte">
    <div class="container">
      <div class="row">
        <form @submit.prevent="Register">
          <h3>Sign Up</h3>
          <div class="form-group">
            <label>Full Name</label>
            <input
              type="text"
              class="form-control form-control-lg"
              placeholder="Full Name"
              v-model="name"
                            required

            />
          </div>
          <div class="form-group">
            <label>Email address</label>
            <input
              type="email"
              class="form-control form-control-lg"
              placeholder="Email"
              v-model="email"
              required
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              class="form-control form-control-lg"
              placeholder="Password"
              v-model="password"
                            required

            />
          </div>
            <div class="form-group">
            <label>Password Confirmation</label>
            <input
              type="password"
              class="form-control form-control-lg"
              placeholder="Password confirmation"
              v-model="password_confirmation"
                            required

            />
          </div>
          <button type="submit" class="btn btn-dark btn-lg btn-block mt-2">
            Sign Up
          </button>
          <p class="forgot-password text-right">
            Already registered
            <router-link :to="{ name: 'login' }">sign in?</router-link>
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
  </div>
</template>

<script>
export default {
  name: "signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  },
  methods: {
     Register: function () {
        let email = this.email
        let name = this.name
        let password = this.password
        let password_confirmation = this.password_confirmation
        this.$store.dispatch('register', { email, password, name, password_confirmation })
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
  }
};
</script>
