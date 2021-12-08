<template>
  <router-view />
</template>
<script>
import { defineComponent, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
import { highlightjs, hljs } from 'src/boot/preload'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()

    onBeforeMount(() => {
      // set theme for load
      const styleLight = document.getElementById('hljs-light')
      const styleDark = document.getElementById('hljs-dark')

      if (store.getters.isDarkTheme) {
        styleLight.setAttribute('disabled', 'disabled')
      } else {
        styleDark.setAttribute('disabled', 'disabled')
      }
    })
  },
})
</script>
