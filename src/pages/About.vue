<template>
  <q-page padding class="full-width row wrap">
    <div v-bind:class="{ 'col-12': isMobile }" class="col">
      <div class="text-h2">About me</div>
      <div class="text-body1">
        I am a Computer Programmer with over 10 years of experience developing solutions from major enterprize companies to a 3 team
        startup. My work includes FinTech, Cryptocurrency, Servers, and Databases. I started my journey in Rust back in 2018 and have
        decided to create this Blog to share my experiences and give back to community. I have made this Blog and all the code for it
        publicly available. Please feel free to use the links to find out more about me.
      </div>
    </div>
    <div v-bind:class="{ 'col-12': isMobile }" class="col">
      <div class="row full-width justify-center">
        <q-img src="~assets/headshot_small.png" no-spinner style="height: 200px; max-width: 150px" />
      </div>
      <div class="row full-width justify-center q-pt-md">
        <div class="q-gutter-md">
          <q-btn class="social" @click="onUrl('https://linkedin.com/in/thpowers')" icon="lab la-linkedin" />
          <q-btn class="social" @click="onUrl('mailto:trustyrustblog@gmail.com')" icon="las la-envelope" />
          <q-btn class="social" @click="onUrl('https://github.com/trustyrust')" icon="lab la-github" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { openURL } from 'quasar'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    return {
      isMobile: computed(() => store.getters.useBreakpoints.isMobile),
      onUrl: (u) => {
        openURL(u)
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.social {
  background: #88c9fc;
  border-radius: 3px;
  width: 25px;
  height: 25px;
  color: black;
}
</style>
