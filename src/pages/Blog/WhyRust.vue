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
        <div class="text-h4">Why Use Rust</div>
        <div class="text-body1">
          The Case for Rust:
          <ul>
            <li>
              <b>Security</b><br />One of the biggest selling points of Rust is guaranteed memory safety. This means that code written in
              Rust cannot have memory leaks or buffer overflows, one of the most exploited attacks among hackers. For this reason Rust is
              becoming an extremely popular choice for Operating system level code. For example: An entire Linux distribution
              <link-href link="https://pop.system76.com/">Pop!_OS by System 76</link-href> has been written in Rust. Additionally Google has
              announced interest in rewriting parts of the Android operating system in Rust, see
              <link-href link="https://security.googleblog.com/2021/04/rust-in-android-platform.html">rust in android platform</link-href>.
            </li>
            <li>
              <b>High Performance</b><br />Rust is an extremely fast and performant language on par with C++. One of the most unique aspects
              of Rust is that it has no garbage collector. This allows it to have extremely consistent and fast runtime. Major companies
              like DropBox have been able to take advantage of this and incorporate Rust into their core apps like: Magic Pocket, Nucleus,
              and Convex. See here for more info:
              <link-href link="https://blog.convex.dev/a-tale-of-three-codebases/">a tale of three codebases</link-href>
              <br />Another need for high performance comes in the form of games. Games require lots of CPU and memory for rendering
              Graphics and computing physics. The <link-href link="https://bevyengine.org/">Bevy Game Engine</link-href> allows you to write
              games in Rust for Windows, MaxOS, and Linux.
            </li>
            <li>
              <b>Low Level C++ replacement</b><br />When a company needs to use a low level language, Rust is often becoming the winning
              choice. Coding in C++ is hard, easy to create bugs, and difficult to debug. On the other hand, Rust has been voted the "Most
              Loved" language on StackOverflow for 5 years in a row:
              <link-href link="https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-languages"
                >most loved dreaded and wanted languages</link-href
              >
            </li>
            <li>
              <b>WASM in Browser or NodeJs</b><br />If you are not familiar with WASM, it stands for
              <link-href link="https://webassembly.org/">WebAssembly</link-href> and it is already gaining widespread support. WASM allows
              code from other languages to get compiled into the JavaScript binary and run in the Browser. This means you can write
              extremely fast and performant code in Rust and run it in the Browser or NodeJs. Their are projects like
              <link-href link="https://yew.rs/">Yew</link-href> that will allow you to write an entire frontend application in Rust WASM.
              <br />Another benefit is that you do not have to rewrite an whole application just to fix a few bottleneck processes. Suppose
              you have a NodeJs app and one part is very computationally intense. You can rewrite that part in Rust and Plug it in
              seamlessly into your NodeJs app. See this post, for how to do it: <blog-link to="/blog/wasm-pack">Using Wasm Pack</blog-link>.
            </li>
            <li>
              <b>Blockchains and Smart Contracts</b><br />Many Blockchains need to be extremely robust, performant, and bulletproof against
              hackers. Given this, Rust is a very natural choice and many popular Blockchain projects have chosen Rust as their language to
              build on. Here is an example of a few:
              <ul>
                <li><link-href link="https://github.com/diem/diem">Diem</link-href>: Formally Facebook's Libra</li>
                <li><link-href link="https://github.com/solana-labs/solana">Solana</link-href></li>
                <li><link-href link="https://github.com/iotaledger/iota.rs">IOTA</link-href></li>
              </ul>
            </li>
          </ul>
        </div>
        <q-separator class="q-my-lg" />
      </section>
    </div>
    <table-of-contents />
  </q-page>
</template>

<script>
import TableOfContents from 'src/components/TableOfContents.vue'
import LinkHref from 'src/components/LinkHref.vue'
import BlogLink from 'src/components/BlogLink.vue'

export default {
  components: {
    TableOfContents,
    LinkHref,
    BlogLink,
  },
}
</script>
<style lang="scss" scoped>
ul li {
  margin-top: 12px;
}
</style>
