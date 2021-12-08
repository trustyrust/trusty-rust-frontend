<template>
  <router-view />
</template>
<script>
import { defineComponent, ref, onBeforeMount, onMounted, onUnmounted, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const onWidthChange = () => {
      // set the breakpoints for responsive design
      const windowWidth = window.innerWidth

      const isMobile = windowWidth < 991
      const breakpoint = (() => {
        if (windowWidth >= 1400) return 'xxl'
        if (windowWidth >= 1200) return 'xl'
        if (windowWidth >= 992) return 'lg'
        if (windowWidth >= 768) return 'md'
        if (windowWidth >= 576) return 'sm'
        return 'xs'
      })()
      const width = windowWidth
      store.dispatch('setBreakpoints', { width, isMobile, breakpoint })
    }
    onMounted(() => window.addEventListener('resize', onWidthChange))
    onUnmounted(() => window.removeEventListener('resize', onWidthChange))

    onBeforeMount(() => {
      // load screen width
      onWidthChange()

      // load theme for highlightjs
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
