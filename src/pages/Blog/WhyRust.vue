<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Do Not Use Rust!</div>
        <div class="text-body1">
          Surprize! For the vast majority of applications Rust is probably not the best choice. Rust is:
          <ul>
            <li>
              <b>Hard to learn</b><br />Rust has very unique concepts like lifetimes that can be difficult for some people to understand
            </li>
            <li>
              <b>Slower to write</b><br />Rust is a low level language like C++ meaning that much of the higher level abstractions that you
              get from languages like python or javascript are not there. As a developer you will be required to think about your
              application at a very low level.
            </li>
            <li>
              <b>Ecosystem less mature than languages like python or javascript</b><br />The first stable release of Rust was in 15-May-2015
              making it a relatively new language. While over 70k crates (libraries) exist today some more specialty needs like AI libraries
              will be more mature in other languages.
            </li>
          </ul>
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Why you should choose Rust</div>

        <q-separator class="q-my-lg" />
      </section>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
<style lang="scss" scoped>
ul li {
  margin-top: 12px;
}
</style>
