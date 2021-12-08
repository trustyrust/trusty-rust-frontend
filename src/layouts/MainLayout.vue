<template>
  <q-layout view="hHh Lpr lFf" v-bind:class="{ 'mobile-body': isMobile }">
    <q-header class="header">
      <q-toolbar>
        <q-toolbar-title class="header full-width row no-wrap justify-between items-center">
          <div class="row no-wrap items-center" v-bind:class="{ 'q-ml-md': !isMobile }">
            <q-img src="~assets/rust_crab.png" :no-spinner="true" width="55px" height="35px" />
            <div class="q-px-md">Trusty<br />Rust</div>
            <template v-if="!isMobile && false">
              <q-separator vertical color="white" />
              <div class="q-px-md">Blog</div>
            </template>
          </div>
          <div v-if="!isMobile" class="row">
            <q-tabs shrink indicator-color="tab-underline-color" v-model="tab" no-caps class="">
              <q-route-tab
                v-for="(section, idx) in arySections"
                :key="idx"
                class="header-tab"
                :name="section.name"
                :to="{ path: section.path }"
                :label="section.name"
              />
            </q-tabs>
          </div>
          <div class="row">
            <q-toggle v-model="isDark" @click="toggleDarkMode" checked-icon="dark_mode" color="green" unchecked-icon="light_mode" />
            <template v-if="!isMobile">
              <q-btn v-if="!isLoggedIn" class="q-mx-md" color="deep-orange" rounded no-caps label="Sign Up" @click="onSignUp" />
              <q-btn v-else flat round :icon="rightDrawerMobile ? 'close' : 'menu'" @click="toggleMenu">
                <q-menu>
                  <div class="row no-wrap q-pa-md">
                    <!-- <div class="column">
                      <div class="text-h6 q-mb-md">Settings</div>
                      <q-toggle v-model="mobileData" label="Receive Notifications" />
                      <q-toggle v-model="bluetooth" label="Bluetooth" />
                    </div>

                    <q-separator vertical inset class="q-mx-lg" /> -->

                    <div class="column items-center">
                      <div class="text-subtitle1 q-mt-md">{{ userAuth.user_name }}</div>
                      <div class="text-subtitle1 q-mb-xs">{{ userAuth.user_email }}</div>
                      <q-btn color="warning" rounded outline @click="onLogout" label="Logout" push size="sm" v-close-popup />
                    </div>
                  </div>
                </q-menu>
              </q-btn>
            </template>
          </div>
        </q-toolbar-title>
        <q-btn v-if="isMobile" flat round :icon="rightDrawerMobile ? 'close' : 'menu'" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>
    <!-- <q-drawer v-model="rightDrawerDesktop" side="right" overlay behavior="desktop" elevated>
      <q-list separator>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="person" />
          </q-item-section>

          <q-item-section>Profile</q-item-section>
        </q-item>
        <q-item :manual-focus="true" :clickable="false">
          <q-item-section>
            <q-btn outline rounded color="warning" label="logout" @click="onLogout" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer> -->
    <q-drawer
      v-model="rightDrawerMobile"
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
            <q-item
              v-for="(section, idx) in arySections"
              :key="idx"
              clickable
              v-ripple
              :to="section.path"
              active-class="right-menu-item-active"
            >
              <q-item-section>
                <q-item-label>{{ section.name }}</q-item-label>
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
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import SignUp from 'src/components/Auth/AuthDialog.vue'

const arySections = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'About', path: '/about' },
]

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup() {
    const $q = useQuasar()
    const store = useStore()

    const rightDrawerMobile = ref(false)
    const rightDrawerDesktop = ref(false)

    $q.dark.set(store.getters.isDarkTheme)
    const isDark = ref(store.getters.isDarkTheme)

    // get status
    const txtSearch = ref('')

    return {
      arySections,
      tab: ref(arySections[0].name),
      txtSearch,
      isDark,
      width: computed(() => store.getters.useBreakpoints.width),
      isMobile: computed(() => store.getters.useBreakpoints.isMobile),
      rightDrawerMobile,
      rightDrawerDesktop,
      userAuth: computed(() => store.getters.userAuth),
      isLoggedIn: computed(() => store.getters.isLoggedIn),
      toggleRightDrawer() {
        rightDrawerMobile.value = !rightDrawerMobile.value
      },
      toggleMenu() {
        rightDrawerDesktop.value = !rightDrawerDesktop.value
      },
      onSearch: () => {
        console.log(txtSearch.value)
      },
      onLogout: async () => {
        // destroy the JWT token
        await store.dispatch('resetUser')
        rightDrawerDesktop.value = false
      },
      onSignUp: () => {
        $q.dialog({
          component: SignUp,
        })
          .onOk(() => {
            console.log('OK')
          })
          .onCancel(() => {
            console.log('Cancel')
          })
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
