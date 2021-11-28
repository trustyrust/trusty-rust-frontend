<template>
  <span v-bind:class="{ dark: $q.dark.isActive }">{{ text }}<slot></slot></span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {}
  },
}
</script>
<style lang="scss" scoped>
span {
  color: orange;
  padding: 3px;
  border-radius: 4px;
}
.dark {
  background-color: rgb(44, 53, 53);
  border: 1px solid black;
}
</style>
