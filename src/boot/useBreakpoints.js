import { computed, onMounted, onUnmounted, ref } from 'vue'

// $grid-breakpoints: (
//     xs: 0,
//     sm: 576px,
//     md: 768px,
//     lg: 992px,
//     xl: 1200px,
//     xxl: 1400px
//   );
const useBreakpoints = () => {
    if (!process.env.SERVER) {
        const windowWidth = ref(window.innerWidth)

        const onWidthChange = () => windowWidth.value = window.innerWidth
        onMounted(() => window.addEventListener('resize', onWidthChange))
        onUnmounted(() => window.removeEventListener('resize', onWidthChange))

        const isMobile = computed(() => {
            return windowWidth.value < 991
        })
        const breakpoint = computed(() => {
            if (windowWidth.value >= 1400) return 'xxl'
            if (windowWidth.value >= 1200) return 'xl'
            if (windowWidth.value >= 992) return 'lg'
            if (windowWidth.value >= 768) return 'md'
            if (windowWidth.value >= 576) return 'sm'
            return 'xs'
        })
        const width = computed(() => windowWidth.value)

        return { width, isMobile, breakpoint }
    } else {
        return { width: 1200, isMobile: false, breakpoint: 'xl' }
    }
}

export { useBreakpoints }
