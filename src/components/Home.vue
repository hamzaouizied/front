<template>
  <div class="home container">
    <PostList />
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue";

export default {
  name: "home",
  components: {
    PostList
  },
};
</script>