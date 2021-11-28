<template>
  <router-link
    :to=to
    exact
    v-bind:class="{ dark: $q.dark.isActive }"
    class="blog-link"
    active-class="blog-link-active"
    ><slot></slot
  ></router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
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
