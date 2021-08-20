<template>
  <b-card-group deck>
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img
            src="https://picsum.photos/400/400/?image=20"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <h4>{{ post.title }}</h4>
            <b-card-text>
              {{ post.text }}
              <span class="date">On {{ post.created_at }}</span>
            </b-card-text>
            <b-button variant="danger" v-on:click="removePost(index)"
              >Delete</b-button
            >
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: "postitem",
  props: ["post", "index"],
  methods: {
    removePost: function(index) {
      this.$parent.removePost(index);
    }
  }
};
</script>

<style></style>
