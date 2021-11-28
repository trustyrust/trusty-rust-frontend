<template>
  <q-layout view="hHh Lpr lFf" v-bind:class="{ 'mobile-body': isMobile }">
    <q-header class="header">
      <q-toolbar>
        <q-toolbar-title class="header full-width row no-wrap justify-between items-center">
          <div class="row no-wrap items-center">
            <q-img src="~assets/rust_crab.png" :no-spinner="true" width="55px" height="35px" />
            <div class="q-px-md">Practical<br />Rust</div>
            <template v-if="!isMobile && false">
              <q-separator vertical color="white" />
              <div class="q-px-md">Blog</div>
            </template>
          </div>
          <div v-if="!isMobile" class="row">
            <q-tabs indicator-color="tab-underline-color" v-model="tab" no-caps class="">
              <q-route-tab
                v-for="(section, idx) in arySections"
                :key="idx"
                class="header-tab"
                :name="section.name"
                :to="{ path: section.path }"
                exact
                :label="section.name"
              />
              <!-- <q-route-tab class="header-tab" :to="{ path: '/' }" exact name="overview" label="Blog" />
              <q-route-tab class="header-tab" :to="{ path: '/blog/fizzbuzz' }" name="validators" label="About" />
              <q-route-tab class="header-tab" :to="{ path: '/blog/install-rust' }" name="transactions" label="Mailing List" />
              <q-route-tab class="header-tab" :to="{ path: '/blocks' }" name="blocks" label="Announcements" /> -->
            </q-tabs>
          </div>
          <div class="row">
            <q-toggle v-model="isDark" @click="toggleDarkMode" checked-icon="dark_mode" color="green" unchecked-icon="light_mode" />
          </div>
        </q-toolbar-title>
        <q-btn v-if="isMobile" flat round :icon="rightDrawerOpen ? 'close' : 'menu'" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      overlay
      behavior="mobile"
      class="bg-right-menu"
      :width="width"
      dark
      no-swipe-open
      no-swipe-backdrop
    >
      <div class="full-width row justify-center q-px-md">
        <div class="full-width q-mt-lg">
          <q-list dark separator>
            <q-item clickable v-ripple to="/" exact active-class="right-menu-item-active">
              <q-item-section>
                <q-item-label>Overview</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/blog/fizzbuzz" exact active-class="right-menu-item-active">
              <q-item-section>
                <q-item-label>Validators</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/transactions" exact active-class="right-menu-item-active">
              <q-item-section>
                <q-item-label>Transactions</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-ripple to="/blocks" exact active-class="right-menu-item-active">
              <q-item-section>
                <q-item-label>Blocks</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-drawer>
    <q-page-container class="row justify-center">
      <router-view class="router-wrapper" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import useBreakpoints from 'src/boot/useBreakpoints'

const arySections = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const $q = useQuasar()
    const store = useStore()
    const { width, isMobile } = useBreakpoints()

    const rightDrawerOpen = ref(false)

    $q.dark.set(store.getters.isDarkTheme)
    const isDark = ref(store.getters.isDarkTheme)

    // get status
    const txtSearch = ref('')
    const leftDrawerOpen = ref(false)

    return {
      arySections,
      tab: ref(arySections[0].name),
      txtSearch,
      isDark,
      width,
      isMobile,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      onSearch: () => {
        console.log(txtSearch.value)
      },
      toggleDarkMode: () => {
        $q.dark.toggle()
        // if ($q.dark.isActive) {
        //   import('highlight.js/styles/a11y-dark.css')
        // } else {
        //   import('highlight.js/styles/a11y-light.css')
        // }
        store.dispatch('setDarkTheme', $q.dark.isActive)
      },
    }
  },
})
</script>

<style lang="scss" scoped>
.header {
  height: 79px;
  background: #000029;
  font-size: 20px;
  line-height: 23px;
}
.mobile-body .header {
  height: 60px;
}
.header-tab {
  padding-top: 23px;
  padding-bottom: 23px;
}
.router-wrapper {
  // border: 1px solid black;
  max-width: 1200px;
}
</style>
