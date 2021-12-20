<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Web Socket in Rust</div>
        <div class="text-body1">
          In this post we will create a web socket server in Rust using the
          <link-href link="https://crates.io/crates/tokio-tungstenite">tokio-tungstenite</link-href> crate, and connect to it using the
          standard
          <link-href link="https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#browser_compatibility">WebSocket</link-href> Object
          from the Browser.
          <!-- <link-href link="https://crates.io/crates/thiserror">ThisError</link-href> -->
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Server Side</div>
      <div class="text-body1">
        First thing you need to do is create a new 
      </div>
      </section>
      <div class="text-body1">
        <br />
      </div>
    </div>
    <table-of-contents />
  </q-page>
</template>

<script>
import { onMounted } from 'vue'
import TableOfContents from 'src/components/TableOfContents.vue'
import TextCode from 'src/components/text-code.vue'
import LinkHref from 'src/components/LinkHref.vue'
import BlogLink from 'src/components/BlogLink.vue'
import HighlightJs from 'src/components/HighlightJs.vue'
import { addLineNumbersToCodeBlocks } from 'src/boot/preload'

export default {
  components: {
    TableOfContents,
    LinkHref,
  },
  setup() {
    onMounted(() => {
      // This highlights all code blocks
      addLineNumbersToCodeBlocks(['rust'])
    })
    return {}
  },
}
</script>
