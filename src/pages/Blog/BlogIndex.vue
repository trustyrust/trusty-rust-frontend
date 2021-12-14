<template>
  <q-page padding>
    <section>
      <div class="text-h4">Rust Basic Essentials</div>
      <ul class="text-body1">
        <li v-for="(blog, idx) in aryEssentials" :key="idx">
          <blog-link class="link" :to="blog.path">{{ blog.label || blog.path.split('/').pop().replace(/-/g, '&nbsp;') }}</blog-link>
        </li>
      </ul>
    </section>
    <section>
      <div class="text-h4">Rust Blog Posts</div>
      <ul class="text-body1">
        <li v-for="(blog, idx) in aryBlogPosts" :key="idx">
          <blog-link class="link" :to="blog.path">{{ blog.label || blog.path.split('/').pop().replace(/-/g, '&nbsp;') }}</blog-link>
        </li>
      </ul>
    </section>
  </q-page>
</template>

<script>
import BlogLink from 'src/components/BlogLink.vue'

const aryEssentials = [
  { label: '', path: '/blog/why-use-rust' },
  { label: '', path: '/blog/getting-started' },
  { label: '', path: '/blog/setting-up-rust-in-vscode' },
]
const aryBlogPosts = [
  { label: 'FizzBuzz in Rust', path: '/blog/fizzbuzz' },
  { label: '', path: '/blog/error-handling' },
  { label: '', path: '/blog/wasm-pack' },
  { label: '', path: '/blog/wasm-pack-advanced' },
]
export default {
  components: {
    BlogLink,
  },
  setup() {
    return {
      aryEssentials,
      aryBlogPosts,
    }
  },
}
</script>
<style lang="scss" scoped>
.link {
  text-transform: capitalize;
}
</style>
