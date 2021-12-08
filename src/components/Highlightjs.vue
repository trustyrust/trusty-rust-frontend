<template>
  <pre><code :class="`language-${language}`">{{ code }}</code></pre>
</template>

<script>
export default {
  props: {
    language: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {}
  },
}
</script>
