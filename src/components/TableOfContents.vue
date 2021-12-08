<template>
  <div v-scroll="onScroll" v-if="!isMobile" class="table-of-contents q-ml-md">
    <div class="text-subtitle1">Table of Contents</div>
    <div class="row no-wrap">
      <q-separator vertical color="tab-underline-color" style="padding: 1px; opacity: 0.2" />
      <q-list class="full-width" separator style="max-width: 318px">
        <q-item
          @click="onTableOfContentsLink(link)"
          v-for="(link, idx) in aryContents"
          :key="idx"
          clickable
          v-ripple
          v-bind:class="{ 'active-border-left': idxPos === idx }"
        >
          <q-item-section>
            <div class="text-subtitle2">
              {{ link.innerText }}
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, getCurrentInstance, computed } from 'vue'
import { useBreakpoints } from 'src/boot/useBreakpoints'

export default {
  setup() {
    const app = getCurrentInstance()
    const { isMobile } = useBreakpoints()

    const aryContents = ref([])
    const idxPos = ref(0)
    // const aryPos = computed(() => {
    //   const aryPos = []
    //   for (let i = 1; i < aryContents.value.length; i++) {
    //     const linkB = aryContents.value[i - 1]
    //     const linkA = aryContents.value[i]
    //     aryPos.push([linkB.parentNode.offsetTop, linkA.parentNode.offsetTop])
    //   }
    //   return aryPos
    // })
    onMounted(() => {
      // const el = app.refs.refMain
      // const links = document.querySelectorAll(`.q-page > .col > ul > li > div:nth-of-type(1)`)
      const links = document.querySelectorAll(`.q-page > .col > section > div:nth-of-type(1)`)
      aryContents.value = links
    })

    return {
      isMobile,
      aryContents,
      idxPos,
      onTableOfContentsLink: (link) => {
        window.scrollTo({ top: link.parentNode.offsetTop, behavior: 'smooth' })
      },
      onScroll: (position) => {
        // console.log(position)

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          // console.log('bottom')
          idxPos.value = aryContents.value.length - 1
        } else {
          for (let i = 1; i < aryContents.value.length; i++) {
            const pos1 = aryContents.value[i - 1].parentNode.offsetTop
            const pos2 = aryContents.value[i].parentNode.offsetTop
            if (position >= pos1 && position < pos2) {
              idxPos.value = i - 1
              break
            }
            // console.log('idxPos', idxPos.value)
          }
        }
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.table-of-contents {
  width: 200px;
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 120px;
  align-self: flex-start;
}
.active-border-left {
  border-left: 3px solid #f66f00;
  margin-left: -3px;
}
</style>
