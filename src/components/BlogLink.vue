<template>
  <router-link :to="to" exact v-bind:class="{ dark: $q.dark.isActive }" class="blog-link" active-class="blog-link-active"
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
  color: #25c2a0;
  font-weight: bold;
}
// .dark.blog-link {
//   color: #25c2a0;
// }
</style>
