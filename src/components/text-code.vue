<template>
  <span v-bind:class="{ dark: $q.dark.isActive }" v-bind:style="{ 'background-color': background ? '' : 'rgba(0,0,0,0)' }"
    ><slot></slot
  ></span>
</template>

<script>
export default {
  props: {
    background: {
      type: Boolean,
      default: true,
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
  background-color: #fafafa;
  border: 1px solid lightgray;
}
.dark {
  background-color: #282c34;
  border: 1px solid black;
}
</style>
