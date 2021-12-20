<template>
  <q-page padding class="full-width row no-wrap">
    <div class="col">
      <section>
        <div class="text-h2">Getting Started with Rust</div>
        <div class="text-body1">
          In this post, we will go through how to install and set up Rust! Also below are listed some good resources for learning Rust.
          Also, be sure to watch the companion video for this post.
        </div>
        <div class="row q-py-md">
          <div class="col-12 col-md-6 offset-md-3">
            <q-video src="https://www.youtube.com/embed/kqLe-WZuvKU" frameborder="0" allowfullscreen :ratio="16 / 9" />
          </div>
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Installing Rust</div>
        <div class="text-body1">
          You can download Rust from the official Rust website here: <link-href link="https://www.rust-lang.org" caption="rust-lang.org" />
        </div>
        <div class="text-body1">Or for convenience:</div>
        <ul>
          <li>
            <div class="text-body1">To install Rust on <text-code>Linux</text-code> or <text-code>Mac</text-code> simply run:</div>
            <highlight-js language="shell" :code="'curl https://sh.rustup.rs -sSf | sh'" />
          </li>
          <li>
            <div class="text-body1">To install Rust on <text-code>Windows</text-code>, download and run:</div>
            <link-href link="https://static.rust-lang.org/rustup/dist/i686-pc-windows-gnu/rustup-init.exe" caption="rustup-init.exe" />
          </li>
        </ul>

        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Rustup and Cargo</div>
        <div class="text-body1">
          <text-code>rustup</text-code> is your main Rust version manager, similar to <text-code>nvm</text-code><br />
          <text-code>cargo</text-code> is your main package manager, similar to <text-code>npm</text-code>
        </div>
        <div class="text-body1">
          If you have installed Rust correctly you should be able to run:
          <highlight-js
            language="shell"
            :code="`# check rustc version
rustc --version

# check cargo version
cargo --version`"
          />
          <div class="text-body2">
            *Note: if you are having trouble executing either rustup or cargo, you may need to add the executable into your $PATH variable.
            See this post from
            <link-href
              link="https://stackoverflow.com/questions/50586535/make-rustc-cargo-rustup-rustdoc-commands-work-without-sudo-inside-the-windows"
              caption="stackoverflow"
            />
            for help.
          </div>
          <div class="text-body2">
            Usually you can fix by adding the following into your <text-code>.zshrc</text-code> or <text-code>.bashrc</text-code>
          </div>
          <highlight-js language="shell" :code="txtShellPath" />
        </div>
        <q-separator class="q-my-lg" />
      </section>
      <section>
        <div class="text-h4">Using Rustup</div>
        <div class="text-body1 q-pb-md">
          Everything you would ever like to know about rustc can be found here:
          <link-href link="https://doc.rust-lang.org/nightly/rustc/what-is-rustc.html" caption="rustc" />. Below are some important concepts
          and commands you might want to familiarize yourself with:
        </div>
        <ul>
          <li>
            <div class="text-body1">Toolchain Types are:</div>
            <highlight-js language="shell" :code="`stable | beta | nightly | <major.minor> | <major.minor.patch>`" />
          </li>
          <li>
            <div class="text-body1">Update your rustup</div>
            <highlight-js
              language="shell"
              :code="`# general update
rustup update

# or update specific toolchain only: stable|beta|nightly
rustup update stable`"
            />
          </li>
          <li>
            <div class="text-body1">Download or Uninstall specific toolchain and set default</div>
            <highlight-js
              language="shell"
              :code="`
# download toolchain stable|beta|nightly
rustup toolchain install stable

# download specific toolchain version
rustup toolchain install 1.30.0

# uninstall toolchain (from rustup show)
rustup toolchain uninstall nightly-x86_64-unknown-linux-gnu

# set default
rustup default stable`"
            />
          </li>
          <li>
            <div class="text-body1">
              To see your current configuration of Rust, the below command will give you an output that shows installed toolchains,
              installed targets, and your active toolchain:
            </div>
            <highlight-js language="shell" :code="`rustup show`" />
            <div class="text-body1"></div>
          </li>
          <li>
            <div class="text-body1">
              Rust has many different <text-code>targets</text-code> depending on what hardware you are building your application for. To
              see them run:
            </div>
            <highlight-js language="shell" :code="`rustup target list`" />
            <div class="text-subtitle2">
              * Note: each target will be in
              <link-href link="https://clang.llvm.org/docs/CrossCompilation.html#target-triple">target-triple</link-href> format
            </div>
            <div class="text-body1 q-pt-lg">
              To install a specific target
              <highlight-js language="shell" :code="`rustup target add x86_64-pc-windows-gnu --toolchain stable`" />
            </div>
          </li>
        </ul>

        <q-separator class="q-my-lg" />
      </section>

      <section>
        <div class="text-h4">Rust Resources</div>
        <div class="text-body1">
          Don't forget to see the next Blog Post for tips and tricks on how to set up Rust in vscode for debugging and fast compile times
          here: <blog-link to="/blog/setting-up-rust-in-vscode">Setting Up Rust in vscode</blog-link>
        </div>
        <div class="text-body1 q-pt-md">
          Below are some helpful resources to navigate the language of Rust:
          <ul>
            <li>
              <link-href caption="This Blog! TrustyRust.com" link="https://trustyrust.com" />
            </li>
            <li>
              <link-href caption="The Rust Book" link="https://doc.rust-lang.org/stable/book/title-page.html" />
            </li>
            <li>
              <link-href caption="Rust by Example" link="https://doc.rust-lang.org/stable/rust-by-example" />
            </li>
            <li><link-href caption="crates.io" link="https://crates.io" /> (repository of Rust libraries)</li>
            <li>
              <link-href caption="Awesome Rust" link="https://github.com/rust-unofficial/awesome-rust" /> Unofficial list of interesting
              Rust projects
            </li>
            <li>
              <link-href caption="Rust Web Framework Comparison" link="https://github.com/flosse/rust-web-framework-comparison" />
            </li>
            <li>
              <link-href caption="Rust Package Guidelines" link="https://wiki.archlinux.org/index.php/Rust_package_guidelines" />
            </li>
            <li>
              <link-href caption="Languages written in Rust" link="https://github.com/alilleybrinker/langs-in-rust" />
            </li>
          </ul>
        </div>
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
import BlogLink from 'src/components/BlogLink.vue'
import TableOfContents from 'src/components/TableOfContents.vue'
import HighlightJs from 'src/components/HighlightJs.vue'
import { addLineNumbersToCodeBlocks } from 'src/boot/preload'

export default defineComponent({
  name: 'InstallRust',
  components: {
    HighlightJs,
    TableOfContents,
    LinkHref,
    TextCode,
    BlogLink,
  },
  methods: {},
  setup() {
    const app = getCurrentInstance()
    const router = useRouter()

    onMounted(() => {
      addLineNumbersToCodeBlocks(['rust'])
    })
    return {
      txtShellPath: `export PATH="$HOME/.cargo/bin:$PATH"`,
    }
  },
})
</script>

<style lang="scss" scoped></style>
