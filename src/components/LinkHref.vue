<template>
  <span @click="onUrl" class="url-link font-bold cursor-pointer text-center">
    <slot>{{ caption || link }}</slot>
  </span>
</template>

<script>
import { openURL } from 'quasar'

export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    return {
      onUrl: () => {
        openURL(props.link)
      },
    }
  },
}
</script>
<style lang="scss" scoped>
.url-link {
  color: #25c2a0;
  font-weight: bold;
  text-decoration: underline;
}
</style>
