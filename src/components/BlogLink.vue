<template>
  <router-link
    to="/blog/setting-up-rust-in-vscode"
    exact
    v-bind:class="{ dark: $q.dark.isActive }"
    class="blog-link"
    active-class="blog-link-active"
    ><slot></slot
  ></router-link>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
.blog-link {
  color: black;
  font-weight: bold;
}
.dark.blog-link {
  color: white;
}
</style>
