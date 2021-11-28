<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Create Rust Project</div>
        <div class="text-body1">In this post we will go through how to create a Rust Project and Debug with vscode</div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Setting up in vscode</div>
        <div class="text-body1">First create your project by:</div>
        <highlightjs language="shell" :autodetect="false" :code="`cargo init my-rust-project`" />
        <q-separator class="q-my-lg" />
      </section>
    </div>
    <table-of-contents />
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import TextCode from 'src/components/text-code.vue'
import LinkHref from 'src/components/LinkHref.vue'
import TableOfContents from 'src/components/TableOfContents.vue'
import { addLineNumbersToCodeBlocks } from 'src/boot/preload'

export default defineComponent({
  name: 'InstallRust',
  components: {
    TableOfContents,
  },
  methods: {},
  setup() {
    const app = getCurrentInstance()
    const router = useRouter()

    onMounted(() => {})
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
